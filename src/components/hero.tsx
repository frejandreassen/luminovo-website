'use client'

import React, { useState, useEffect } from 'react'
import { Logo } from './logo'

const styles = [
  {
    id: 'minimalistic',
    name: 'Minimalistic',
    description: 'Clean & Simple',
    gradient: 'from-gray-100 to-gray-200',
    shape: 'w-8 h-12 bg-white rounded-sm',
  },
  {
    id: 'organic',
    name: 'Organic',
    description: 'Nature Inspired',
    gradient: 'from-green-100 to-green-200',
    shape: 'w-10 h-10 bg-green-300 rounded-full',
  },
  {
    id: 'geometric',
    name: 'Geometric',
    description: 'Bold & Angular',
    gradient: 'from-blue-100 to-blue-200',
    shape: 'w-6 h-6 bg-blue-400 transform rotate-45',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    description: 'Raw & Authentic',
    gradient: 'from-gray-300 to-gray-400',
    shape: 'w-8 h-8 bg-gray-600 rounded-sm',
  },
]

interface HeroProps {
  className?: string
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const nextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
      // Animate progress bar
      setTimeout(() => setProgress(100), 100)

      // Auto advance to step 3 after 3 seconds
      setTimeout(() => {
        setCurrentStep(3)
      }, 3000)

      // Auto restart after 8 seconds
      setTimeout(() => {
        restartDemo()
      }, 11000)
    }
  }

  const restartDemo = () => {
    setCurrentStep(1)
    setSelectedStyle(null)
    setProgress(0)
  }

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)
    setTimeout(() => {
      nextStep()
    }, 500)
  }

  const scrollToDemo = () => {
    const demoElement = document.getElementById('demo-container')
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' })
      if (currentStep !== 1) {
        restartDemo()
      }
    }
  }

  // Auto-start demo periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep === 1 && !selectedStyle) {
        handleStyleSelect('minimalistic')
      }
    }, 15000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, selectedStyle])

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
                Design Your
                <span className="text-brand-terracotta block">Perfect Lamp</span>
                in 3 Minutes
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Revolutionary AI Design Studio creates unique, personalized lighting that matches your exact vision. From concept to creation in minutes, not months.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToDemo}
                className="bg-brand-terracotta text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-lg"
                style={{
                  boxShadow: '0 0 20px rgba(185, 123, 94, 0.3)',
                  animation: 'pulse-glow 2s ease-in-out infinite alternate'
                }}
              >
                Start Designing →
              </button>
              <button className="border-2 border-brand-black text-brand-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-black hover:text-white transition-all">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-terracotta">3min</div>
                <div className="text-sm text-gray-600">Average Design Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-terracotta">10k+</div>
                <div className="text-sm text-gray-600">Unique Designs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-terracotta">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta opacity-10 rounded-full -mr-16 -mt-16"></div>

              <div id="demo-container">
                {/* Step 1: Style Selection */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-2xl font-bold text-center">Choose Your Style</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {styles.map((style) => (
                        <div
                          key={style.id}
                          onClick={() => handleStyleSelect(style.id)}
                          className={`bg-gray-50 p-4 rounded-xl cursor-pointer border-2 transition-all transform hover:scale-105 hover:shadow-md ${
                            selectedStyle === style.id
                              ? 'border-brand-terracotta'
                              : 'border-transparent hover:border-brand-terracotta'
                          }`}
                        >
                          <div className={`w-full h-24 bg-gradient-to-br ${style.gradient} rounded-lg mb-3 flex items-center justify-center`}>
                            <div className={style.shape}></div>
                          </div>
                          <h4 className="font-semibold">{style.name}</h4>
                          <p className="text-sm text-gray-600">{style.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: AI Generation */}
                {currentStep === 2 && (
                  <div className="space-y-6 text-center animate-fadeIn">
                    <h3 className="text-2xl font-bold">AI Generating Your Design</h3>
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto bg-brand-terracotta rounded-full flex items-center justify-center">
                        <Logo
                          width={48}
                          height={48}
                          variant="light"
                          className="animate-spin"
                          style={{ animationDuration: '4s' }}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-brand-terracotta h-full transition-all duration-[2000ms] ease-in-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-brand-terracotta rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-brand-terracotta rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-brand-terracotta rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <p className="text-gray-600">Analyzing your preferences...</p>
                    </div>
                  </div>
                )}

                {/* Step 3: 360° Preview */}
                {currentStep === 3 && (
                  <div className="space-y-6 text-center animate-fadeIn">
                    <h3 className="text-2xl font-bold">Your Custom Design</h3>
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                      <div className="w-48 h-48 mx-auto bg-gradient-to-br from-brand-terracotta to-brand-ochre rounded-full flex items-center justify-center shadow-lg">
                        <div className="text-white text-6xl">💡</div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-brand-terracotta">
                        360° View
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Price:</span>
                        <span className="text-xl font-bold text-brand-terracotta">€540</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Delivery:</span>
                        <span>2-3 weeks</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-brand-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors">
                        Order Now
                      </button>
                      <button className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                        AR Preview
                      </button>
                    </div>
                  </div>
                )}
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}

export default Hero