import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {next} from '@genkit-ai/next';

// This is the correct way to pass the API key in production environments like Vercel.
// It reads the environment variable and explicitly passes it to the plugin.
const googleAiPlugin = googleAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

export default genkit({
  plugins: [
    next(),
    googleAiPlugin, // Use the configured plugin
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});



