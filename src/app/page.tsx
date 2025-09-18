import Header from '@/components/header'
import Hero from '@/components/hero'
import Products from '@/components/products'
import Features from '@/components/features'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-sand">
      <Header />
      <main>
        <Hero />
        <Products />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
