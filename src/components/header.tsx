'use client'

import React, { useState, useEffect } from 'react'
import { Logotype } from './logo'

interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
        : 'bg-transparent'
    } ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logotype size="md" variant="color" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-brand-terracotta transition-colors duration-200 font-medium"
            >
              Lampor
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-brand-terracotta transition-colors duration-200 font-medium"
            >
              Kollektioner
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-brand-terracotta transition-colors duration-200 font-medium"
            >
              Kontakt
            </button>
            <button className="bg-brand-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium">
              Boka Visning
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-terracotta hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-terracotta"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-b border-gray-200">
            <button
              onClick={() => scrollToSection('products')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-terracotta hover:bg-gray-50 rounded-md w-full text-left"
            >
              Lampor
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-terracotta hover:bg-gray-50 rounded-md w-full text-left"
            >
              Kollektioner
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-terracotta hover:bg-gray-50 rounded-md w-full text-left"
            >
              Kontakt
            </button>
            <div className="px-3 py-2">
              <button className="w-full bg-brand-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium">
                Boka Visning
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header