import { supabase } from './supabase'

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function initiatePayment({ plan, user, onSuccess, onError }) {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    onError('Could not load payment gateway. Please try again.')
    return
  }

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID
  if (!keyId) {
    onError('Payment gateway not configured. Contact support.')
    return
  }

  const totalCredits = plan.credits + plan.bonus

  const options = {
    key: keyId,
    amount: plan.razorpayAmount,
    currency: 'INR',
    name: 'Incoin Assistant',
    description: `${plan.name} — ${totalCredits} Credits`,
    image: '/favicon.svg',
    prefill: {
      email: user.email,
    },
    theme: {
      color: '#6366f1',
    },
    handler: async function (response) {
      try {
        // Add credits to user profile
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

        // Log payment
        await supabase.from('payments').insert({
          user_id: user.id,
          payment_id: response.razorpay_payment_id,
          amount: plan.price,
          credits_added: totalCredits,
          plan_id: plan.id,
          status: 'success',
        })

        onSuccess({ totalCredits, paymentId: response.razorpay_payment_id })
      } catch (err) {
        onError('Payment succeeded but credit update failed. Contact support with payment ID: ' + response.razorpay_payment_id)
      }
    },
    modal: {
      ondismiss: () => {},
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.on('payment.failed', function (response) {
    onError('Payment failed: ' + response.error.description)
  })
  rzp.open()
}
