import { z } from 'zod';

export const suggestionsSchema = z.object({
  resources: z.array(z.string()),
  studyTips: z.array(z.string()),
});

export type SuggestResourcesOutput = z.infer<typeof suggestionsSchema>;
