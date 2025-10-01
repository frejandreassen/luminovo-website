'use client';

import { useState, useEffect } from 'react';
import OrderForm from './order-form';

interface Model3D {
  taskId: string;
  status: string;
  progress: number;
  modelUrls?: {
    glb?: string;
    fbx?: string;
    obj?: string;
    usdz?: string;
  };
  thumbnailUrl?: string;
}

export default function LampDesignerHero() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isIsolating, setIsIsolating] = useState(false);
  const [isGenerating3D, setIsGenerating3D] = useState(false);
  const [progress3D, setProgress3D] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isolatedImage, setIsolatedImage] = useState<string | null>(null);
  const [model3D, setModel3D] = useState<Model3D | null>(null);
  const [imageDetails, setImageDetails] = useState<{
    style?: string;
    environment?: string;
    description?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Progress simulering för 3D-generering (0-99% över ~3 minuter)
  useEffect(() => {
    if (!isGenerating3D) {
      setProgress3D(0);
      return;
    }

    // Starta från 5% direkt
    setProgress3D(5);

    // Simulera progress: öka från 5% till 99% över 180 sekunder
    const totalTime = 180000; // 3 minuter
    const intervalTime = 1000; // uppdatera varje sekund
    const progressIncrement = (99 - 5) / (totalTime / intervalTime);

    const interval = setInterval(() => {
      setProgress3D((prev) => {
        const next = prev + progressIncrement;
        return next >= 99 ? 99 : next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isGenerating3D]);

  // STEG 1: Generera miljöbild
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // Resetta ALLT state för ny generering
    setIsGenerating(true);
    setIsIsolating(false);
    setIsGenerating3D(false);
    setError(null);
    setGeneratedImage(null);
    setIsolatedImage(null);
    setModel3D(null);

    try {
      const response = await fetch('/api/generate-lampshade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: prompt,
          generate3D: false
        }),
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

      // STEG 2: Automatiskt isolera lampskärmen
      handleIsolate(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Något gick fel');
    } finally {
      setIsGenerating(false);
    }
  };

  // STEG 2: Isolera lampskärmen (automatiskt efter steg 1)
  const handleIsolate = async (sceneImage: string) => {
    setIsIsolating(true);

    try {
      const response = await fetch('/api/isolate-lamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: sceneImage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kunde inte isolera lampkomponent');
      }

      setIsolatedImage(data.image);
    } catch (err) {
      console.error('Kunde inte isolera lampkomponent:', err);
      // Visa inte error till användaren, det är en nice-to-have feature
    } finally {
      setIsIsolating(false);
    }
  };

  // STEG 3: Skapa 3D-modell (manuellt via knapp)
  const handleGenerate3D = async () => {
    if (!isolatedImage) return;

    setIsGenerating3D(true);
    setError(null);

    try {
      const response = await fetch('/api/convert-to-3d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: isolatedImage,
          waitForCompletion: true
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kunde inte skapa 3D-modell');
      }

      console.log('🎲 3D Model Response:', data);
      console.log('   Task ID:', data.taskId);
      console.log('   Status:', data.status);
      console.log('   Model URLs:', data.modelUrls);
      console.log('   GLB URL:', data.modelUrls?.glb);

      setProgress3D(100);
      setModel3D(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte skapa 3D-modell');
    } finally {
      setIsGenerating3D(false);
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

            {/* Genererade bilder och 3D-modeller */}
            {generatedImage && (
              <div className="mt-8 w-full max-w-2xl space-y-6">
                {/* Miljöbild */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
                  </div>
                </div>

                {/* Isolerad lampkomponent */}
                {(isolatedImage || isIsolating) && (
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {isIsolating ? (
                      <div className="aspect-square bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="animate-spin h-12 w-12 text-brand-terracotta mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <p className="text-gray-600">Isolerar lampskärm...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-square bg-gray-50">
                        <img
                          src={isolatedImage!}
                          alt="Isolerad lampkomponent för 3D-printing"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-brand-black mb-3">
                        3D-Printbar Komponent
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Isolerad lampskärm redo för 3D-konvertering
                      </p>

                      {isolatedImage && !model3D && !isGenerating3D && (
                        <button
                          onClick={handleGenerate3D}
                          className="w-full font-semibold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
                          style={{
                            backgroundColor: '#b97b5e',
                            color: 'white'
                          }}
                        >
                          🎲 Skapa 3D-Modell
                        </button>
                      )}

                      {isGenerating3D && (
                        <div className="w-full">
                          <div className="bg-brand-sand/30 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-brand-black">Skapar 3D-modell...</span>
                              <span className="text-sm font-semibold text-brand-terracotta">{Math.round(progress3D)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-brand-terracotta h-full rounded-full transition-all duration-1000 ease-linear"
                                style={{
                                  width: `${progress3D}%`
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                              Meshy AI konverterar din lampskärm till en 3D-modell. Detta tar normalt 2-3 minuter.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3D-modell preview */}
                {model3D && model3D.status === 'SUCCEEDED' && (
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 pb-0">
                      <h3 className="text-xl font-semibold text-brand-black mb-2">
                        Din 3D-Modell 🎉
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Rotera och zooma med musen eller touch
                      </p>
                    </div>

                    {/* 3D Preview med model-viewer */}
                    {model3D.modelUrls?.glb ? (
                      <div className="bg-gradient-to-b from-gray-50 to-gray-100" style={{height: '500px'}}>
                        <model-viewer
                          src={`/api/proxy-glb?url=${encodeURIComponent(model3D.modelUrls.glb)}`}
                          alt="3D-modell av lampskärm"
                          auto-rotate
                          camera-controls
                          shadow-intensity="1"
                          environment-image="neutral"
                          exposure="1"
                          style={{width: '100%', height: '100%'}}
                        ></model-viewer>
                      </div>
                    ) : model3D.thumbnailUrl ? (
                      <div className="aspect-square bg-gray-50 flex items-center justify-center">
                        <img
                          src={model3D.thumbnailUrl}
                          alt="3D-modell förhandsgranskning"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-gray-50 flex items-center justify-center p-8">
                        <div className="text-center">
                          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <p className="text-gray-600 text-sm">3D-modell genererad</p>
                          <p className="text-gray-500 text-xs mt-2">Inget format tillgängligt för visning</p>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="p-4 bg-brand-sand/50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>✨ Din lampskärm är redo!</strong><br/>
                          <span className="text-xs text-gray-600">
                            3D-modellen skickas automatiskt till vårt 3D-printföretag när du beställer.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOrderFormOpen(true)}
                    className="flex-1 bg-brand-black text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition-all text-sm"
                  >
                    Beställ Nu
                  </button>
                  <button className="flex-1 bg-brand-sand text-brand-black font-semibold py-2 px-4 rounded-full hover:bg-opacity-80 transition-all text-sm">
                    Spara Design
                  </button>
                </div>
              </div>
            )}
          </div>
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