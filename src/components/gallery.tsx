import Image from 'next/image'

const products = [
  { id: 1, src: '/lampshade-1.png', alt: 'Geometrisk mesh-lampskärm' },
  { id: 2, src: '/lampshade-2.png', alt: 'Organisk gitterlampa' },
  { id: 3, src: '/lampshade-3.png', alt: 'Naturinspirerad mönsterlampa' },
  { id: 4, src: '/lampshade-4.png', alt: 'Elegant bordslampskärm' },
  { id: 5, src: '/lampshade-5.png', alt: 'Skandinavisk designlampa' },
]

export function Gallery() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 tracking-wide">Våra Kreationer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Varje lampa är 3D-printad med omsorg för att skapa unika ljusmönster
            som förvandlar ditt hem till en oas av lugn och elegans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-light text-gray-800">{product.alt}</h3>
              <p className="text-sm text-gray-500">Från 2.495 kr</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}