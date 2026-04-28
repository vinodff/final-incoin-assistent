export const PLANS = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: 100,
    credits: 55,
    bonus: 5,
    popular: false,
    features: [
      'Access to all tools',
      '55 base credits',
      '5 bonus credits (free)',
      'Email support',
      'Credits never expire',
    ],
    razorpayAmount: 10000, // in paise (₹100 × 100)
  },
  {
    id: 'popular',
    name: 'Popular Plan',
    price: 200,
    credits: 115,
    bonus: 15,
    popular: true,
    features: [
      'Access to all tools',
      '115 base credits',
      '15 bonus credits (free)',
      'Priority support',
      'Credits never expire',
    ],
    razorpayAmount: 20000, // in paise (₹200 × 100)
  },
  {
    id: 'value',
    name: 'Value Plan',
    price: 500,
    credits: 325,
    bonus: 25,
    popular: false,
    features: [
      'Access to all tools',
      '325 base credits',
      '25 bonus credits (free)',
      'Priority support',
      'Credits never expire',
    ],
    razorpayAmount: 50000, // in paise (₹500 × 100)
  },
]
