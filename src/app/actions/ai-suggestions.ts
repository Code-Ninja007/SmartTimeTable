'use server';

import { suggestResources } from '@/ai/flows/suggest-resources';

export async function getSuggestions(subject: string) {
  return await suggestResources({ subject });
}
