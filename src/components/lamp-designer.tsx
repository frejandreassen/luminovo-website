'use client';

import { useState } from 'react';

export default function LampDesigner() {
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
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.image);
      setImageDetails({
        style: data.style,
        environment: data.environment,
        description: data.description,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestedPrompts = [
    'Minimalist Scandinavian',
    'Art Deco elegance',
    'Japanese washi paper',
    'Organic nature-inspired',
    'Modern geometric',
    'Bohemian textured'
  ];

  return (
    <section className="py-20 sm:py-32 bg-white" id="designer">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-brand-black mb-4">
              Design Your Own Lamp
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use AI to create your perfect lamp design. Describe your vision and watch it come to life in seconds.
            </p>
          </div>

          <div className="bg-brand-sand rounded-2xl p-8 mb-8">
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-sm font-medium text-brand-black mb-2">
                Describe your dream lamp
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'Minimalist with organic curves' or 'Art Deco inspired with geometric patterns'"
                className="w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-brand-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-terracotta min-h-[100px]"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Need inspiration? Try one of these:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    className="px-4 py-2 bg-white rounded-full text-sm hover:bg-brand-terracotta hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-brand-terracotta text-white font-semibold py-3 px-8 rounded-full shadow-terracotta hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating your design...
                </span>
              ) : (
                'Generate Design'
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {generatedImage && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={generatedImage}
                  alt="Your custom lamp design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-brand-black mb-4">
                  Your Custom Design
                </h3>
                {imageDetails.style && (
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Style:</span> {imageDetails.style}
                  </p>
                )}
                {imageDetails.environment && (
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Environment:</span> {imageDetails.environment}
                  </p>
                )}
                <div className="flex gap-4">
                  <button className="flex-1 bg-brand-terracotta text-white font-semibold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all">
                    Save to Collection
                  </button>
                  <button className="flex-1 bg-brand-sand text-brand-black font-semibold py-3 px-6 rounded-full hover:bg-opacity-80 transition-all">
                    Share Design
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}