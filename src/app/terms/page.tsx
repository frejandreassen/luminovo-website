'use client'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-sand)] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-black)] mb-12">
          Allmänna villkor
        </h1>

        <div className="prose prose-lg max-w-none text-[var(--brand-black)] space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Orderbekräftelse och leverans</h2>
            <p>
              Alla beställningar bekräftas via e-post. Leveranstid anges vid orderläggning men kan variera.
              Vi förbehåller oss rätten att justera leveranstider vid behov och meddelar kunden om eventuella förändringar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Produkttillgänglighet</h2>
            <p>
              Vi strävar efter att uppfylla alla beställningar, men förbehåller oss rätten att ställa in eller
              justera ordrar om oförutsedda omständigheter uppstår. Vid inställd order återbetalas hela beloppet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Ångerrätt och returer</h2>
            <p>
              14 dagars ångerrätt gäller för lagerprodukter enligt distansavtalslagen. Specialbeställda och
              kundanpassade produkter (3D-printade lampor efter kundens önskemål) omfattas inte av ångerrätten
              enligt lag (2005:59) om distansavtal. För lagerprodukter måste varan returneras i oskadat skick.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Ansvarsbegränsning</h2>
            <p>
              Luminovo ansvarar inte för indirekta skador eller följdskador. Vårt ansvar är begränsat till
              produktens värde. Vi förbehåller oss rätten att göra mindre ändringar i design eller specifikationer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Force Majeure</h2>
            <p>
              Luminovo ansvarar inte för försening eller utebliven leverans som beror på omständigheter utanför
              vår kontroll, såsom produktionsstörningar, materialbrist eller tekniska problem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Priser och betalning</h2>
            <p>
              Alla priser anges inklusive moms. Vi förbehåller oss rätten att justera priser utan föregående
              meddelande. Betalning sker vid orderläggning om inget annat överenskommits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Tillämplig lag</h2>
            <p>
              Svensk lag tillämpas på dessa villkor. Eventuella tvister avgörs i svensk domstol.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-[var(--brand-black)]/20">
            <p className="text-sm text-[var(--brand-black)]/70">
              Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}