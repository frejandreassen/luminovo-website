# AI-Baserad Prisuppskattning med Gemini Flash

Detta system använder Google Gemini Flash för att automatiskt uppskatta priset på lampor baserat på deras visuella komplexitet.

## Hur det fungerar

1. **Bildanalys**: När en kund öppnar orderformuläret skickas lampbilden till Gemini Flash
2. **AI-bedömning**: Gemini analyserar lampans komplexitet baserat på:
   - Geometrisk komplexitet
   - Detaljnivå
   - Uppskattad printtid
   - Materialåtgång
   - Svårighetsgrad
3. **Pris**: Systemet returnerar ett pris mellan 2.495-5.995 kr med motivering

## Referenspriser

- **Enkel** (2.495 kr): Minimal geometri, få detaljer
- **Medium** (3.495 kr): Moderat komplexitet, organiska former
- **Komplex** (4.495 kr): Intrikata detaljer, geometriska mönster, mesh
- **Mycket komplex** (5.995 kr): Hög detaljrikedom, flera lager, avancerad geometri

## Testa prissättningen

Använd testskriptet för att se hur Gemini bedömer olika lampor:

```bash
node test-pricing.js ./public/lampshade-1.png
```

## Directus-setup

Lägg till dessa fält i din `orders` tabell:

```
- estimated_price (integer) - AI-uppskattat pris
- price_reasoning (text) - Förklaring från AI
- lamp_image (File relation) - För uppladdade AI-bilder
```

## API Endpoints

### `/api/estimate-price` (POST)
Uppskattar pris för en lampa.

**Request:**
```json
{
  "imageUrl": "data:image/png;base64,..." eller "/lampshade-1.png",
  "description": "Beskrivning av lampan",
  "style": "Minimalistisk",
  "environment": "Vardagsrum"
}
```

**Response:**
```json
{
  "success": true,
  "price": 3495,
  "reasoning": "Medelhög komplexitet med organiska former",
  "complexity": "medium"
}
```

## Användning i frontend

Prisuppskattningen körs automatiskt när orderformuläret öppnas:

```typescript
// I OrderForm-komponenten
useEffect(() => {
  if (isOpen && lampDetails?.imageUrl) {
    fetchPriceEstimate();
  }
}, [isOpen, lampDetails?.imageUrl]);
```

## Fallback

Om Gemini-API:et misslyckas används ett standardpris på 3.495 kr.

## Kostnader

Gemini Flash är mycket billigt:
- ~0.001 USD per begäran
- ~1 kr per 1000 prisuppskattningar

## Tips

- Priserna kan justeras i `src/lib/gemini-pricing.ts`
- System-prompten kan finjusteras för att ändra bedömningskriterier
- För produktionsmiljö, överväg att cacha prisuppskattningar
