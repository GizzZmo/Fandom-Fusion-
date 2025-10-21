import { GoogleGenAI } from "@google/genai";

const callGemini = async (apiKey: string, contents: string, systemInstruction?: string): Promise<string> => {
    if (!apiKey) {
        throw new Error("API-nøkkel er ikke angitt. Vennligst legg inn nøkkelen din for å fortsette.");
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: systemInstruction ? { systemInstruction } : undefined,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Throw a user-friendly error that the component can catch and display.
        throw new Error("AI-generering feilet. Sjekk at API-nøkkelen er gyldig og prøv igjen.");
    }
};

export const generateComicPrompt = (apiKey: string, fandom: string, tone: string, characters: string, focus: string) => {
    const systemInstruction = `You are a creative writer specializing in comic strips. Your responses must be in Norwegian.`;
    
    let contents = `Generate a short, single-paragraph prompt for a 3-panel comic strip. The comic strip is set in the "${fandom}" universe and must have a "${tone}" tone. Focus on a specific, visual, and simple scenario.`;

    if (characters) {
        contents += ` It should feature the following characters: ${characters}.`;
    } else {
        contents += ` It should involve 1-3 key characters.`;
    }

    if (focus) {
        contents += ` The specific focus should be on: ${focus}.`;
    }
    
    return callGemini(apiKey, contents, systemInstruction);
};

export const expandPromptToPanels = (apiKey: string, prompt: string) => {
    const systemInstruction = `You are an assistant for a comic artist. Your task is to expand a comic strip prompt into a 3-panel breakdown. For each panel, provide a short, visual description. Keep the language simple and in Norwegian.`;
    const contents = `Prompt: "${prompt}"`;
    return callGemini(apiKey, contents, systemInstruction);
};

export const generateDialogueForPrompt = (apiKey: string, prompt: string, panelBreakdown?: string) => {
    const systemInstruction = `You are a dialogue writer for comic strips. Your task is to write a short, witty dialogue exchange between the characters involved that would fit a given scene. Format the dialogue as "Karakter: replikk". Keep the language simple and in Norwegian.`;
    let contents = `Prompt: "${prompt}"`;
    if (panelBreakdown) {
        contents += `\n\nPanel Breakdown for context: "${panelBreakdown}"`;
    }
    return callGemini(apiKey, contents, systemInstruction);
};

export const generateFusionPrompt = (apiKey: string, fandom1: string, fandom2: string) => {
    const systemInstruction = `You are a highly creative writer. Your task is to create crossover comic strip prompts. Your responses must be in Norwegian.`;
    const contents = `Generate a short, single-paragraph prompt for a 3-panel comic strip that is a crossover between the "${fandom1}" universe and the "${fandom2}" universe. The prompt should be fun, unexpected, and focus on a specific, visual interaction between characters from both worlds.`;
    return callGemini(apiKey, contents, systemInstruction);
};