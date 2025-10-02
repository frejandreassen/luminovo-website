import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

/**
 * API endpoint to isolate the lamp component from a full scene image
 * Uses Gemini's image-to-image capabilities to extract just the 3D-printable lamp part
 */
export async function POST(request: Request) {
  try {
    const { imageData } = await request.json();

    if (!imageData) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Extract base64 data if it's a data URI
    let base64Data = imageData;
    if (imageData.startsWith('data:')) {
      base64Data = imageData.split(',')[1];
    }

    // Determine mime type from data URI or default to image/png
    let mimeType = 'image/png';
    if (imageData.startsWith('data:')) {
      const match = imageData.match(/data:([^;]+);/);
      if (match) {
        mimeType = match[1];
      }
    }

    // Prompt to isolate the lamp component for 3D printing
    const isolationPrompt = `Transform this lamp shade into a clean technical photograph showing ONLY the 3D-printed SKELETAL FRAMEWORK itself, without the light bulb or any environment/furniture. Remove all lighting effects, the bulb, the table/surface, and background. Show just the white PLA plastic struts forming the open wireframe structure on a pure white background with even, shadowless lighting. Keep the exact same skeletal pattern and framework. Orthographic view, centered. This should be just the lamp shade component that can be 3D printed.`;

    const config = {
      responseModalities: ['IMAGE'] as const,
    };

    const contents = [
      {
        role: 'user' as const,
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: isolationPrompt,
          },
        ],
      },
    ];

    console.log('Isolating lamp component from scene image...');

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash-image-preview',
      config,
      contents,
    });

    let isolatedImageData: string | null = null;
    let outputMimeType: string = 'image/png';

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        isolatedImageData = inlineData.data || '';
        outputMimeType = inlineData.mimeType || 'image/png';
      }
    }

    if (!isolatedImageData) {
      return NextResponse.json(
        { error: 'Failed to isolate lamp component' },
        { status: 500 }
      );
    }

    console.log('✓ Lamp component isolated successfully');

    return NextResponse.json({
      image: `data:${outputMimeType};base64,${isolatedImageData}`,
      mimeType: outputMimeType,
    });

  } catch (error) {
    console.error('Error isolating lamp component:', error);
    return NextResponse.json(
      { error: 'Failed to isolate lamp component' },
      { status: 500 }
    );
  }
}
