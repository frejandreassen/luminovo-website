'use client'

import React, { useState, useEffect } from 'react'
import { Logo } from './logo'

const featuredLamps = [
  {
    name: 'Stjärnljus',
    icon: '🔯',
    description: 'Geometrisk elegans',
  },
  {
    name: 'Vintergryning',
    icon: '💎',
    description: 'Varm mässing',
  },
  {
    name: 'Nordskimmer',
    icon: '🔷',
    description: 'Skandinavisk design',
  },
]

interface HeroProps {
  className?: string
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const [currentLamp, setCurrentLamp] = useState(0)

  const scrollToProducts = () => {
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Auto-rotate featured lamps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLamp((prev) => (prev + 1) % featuredLamps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`pt-24 pb-16 min-h-screen flex items-center ${className}`} style={{
      background: 'linear-gradient(135deg, #f1e9e0 0%, #ffffff 100%)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Skandinavisk
                <span className="text-brand-terracotta block">Lyxbelysning</span>
                för ditt hem
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Handgjorda geometriska lampor som förvandlar ditt hem med varm atmosfär och tidlös skandinavisk elegans. Varje lampa är ett unikt konstverk.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToProducts}
                className="bg-brand-terracotta text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-lg"
                style={{
                  boxShadow: '0 0 20px rgba(185, 123, 94, 0.3)',
                  animation: 'pulse-glow 2s ease-in-out infinite alternate'
                }}
              >
                Upptäck Kollektionen →
              </button>
              <button
                onClick={scrollToContact}
                className="border-2 border-brand-black text-brand-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-black hover:text-white transition-all"
              >
                Boka Visning
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-terracotta">🇸🇪</div>
                <div className="text-sm text-gray-600">Tillverkas i Sverige</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-terracotta">✋</div>
                <div className="text-sm text-gray-600">Handgjord Kvalitet</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-terracotta">🌿</div>
                <div className="text-sm text-gray-600">Hållbara Material</div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Lamp Showcase */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta opacity-10 rounded-full -mr-16 -mt-16"></div>

              <div className="space-y-6 text-center">
                <h3 className="text-2xl font-bold">Utvalda Kollektioner</h3>
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-brand-terracotta to-brand-ochre rounded-full flex items-center justify-center shadow-lg transition-all duration-700">
                    <div className="text-white text-6xl">
                      {featuredLamps[currentLamp].icon}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-brand-terracotta">
                    Handgjord
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold text-brand-terracotta">
                    {featuredLamps[currentLamp].name}
                  </h4>
                  <p className="text-gray-600 italic">
                    {featuredLamps[currentLamp].description}
                  </p>
                  <div className="text-sm text-gray-500">
                    Tillverkas för hand i Sverige
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={scrollToProducts}
                    className="flex-1 bg-brand-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Se Alla Lampor
                  </button>
                  <button
                    onClick={scrollToContact}
                    className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Boka Visning
                  </button>
                </div>

                {/* Lamp indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {featuredLamps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentLamp(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentLamp ? 'bg-brand-terracotta' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          from { box-shadow: 0 0 20px rgba(185, 123, 94, 0.3); }
          to { box-shadow: 0 0 40px rgba(185, 123, 94, 0.6); }
        }
      `}</style>
    </section>
  )
}

export default Hero