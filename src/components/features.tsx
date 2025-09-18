'use client'

import React from 'react'

const features = [
  {
    title: 'Neural Style Transfer',
    description: 'Advanced AI analyzes millions of design patterns to create truly unique combinations.',
  },
  {
    title: 'Real-time 3D Rendering',
    description: 'See your design come to life instantly with photorealistic rendering and materials.',
  },
  {
    title: 'AR Integration',
    description: 'Preview your lamp in your actual space using augmented reality technology.',
  },
  {
    title: 'Smart Manufacturing',
    description: 'Direct-to-production pipeline ensures quality and reduces waste through precision automation.',
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
              Technology That
              <span className="text-brand-terracotta block">Understands You</span>
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-brand-terracotta rounded-full flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
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
                  <h3 className="text-xl font-bold mb-4">Live Design Process</h3>
                  <div className="bg-gray-900 rounded-xl p-4 text-left">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="font-mono text-sm text-green-400 space-y-1">
                      <div>$ luminovo.ai --generate</div>
                      <div className="text-gray-400">Analyzing style preferences...</div>
                      <div className="text-gray-400">Generating 3D model...</div>
                      <div className="text-gray-400">Optimizing materials...</div>
                      <div className="text-green-400">✓ Design complete!</div>
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