/**
 * Test script för Gemini-baserad lampprissättning
 *
 * Kör med: node test-pricing.js <sökväg-till-bild>
 * Exempel: node test-pricing.js /Users/frej/AI\ business/luminovo-website/public/lampshade-1.png
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const PRICING_SYSTEM_PROMPT = `Du är en expert på att prissätta 3D-printade lampskärmar baserat på deras komplexitet och design.

REFERENSPRISER (utgångspunkter):
- Enkel lampskärm (minimal geometri, få detaljer): 2.495 kr
- Medium lampskärm (moderat komplexitet, organiska former): 3.495 kr
- Komplex lampskärm (intrikata detaljer, geometriska mönster, mesh): 4.495 kr
- Mycket komplex lampskärm (hög detaljrikedom, flera lager, avancerad geometri): 5.995 kr

BEDÖMNINGSKRITERIER:
1. **Geometrisk komplexitet** - Hur komplicerad är formen? Kurvor, vinklar, symmetri?
2. **Detaljnivå** - Hur många små detaljer och mönster finns det?
3. **Printtid** - Mer komplex design = längre printtid = högre kostnad
4. **Materialåtgång** - Mesh/öppna strukturer använder mindre material än solida former
5. **Svårighetsgrad** - Risk för misslyckad print ökar kostnaden

INSTRUKTIONER:
1. Analysera bilden noggrant
2. Bedöm lampans komplexitet baserat på kriterierna ovan
3. Välj ett pris från referenspriserna eller ett mellanting
4. Svara ENDAST med ett JSON-objekt i detta format:

{
  "price": 3495,
  "reasoning": "Kort motivering (1-2 meningar på svenska)",
  "complexity": "simple|medium|complex|very_complex"
}

Svara BARA med JSON, ingen annan text.`;

async function testPricing(imagePath) {
  try {
    console.log('🔍 Analyserar lampbild med Gemini Flash...\n');
    console.log('📁 Bildsökväg:', imagePath);

    // Läs bilden
    const imageBuffer = readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Initiera Gemini
    const genai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    };

    // Skicka request
    const result = await genai.models.generateContent({
      model: 'gemini-2.5-flash',
      config,
      contents: [
        {
          role: 'user',
          parts: [
            { text: PRICING_SYSTEM_PROMPT },
            {
              inlineData: {
                data: base64Image,
                mimeType: 'image/png',
              },
            },
            { text: 'Analysera denna lampskärm och bedöm dess komplexitet.' },
          ],
        },
      ],
    });

    const text = result.text || result.candidates?.[0]?.content?.parts?.[0]?.text || '';

    console.log('\n📝 Gemini-svar (rådata):');
    console.log(text);
    console.log('\n' + '='.repeat(60) + '\n');

    // Parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Kunde inte hitta JSON i svaret');
    }

    const pricing = JSON.parse(jsonMatch[0]);

    // Visa resultat
    console.log('💰 PRISUPPSKATTNING:');
    console.log('='.repeat(60));
    console.log(`Pris: ${pricing.price.toLocaleString('sv-SE')} kr`);
    console.log(`Komplexitet: ${pricing.complexity}`);
    console.log(`Motivering: ${pricing.reasoning}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Fel vid prissättning:', error.message);
    console.error(error);
  }
}

// Kör test
const imagePath = process.argv[2];

if (!imagePath) {
  console.error('❌ Ange sökväg till bild som argument');
  console.log('\nAnvändning: node test-pricing.js <sökväg-till-bild>');
  console.log('Exempel: node test-pricing.js ./public/lampshade-1.png');
  process.exit(1);
}

testPricing(imagePath);
