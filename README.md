# Luminovo Website

A modern, responsive website for Luminovo - an AI-powered design studio that creates custom lighting in minutes. Built with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## 🌟 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS v4
- **AI Design Studio**: Interactive demo showing the 3-minute lamp design process
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Scandinavian Aesthetic**: Clean, minimalist design with custom color palette
- **Interactive Components**: Smooth animations and hover effects
- **Optimized Performance**: Fast loading with Next.js optimizations
- **Accessibility**: WCAG compliant with semantic HTML

## 🎨 Design System

### Colors
- **Brand Sand**: #f1e9e0 (Primary background)
- **Brand Black**: #1a1a1a (Text and accents)
- **Brand Terracotta**: #b97b5e (Primary accent)
- **Brand Ochre**: #E6A05D (Secondary accent)

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Home page component
├── components/
│   ├── header.tsx           # Navigation header with mobile menu
│   ├── hero.tsx             # Hero section with interactive demo
│   ├── how-it-works.tsx     # 3-step process explanation
│   ├── features.tsx         # Technology features section
│   ├── pricing.tsx          # Pricing tiers display
│   ├── contact.tsx          # Contact info and newsletter signup
│   ├── footer.tsx           # Site footer with links
│   └── logo.tsx             # SVG logo component with variants
```

## 🎯 Key Components

### Interactive Demo
The hero section features an interactive 3-step demo:
1. **Style Selection**: Choose from 4 design categories
2. **AI Generation**: Animated progress showing AI at work
3. **360° Preview**: Final design with pricing and AR preview

### Responsive Navigation
- Sticky header with scroll detection
- Mobile hamburger menu
- Smooth scrolling to sections
- Dynamic styling based on scroll position

### Email Subscription
- Form validation with loading states
- Success/error feedback
- Privacy-conscious design

## 🛠 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Technical Decisions

### Next.js 15 with App Router
- Server Components for better performance
- Client Components for interactivity
- Optimized font loading with next/font

### Tailwind CSS v4
- New @theme directive for configuration
- Custom CSS variables for brand colors
- Responsive utility classes

### shadcn/ui Integration
- Pre-configured component library
- Consistent design system
- Accessible components

## 📱 Responsive Design

The site is fully responsive with:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Optimized touch interactions

## 🎨 Animations

- CSS transitions for hover effects
- Keyframe animations for the AI demo
- Smooth scrolling navigation
- Loading states and micro-interactions

## 🔍 SEO & Performance

- Optimized metadata and Open Graph tags
- Next.js Image optimization
- Font display optimization
- Semantic HTML structure

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
