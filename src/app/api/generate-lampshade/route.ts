import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { MeshyClient } from '@/lib/meshy-client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userPrompt, generate3D = false } = body;

    console.log('🎨 === LAMPSHADE GENERATION STARTED ===');
    console.log('📦 Request body:', JSON.stringify(body));
    console.log('📝 User prompt:', userPrompt);
    console.log('🔧 Generate 3D:', generate3D, '(type:', typeof generate3D, ')');

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

    console.log('✅ STEP 1: Prompt optimized');
    console.log('   User input:', userPrompt);
    console.log('   Optimized prompt:', optimizedPrompt.substring(0, 100) + '...');

    // STEP 2: Generate the image using the optimized prompt
    console.log('🎨 STEP 2: Generating scene image...');

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

    const sceneImage = `data:${mimeType};base64,${imageData}`;
    console.log('✅ STEP 2: Scene image generated (', imageData.length, 'chars base64)');

    // If 3D generation is not requested, return just the scene image
    if (!generate3D) {
      console.log('⏭️  Skipping 3D generation (generate3D = false)');
      console.log('🎉 === LAMPSHADE GENERATION COMPLETE ===\n');
      return NextResponse.json({
        image: sceneImage,
        description: optimizedPrompt,
        style: selectedStyle,
        environment: selectedEnvironment,
        userInput: userPrompt,
      });
    }

    // STEP 3: Isolate the lamp component from the scene
    console.log('🔍 STEP 3: Isolating lamp component from scene...');

    const isolationConfig: { responseModalities: string[] } = {
      responseModalities: ['IMAGE'],
    };

    const isolationPrompt = `Transform this lamp shade into a clean technical photograph showing ONLY the 3D-printed SKELETAL FRAMEWORK itself, without the light bulb or any environment/furniture. Remove all lighting effects, the bulb, the table/surface, and background. Show just the white PLA plastic struts forming the open wireframe structure on a pure white background with even, shadowless lighting. Keep the exact same skeletal pattern and framework. Orthographic view, centered. This should be just the lamp shade component that can be 3D printed.`;

    const isolationContents = [
      {
        role: 'user' as const,
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType,
            },
          },
          {
            text: isolationPrompt,
          },
        ],
      },
    ];

    const isolationResponse = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash-image-preview',
      config: isolationConfig,
      contents: isolationContents,
    });

    let isolatedImageData: string | null = null;
    let isolatedMimeType: string = 'image/png';

    for await (const chunk of isolationResponse) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        isolatedImageData = inlineData.data || '';
        isolatedMimeType = inlineData.mimeType || 'image/png';
      }
    }

    if (!isolatedImageData) {
      return NextResponse.json(
        { error: 'Failed to isolate lamp component' },
        { status: 500 }
      );
    }

    console.log('✅ STEP 3: Lamp component isolated (', isolatedImageData.length, 'chars base64)');

    // STEP 4: Convert to 3D using Meshy
    if (!process.env.MESHY_API_KEY) {
      console.warn('⚠️  Meshy API key not configured, skipping 3D generation');
      console.log('🎉 === LAMPSHADE GENERATION COMPLETE (no 3D) ===\n');
      return NextResponse.json({
        image: sceneImage,
        isolatedImage: `data:${isolatedMimeType};base64,${isolatedImageData}`,
        description: optimizedPrompt,
        style: selectedStyle,
        environment: selectedEnvironment,
        userInput: userPrompt,
        warning: 'Meshy API key not configured - 3D model generation skipped',
      });
    }

    console.log('🎲 STEP 4: Creating Meshy 3D conversion task...');
    const meshyClient = new MeshyClient(process.env.MESHY_API_KEY);

    const taskId = await meshyClient.createImageTo3DTask(isolatedImageData, {
      ai_model: 'meshy-5',
      topology: 'triangle',
      target_polycount: 30000,
      should_texture: true,
      enable_pbr: false,
      texture_prompt: '3D-printed white PLA plastic lamp shade with clean, smooth surface finish',
    });

    console.log(`✅ Meshy task created (ID: ${taskId})`);
    console.log('⏳ Waiting for 3D model generation (this takes ~2-3 minutes)...');

    const meshyResult = await meshyClient.waitForCompletion(taskId, 60, 3000);

    console.log(`✅ STEP 4: 3D model generated successfully!`);
    console.log(`   Status: ${meshyResult.status}, Progress: ${meshyResult.progress}%`);
    console.log('🎉 === LAMPSHADE GENERATION COMPLETE (with 3D) ===\n');

    return NextResponse.json({
      image: sceneImage,
      isolatedImage: `data:${isolatedMimeType};base64,${isolatedImageData}`,
      description: optimizedPrompt,
      style: selectedStyle,
      environment: selectedEnvironment,
      userInput: userPrompt,
      model3D: {
        taskId: meshyResult.id,
        status: meshyResult.status,
        progress: meshyResult.progress,
        modelUrls: meshyResult.model_urls,
        thumbnailUrl: meshyResult.thumbnail_url,
        textureUrls: meshyResult.texture_urls,
      },
    });

  } catch (error) {
    console.error('Error generating lampshade:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate lampshade',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}