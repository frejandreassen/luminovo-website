'use client'

import React from 'react'

const products = [
  {
    name: 'Stjärnljus',
    description: 'Geometrisk takkrona i varm ek',
    price: '4 890 SEK',
    image: '🔯',
    features: [
      'Handgjord i Sverige',
      'Varm LED-belysning',
      'Ekologisk ek',
    ],
    popular: false,
  },
  {
    name: 'Vintergryning',
    description: 'Elegant bordslampan i mässing',
    price: '2 450 SEK',
    image: '💎',
    features: [
      'Mässing och linjär',
      'Dimbar LED',
      'Skandinavisk design',
    ],
    popular: true,
  },
  {
    name: 'Nordskimmer',
    description: 'Minimalistisk golvlampa',
    price: '3 290 SEK',
    image: '🔷',
    features: [
      'Handgjord keramikbas',
      'Naturligt linne',
      'Justerbar höjd',
    ],
    popular: false,
  },
  {
    name: 'Midnattssol',
    description: 'Rund vägglampa i koppar',
    price: '1 850 SEK',
    image: '⬢',
    features: [
      'Återvunnen koppar',
      'Varm glöd',
      'Monteras enkelt',
    ],
    popular: false,
  },
  {
    name: 'Isblomma',
    description: 'Takpendel i frostat glas',
    price: '3 790 SEK',
    image: '◆',
    features: [
      'Frostat handblåst glas',
      'Mjukt ljusspridning',
      'Tidlös elegans',
    ],
    popular: false,
  },
  {
    name: 'Skog och Sten',
    description: 'Skulpturell bordslampan',
    price: '5 290 SEK',
    image: '🔸',
    features: [
      'Natursten och trä',
      'Unik handgjord design',
      'Begränsad upplaga',
    ],
    popular: false,
  },
]

interface ProductsProps {
  className?: string
}

export const Products: React.FC<ProductsProps> = ({ className = '' }) => {
  return (
    <section id="products" className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Våra Kollektioner</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handgjorda ljusskulpturer som förvandlar ditt hem med skandinavisk elegans och varm atmosfär.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.name}
              className={`border-2 rounded-3xl p-8 relative transition-all duration-300 hover:shadow-lg group ${
                product.popular
                  ? 'border-brand-terracotta shadow-lg'
                  : 'border-gray-200 hover:border-brand-terracotta'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-terracotta text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mest Populär
                </div>
              )}

              <div className="text-center space-y-4">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-gray-600 italic">{product.description}</p>
                <div className="text-3xl font-bold text-brand-terracotta">{product.price}</div>
              </div>

              <ul className="space-y-3 mt-8">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    product.popular
                      ? 'bg-brand-terracotta text-white hover:bg-opacity-90 transform hover:scale-105'
                      : 'border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white'
                  }`}
                >
                  Köp {product.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Alla våra lampor tillverkas för hand i Sverige med omsorgsfullt utvalda material
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>🇸🇪</span>
              <span>Tillverkas i Sverige</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🌿</span>
              <span>Hållbara material</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✋</span>
              <span>Handgjord kvalitet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products