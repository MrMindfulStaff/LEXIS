import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { LEXIS_SYSTEM_PROMPT } from '@/lib/lexis-system-prompt';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODE_PREFIXES: Record<string, string> = {
  adversarial:
    'MODE: SUPERIOR POSITION REVELATION (SL-3 Mode 3). Attack the position presented with maximum force. Find every vulnerability. Deliver exactly what opposing counsel will use against this position with specific authority and the precise deployment sequence.',
  deadend:
    'MODE: DEAD END DETECTION (SL-3 Mode 2). Map every available path. For each path determine viability or dead end. For every dead end declare it explicitly — the specific authority, the exact defeat mechanism, the precise reason this path closes. Be exhaustive.',
};

export async function POST(req: NextRequest) {
  try {
    const { messages, documents, mode } = await req.json();

    // Build document context blocks
    let documentContext = '';
    if (documents && documents.length > 0) {
      documentContext = documents
        .map(
          (doc: { filename: string; content: string }) =>
            `[DOCUMENT: ${doc.filename}]\n${doc.content}\n[END DOCUMENT]`
        )
        .join('\n\n');
    }

    // Build messages array for Anthropic
    const anthropicMessages = messages.map(
      (msg: { role: string; content: string }, idx: number) => {
        let content = msg.content;

        // Prepend document context to the first user message
        if (idx === 0 && msg.role === 'user' && documentContext) {
          content = `${documentContext}\n\n${content}`;
        }

        // Apply mode prefix to the latest user message
        if (
          idx === messages.length - 1 &&
          msg.role === 'user' &&
          mode in MODE_PREFIXES
        ) {
          content = `${MODE_PREFIXES[mode]}\n\n${content}`;
        }

        return { role: msg.role, content };
      }
    );

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = anthropic.messages.stream({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 4000,
            system: LEXIS_SYSTEM_PROMPT,
            messages: anthropicMessages,
            tools: [
              {
                type: 'web_search_20250305' as any,
                name: 'web_search',
                max_uses: 10,
              } as any,
            ],
          });

          stream.on('text', (text) => {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'text', text })}\n\n`)
            );
          });

          stream.on('contentBlock', (block) => {
            if (block.type === 'tool_use' && block.name === 'web_search') {
              const input = block.input as { query?: string };
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: 'search', query: input.query || '' })}\n\n`
                )
              );
            }
          });

          stream.on('error', (err) => {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'error', error: String(err) })}\n\n`
              )
            );
          });

          await stream.finalMessage();

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`)
          );
          controller.close();
        } catch (err: any) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'error', error: err.message || 'Unknown error' })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
