import { NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

// Funktion för att ladda upp base64-bild till Directus
async function uploadBase64Image(base64Image: string): Promise<string | null> {
  try {
    // Konvertera base64 till blob
    const base64Data = base64Image.split(',')[1];
    const mimeType = base64Image.split(',')[0].split(':')[1].split(';')[0];

    const buffer = Buffer.from(base64Data, 'base64');
    const blob = new Blob([buffer], { type: mimeType });

    // Skapa FormData
    const formData = new FormData();
    formData.append('file', blob, `lamp-${Date.now()}.png`);

    // Ladda upp till Directus
    const response = await fetch(`${DIRECTUS_URL}/files`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error('Failed to upload image to Directus:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.data.id; // Returnera file ID
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, city, postalCode, notes, lampDetails } = body;

    // Validera obligatoriska fält
    if (!name || !email || !phone || !address || !city || !postalCode) {
      return NextResponse.json(
        { error: 'Alla fält är obligatoriska' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
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

    // Hantera bilduppladdning för AI-genererade lampor
    const imageUrl = lampDetails?.imageUrl;
    const isBase64Image = imageUrl?.startsWith('data:image');

    let lampImageId = null;
    if (isBase64Image) {
      // Ladda upp base64-bilden till Directus Files
      lampImageId = await uploadBase64Image(imageUrl);
    }

    const orderData = {
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      delivery_address: address,
      delivery_city: city,
      delivery_postal_code: postalCode,
      customer_notes: notes || null,
      // Använd file ID för uppladdade bilder, annars URL för befintliga lampor
      lamp_image: lampImageId || null,
      lamp_image_url: (!isBase64Image && imageUrl) ? imageUrl : null,
      lamp_description: lampDetails?.description || null,
      lamp_style: lampDetails?.style || null,
      lamp_environment: lampDetails?.environment || null,
      is_custom_design: lampDetails?.isCustom || false,
      estimated_price: lampDetails?.estimatedPrice || null,
      price_reasoning: lampDetails?.priceReasoning || null,
      status: 'pending', // Status: pending, payment_sent, paid, manufacturing, shipped, completed
      order_date: new Date().toISOString(),
    };

    const response = await fetch(`${DIRECTUS_URL}/items/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Directus error:', errorData);
      console.error('Status:', response.status);
      console.error('URL check:', `${DIRECTUS_URL}/items/orders`);

      return NextResponse.json(
        { error: 'Kunde inte spara beställningen. Försök igen.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Här kan du lägga till email-notifikation i framtiden
    // t.ex. via Resend, SendGrid, eller Directus Flows

    return NextResponse.json({
      success: true,
      message: 'Beställning mottagen! Vi kontaktar dig inom kort.',
      orderId: data.data.id,
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Ett fel uppstod. Försök igen senare.' },
      { status: 500 }
    );
  }
}
