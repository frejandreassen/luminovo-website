'use client'

import React, { useState } from 'react'

interface ContactProps {
  className?: string
}

export const Contact: React.FC<ContactProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail('')

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      const demoElement = document.getElementById('demo-container')
      if (demoElement) {
        demoElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 1000)
  }

  return (
    <>
      {/* CTA Section */}
      <section className="py-20 bg-brand-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Something
            <span className="text-brand-terracotta block">Extraordinary?</span>
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of design enthusiasts who&apos;ve discovered the future of custom lighting.
          </p>
          <button
            onClick={scrollToTop}
            className="bg-brand-terracotta text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-lg"
          >
            Start Your Design Journey
          </button>
          <div className="mt-8 text-sm text-gray-400">
            Free to explore • No commitment required • 30-day guarantee
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 bg-white ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Get in <span className="text-brand-terracotta">Touch</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Have questions about our AI design process or need help with a custom project? We&apos;re here to help bring your vision to life.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-brand-terracotta rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">hello@luminovo.se</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-brand-terracotta rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+46 8 123 456 78</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-brand-terracotta rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      Stureplan 4C<br />
                      114 35 Stockholm<br />
                      Sweden
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Newsletter Signup */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Håll dig uppdaterad</h3>
                <p className="text-gray-600">
                  Prenumerera på vårt nyhetsbrev för de senaste designtrenderna, nya kollektioner och exklusiva erbjudanden.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-postadress
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:border-transparent transition-all"
                    placeholder="Ange din e-postadress"
                    disabled={isLoading || isSubmitted}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className="w-full bg-brand-terracotta text-white py-3 rounded-full font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Prenumererar...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Prenumeration lyckades!
                    </span>
                  ) : (
                    'Prenumerera på nyhetsbrev'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Vi respekterar din integritet. Avprenumerera när som helst.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact