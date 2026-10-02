'use server';

import { suggestionsSchema } from '@/lib/suggestions';

export async function getSuggestions(subject: string) {
  const apiUrl = process.env.CLASSYNC_API_URL;
  if (!apiUrl) {
    throw new Error('CLASSYNC_API_URL is not configured.');
  }

  const response = await fetch(`${apiUrl.replace(/\/+$/, '')}/api/suggestions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error ?? `Suggestion API returned HTTP ${response.status}.`);
  }

  return suggestionsSchema.parse(await response.json());
}
