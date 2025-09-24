// To run this code you need to install the following dependencies:
// npm install @google/genai mime dotenv
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';
import mime from 'mime';
import { writeFile } from 'fs';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

function saveBinaryFile(fileName, content) {
  writeFile(fileName, content, (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
      return;
    }
    console.log(`✅ File ${fileName} saved to file system.`);
  });
}

async function main() {
  // Check for API key
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Please set GEMINI_API_KEY environment variable');
    console.log('💡 Usage: GEMINI_API_KEY=your-key-here node generate-lampshade.js');
    process.exit(1);
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // Available style options
  const styles = [
    'organic lattice',
    'geometric mesh',
    'nature-inspired pattern'
  ];

  // Available environment options
  const environments = [
    'oak side table',
    'marble console',
    'birch nightstand'
  ];

  // Randomly select style and environment
  const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
  const selectedEnvironment = environments[Math.floor(Math.random() * environments.length)];

  // Build the prompt
  const lampPrompt = `Elegant 3D-printed table lampshade, maximum 40cm height and 30cm width, designed for E27 socket mounting system with integrated fixture attachment ring at base, ${selectedStyle}, creating intricate shadow play when illuminated, photographed on ${selectedEnvironment}, Scandinavian minimalist interior, warm 2700K light emanating through the translucent white biodegradable filament, professional product photography, soft natural lighting`;

  // Allow custom prompt from command line
  const customPrompt = process.argv[2] || lampPrompt;

  console.log('🎨 Generating lampshade image...');
  if (!process.argv[2]) {
    console.log(`📝 Style: ${selectedStyle}`);
    console.log(`🏠 Environment: ${selectedEnvironment}`);
  } else {
    console.log('📝 Using custom prompt');
  }
  console.log('');

  const config = {
    responseModalities: [
      'IMAGE',
      'TEXT',
    ],
  };

  const model = 'gemini-2.5-flash-image-preview';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: customPrompt,
        },
      ],
    },
  ];

  try {
    // Create output directory
    const outputDir = join(process.cwd(), 'generated-images');
    await mkdir(outputDir, { recursive: true });

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fileIndex = 0;
    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const fileName = `lampshade_${timestamp}_${fileIndex++}`;
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        const fileExtension = mime.getExtension(inlineData.mimeType || '') || 'png';
        const buffer = Buffer.from(inlineData.data || '', 'base64');
        const fullPath = join(outputDir, `${fileName}.${fileExtension}`);

        saveBinaryFile(fullPath, buffer);
        console.log(`📁 Saving to: ${fullPath}`);
      } else if (chunk.text) {
        console.log(chunk.text);
      }
    }

    console.log('\n✨ Image generation complete!');
  } catch (error) {
    console.error('❌ Error generating image:', error);
    process.exit(1);
  }
}

main();