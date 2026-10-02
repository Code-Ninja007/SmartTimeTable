import 'dotenv/config';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

dotenv.config({ path: '../.env.local' });

const port = Number(process.env.PORT ?? 4000);
const model = process.env.GEMINI_MODEL ?? 'googleai/gemini-3.8-flash';
const requestLimit = 12 * 1024;
const requestsPerMinute = 15;
const requestCounts = new Map();

const ai = genkit({
  plugins: [googleAI()],
  model,
});

const suggestionsSchema = z.object({
  resources: z.array(z.string()),
  studyTips: z.array(z.string()),
});

const prompt = ai.definePrompt({
  name: 'suggestResourcesPrompt',
  input: {
    schema: z.object({
      subject: z.string().min(1).max(120),
    }),
  },
  output: { schema: suggestionsSchema },
  prompt: `You are a helpful AI study assistant. Suggest 3 learning resources
(websites, books, or online courses) and 3 practical study tips for this
college subject: {{{subject}}}. Return the requested structured output.`,
});

function sendJson(response, statusCode, payload, origin = '*') {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
  });
  response.end(JSON.stringify(payload));
}

function getAllowedOrigin(request) {
  const origin = request.headers.origin;
  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (!origin) return '*';
  if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return origin;
  return null;
}

function isRateLimited(request) {
  const now = Date.now();
  const address = request.socket.remoteAddress ?? 'unknown';
  const record = requestCounts.get(address);

  if (!record || now - record.startedAt >= 60_000) {
    requestCounts.set(address, { startedAt: now, count: 1 });
    return false;
  }

  record.count += 1;
  return record.count > requestsPerMinute;
}

async function readJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > requestLimit) {
      throw new Error('Request body is too large.');
    }
  }
  return JSON.parse(body);
}

function getProviderStatus(error) {
  return Number(error?.status ?? error?.cause?.status);
}

async function getSuggestionsWithRetry(input) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const { output } = await prompt(input);
      if (!output) {
        throw new Error('The AI provider returned no suggestions.');
      }
      return suggestionsSchema.parse(output);
    } catch (error) {
      const status = getProviderStatus(error);
      const isTemporary = status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
      if (!isTemporary || attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
  throw new Error('Suggestions are temporarily unavailable.');
}

const server = createServer(async (request, response) => {
  const origin = getAllowedOrigin(request);
  if (origin === null) {
    sendJson(response, 403, { error: 'Origin is not allowed.' }, 'null');
    return;
  }

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {}, origin);
    return;
  }

  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    sendJson(response, 200, { status: 'ok' }, origin);
    return;
  }

  if (request.method !== 'POST' || url.pathname !== '/api/suggestions') {
    sendJson(response, 404, { error: 'Not found.' }, origin);
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    sendJson(response, 503, { error: 'AI suggestions are not configured.' }, origin);
    return;
  }

  if (isRateLimited(request)) {
    sendJson(response, 429, { error: 'Too many requests. Please try again shortly.' }, origin);
    return;
  }

  try {
    const input = z.object({ subject: z.string().trim().min(1).max(120) }).parse(
      await readJson(request),
    );
    sendJson(response, 200, await getSuggestionsWithRetry(input), origin);
  } catch (error) {
    if (error instanceof z.ZodError) {
      sendJson(response, 400, { error: 'Provide a subject of 1 to 120 characters.' }, origin);
      return;
    }

    if (error instanceof SyntaxError || error.message === 'Request body is too large.') {
      sendJson(response, 400, { error: 'The request body must be a small JSON object.' }, origin);
      return;
    }

    if ([429, 500, 502, 503, 504].includes(getProviderStatus(error))) {
      console.warn('AI provider is temporarily unavailable:', error.message);
      sendJson(response, 503, { error: 'The AI service is temporarily busy. Please try again shortly.' }, origin);
      return;
    }

    console.error('Suggestion request failed:', error);
    sendJson(response, 502, { error: 'Suggestions are temporarily unavailable.' }, origin);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`ClassSync API listening on port ${port}`);
});
