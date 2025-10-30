'use server';
/**
 * @fileoverview This file is the entrypoint for all Genkit and AI related code.
 *
 * It is used to initialize the AI plugin, and to define the AI model.
 */

import {genkit, ai} from '@genkit-ai/next';
import {googleAI} from '@genkit-ai/google-genai';

// Construct the Google AI plugin configuration
const googleAIPlugin = googleAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

// Initialize Genkit with the configured Google AI plugin
genkit({
  plugins: [googleAIPlugin],
});

export {ai};


