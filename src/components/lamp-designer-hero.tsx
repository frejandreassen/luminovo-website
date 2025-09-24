'use client';

import { useState } from 'react';

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
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 hero-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Huvudrubrik */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-black leading-tight mb-4">
              Designa Din Egen Lampa
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 mb-2">
              AI-designade, handgjorda lampor som ger unik värme och elegans till ditt hem.
            </p>
            <p className="text-md text-gray-600 max-w-xl mx-auto">
              Beskriv din drömlampa och se den bli verklighet på sekunder.
            </p>
          </div>

          {/* Design interface - Centrerad */}
          <div className="flex flex-col items-center">
            {/* Centrerad prompt box */}
            <div className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="mb-6">
                <label htmlFor="prompt" className="block text-sm font-medium text-brand-black mb-2">
                  Beskriv din drömlampa
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="T.ex. 'Minimalistisk med organiska kurvor' eller 'Art Deco-inspirerad med geometriska mönster'"
                  className="w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-brand-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-terracotta min-h-[100px]"
                  rows={3}
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Behöver du inspiration? Prova dessa:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      className="px-4 py-2 bg-brand-sand rounded-full text-sm hover:bg-brand-terracotta hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-brand-black text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Genererar din design...
                  </span>
                ) : (
                  'Skapa Design'
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Varje lampa är unik och tillverkas på beställning med hållbara material.
                  Leveranstid: 2-3 veckor.
                </p>
              </div>
            </div>

            {/* Genererad bild - centrerad under prompt-boxen */}
            {generatedImage && (
              <div className="mt-8 w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={generatedImage}
                      alt="Din anpassade lampdesign"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-brand-black mb-3">
                      Din Unika Design
                    </h3>
                    {imageDetails.style && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Stil:</span> {imageDetails.style}
                      </p>
                    )}
                    {imageDetails.environment && (
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Miljö:</span> {imageDetails.environment}
                      </p>
                    )}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-brand-black text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition-all text-sm">
                        Beställ Nu
                      </button>
                      <button className="flex-1 bg-brand-sand text-brand-black font-semibold py-2 px-4 rounded-full hover:bg-opacity-80 transition-all text-sm">
                        Spara Design
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <a
              href="#collection"
              className="inline-block text-brand-terracotta font-semibold hover:text-opacity-80 transition-colors"
            >
              Eller utforska vår befintliga kollektion →
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-brand-sand to-transparent"></div>
    </section>
  );
}