# Luminovo - Setup Instructions

## Beställningssystem & AI-Prissättning

### 1. Directus Setup

Gå till din Directus admin-panel och skapa följande tabell:

#### Collection: `orders`

**Kunduppgifter:**
- `customer_name` (String, Required)
- `customer_email` (String, Required)
- `customer_phone` (String, Required)
- `delivery_address` (String, Required)
- `delivery_city` (String, Required)
- `delivery_postal_code` (String, Required)
- `customer_notes` (Text, Optional)

**Lampdetaljer:**
- `lamp_image` (File Relation, Optional) - För AI-genererade bilder som laddas upp
- `lamp_image_url` (String, Optional) - För befintliga lampor med URL
- `lamp_description` (String, Optional)
- `lamp_style` (String, Optional)
- `lamp_environment` (String, Optional)
- `is_custom_design` (Boolean, Default: false)

**Prissättning:**
- `estimated_price` (Integer, Optional) - AI-uppskattat pris i kr
- `price_reasoning` (Text, Optional) - Motivering från Gemini

**Orderstatus:**
- `status` (Dropdown, Default: pending)
  - Options: `pending`, `payment_sent`, `paid`, `manufacturing`, `shipped`, `completed`
- `order_date` (Datetime, Default: Now)

### 2. Miljövariabler

Se till att `.env.local` innehåller:

```env
GEMINI_API_KEY=your-gemini-api-key
DIRECTUS_URL=https://din-directus-url.se
DIRECTUS_TOKEN=your-directus-token
```

### 3. Testa Prissättningen

Kör testskriptet för att se hur Gemini bedömer lampor:

```bash
node test-pricing.js ./public/lampshade-1.png
```

### 4. Starta utvecklingsserver

```bash
npm run dev
```

## Arbetsflöde för Ordrar

1. **Kund beställer lampa**
   - Kund fyller i orderformulär
   - Gemini uppskattar pris automatiskt (2-3 sekunder)
   - Order sparas i Directus med status `pending`

2. **Ni får notifikation**
   - Logga in i Directus
   - Granska ordern under `orders` collection
   - Se kunduppgifter, lampdetaljer och AI-uppskattat pris

3. **Skapa betalningslänk**
   - Gå till Stripe Dashboard
   - Skapa en Payment Link med korrekta priset
   - Skicka länken till kundens email

4. **Uppdatera status**
   - Markera ordern som `payment_sent` när ni skickat länken
   - Uppdatera till `paid` när kund betalat
   - `manufacturing` → `shipped` → `completed`

## Prisuppskattning

Gemini Flash analyserar lampans:
- Geometrisk komplexitet
- Detaljnivå
- Uppskattad printtid
- Materialåtgång
- Svårighetsgrad

**Referenspriser:**
- Enkel: 2.495 kr
- Medium: 3.495 kr
- Komplex: 4.495 kr
- Mycket komplex: 5.995 kr

## Filer Skapad/Uppdaterade

**Nya filer:**
- `src/lib/gemini-pricing.ts` - Prissättningslogik
- `src/app/api/estimate-price/route.ts` - API för prisuppskattning
- `src/app/api/orders/route.ts` - API för ordrar
- `src/components/order-form.tsx` - Orderformulär
- `test-pricing.js` - Testskript
- `PRICING_README.md` - Prisdokumentation
- `SETUP_INSTRUCTIONS.md` - Denna fil

**Uppdaterade filer:**
- `src/components/lamp-designer-hero.tsx` - Orderknapp kopplad
- `src/components/gallery.tsx` - Beställknappar tillagda

## Support

Vid problem, kontrollera:
1. Är Directus-tabellen korrekt uppsatt?
2. Finns alla miljövariabler i `.env.local`?
3. Fungerar `npm run build` utan fel?
4. Visar `node test-pricing.js <bild>` korrekt pris?
