'use client';

import { useState, FormEvent, useEffect } from 'react';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  lampDetails?: {
    imageUrl?: string;
    description?: string;
    style?: string;
    environment?: string;
    isCustom?: boolean;
  };
}

export default function OrderForm({ isOpen, onClose, lampDetails }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [priceReasoning, setPriceReasoning] = useState<string>('');
  const [isEstimatingPrice, setIsEstimatingPrice] = useState(false);

  // Hämta prisuppskattning när formuläret öppnas
  useEffect(() => {
    const fetchPriceEstimate = async () => {
      if (!isOpen || !lampDetails?.imageUrl) return;

      setIsEstimatingPrice(true);
      try {
        const response = await fetch('/api/estimate-price', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: lampDetails?.imageUrl,
            description: lampDetails?.description,
            style: lampDetails?.style,
            environment: lampDetails?.environment,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setEstimatedPrice(data.price);
          setPriceReasoning(data.reasoning);
        } else {
          // Fallback till standardpris
          setEstimatedPrice(3495);
          setPriceReasoning('Standardpris baserat på medium komplexitet');
        }
      } catch (error) {
        console.error('Price estimation error:', error);
        setEstimatedPrice(3495);
        setPriceReasoning('Standardpris baserat på medium komplexitet');
      } finally {
        setIsEstimatingPrice(false);
      }
    };

    fetchPriceEstimate();
  }, [isOpen, lampDetails?.imageUrl, lampDetails?.description, lampDetails?.style, lampDetails?.environment]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lampDetails: {
            ...lampDetails,
            estimatedPrice,
            priceReasoning,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Tack för din beställning! Vi kontaktar dig inom kort med betalningsinformation.');
        setMessageType('success');

        // Rensa formuläret
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          postalCode: '',
          notes: '',
        });

        // Stäng modalen efter 3 sekunder
        setTimeout(() => {
          onClose();
          setMessage('');
        }, 3000);
      } else {
        setMessage(data.error || 'Något gick fel. Försök igen.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Ett fel uppstod. Försök igen senare.');
      setMessageType('error');
      console.error('Order error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-brand-sand p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-brand-black mb-2">Beställ Din Lampa</h2>
            <p className="text-sm text-gray-600">
              Fyll i dina uppgifter så kontaktar vi dig med betalningsinformation.
            </p>
          </div>

          {/* Lamp preview */}
          {lampDetails?.imageUrl && (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={lampDetails.imageUrl}
                  alt="Din lampa"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold text-brand-black">
                    {lampDetails.isCustom ? 'Anpassad design' : lampDetails.description}
                  </p>
                  {lampDetails.style && (
                    <p className="text-sm text-gray-600">Stil: {lampDetails.style}</p>
                  )}

                  {/* Prisuppskattning */}
                  <div className="mt-2">
                    {isEstimatingPrice ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-brand-terracotta" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm text-gray-600">Beräknar pris...</span>
                      </div>
                    ) : estimatedPrice ? (
                      <div>
                        <p className="text-lg font-bold text-brand-terracotta">
                          {estimatedPrice.toLocaleString('sv-SE')} kr
                        </p>
                        {priceReasoning && (
                          <p className="text-xs text-gray-500 mt-1">{priceReasoning}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-brand-terracotta">
                        Från 2.495 kr
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-1">
                  Namn *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-1">
                  E-post *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-1">
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-brand-black mb-1">
                Leveransadress *
              </label>
              <input
                type="text"
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-brand-black mb-1">
                  Postnummer *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-brand-black mb-1">
                  Ort *
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-brand-black mb-1">
                Meddelande (valfritt)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="T.ex. önskemål om färg, storlek eller andra detaljer..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${
                  messageType === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {message}
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-all"
              >
                Avbryt
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 font-semibold py-3 px-6 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isSubmitting ? '#4b5563' : '#1a1a1a',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#374151')}
                onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#1a1a1a')}
              >
                {isSubmitting ? 'Skickar...' : 'Skicka Beställning'}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center pt-2">
              Efter att du skickat beställningen får du ett email med betalningsinformation.
              Leveranstid: 2-3 veckor från betalning.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
