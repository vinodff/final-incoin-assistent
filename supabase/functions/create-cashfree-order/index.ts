import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const CASHFREE_APP_ID = Deno.env.get('CASHFREE_APP_ID')!
const CASHFREE_SECRET_KEY = Deno.env.get('CASHFREE_SECRET_KEY')!
const CASHFREE_API = 'https://api.cashfree.com/pg'  // production

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { planId, userId, amount, userEmail } = await req.json()

    if (!planId || !userId || !amount || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const orderId = `order_${userId.slice(0, 8)}_${Date.now()}`

    const response = await fetch(`${CASHFREE_API}/orders`, {
      method: 'POST',
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: userId,
          customer_email: userEmail,
          customer_phone: '9999999999', // required by Cashfree; update if you collect phone
        },
        order_meta: {
          return_url: `https://incoinassistant.tech/#/dashboard?payment=success&order_id={order_id}`,
        },
        order_note: `Credits purchase — plan: ${planId}`,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || 'Cashfree order creation failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ payment_session_id: data.payment_session_id, order_id: data.order_id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
