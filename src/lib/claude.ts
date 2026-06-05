import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';

function resolveApiKey(): string {
  const envKey = process.env.ANTHROPIC_API_KEY;
  if (envKey) return envKey;

  try {
    const envLocal = readFileSync(join(process.cwd(), '.env.local'), 'utf-8');
    const match = envLocal.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  } catch {}

  throw new Error('ANTHROPIC_API_KEY not found. Set it in .env.local or as an environment variable.');
}

const client = new Anthropic({ apiKey: resolveApiKey() });

interface ClaudeRequest {
  systemPrompt: string;
  userMessage: string;
  maxTokens?: number;
  imageBase64?: string;
}

export async function generateWithClaude({ systemPrompt, userMessage, maxTokens = 1500, imageBase64 }: ClaudeRequest): Promise<string> {
  // Build message content — text only or text + image
  const content: Anthropic.MessageCreateParams['messages'][0]['content'] = imageBase64
    ? [
        {
          type: 'image' as const,
          source: {
            type: 'base64' as const,
            media_type: 'image/jpeg' as const,
            data: imageBase64,
          },
        },
        { type: 'text' as const, text: userMessage },
      ]
    : userMessage;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content }],
  });

  const block = message.content[0];
  if (block.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }
  return block.text;
}
