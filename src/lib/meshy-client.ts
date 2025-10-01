/**
 * Meshy API Client for Image-to-3D conversion
 * Documentation: https://docs.meshy.ai
 */

interface MeshyTaskResponse {
  result: string; // Task ID
}

interface MeshyTaskStatus {
  id: string;
  model_urls?: {
    glb?: string;
    fbx?: string;
    obj?: string;
    usdz?: string;
  };
  thumbnail_url?: string;
  texture_prompt?: string;
  progress: number;
  started_at: number;
  created_at: number;
  expires_at: number;
  finished_at?: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'CANCELED';
  texture_urls?: Array<{
    base_color?: string;
    metallic?: string;
    normal?: string;
    roughness?: string;
  }>;
  preceding_tasks: number;
  task_error: {
    message: string;
  };
}

export class MeshyClient {
  private apiKey: string;
  private baseUrl = 'https://api.meshy.ai/openapi/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Create a new Image-to-3D task
   * @param imageData Base64-encoded image data (without data URI prefix) or public URL
   * @param options Optional parameters for the 3D generation
   */
  async createImageTo3DTask(
    imageData: string,
    options: {
      ai_model?: 'meshy-4' | 'meshy-5' | 'latest';
      topology?: 'quad' | 'triangle';
      target_polycount?: number;
      symmetry_mode?: 'off' | 'auto' | 'on';
      should_remesh?: boolean;
      should_texture?: boolean;
      enable_pbr?: boolean;
      texture_prompt?: string;
    } = {}
  ): Promise<string> {
    // Format image_url as data URI if it's base64 data
    const image_url = imageData.startsWith('http')
      ? imageData
      : `data:image/png;base64,${imageData}`;

    const payload = {
      image_url,
      ai_model: options.ai_model || 'meshy-5',
      topology: options.topology || 'triangle',
      target_polycount: options.target_polycount || 30000,
      symmetry_mode: options.symmetry_mode || 'auto',
      should_remesh: options.should_remesh !== undefined ? options.should_remesh : true,
      should_texture: options.should_texture !== undefined ? options.should_texture : true,
      enable_pbr: options.enable_pbr || false,
      ...(options.texture_prompt && { texture_prompt: options.texture_prompt }),
    };

    const response = await fetch(`${this.baseUrl}/image-to-3d`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Meshy API error: ${response.status} - ${error}`);
    }

    const data: MeshyTaskResponse = await response.json();
    return data.result; // Returns task ID
  }

  /**
   * Retrieve the status of an Image-to-3D task
   * @param taskId The task ID returned from createImageTo3DTask
   */
  async getTaskStatus(taskId: string): Promise<MeshyTaskStatus> {
    const url = `${this.baseUrl}/image-to-3d/${taskId}`;
    console.log(`   📡 GET ${url} (auth: ${this.apiKey.substring(0, 10)}...)`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`   ❌ Response ${response.status}:`, error);
      throw new Error(`Meshy API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data;
  }

  /**
   * Poll for task completion with exponential backoff
   * @param taskId The task ID to poll
   * @param maxAttempts Maximum number of polling attempts
   * @param initialDelay Initial delay in ms (defaults to 2000ms)
   */
  async waitForCompletion(
    taskId: string,
    maxAttempts: number = 60,
    initialDelay: number = 2000
  ): Promise<MeshyTaskStatus> {
    let attempts = 0;
    let delay = initialDelay;

    // Wait before first poll to give Meshy time to register the task
    console.log(`⏳ Waiting ${initialDelay}ms before first poll...`);
    await new Promise(resolve => setTimeout(resolve, initialDelay));

    while (attempts < maxAttempts) {
      console.log(`🔍 Polling attempt ${attempts + 1}/${maxAttempts} for task ${taskId}...`);
      const status = await this.getTaskStatus(taskId);
      console.log(`   Status: ${status.status}, Progress: ${status.progress}%`);

      if (status.status === 'SUCCEEDED') {
        return status;
      }

      if (status.status === 'FAILED' || status.status === 'CANCELED') {
        throw new Error(`Task ${taskId} ${status.status}: ${status.task_error.message}`);
      }

      // Wait before next poll (exponential backoff, max 10s)
      await new Promise(resolve => setTimeout(resolve, Math.min(delay, 10000)));
      delay *= 1.2; // Increase delay by 20% each time
      attempts++;
    }

    throw new Error(`Task ${taskId} timed out after ${maxAttempts} attempts`);
  }

  /**
   * Delete an Image-to-3D task
   * @param taskId The task ID to delete
   */
  async deleteTask(taskId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/image-to-3d/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Meshy API error: ${response.status} - ${error}`);
    }
  }
}
