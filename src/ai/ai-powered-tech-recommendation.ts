'use server';

/**
 * @fileOverview Flujo de recomendación de tecnología impulsado por IA.
 *
 * - techRecommendation - Una función que toma las necesidades del usuario y devuelve recomendaciones personalizadas.
 * - TechRecommendationInput - El tipo de entrada para la función techRecommendation.
 * - TechRecommendationOutput - El tipo de retorno para la función techRecommendation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TechRecommendationInputSchema = z.object({
  needs: z
    .string()
    .describe('Las necesidades tecnológicas del usuario, incluyendo tipo de dispositivo, presupuesto en COP, uso principal, portabilidad, tamaño de pantalla, características deseadas y otras preferencias.'),
});
export type TechRecommendationInput = z.infer<typeof TechRecommendationInputSchema>;


const TechRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('Una cadena JSON que contiene una matriz de objetos de recomendación. Cada objeto debe incluir: name, justification, pros, cons, isTopPick.'),
});

export type TechRecommendationOutput = z.infer<typeof TechRecommendationOutputSchema>;

export async function techRecommendation(input: TechRecommendationInput): Promise<TechRecommendationOutput> {
  return techRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'techRecommendationPrompt',
  input: {schema: TechRecommendationInputSchema},
  output: {schema: TechRecommendationOutputSchema},
  prompt: `Eres un asistente de IA experto en recomendar dispositivos tecnológicos como portátiles, ordenadores de sobremesa, tablets y convertibles en el mercado colombiano.

  Basándote en las necesidades del usuario, proporciona 2-3 recomendaciones de dispositivos específicos. Para cada recomendación, proporciona un nombre de producto, una justificación de por qué es una buena opción, una lista de 3 pros y 2 contras. Asegúrate de que una de las recomendaciones esté marcada como la mejor opción (isTopPick: true).

  Formatea tu respuesta como una cadena JSON con una clave "recommendations" que contenga un array de objetos de recomendación. Cada objeto debe tener las claves: "name", "justification", "pros" (array de strings), "cons" (array de strings), y "isTopPick" (booleano). Solo una debe ser la mejor opción.

  Considera el mercado colombiano y la disponibilidad de productos en el país. Los precios deben ser mencionados de forma aproximada en Pesos Colombianos (COP) dentro de la justificación si es relevante.

  **IMPORTANTE**: Responde SIEMPRE en español. No incluyas saltos de línea ni formato markdown en la respuesta JSON. Toda la respuesta debe ser una única cadena JSON válida.

  Necesidades del usuario: {{{needs}}}
  `,
});

const techRecommendationFlow = ai.defineFlow(
  {
    name: 'techRecommendationFlow',
    inputSchema: TechRecommendationInputSchema,
    outputSchema: TechRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
