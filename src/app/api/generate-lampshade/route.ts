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

    // Build the prompt with user input
    const basePrompt = `Elegant 3D-printed table lampshade, maximum 40cm height and 30cm width, designed for E27 socket mounting system with integrated fixture attachment ring at base`;
    const stylePrompt = userPrompt
      ? `${userPrompt} style, ${selectedStyle} details`
      : selectedStyle;
    const fullPrompt = `${basePrompt}, ${stylePrompt}, creating intricate shadow play when illuminated, photographed on ${selectedEnvironment}, Scandinavian minimalist interior, warm 2700K light emanating through the translucent white biodegradable filament, professional product photography, soft natural lighting`;

    const config = {
      responseModalities: ['IMAGE', 'TEXT'],
    };

    const model = 'gemini-2.5-flash-image-preview';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let imageData: string | null = null;
    let mimeType: string = 'image/png';
    let description = '';

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        imageData = inlineData.data || '';
        mimeType = inlineData.mimeType || 'image/png';
      } else if (chunk.text) {
        description += chunk.text;
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
      description,
      style: selectedStyle,
      environment: selectedEnvironment,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}