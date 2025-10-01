import { NextResponse } from 'next/server';
import { estimateLampPrice } from '@/lib/gemini-pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, description, style, environment } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Bildens URL saknas' },
        { status: 400 }
      );
    }

    // Bygg en beskrivning från tillgänglig info
    const fullDescription = [
      description,
      style && `Stil: ${style}`,
      environment && `Miljö: ${environment}`,
    ]
      .filter(Boolean)
      .join('. ');

    // Anropa Gemini för prissättning
    const pricing = await estimateLampPrice(imageUrl, fullDescription);

    return NextResponse.json({
      success: true,
      ...pricing,
    });

  } catch (error) {
    console.error('Price estimation error:', error);
    return NextResponse.json(
      { error: 'Kunde inte uppskatta pris. Försök igen.' },
      { status: 500 }
    );
  }
}
