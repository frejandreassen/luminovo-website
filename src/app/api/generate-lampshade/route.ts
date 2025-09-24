import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userPrompt } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Available style options
    const styles = [
      'organic lattice',
      'geometric mesh',
      'nature-inspired pattern',
      'minimalist grid',
      'Art Deco inspired',
      'Japanese washi paper texture'
    ];

    // Available environment options
    const environments = [
      'oak side table',
      'marble console',
      'birch nightstand',
      'walnut desk',
      'white ceramic surface',
      'concrete plinth'
    ];

    // Randomly select style and environment
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
    const selectedEnvironment = environments[Math.floor(Math.random() * environments.length)];

    // STEP 1: Use Gemini Flash 2.5 to create an optimized prompt
    const promptOptimizationConfig = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    };

    const promptTemplate = `Du är en expert på att skapa detaljerade bildprompter för AI-genererade lampdesigner.

ANVÄNDARENS ÖNSKAN: "${userPrompt}"

MALL FÖR LAMPDESIGN:
- Elegant 3D-printed table lampshade
- Maximum 40cm height and 30cm width
- Designed for E27 socket mounting system with integrated fixture attachment ring at base
- Photographed on ${selectedEnvironment}
- Scandinavian minimalist interior
- Warm 2700K light emanating through translucent white biodegradable filament
- Professional product photography, soft natural lighting

TILLGÄNGLIGA STILAR ATT VÄLJA FRÅN ELLER KOMBINERA:
${styles.join(', ')}

Baserat på användarens önskan ovan, skapa en detaljerad och kreativ bildprompt som:
1. Tolkar och inkorporerar användarens önskan på ett meningsfullt sätt
2. Väljer och kombinerar lämpliga stilar från listan
3. Lägger till specifika designdetaljer som passar användarens vision
4. Behåller alla tekniska specifikationer från mallen
5. Skapar en sammanhängande och visuellt tilltalande beskrivning

Svara ENDAST med den färdiga bildprompten på engelska, inget annat. Prompten ska vara en enda mening/paragraf.`;

    const optimizationResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: promptOptimizationConfig,
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

    // Extract the optimized prompt from the response
    const result = optimizationResponse;
    const optimizedPrompt = result.text ||
                            result.candidates?.[0]?.content?.parts?.[0]?.text ||
                            `Elegant 3D-printed table lampshade with ${userPrompt} style, maximum 40cm height and 30cm width, designed for E27 socket mounting system with integrated fixture attachment ring at base, ${selectedStyle}, creating intricate shadow play when illuminated, photographed on ${selectedEnvironment}, Scandinavian minimalist interior, warm 2700K light emanating through the translucent white biodegradable filament, professional product photography, soft natural lighting`;

    console.log('User input:', userPrompt);
    console.log('Optimized prompt:', optimizedPrompt);

    // STEP 2: Generate the image using the optimized prompt

    const imageConfig = {
      responseModalities: ['IMAGE'],
    };

    const imageModel = 'gemini-2.5-flash-image-preview';
    const imageContents = [
      {
        role: 'user',
        parts: [
          {
            text: optimizedPrompt,
          },
        ],
      },
    ];

    const imageResponse = await ai.models.generateContentStream({
      model: imageModel,
      config: imageConfig,
      contents: imageContents,
    });

    let imageData: string | null = null;
    let mimeType: string = 'image/png';

    for await (const chunk of imageResponse) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        imageData = inlineData.data || '';
        mimeType = inlineData.mimeType || 'image/png';
      }
    }

    if (!imageData) {
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:${mimeType};base64,${imageData}`,
      description: optimizedPrompt,
      style: selectedStyle,
      environment: selectedEnvironment,
      userInput: userPrompt,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}