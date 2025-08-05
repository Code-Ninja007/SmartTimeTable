// src/ai/flows/suggest-resources.ts
'use server';
/**
 * @fileOverview A flow that suggests learning resources for a given subject.
 *
 * - suggestResources - A function that suggests resources for a subject.
 * - SuggestResourcesInput - The input type for the suggestResources function.
 * - SuggestResourcesOutput - The return type for the suggestResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResourcesInputSchema = z.object({
  subject: z.string().describe('The name of the subject to find resources for.'),
});
export type SuggestResourcesInput = z.infer<typeof SuggestResourcesInputSchema>;

const SuggestResourcesOutputSchema = z.object({
  resources: z.array(z.string()).describe('A list of suggested learning resources for the subject.'),
  studyTips: z.array(z.string()).describe('A list of study tips for the subject.'),
});
export type SuggestResourcesOutput = z.infer<typeof SuggestResourcesOutputSchema>;

export async function suggestResources(input: SuggestResourcesInput): Promise<SuggestResourcesOutput> {
  return suggestResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResourcesPrompt',
  input: {schema: SuggestResourcesInputSchema},
  output: {schema: SuggestResourcesOutputSchema},
  prompt: `You are a helpful AI assistant that suggests learning resources and study tips for college subjects.

  Suggest 3 learning resources (e.g., websites, books, online courses) and 3 study tips for the following subject:

  Subject: {{{subject}}}

  Format your response as a JSON object with "resources" and "studyTips" arrays.
  `,
});

const suggestResourcesFlow = ai.defineFlow(
  {
    name: 'suggestResourcesFlow',
    inputSchema: SuggestResourcesInputSchema,
    outputSchema: SuggestResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
