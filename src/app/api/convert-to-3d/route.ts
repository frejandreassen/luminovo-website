import { MeshyClient } from '@/lib/meshy-client';
import { NextResponse } from 'next/server';

/**
 * API endpoint to convert an isolated lamp image to a 3D model using Meshy
 */
export async function POST(request: Request) {
  try {
    const { imageData, waitForCompletion = true } = await request.json();

    if (!imageData) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    if (!process.env.MESHY_API_KEY) {
      return NextResponse.json(
        { error: 'Meshy API key not configured' },
        { status: 500 }
      );
    }

    const meshyClient = new MeshyClient(process.env.MESHY_API_KEY);

    // Extract base64 data if it's a data URI
    let base64Data = imageData;
    if (imageData.startsWith('data:')) {
      base64Data = imageData.split(',')[1];
    }

    console.log('Creating Meshy 3D conversion task...');

    // Create the 3D conversion task
    const taskId = await meshyClient.createImageTo3DTask(base64Data, {
      ai_model: 'meshy-5',
      topology: 'triangle',
      target_polycount: 30000,
      should_texture: false,  // Ingen textur - bara geometri för 3D-printing
      should_remesh: true,
    });

    console.log(`✓ Meshy task created: ${taskId}`);

    // If waitForCompletion is false, return just the task ID
    if (!waitForCompletion) {
      return NextResponse.json({
        taskId,
        status: 'PENDING',
      });
    }

    // Otherwise, wait for completion (default behavior)
    console.log('Waiting for 3D model generation to complete...');
    const result = await meshyClient.waitForCompletion(taskId, 60, 5000);

    console.log(`✓ 3D model generated successfully! Status: ${result.status}`);
    console.log('📦 Full Meshy result:', JSON.stringify(result, null, 2));
    console.log('   GLB URL:', result.model_urls?.glb);
    console.log('   Thumbnail URL:', result.thumbnail_url);

    return NextResponse.json({
      taskId: result.id,
      status: result.status,
      progress: result.progress,
      modelUrls: result.model_urls,  // camelCase för frontend
      thumbnailUrl: result.thumbnail_url,
      textureUrls: result.texture_urls,
    });

  } catch (error) {
    console.error('Error converting to 3D:', error);
    return NextResponse.json(
      {
        error: 'Failed to convert to 3D',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check the status of a Meshy task
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    if (!process.env.MESHY_API_KEY) {
      return NextResponse.json(
        { error: 'Meshy API key not configured' },
        { status: 500 }
      );
    }

    const meshyClient = new MeshyClient(process.env.MESHY_API_KEY);
    const status = await meshyClient.getTaskStatus(taskId);

    return NextResponse.json({
      taskId: status.id,
      status: status.status,
      progress: status.progress,
      modelUrls: status.model_urls,
      thumbnailUrl: status.thumbnail_url,
      textureUrls: status.texture_urls,
      taskError: status.task_error,
    });

  } catch (error) {
    console.error('Error getting task status:', error);
    return NextResponse.json(
      {
        error: 'Failed to get task status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
