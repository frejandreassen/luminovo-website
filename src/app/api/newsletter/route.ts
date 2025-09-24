import { NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Ogiltig e-postadress' },
        { status: 400 }
      );
    }

    if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
      console.error('Directus configuration missing');
      return NextResponse.json(
        { error: 'Server konfigurationsfel' },
        { status: 500 }
      );
    }

    // Skapa ny customer i Directus
    const response = await fetch(`${DIRECTUS_URL}/items/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify({
        email: email,
        newsletter_subscribed: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Directus error:', errorData);
      console.error('Status:', response.status);
      console.error('URL check:', `${DIRECTUS_URL}/items/customers`);
      console.error('Token exists:', !!DIRECTUS_TOKEN);

      return NextResponse.json(
        { error: 'Kunde inte registrera prenumeration' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Tack för din prenumeration!',
      data: data.data,
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Ett fel uppstod. Försök igen senare.' },
      { status: 500 }
    );
  }
}