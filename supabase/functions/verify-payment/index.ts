// @ts-nocheck — runs in Supabase Deno runtime
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CASHFREE_APP_ID = Deno.env.get('CASHFREE_APP_ID') ?? ''
const CASHFREE_SECRET_KEY = Deno.env.get('CASHFREE_SECRET_KEY') ?? ''
const CASHFREE_API = 'https://api.cashfree.com/pg'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors })
    }

    const { order_id, plan_id, credits_to_add } = await req.json()
    if (!order_id || !plan_id || !credits_to_add) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: cors })
    }

    // Check if this order was already processed
    const { data: existing } = await supabase
      .from('payments')
      .select('id')
      .eq('order_id', order_id)
      .single()

    if (existing) {
      return new Response(JSON.stringify({ already_processed: true }), {
        headers: { ...cors, 'Content-Type': 'application/json' },
      })
    }

    // Verify payment with Cashfree
    const cfRes = await fetch(`${CASHFREE_API}/orders/${order_id}`, {
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
    })

    const order = await cfRes.json()

    if (!cfRes.ok || order.order_status !== 'PAID') {
      return new Response(
        JSON.stringify({ error: `Payment not confirmed. Status: ${order.order_status ?? 'unknown'}` }),
        { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    // Add credits
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single()

    const currentCredits = profile?.credits ?? 0

    await supabase
      .from('profiles')
      .update({ credits: currentCredits + credits_to_add })
      .eq('id', user.id)

    // Log payment
    await supabase.from('payments').insert({
      user_id: user.id,
      payment_id: order.cf_order_id ?? order_id,
      order_id,
      amount: order.order_amount,
      credits_added: credits_to_add,
      plan_id,
      status: 'success',
    })

    return new Response(
      JSON.stringify({ success: true, credits_added: credits_to_add }),
      { headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
})
