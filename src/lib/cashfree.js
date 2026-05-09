import { supabase } from './supabase'

function loadCashfreeSDK() {
  return new Promise((resolve) => {
    if (window.Cashfree) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Call your backend / Supabase Edge Function to create a Cashfree order
// and return a payment_session_id.
async function createOrder({ plan, user }) {
  const appId = import.meta.env.VITE_CASHFREE_APP_ID
  if (!appId) throw new Error('Cashfree App ID not configured.')

  // Replace this with your actual Supabase Edge Function or backend endpoint:
  // const { data, error } = await supabase.functions.invoke('create-cashfree-order', {
  //   body: { planId: plan.id, userId: user.id, amount: plan.price },
  // })
  // if (error) throw new Error(error.message)
  // return data.payment_session_id

  // ── Placeholder ──────────────────────────────────────────────────────────
  // Remove the line below and uncomment the block above once you have a
  // backend endpoint that calls the Cashfree Orders API and returns a
  // payment_session_id.
  throw new Error('Backend order-creation endpoint not yet configured. See src/lib/cashfree.js.')
}

export async function initiatePayment({ plan, user, onSuccess, onError }) {
  const loaded = await loadCashfreeSDK()
  if (!loaded) {
    onError('Could not load payment gateway. Please try again.')
    return
  }

  let paymentSessionId
  try {
    paymentSessionId = await createOrder({ plan, user })
  } catch (err) {
    onError(err.message)
    return
  }

  const totalCredits = plan.credits + plan.bonus
  const mode = import.meta.env.PROD ? 'production' : 'sandbox'

  // Initialise Cashfree v3 SDK
  const cashfree = window.Cashfree({ mode })

  const checkoutOptions = {
    paymentSessionId,
    returnUrl: `${window.location.origin}/#/dashboard?payment=success&plan=${plan.id}`,
    onSuccess: async (data) => {
      const cfPaymentId = data?.transaction?.transactionId || data?.order?.orderId || 'unknown'
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
          amount: plan.price,
          credits_added: totalCredits,
          plan_id: plan.id,
          status: 'success',
        })

        onSuccess({ totalCredits, paymentId: cfPaymentId })
      } catch (err) {
        onError(
          'Payment succeeded but credit update failed. Contact support with payment ID: ' + cfPaymentId
        )
      }
    },
    onFailure: (data) => {
      onError('Payment failed: ' + (data?.transaction?.txMsg || 'Unknown error'))
    },
  }

  cashfree.checkout(checkoutOptions)
}
