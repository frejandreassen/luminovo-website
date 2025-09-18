'use client'

import React from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  showRays?: boolean
  variant?: 'light' | 'dark' | 'color'
  style?: React.CSSProperties
}

export const Logo: React.FC<LogoProps> = ({
  width = 60,
  height = 60,
  className = '',
  showRays = true,
  variant = 'color',
  style
}) => {
  const getStrokeColor = () => {
    switch (variant) {
      case 'light':
        return '#f1e9e0'
      case 'dark':
        return '#1a1a1a'
      case 'color':
      default:
        return '#1a1a1a'
    }
  }

  const getRayColor = () => {
    switch (variant) {
      case 'light':
        return '#E6A05D'
      case 'dark':
        return '#E6A05D'
      case 'color':
      default:
        return '#b97b5e'
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      className={className}
      style={style}
      fill="none"
    >
      {/* Main lamp shape */}
      <path
        d="M60 20 C70 20, 80 30, 80 40 C80 50, 70 60, 60 60 C50 60, 40 50, 40 40 C40 30, 50 20, 60 20 Z M60 60 L60 85 M50 85 L70 85 M52 90 L68 90 M55 95 L65 95"
        stroke={getStrokeColor()}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glow rays */}
      {showRays && (
        <g stroke={getRayColor()} strokeWidth="1.5" opacity="0.8">
          <path d="M60 15 L60 5"/>
          <path d="M85 40 L95 40"/>
          <path d="M25 40 L35 40"/>
          <path d="M77 23 L84 16"/>
          <path d="M43 23 L36 16"/>
          <path d="M77 57 L84 64"/>
          <path d="M43 57 L36 64"/>
        </g>
      )}
    </svg>
  )
}

interface LogotypeProps {
  className?: string
  variant?: 'light' | 'dark' | 'color'
  size?: 'sm' | 'md' | 'lg'
}

export const Logotype: React.FC<LogotypeProps> = ({
  className = '',
  variant = 'color',
  size = 'md'
}) => {
  const getTextColor = () => {
    switch (variant) {
      case 'light':
        return 'text-brand-sand'
      case 'dark':
        return 'text-brand-black'
      case 'color':
      default:
        return 'text-brand-black'
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-lg'
      case 'md':
        return 'text-2xl'
      case 'lg':
        return 'text-3xl'
      default:
        return 'text-2xl'
    }
  }

  const logoSize = size === 'sm' ? 24 : size === 'md' ? 32 : 40

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo
        width={logoSize}
        height={logoSize}
        variant={variant}
        showRays={false}
      />
      <span className={`font-light tracking-wide lowercase ${getSizeClass()} ${getTextColor()}`}>
        luminovo
      </span>
    </div>
  )
}

export default Logo