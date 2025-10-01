# Meshy 3D Integration Documentation

## Overview

This integration adds AI-powered image-to-3D conversion to the Luminovo lamp designer. Users can now generate:
1. **Scene Image**: A beautiful visualization of the lamp in a Scandinavian interior
2. **Isolated Component**: The lamp shade extracted from the scene for 3D printing
3. **3D Model**: A ready-to-print 3D model in multiple formats (GLB, OBJ, FBX, USDZ)

## Architecture

### Flow Diagram

```
User Prompt
    ↓
[Gemini 2.5 Flash] → Optimizes prompt
    ↓
[Gemini 2.5 Flash Image] → Generates scene image
    ↓
[Gemini 2.5 Flash Image] → Isolates lamp component
    ↓
[Meshy API] → Converts to 3D model
    ↓
Returns: Scene + Isolated Image + 3D Downloads
```

### API Endpoints

#### `/api/generate-lampshade` (Modified)
- **Method**: POST
- **Body**:
  ```json
  {
    "userPrompt": "Minimalist Scandinavian",
    "generate3D": true  // Optional, defaults to false
  }
  ```
- **Response**:
  ```json
  {
    "image": "data:image/png;base64,...",
    "isolatedImage": "data:image/png;base64,...",
    "description": "Optimized prompt...",
    "style": "organic lattice",
    "environment": "oak side table",
    "userInput": "Minimalist Scandinavian",
    "model3D": {
      "taskId": "018a210d-8ba4-705c-b111-1f1776f7f578",
      "status": "SUCCEEDED",
      "progress": 100,
      "modelUrls": {
        "glb": "https://...",
        "obj": "https://...",
        "fbx": "https://...",
        "usdz": "https://..."
      },
      "thumbnailUrl": "https://...",
      "textureUrls": [...]
    }
  }
  ```

#### `/api/isolate-lamp`
- **Method**: POST
- **Purpose**: Isolates the lamp component from a scene image
- **Body**:
  ```json
  {
    "imageData": "data:image/png;base64,..." // or just base64 string
  }
  ```

#### `/api/convert-to-3d`
- **Method**: POST
- **Purpose**: Converts isolated lamp image to 3D model using Meshy
- **Body**:
  ```json
  {
    "imageData": "data:image/png;base64,...",
    "waitForCompletion": true  // Optional, defaults to true
  }
  ```
- **Method**: GET
- **Purpose**: Check status of a Meshy task
- **Query**: `?taskId=018a210d-8ba4-705c-b111-1f1776f7f578`

## Setup Instructions

### 1. Install Dependencies

The required dependencies are already in `package.json`:
```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your API keys to `.env.local`:
   ```env
   GEMINI_API_KEY=your-gemini-api-key-here
   MESHY_API_KEY=your-meshy-api-key-here
   ```

### 3. Get API Keys

#### Gemini API Key (Required)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key

#### Meshy API Key (Optional - for 3D generation)
1. Visit [Meshy Dashboard](https://app.meshy.ai)
2. Sign up or log in
3. Go to Settings → API Keys
4. Generate a new API key

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Basic Image Generation

1. Navigate to the Design Studio section
2. Enter a prompt (e.g., "Minimalist Scandinavian")
3. Click "Generate Design"
4. Wait ~5-10 seconds for the image

### 3D Model Generation

1. Navigate to the Design Studio section
2. Enter a prompt
3. **Check the "Generate 3D model" checkbox**
4. Click "Generate Design"
5. Wait ~2-3 minutes for the complete process:
   - Scene image generation (~5-10s)
   - Lamp isolation (~5-10s)
   - 3D conversion (~2-3 minutes)
6. Download your 3D model in your preferred format

## File Structure

```
src/
├── app/
│   └── api/
│       ├── generate-lampshade/
│       │   └── route.ts         # Main orchestration endpoint
│       ├── isolate-lamp/
│       │   └── route.ts         # Gemini image isolation
│       └── convert-to-3d/
│           └── route.ts         # Meshy 3D conversion
├── lib/
│   └── meshy-client.ts          # Meshy API client
└── components/
    └── lamp-designer.tsx        # Frontend component
```

## Technical Details

### Meshy Client (`src/lib/meshy-client.ts`)

The `MeshyClient` class handles all interactions with the Meshy API:

- `createImageTo3DTask()`: Creates a new 3D conversion task
- `getTaskStatus()`: Retrieves the status of a task
- `waitForCompletion()`: Polls until task completes (with exponential backoff)
- `deleteTask()`: Deletes a task and its associated data

### Gemini Image Isolation Prompt

The isolation prompt is designed to extract just the lamp component:

```
Transform this lamp shade into a clean technical photograph showing
ONLY the 3D-printed SKELETAL FRAMEWORK itself, without the light bulb
or any environment/furniture. Remove all lighting effects, the bulb,
the table/surface, and background. Show just the white PLA plastic
struts forming the open wireframe structure on a pure white background
with even, shadowless lighting. Keep the exact same skeletal pattern
and framework. Orthographic view, centered. This should be just the
lamp shade component that can be 3D printed.
```

### Meshy Configuration

Default settings for 3D generation:
- **AI Model**: meshy-5
- **Topology**: triangle
- **Target Polycount**: 30,000
- **Texture**: Enabled with prompt "3D-printed white PLA plastic lamp shade with clean, smooth surface finish"
- **PBR Maps**: Disabled (base color only)

## Cost Considerations

### Gemini API
- Text generation (prompt optimization): ~0.5-1K tokens
- Image generation (scene): ~1 image
- Image-to-image (isolation): ~1 image

### Meshy API
- Image-to-3D with texture: ~30 credits per generation
- Processing time: ~2-3 minutes per model

## Troubleshooting

### "Meshy API key not configured" warning

The app will still generate scene and isolated images but skip 3D generation. Add `MESHY_API_KEY` to `.env.local` to enable 3D features.

### 3D Generation Times Out

The default timeout is 60 polling attempts with exponential backoff (~3-4 minutes max). If generation consistently times out:
1. Check your Meshy API quota
2. Try reducing `target_polycount` in `src/app/api/generate-lampshade/route.ts`
3. Check Meshy API status at [status.meshy.ai](https://status.meshy.ai)

### Isolated Image Quality Issues

The isolation quality depends on:
1. How clear the lamp is in the original scene
2. Contrast between lamp and background
3. Complexity of the lamp design

If isolation fails, the prompt can be adjusted in `src/app/api/generate-lampshade/route.ts` line 166.

## Development

### Testing Endpoints Individually

Test isolation without 3D generation:
```bash
curl -X POST http://localhost:3000/api/isolate-lamp \
  -H "Content-Type: application/json" \
  -d '{"imageData": "data:image/png;base64,..."}'
```

Test 3D conversion with an existing isolated image:
```bash
curl -X POST http://localhost:3000/api/convert-to-3d \
  -H "Content-Type: application/json" \
  -d '{"imageData": "data:image/png;base64,...", "waitForCompletion": false}'
```

Check 3D task status:
```bash
curl http://localhost:3000/api/convert-to-3d?taskId=YOUR_TASK_ID
```

## Future Enhancements

Potential improvements:
1. **Streaming updates**: Use Meshy's SSE endpoint to show real-time progress
2. **Preview 3D model**: Embed a GLB viewer in the UI
3. **Customize parameters**: Let users adjust polycount, topology, etc.
4. **Batch processing**: Generate multiple variations at once
5. **AR preview**: Use USDZ format for iOS AR preview
6. **Print settings**: Add recommended 3D printer settings for each model

---

Built with ❤️ using Next.js, Gemini AI, and Meshy 3D
