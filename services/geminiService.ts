/**
 * Gemini Service
 * 
 * This service handles all interactions with the Google Gemini AI API.
 * It provides functions for generating comic prompts, expanding them into
 * panel breakdowns, creating dialogue, and generating crossover scenarios.
 * 
 * @module geminiService
 */

import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

/** Initialized Gemini AI client */
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Internal helper function to call the Gemini API
 * 
 * @param contents - The prompt/query to send to Gemini
 * @param systemInstruction - Optional system instruction to guide the AI's behavior
 * @returns The AI-generated text response
 * @throws Will log errors to console but returns user-friendly error message
 * 
 * @internal
 */
const callGemini = async (contents: string, systemInstruction?: string): Promise<string> => {
    try {
        // Fix: Use systemInstruction and pass contents as a simple string.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: systemInstruction ? { systemInstruction } : undefined,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "En feil oppstod under kall til AI. Vennligst sjekk konsollen.";
    }
};

/**
 * Generates a creative comic strip prompt based on a fictional universe and desired tone
 * 
 * This function creates single-paragraph prompts suitable for 3-panel comic strips.
 * The prompts focus on specific, visual scenarios involving 1-3 key characters from
 * the selected universe.
 * 
 * @param fandom - The fictional universe (e.g., "Star Wars", "Marvel (MCU)")
 * @param tone - The desired tone: "Humoristisk" (Humorous), "Hjertevarm" (Heartwarming), or "Absurd"
 * @returns A Promise resolving to a creative prompt string in Norwegian
 * 
 * @example
 * ```typescript
 * const prompt = await generateComicPrompt("Star Wars", "Humoristisk");
 * // Returns: "Luke Skywalker prøver å lære Yoda å spille videospill..."
 * ```
 * 
 * @public
 */
export const generateComicPrompt = (fandom: string, tone: string) => {
    const systemInstruction = `You are a creative writer specializing in comic strips. Your responses must be in Norwegian.`;
    const contents = `Generate a short, single-paragraph prompt for a 3-panel comic strip. The comic strip is set in the "${fandom}" universe and must have a "${tone}" tone. Focus on a specific, visual, and simple scenario involving 1-3 key characters.`;
    return callGemini(contents, systemInstruction);
};

/**
 * Expands a comic prompt into detailed descriptions for three panels
 * 
 * Takes a single-paragraph prompt and breaks it down into visual descriptions
 * for each of the three panels in a comic strip. This helps artists visualize
 * the story progression and key moments.
 * 
 * @param prompt - The original comic prompt to expand
 * @returns A Promise resolving to three panel descriptions in Norwegian
 * 
 * @example
 * ```typescript
 * const panels = await expandPromptToPanels("Luke og Vader baker kaker...");
 * // Returns: "Panel 1: Luke og Vader står ved en benk med ingredienser..."
 * ```
 * 
 * @public
 */
export const expandPromptToPanels = (prompt: string) => {
    const systemInstruction = `You are an assistant for a comic artist. Your task is to expand a comic strip prompt into a 3-panel breakdown. For each panel, provide a short, visual description. Keep the language simple and in Norwegian.`;
    const contents = `Prompt: "${prompt}"`;
    return callGemini(contents, systemInstruction);
};

/**
 * Generates dialogue for characters in a comic prompt
 * 
 * Creates short, witty dialogue exchanges between characters that fit the given
 * scenario. The dialogue is formatted as "Character: line" and is designed to be
 * appropriate for comic strip speech bubbles.
 * 
 * @param prompt - The original comic prompt
 * @param panelBreakdown - Optional panel descriptions for additional context
 * @returns A Promise resolving to character dialogue in Norwegian
 * 
 * @example
 * ```typescript
 * const dialogue = await generateDialogueForPrompt(
 *   "Luke og Vader baker kaker...",
 *   "Panel 1: De leser en oppskrift..."
 * );
 * // Returns: "Luke: 'Farfar, du må følge oppskriften!'\nVader: 'Jeg er Sith Lord...'"
 * ```
 * 
 * @public
 */
export const generateDialogueForPrompt = (prompt: string, panelBreakdown?: string) => {
    const systemInstruction = `You are a dialogue writer for comic strips. Your task is to write a short, witty dialogue exchange between the characters involved that would fit a given scene. Format the dialogue as "Karakter: replikk". Keep the language simple and in Norwegian.`;
    let contents = `Prompt: "${prompt}"`;
    if (panelBreakdown) {
        contents += `\n\nPanel Breakdown for context: "${panelBreakdown}"`;
    }
    return callGemini(contents, systemInstruction);
};

/**
 * Generates a creative crossover prompt combining two fictional universes
 * 
 * Creates unique, unexpected scenarios where characters from two different fandoms
 * interact. These fusion prompts are designed to be fun, surprising, and visually
 * interesting, perfect for exploring "what if" scenarios.
 * 
 * @param fandom1 - The first fictional universe
 * @param fandom2 - The second fictional universe
 * @returns A Promise resolving to a crossover scenario in Norwegian
 * 
 * @example
 * ```typescript
 * const fusion = await generateFusionPrompt("Star Wars", "Harry Potter");
 * // Returns: "Luke Skywalker oppdager at han er trollmann og må velge..."
 * ```
 * 
 * @public
 */
export const generateFusionPrompt = (fandom1: string, fandom2: string) => {
    const systemInstruction = `You are a highly creative writer. Your task is to create crossover comic strip prompts. Your responses must be in Norwegian.`;
    const contents = `Generate a short, single-paragraph prompt for a 3-panel comic strip that is a crossover between the "${fandom1}" universe and the "${fandom2}" universe. The prompt should be fun, unexpected, and focus on a specific, visual interaction between characters from both worlds.`;
    return callGemini(contents, systemInstruction);
};
