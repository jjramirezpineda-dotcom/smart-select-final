import { NextResponse } from 'next/server';
import { recommendationChat } from '@/ai/recommendation-chat';
import { z } from 'zod';

// Esquema para un único mensaje en el historial
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

// Esquema para la solicitud de chat
const ChatRequestSchema = z.object({
  prompt: z.string().min(1, "El mensaje no puede estar vacío."),
  history: z.array(MessageSchema).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedRequest = ChatRequestSchema.safeParse(body);

    if (!validatedRequest.success) {
      const errorMessage = Object.values(validatedRequest.error.flatten().fieldErrors).flat()[0] || "Entrada inválida.";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { prompt, history } = validatedRequest.data;
    
    // Llamamos al nuevo flujo de IA conversacional
    const result = await recommendationChat({
      prompt: prompt,
      history: history || [],
    });

    if (!result || !result.response) {
       return NextResponse.json({ error: 'La IA no pudo generar una respuesta.' }, { status: 500 });
    }
    
    return NextResponse.json({ response: result.response });

  } catch (e: any) {
    console.error("Error en el API route de chat:", e);
    return NextResponse.json({ error: e.message || 'Error desconocido en el servidor.' }, { status: 500 });
  }
}
