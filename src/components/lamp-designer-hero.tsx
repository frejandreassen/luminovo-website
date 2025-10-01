'use client';

import { useState } from 'react';
import OrderForm from './order-form';

export default function LampDesignerHero() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageDetails, setImageDetails] = useState<{
    style?: string;
    environment?: string;
    description?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-lampshade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt: prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kunde inte generera bild');
      }

      setGeneratedImage(data.image);
      setImageDetails({
        style: data.style,
        environment: data.environment,
        description: data.description,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Något gick fel');
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestedPrompts = [
    'Minimalistisk skandinavisk',
    'Art Deco elegans',
    'Japansk washi-papper',
    'Organisk naturinspirerad',
    'Modern geometrisk',
    'Bohemisk texturerad'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-sand">
      {/* Hero bakgrundsbild med lampa - höger sida */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 hidden lg:block">
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <img
            src="/lampshade-1.png"
            alt="Luminovo lampa"
            className="w-auto h-[80vh] max-h-[700px] object-contain drop-shadow-2xl"
          />
          {/* Subtle gradient för att blanda in i bakgrunden */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-sand to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Vänster kolumn - Text och diskret input */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-black leading-tight mb-6">
                  Designa Din Egen Lampa
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                  AI-designade, handgjorda lampor som ger unik värme och elegans till ditt hem.
                </p>
              </div>

              {/* Diskret input box */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="Beskriv din drömlampa..."
                  className="w-full px-5 py-3 rounded-full border border-gray-300 bg-white text-brand-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:border-transparent shadow-sm"
                />

                {/* Förslag - diskret och kompakt */}
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.slice(0, 4).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-brand-terracotta hover:text-white hover:border-brand-terracotta transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Skapa Design-knapp med lampljus-effekt */}
                <div className="relative inline-block mt-4">
                  {/* Stark ljuseffekt bakom knappen */}
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-brand-ochre via-brand-terracotta to-brand-ochre opacity-30 blur-2xl animate-pulse"></div>

                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="relative inline-flex items-center justify-center gap-4 bg-gradient-to-br from-brand-terracotta via-brand-ochre to-brand-terracotta text-white font-bold py-6 px-12 rounded-full hover:shadow-[0_0_40px_rgba(230,160,93,0.6)] transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-[0_10px_40px_rgba(185,123,94,0.4)] border-2 border-white/20"
                  >
                    {/* Lampikon med spotlight-effekt */}
                    {!isGenerating && (
                      <svg
                        className="w-7 h-7 drop-shadow-lg"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Lampkropp */}
                        <path
                          d="M12 2L12 6M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6ZM12 12L12 18M10 18H14M10.5 20H13.5"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Ljusstrålar */}
                        <path
                          d="M12 9L12 15M7 9L17 9M8.5 6.5L15.5 11.5M15.5 6.5L8.5 11.5"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          opacity="1"
                          className="animate-pulse"
                        />
                      </svg>
                    )}

                    <span className="text-xl tracking-wide">
                      {isGenerating ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Skapar din lampa...
                        </span>
                      ) : (
                        'Skapa Design'
                      )}
                    </span>
                  </button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Call to action */}
              <div className="pt-2">
                <a
                  href="#collection"
                  className="inline-flex items-center text-brand-terracotta font-semibold hover:text-opacity-80 transition-colors group"
                >
                  Eller utforska vår kollektion
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Höger kolumn - Tom för att låta bakgrundsbilden synas */}
            <div className="hidden md:block"></div>
          </div>

          {/* Genererad bild - visas som overlay/modal */}
          {generatedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
              onClick={() => setGeneratedImage(null)}
            >
              <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setGeneratedImage(null)}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
                  type="button"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={generatedImage}
                      alt="Din anpassade lampdesign"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
                      Din Unika Design
                    </h3>
                    {imageDetails.style && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Stil:</span> {imageDetails.style}
                      </p>
                    )}
                    {imageDetails.environment && (
                      <p className="text-sm text-gray-600 mb-6">
                        <span className="font-semibold">Miljö:</span> {imageDetails.environment}
                      </p>
                    )}
                    <button
                      onClick={() => setIsOrderFormOpen(true)}
                      className="w-full text-white font-semibold py-3 px-6 rounded-full transition-all"
                      style={{ backgroundColor: '#1a1a1a' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                      type="button"
                    >
                      Beställ Nu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Form Modal */}
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        lampDetails={{
          imageUrl: generatedImage || undefined,
          style: imageDetails.style,
          environment: imageDetails.environment,
          description: 'Anpassad AI-design',
          isCustom: true,
        }}
      />
    </section>
  );
}