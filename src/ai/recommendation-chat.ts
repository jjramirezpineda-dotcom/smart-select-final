'use server';

/**
 * @fileOverview Flujo de IA conversacional para recomendaciones tecnológicas.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Definición de un único mensaje en el historial
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

// Esquema de entrada para el flujo de chat
const ChatInputSchema = z.object({
  prompt: z.string().describe('El mensaje más reciente del usuario.'),
  history: z.array(MessageSchema).describe('El historial de la conversación hasta ahora.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

// Esquema de salida del flujo de chat
const ChatOutputSchema = z.object({
  response: z.string().describe('La respuesta del asistente de IA.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// Función exportada que otros módulos pueden llamar
export async function recommendationChat(input: ChatInput): Promise<ChatOutput> {
  return recommendationChatFlow(input);
}

// Plantilla de Handlebars para construir el prompt
const recommendationChatPrompt = `
  Eres "Smart Select", un asistente de IA experto, amigable y conciso, especializado en recomendar tecnología en el mercado colombiano.

  Tu objetivo es ayudar al usuario a encontrar el dispositivo perfecto (portátil, sobremesa, tablet, etc.) según sus necesidades.

  Reglas:
  - Sé conversacional y amigable.
  - Haz preguntas para aclarar las necesidades del usuario si la información es insuficiente (presupuesto, uso principal, características deseadas).
  - Cuando tengas suficiente información, proporciona 1 o 2 recomendaciones específicas, mencionando el modelo, una breve justificación, 3 pros y 2 contras.
  - Menciona precios aproximados en Pesos Colombianos (COP).
  - NUNCA inventes productos. Si no encuentras uno, di que no tienes una recomendación específica pero puedes dar consejos generales.
  - Responde SIEMPRE en español.
  - Formatea tus respuestas usando markdown para que sean fáciles de leer (listas, negritas, etc.).

  Historial de la conversación:
  {{#each history}}
    **{{role}}**: {{content}}
  {{/each}}

  Mensaje actual del usuario:
  **user**: {{prompt}}

  **assistant**:
`;

const chatFlow = ai.definePrompt({
  name: 'recommendationChatPrompt',
  input: { schema: ChatInputSchema },
  prompt: recommendationChatPrompt,
});

const recommendationChatFlow = ai.defineFlow(
  {
    name: 'recommendationChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await chatFlow(input);
    const textResponse = llmResponse.text;
    return { response: textResponse };
  }
);
