'use client'

import React from 'react'

const steps = [
  {
    number: 1,
    title: 'Choose Style',
    description: 'Select from our curated style categories or describe your vision. Our AI understands aesthetic preferences and spatial requirements.',
  },
  {
    number: 2,
    title: 'AI Generation',
    description: 'Advanced neural networks create unique designs based on your preferences, room dimensions, and lighting needs in real-time.',
  },
  {
    number: 3,
    title: 'Preview & Order',
    description: 'Experience your lamp in 360° view, use AR preview in your space, then order with confidence knowing exactly what you\'ll receive.',
  },
]

interface HowItWorksProps {
  className?: string
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ className = '' }) => {
  return (
    <section id="how-it-works" className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our revolutionary AI Design Studio transforms your vision into reality using cutting-edge machine learning and 3D modeling technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center space-y-6 group">
              <div className="w-16 h-16 bg-brand-terracotta rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-2xl font-bold">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks