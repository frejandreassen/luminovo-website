import { NextResponse } from 'next/server';

/**
 * API endpoint to proxy GLB files from Meshy to avoid CORS issues
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Validate it's a Meshy URL for security
    if (!url.startsWith('https://assets.meshy.ai/')) {
      return NextResponse.json(
        { error: 'Invalid URL - must be a Meshy asset URL' },
        { status: 400 }
      );
    }

    console.log('📦 Proxying GLB file:', url);

    // Fetch the GLB file from Meshy
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch GLB: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `Failed to fetch GLB: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the file as a blob
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    console.log(`✓ GLB file fetched successfully (${buffer.byteLength} bytes)`);

    // Return the GLB with proper CORS headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Length': buffer.byteLength.toString(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });

  } catch (error) {
    console.error('Error proxying GLB:', error);
    return NextResponse.json(
      {
        error: 'Failed to proxy GLB file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
