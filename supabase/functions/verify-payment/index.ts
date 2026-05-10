// @ts-nocheck — runs in Supabase Deno runtime
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CASHFREE_APP_ID    = Deno.env.get('CASHFREE_APP_ID') ?? ''
const CASHFREE_SECRET_KEY = Deno.env.get('CASHFREE_SECRET_KEY') ?? ''
const CASHFREE_API       = 'https://api.cashfree.com/pg'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    // ── 1. Verify caller identity (anon client + user JWT) ────────────────
    const authHeader = req.headers.get('Authorization') ?? ''
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors })
    }

    const anonClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user }, error: authError } = await anonClient.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors })
    }

    // ── 2. Service-role client for DB writes (bypasses RLS) ───────────────
    const db = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { order_id, plan_id, credits_to_add } = await req.json()
    if (!order_id || !credits_to_add) {
      return new Response(JSON.stringify({ error: 'Missing order_id or credits_to_add' }), { status: 400, headers: cors })
    }

    // ── 3. Duplicate-payment guard (non-fatal if payments table missing) ──
    try {
      const { data: existing } = await db
        .from('payments')
        .select('id')
        .eq('order_id', order_id)
        .maybeSingle()
      if (existing) {
        return new Response(JSON.stringify({ already_processed: true }), {
          headers: { ...cors, 'Content-Type': 'application/json' },
        })
      }
    } catch { /* payments table may not exist yet — continue */ }

    // ── 4. Verify payment status with Cashfree ────────────────────────────
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

    // ── 5. Atomically add credits (service role bypasses RLS) ─────────────
    const { error: updateErr } = await db.rpc('increment_credits', {
      user_id: user.id,
      amount: credits_to_add,
    })

    // Fallback: read-then-write if rpc doesn't exist
    if (updateErr) {
      const { data: profile } = await db
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single()
      const current = profile?.credits ?? 0
      await db.from('profiles').update({ credits: current + credits_to_add }).eq('id', user.id)
    }

    // ── 6. Log payment (non-fatal) ────────────────────────────────────────
    try {
      await db.from('payments').insert({
        user_id: user.id,
        payment_id: order.cf_order_id ?? order_id,
        order_id,
        amount: order.order_amount,
        credits_added: credits_to_add,
        plan_id: plan_id ?? 'unknown',
        status: 'success',
      })
    } catch { /* payments table may not exist — credits already added above */ }

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
