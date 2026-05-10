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
  const isProd = window.location.hostname === 'incoinassistant.tech'

  const { data, error } = await supabase.functions.invoke('create-cashfree-order', {
    body: {
      planId: plan.id,
      planName: plan.name,
      totalCredits: plan.credits + plan.bonus,
      amount: plan.price,
      mode: isProd ? 'production' : 'sandbox',
    },
  })

  // When edge function returns non-2xx, supabase-js sets error and data may be null.
  // Try to pull the actual message out of the error context first.
  if (error) {
    let msg = error.message || 'Failed to create payment order'
    try {
      const body = await error.context?.json?.()
      if (body?.error) msg = body.error
    } catch { /* ignore parse failure */ }
    throw new Error(msg)
  }

  if (data?.error) throw new Error(data.error)
  if (!data?.payment_session_id) throw new Error('No payment session returned from server')

  return { paymentSessionId: data.payment_session_id, orderId: data.order_id }
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

  const totalCredits = plan.credits + plan.bonus
  const isProd = window.location.hostname === 'incoinassistant.tech'
  const cashfree = window.Cashfree({ mode: isProd ? 'production' : 'sandbox' })

  cashfree.checkout({
    paymentSessionId,
    returnUrl: `${window.location.origin}/#/dashboard?payment=success&order_id=${orderId}`,

    onSuccess: async (data) => {
      const cfPaymentId = data?.transaction?.transactionId || orderId
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', user.id)
          .single()

        const currentCredits = profile?.credits ?? 0

        await supabase
          .from('profiles')
          .update({ credits: currentCredits + totalCredits })
          .eq('id', user.id)

        await supabase.from('payments').insert({
          user_id: user.id,
          payment_id: cfPaymentId,
          order_id: orderId,
          amount: plan.price,
          credits_added: totalCredits,
          plan_id: plan.id,
          status: 'success',
        })

        onSuccess({ totalCredits, paymentId: cfPaymentId })
      } catch {
        onError('Payment succeeded but credit update failed. Contact support with order ID: ' + orderId)
      }
    },

    onFailure: (data) => {
      onError('Payment failed: ' + (data?.transaction?.txMsg || 'Unknown error'))
    },
  })
}
