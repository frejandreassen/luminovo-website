'use client'

import React from 'react'

const collections = [
  {
    title: 'Handgjord Precision',
    description: 'Varje lampa tillverkas för hand av svenska hantverkare med decennier av erfarenhet och passion för perfektion.',
  },
  {
    title: 'Hållbara Material',
    description: 'Vi använder endast ekologiskt certifierat trä, återvunnen metall och energisnåla LED-lampor för framtidens belysning.',
  },
  {
    title: 'Geometrisk Elegans',
    description: 'Våra lampor kombinerar skandinavisk minimalism med geometriska former som skapar dramatiska ljuseffekter.',
  },
  {
    title: 'Svensk Hantverkstradition',
    description: 'Varje design bygger på århundraden av svensk möbel- och designtradition, anpassad för moderna hem.',
  },
]

interface FeaturesProps {
  className?: string
}

export const Features: React.FC<FeaturesProps> = ({ className = '' }) => {
  return (
    <section id="features" className={`py-20 ${className}`} style={{
      background: 'linear-gradient(135deg, #f1e9e0 0%, #ffffff 100%)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Hantverkstradition
              <span className="text-brand-terracotta block">Möter Modern Design</span>
            </h2>

            <div className="space-y-6">
              {collections.map((collection, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-brand-terracotta rounded-full flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
                    <p className="text-gray-600">{collection.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-terracotta opacity-20 rounded-full"></div>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Vårt Hantverkstillverkningsprocess</h3>
                  <div className="bg-brand-sand rounded-xl p-6 text-left">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-brand-terracotta rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Design & Planering</h4>
                          <p className="text-sm text-gray-600">Handritat skiss av våra designers</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-brand-terracotta rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Material & Bearbetning</h4>
                          <p className="text-sm text-gray-600">Handvalt trä och metall formas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-brand-terracotta rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Montering & Kvalitetskontroll</h4>
                          <p className="text-sm text-gray-600">Noggrant monterad och testad</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Klar för leverans</h4>
                          <p className="text-sm text-gray-600">Handpackad för säker transport</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features