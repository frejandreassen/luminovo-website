# Lamp Designer Feature Setup

## Overview
The Lamp Designer feature allows users to generate custom lamp designs using AI (Google Gemini) by entering simple text prompts on the website.

## Setup Instructions

### 1. Get a Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key or use an existing one

### 2. Configure Environment Variable
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```

### 3. Run the Application
```bash
npm run dev
```

The application will start on `http://localhost:3000` (or another port if 3000 is in use).

## How It Works

1. **User Interface**: Users access the "Design Studio" section from the navigation menu
2. **Prompt Input**: Users describe their desired lamp style (e.g., "Minimalist Scandinavian" or "Art Deco elegance")
3. **AI Generation**: The system combines the user's input with a professional prompt template that includes:
   - Technical specifications (40cm height, 30cm width, E27 socket)
   - Random style variations (organic lattice, geometric mesh, nature-inspired)
   - Random environment settings (oak table, marble console, birch nightstand)
   - Professional photography specifications
4. **Image Display**: The generated image is displayed with details about the style and environment used
5. **State Management**: The image is stored in React state for further interactions

## Features

- **Suggested Prompts**: Quick-start options for users who need inspiration
- **Real-time Generation**: Images are generated in seconds
- **Error Handling**: User-friendly error messages if generation fails
- **Responsive Design**: Works on all device sizes
- **Loading States**: Visual feedback during generation

## API Route Details

The API endpoint at `/api/generate-lampshade` handles:
- User prompt validation
- Prompt template construction
- Communication with Gemini API
- Base64 image encoding
- Error handling

## Troubleshooting

### "API key not configured" error
- Ensure `.env.local` file exists with your GEMINI_API_KEY
- Restart the development server after adding the API key

### Image generation fails
- Check your API key is valid
- Ensure you have API credits/quota available
- Check the console for detailed error messages

### Development server issues
- Try a different port if 3000 is in use
- Clear `.next` folder and restart: `rm -rf .next && npm run dev`