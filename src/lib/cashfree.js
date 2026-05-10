import { supabase } from './supabase'

function loadCashfreeSDK() {
  return new Promise((resolve) => {
    if (window.Cashfree) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

async function createOrder({ plan }) {
  const { data, error } = await supabase.functions.invoke('create-cashfree-order', {
    body: {
      planId: plan.id,
      planName: plan.name,
      totalCredits: plan.credits + plan.bonus,
      amount: plan.price,
      mode: 'production',
    },
  })

  if (error) {
    let msg = error.message || 'Failed to create payment order'
    try {
      const body = await error.context?.json?.()
      if (body?.error) msg = body.error
    } catch { /* ignore */ }
    throw new Error(msg)
  }

  if (data?.error) throw new Error(data.error)
  if (!data?.payment_session_id) throw new Error('No payment session returned from server')

  return { paymentSessionId: data.payment_session_id, orderId: data.order_id }
}

// Add credits via the verify-payment edge function (uses service role — bypasses RLS)
async function addCreditsViaEdgeFunction({ orderId, plan }) {
  const totalCredits = plan.credits + plan.bonus
  const { data, error } = await supabase.functions.invoke('verify-payment', {
    body: {
      order_id: orderId,
      plan_id: plan.id,
      credits_to_add: totalCredits,
    },
  })

  if (error) {
    let msg = error.message || 'Credit update failed'
    try {
      const body = await error.context?.json?.()
      if (body?.error) msg = body.error
    } catch { /* ignore */ }
    throw new Error(msg)
  }

  if (data?.error) throw new Error(data.error)
  return totalCredits
}

export async function initiatePayment({ plan, user, onSuccess, onError }) {
  const loaded = await loadCashfreeSDK()
  if (!loaded) {
    onError('Could not load payment gateway. Please try again.')
    return
  }

  let paymentSessionId, orderId
  try {
    const result = await createOrder({ plan })
    paymentSessionId = result.paymentSessionId
    orderId = result.orderId
  } catch (err) {
    onError(err.message)
    return
  }

  const cashfree = window.Cashfree({ mode: 'production' })

  cashfree.checkout({
    paymentSessionId,
    returnUrl: `${window.location.origin}/#/dashboard?payment=success&order_id=${orderId}&plan_id=${plan.id}&credits=${plan.credits + plan.bonus}`,

    onSuccess: async () => {
      try {
        const totalCredits = await addCreditsViaEdgeFunction({ orderId, plan })
        onSuccess({ totalCredits, paymentId: orderId })
      } catch (err) {
        onError('Payment succeeded but credit update failed. Contact support with order ID: ' + orderId)
      }
    },

    onFailure: (data) => {
      onError('Payment failed: ' + (data?.transaction?.txMsg || 'Unknown error'))
    },
  })
}
