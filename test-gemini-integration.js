// Test script för att verifiera Gemini Flash 2.5 integration
// Kör med: node test-gemini-integration.js

import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testPromptOptimization() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const userPrompt = "Minimalistisk skandinavisk med naturliga element";

  const promptTemplate = `Du är en expert på att skapa detaljerade bildprompter för AI-genererade lampdesigner.

ANVÄNDARENS ÖNSKAN: "${userPrompt}"

MALL FÖR LAMPDESIGN:
- Elegant 3D-printed table lampshade
- Maximum 40cm height and 30cm width
- Designed for E27 socket mounting system with integrated fixture attachment ring at base
- Photographed on oak side table
- Scandinavian minimalist interior
- Warm 2700K light emanating through translucent white biodegradable filament
- Professional product photography, soft natural lighting

TILLGÄNGLIGA STILAR ATT VÄLJA FRÅN ELLER KOMBINERA:
organic lattice, geometric mesh, nature-inspired pattern, minimalist grid, Art Deco inspired, Japanese washi paper texture

Baserat på användarens önskan ovan, skapa en detaljerad och kreativ bildprompt som:
1. Tolkar och inkorporerar användarens önskan på ett meningsfullt sätt
2. Väljer och kombinerar lämpliga stilar från listan
3. Lägger till specifika designdetaljer som passar användarens vision
4. Behåller alla tekniska specifikationer från mallen
5. Skapar en sammanhängande och visuellt tilltalande beskrivning

Svara ENDAST med den färdiga bildprompten på engelska, inget annat. Prompten ska vara en enda mening/paragraf.`;

  try {
    console.log('🔄 Testing Gemini Flash 2.5 prompt optimization...\n');
    console.log('User input:', userPrompt);
    console.log('\n📝 Sending to Gemini Flash 2.5...\n');

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config,
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: promptTemplate,
            },
          ],
        },
      ],
    });

    console.log('Response structure:', JSON.stringify(response, null, 2).substring(0, 500));
    const optimizedPrompt = response.response?.text?.() ||
                            response.candidates?.[0]?.content?.parts?.[0]?.text ||
                            'Error extracting text';

    console.log('✅ Optimized prompt received:\n');
    console.log(optimizedPrompt);
    console.log('\n---');
    console.log('This prompt would then be sent to gemini-2.5-flash-image-preview for image generation.');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testPromptOptimization();