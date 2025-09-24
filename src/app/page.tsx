// app/page.tsx
import LampDesignerHero from '@/components/lamp-designer-hero';
import { Gallery } from '@/components/gallery';

export default function Home() {
  return (
    <>
      {/* Header är nu en del av layout.tsx, men om du vill ha den här för att följa HTML-strukturen kan du lägga den här. 
          För bästa praxis i Next.js (t.ex. delad header på flera sidor), hör den hemma i layout.tsx.
          Vi lägger till den här för att exakt matcha din HTML-förfrågan för en enskild sida. */}
      <header className="absolute top-0 left-0 right-0 z-20 py-6 px-4 sm:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 20 C70 20, 80 30, 80 40 C80 50, 70 60, 60 60 C50 60, 40 50, 40 40 C40 30, 50 20, 60 20 Z M60 60 L60 85 M50 85 L70 85 M52 90 L68 90 M55 95 L65 95"
                stroke="var(--brand-black)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round" />
              <g stroke="var(--brand-terracotta)" strokeWidth="1.5" opacity="0.8">
                <path d="M60 15 L60 5" />
                <path d="M85 40 L95 40" />
                <path d="M25 40 L35 40" />
                <path d="M77 23 L84 16" />
                <path d="M43 23 L36 16" />
                <path d="M77 57 L84 64" />
                <path d="M43 57 L36 64" />
              </g>
            </svg>
            <span className="text-2xl font-semibold tracking-widest">Luminovo</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a className="hover:text-brand-terracotta transition-colors" href="#philosophy">Filosofi</a>
            <a className="hover:text-brand-terracotta transition-colors" href="#collection">Kollektion</a>
            <a className="hover:text-brand-terracotta transition-colors" href="#sustainability">Hållbarhet</a>
            <a className="hover:text-brand-terracotta transition-colors" href="#contact">Kontakt</a>
          </nav>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section with Lamp Designer */}
        <LampDesignerHero />

        {/* Philosophy Section */}
        <section className="py-20 sm:py-32" id="philosophy">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-white rounded-xl shadow-2xl transform -rotate-2"></div>
                <div className="absolute inset-0 bg-cover bg-center rounded-xl shadow-inner transform rotate-1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDV4o_B9X5b_KP9CMfPx4POJotFLAA_JtKYPhakMsp2hcKQjb2GzAFDFSMsXYrppF5C20PW0PNijrFus-265LEvYhSHXISvSJnKFzSmJn1yi7x5-cTOaxziee6Tyx1OGda0JFp-hYlOYhhhVqbxqTlydCaeSG7zVHZEEHRMsgDw52GpgRjvwMdIWcazeIX8t5syyZDkH9gM35dCwv1-JjIwchucn5naDu64iIZCGe1UlmhIQH9-KIC2Ac8aAQNmkW58z-rPquZMGtPn')" }}>
                  <div className="absolute inset-0 bg-brand-sand opacity-30 mix-blend-multiply rounded-xl"></div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-semibold text-brand-black">Där skandinavisk design möter framtiden.</h2>
                <p className="text-gray-700 leading-relaxed">Varje Luminovo-lampa är mer än bara en ljuskälla; det är ett unikt konstverk. Vår innovativa process kombinerar artificiell intelligens kreativitet med mänsklig hantverksprecision, vilket resulterar i organiska former som är både tidlösa och moderna.</p>
                <p className="text-gray-700 leading-relaxed">Vi tror på <span className="font-semibold text-brand-terracotta">tillgänglig lyx</span> — högklassig design som känns varm, inkluderande och djupt personlig.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section - New AI Generated Lamps */}
        <Gallery />

        


        {/* Sustainability Section */}
        <section className="py-20 sm:py-32 bg-brand-sand" id="sustainability">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6 md:order-2">
                <h2 className="text-3xl lg:text-4xl font-semibold text-brand-black">Hållbar lyx för det moderna hemmet.</h2>
                <p className="text-gray-700 leading-relaxed">Vi är engagerade i att skapa vackra föremål som är snälla mot vår planet. Våra lampor är tillverkade av återvunna och ansvarsfullt framtagna material, och vår on-demand produktionsprocess minimerar avfall.</p>
                <p className="text-gray-700 leading-relaxed">Belys ditt hem med stolthet, i vetskapen om att ditt val stödjer en mer hållbar framtid.</p>
                <a className="inline-block text-brand-terracotta font-semibold group" href="#">
                  Läs mer om våra material
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
              <div className="relative h-96 w-full md:order-1">
                <div className="absolute inset-0 bg-white rounded-xl shadow-2xl transform rotate-2"></div>
                <div className="absolute inset-0 bg-cover bg-center rounded-xl shadow-inner transform -rotate-1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDV4o_B9X5b_KP9CMfPx4POJotFLAA_JtKYPhakMsp2hcKQjb2GzAFDFSMsXYrppF5C20PW0PNijrFus-265LEvYhSHXISvSJnKFzSmJn1yi7x5-cTOaxziee6Tyx1OGda0JFp-hYlOYhhhVqbxqTlydCaeSG7zVHZEEHRMsgDw52GpgRjvwMdIWcazeIX8t5syyZDkH9gM35dCwv1-JjIwchucn5naDu64iIZCGe1UlmhIQH9-KIC2Ac8aAQNmkW58z-rPquZMGtPn')" }}>
                  <div className="absolute inset-0 bg-brand-sand opacity-30 mix-blend-multiply rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community/Contact Section */}
        <section className="bg-brand-terracotta text-brand-white" id="contact">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Gå med i Luminovo-gemenskapen</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">Var först med att se nya designer, få exklusiva erbjudanden och upptäck inspiration för medvetet boende.</p>
            <form className="max-w-md mx-auto flex">
              <input className="w-full rounded-l-full py-3 px-6 text-brand-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-ochre" placeholder="Din e-postadress" type="email" />
              <button className="bg-brand-black text-white font-semibold py-3 px-8 rounded-r-full hover:bg-gray-800 transition-colors" type="submit">Prenumerera</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-sand py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <svg className="w-6 h-6" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 20 C70 20, 80 30, 80 40 C80 50, 70 60, 60 60 C50 60, 40 50, 40 40 C40 30, 50 20, 60 20 Z M60 60 L60 85 M50 85 L70 85 M52 90 L68 90 M55 95 L65 95"
                stroke="var(--brand-black)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round" />
              <g stroke="var(--brand-terracotta)" strokeWidth="1.5" opacity="0.8">
                <path d="M60 15 L60 5" />
                <path d="M85 40 L95 40" />
                <path d="M25 40 L35 40" />
                <path d="M77 23 L84 16" />
                <path d="M43 23 L36 16" />
                <path d="M77 57 L84 64" />
                <path d="M43 57 L36 64" />
              </g>
            </svg>
            <span className="text-xl font-semibold tracking-widest text-brand-black">Luminovo</span>
          </div>
          <div className="flex justify-center space-x-6 my-4">
            <a className="hover:text-brand-black" href="https://www.instagram.com/luminovodesign/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="hover:text-brand-black" href="#">Pinterest</a>
            <a className="hover:text-brand-black" href="#">Kontakt</a>
            <a className="hover:text-brand-black" href="/terms">Allmänna villkor</a>
          </div>
          <p className="text-sm">© 2024 Luminovo. Alla rättigheter förbehållna. Stolt över tillgänglig lyx.</p>
        </div>
      </footer>
    </>
  )
}