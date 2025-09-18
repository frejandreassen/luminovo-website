'use client'

import React from 'react'

const pricingTiers = [
  {
    name: 'Essential',
    price: '€300',
    description: 'Perfect for simple, elegant designs',
    features: [
      'AI Design Generation',
      '360° Preview',
      'Standard Materials',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '€540',
    description: 'Advanced features and materials',
    features: [
      'Everything in Essential',
      'AR Preview',
      'Premium Materials',
      'Smart Lighting Features',
    ],
    popular: true,
  },
  {
    name: 'Luxury',
    price: '€800',
    description: 'Ultimate customization and quality',
    features: [
      'Everything in Premium',
      'Artisan Materials',
      'IoT Integration',
      'White-glove Delivery',
    ],
    popular: false,
  },
]

interface PricingProps {
  className?: string
}

export const Pricing: React.FC<PricingProps> = ({ className = '' }) => {
  return (
    <section id="pricing" className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fair pricing based on complexity and materials. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`border-2 rounded-3xl p-8 relative transition-all duration-300 hover:shadow-lg ${
                tier.popular
                  ? 'border-brand-terracotta shadow-lg scale-105'
                  : 'border-gray-200 hover:border-brand-terracotta'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-terracotta text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="text-4xl font-bold text-brand-terracotta">{tier.price}</div>
                <p className="text-gray-600">{tier.description}</p>
              </div>

              <ul className="space-y-3 mt-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-brand-terracotta text-white hover:bg-opacity-90 transform hover:scale-105'
                      : 'border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white'
                  }`}
                >
                  Choose {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing