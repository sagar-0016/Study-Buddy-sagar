import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    '\n💡 The Gemini API key is missing. AI features will not work.' +
    '\n   Please add GEMINI_API_KEY="your-api-key" to the .env file in the root of your project.\n'
  );
}

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
