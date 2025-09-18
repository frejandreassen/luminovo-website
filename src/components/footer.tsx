'use client'

import React from 'react'
import { Logotype } from './logo'

const footerSections = [
  {
    title: 'Produkter',
    links: [
      { name: 'Alla lampor', href: '#products' },
      { name: 'Kollektioner', href: '#features' },
      { name: 'Galleri', href: '#' },
      { name: 'Material', href: '#' },
    ],
  },
  {
    title: 'Service',
    links: [
      { name: 'Kundservice', href: '#' },
      { name: 'Kontakt', href: '#contact' },
      { name: 'Leverans', href: '#' },
      { name: 'Returer', href: '#' },
    ],
  },
  {
    title: 'Företag',
    links: [
      { name: 'Om oss', href: '#' },
      { name: 'Hantverkare', href: '#' },
      { name: 'Hållbarhet', href: '#' },
      { name: 'Press', href: '#' },
    ],
  },
]

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className={`bg-gray-900 text-white py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Logotype variant="light" size="md" />
            <p className="text-gray-400">
              Handgjorda skandinaviska lampor som förvandlar ditt hem med varm elegans.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="hover:text-white transition-colors duration-200 text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400">
            © 2024 Luminovo. Alla rättigheter förbehållna.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Integritet
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Villkor
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer