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
    // Verify caller is an authenticated Supabase user
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

    const { planId, amount, planName, totalCredits } = await req.json()
    if (!planId || !amount) {
      return new Response(JSON.stringify({ error: 'Missing planId or amount' }), { status: 400, headers: cors })
    }

    const orderId = `IA_${Date.now()}_${user.id.slice(0, 8)}`

    const cfRes = await fetch(`${CASHFREE_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: user.id,
          customer_email: user.email,
          customer_phone: '9999999999',
        },
        order_meta: {
          return_url: `https://incoinassistant.tech/#/dashboard?payment=success&order_id={order_id}`,
        },
        order_note: `${planName ?? planId} — ${totalCredits ?? ''} credits`,
      }),
    })

    const order = await cfRes.json()

    if (!cfRes.ok) {
      return new Response(
        JSON.stringify({ error: order.message ?? 'Cashfree order creation failed' }),
        { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ payment_session_id: order.payment_session_id, order_id: order.order_id }),
      { headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
})
