# 📡 API Documentation

This document provides comprehensive documentation for the Fandom-Fusion API and service functions.

---

## Table of Contents

- [Gemini Service](#gemini-service)
  - [generateComicPrompt](#generatecomicprompt)
  - [expandPromptToPanels](#expandprompttopanels)
  - [generateDialogueForPrompt](#generatedialogueforprompt)
  - [generateFusionPrompt](#generatefusionprompt)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Best Practices](#best-practices)

---

## Gemini Service

The `geminiService` module provides functions for interacting with Google's Gemini AI to generate creative comic strip content.

**Import:**
```typescript
import { 
  generateComicPrompt, 
  expandPromptToPanels,
  generateDialogueForPrompt,
  generateFusionPrompt
} from './services/geminiService';
```

---

### generateComicPrompt

Generates a creative comic strip prompt based on a fictional universe and desired tone.

**Signature:**
```typescript
generateComicPrompt(fandom: string, tone: string): Promise<string>
```

**Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `fandom` | `string` | The fictional universe (e.g., "Star Wars", "Marvel (MCU)") | Yes |
| `tone` | `string` | The desired tone: "Humoristisk", "Hjertevarm", or "Absurd" | Yes |

**Returns:**
- `Promise<string>` - A creative prompt string in Norwegian

**Example:**
```typescript
const prompt = await generateComicPrompt("Star Wars", "Humoristisk");
console.log(prompt);
// Output: "Luke Skywalker prøver å lære Yoda å spille videospill, 
//          men Yoda insisterer på at 'Kraft, du trenger, ikke kontroller.'"
```

**Response Format:**
- Single paragraph
- 1-3 key characters mentioned
- Specific, visual scenario
- Appropriate for 3-panel comic strip

**Error Handling:**
- Returns Norwegian error message if API call fails
- Logs detailed error to console

---

### expandPromptToPanels

Expands a comic prompt into detailed descriptions for three panels.

**Signature:**
```typescript
expandPromptToPanels(prompt: string): Promise<string>
```

**Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `prompt` | `string` | The original comic prompt to expand | Yes |

**Returns:**
- `Promise<string>` - Three panel descriptions in Norwegian

**Example:**
```typescript
const prompt = "Luke og Vader baker kaker på Dødsstjernen...";
const panels = await expandPromptToPanels(prompt);
console.log(panels);
// Output:
// "Panel 1: Luke og Vader står ved en benk med ingredienser og deig
//  Panel 2: Vader bruker Kraften til å blande deigen, men det går galt
//  Panel 3: Stormtroopers prøver å smake kakene med hjelmene på"
```

**Response Format:**
- Three distinct panel descriptions
- Visual and action-focused
- Sequential narrative flow
- Clear setup, action, and punchline/resolution

---

### generateDialogueForPrompt

Generates dialogue for characters in a comic prompt.

**Signature:**
```typescript
generateDialogueForPrompt(
  prompt: string, 
  panelBreakdown?: string
): Promise<string>
```

**Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `prompt` | `string` | The original comic prompt | Yes |
| `panelBreakdown` | `string` | Optional panel descriptions for context | No |

**Returns:**
- `Promise<string>` - Character dialogue in Norwegian

**Example:**
```typescript
const prompt = "Luke og Vader baker kaker...";
const panels = "Panel 1: De leser oppskriften...";
const dialogue = await generateDialogueForPrompt(prompt, panels);
console.log(dialogue);
// Output:
// "Luke: 'Farfar, du må faktisk følge oppskriften!'
//  Vader: 'Jeg er en Sith Lord. Jeg følger ingen oppskrifter.'
//  Luke: 'Det forklarer hvorfor ingen liker julekakaoen din...'"
```

**Response Format:**
- Format: `"Character: line"`
- 2-4 dialogue exchanges
- Witty and character-appropriate
- Suitable for speech bubbles

---

### generateFusionPrompt

Generates a creative crossover prompt combining two fictional universes.

**Signature:**
```typescript
generateFusionPrompt(fandom1: string, fandom2: string): Promise<string>
```

**Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `fandom1` | `string` | The first fictional universe | Yes |
| `fandom2` | `string` | The second fictional universe | Yes |

**Returns:**
- `Promise<string>` - A crossover scenario in Norwegian

**Example:**
```typescript
const fusion = await generateFusionPrompt("Star Wars", "Harry Potter");
console.log(fusion);
// Output: "Luke Skywalker oppdager at han er en trollmann og må velge 
//          mellom å fullføre Jedi-treningen eller begynne på Galtvort. 
//          Dumbledore og Yoda krangler om hvem som er den beste mentoren."
```

**Response Format:**
- Single paragraph
- Characters from both universes
- Unexpected but logical interaction
- Fun and creative scenario

---

## Error Handling

All service functions implement graceful error handling:

**On Success:**
```typescript
{
  status: 'success',
  data: 'Generated content...'
}
```

**On Error:**
```typescript
{
  status: 'error',
  message: 'En feil oppstod under kall til AI. Vennligst sjekk konsollen.'
}
```

**Common Error Scenarios:**

1. **Missing API Key**
   ```
   Error: API_KEY environment variable not set
   ```
   **Solution:** Set `API_KEY` in `.env.local`

2. **Network Failure**
   ```
   Error calling Gemini API: NetworkError
   ```
   **Solution:** Check internet connection

3. **Rate Limit Exceeded**
   ```
   Error: 429 Too Many Requests
   ```
   **Solution:** Wait before making more requests

4. **Invalid Parameters**
   ```
   Error: Invalid request parameters
   ```
   **Solution:** Verify fandom and tone values

---

## Rate Limiting

Google Gemini API has rate limits that vary by tier:

**Free Tier:**
- 60 requests per minute
- 1,500 requests per day

**Recommendations:**
- Implement client-side debouncing
- Cache repeated requests
- Show loading states to users
- Handle rate limit errors gracefully

**Example Rate Limit Handler:**
```typescript
const generateWithRetry = async (fandom: string, tone: string, retries = 3) => {
  try {
    return await generateComicPrompt(fandom, tone);
  } catch (error) {
    if (error.code === 429 && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return generateWithRetry(fandom, tone, retries - 1);
    }
    throw error;
  }
};
```

---

## Best Practices

### 1. Input Validation

Always validate inputs before calling API functions:

```typescript
const VALID_FANDOMS = [
  "Star Wars",
  "Ringenes Herre",
  "Marvel (MCU)",
  "Pokémon",
  "Avatar: The Last Airbender",
  "Harry Potter"
];

const VALID_TONES = ["Humoristisk", "Hjertevarm", "Absurd"];

const isValidInput = (fandom: string, tone: string): boolean => {
  return VALID_FANDOMS.includes(fandom) && VALID_TONES.includes(tone);
};
```

### 2. Loading States

Always show loading states during API calls:

```typescript
const [isLoading, setIsLoading] = useState(false);
const [prompt, setPrompt] = useState('');

const handleGenerate = async () => {
  setIsLoading(true);
  try {
    const result = await generateComicPrompt(fandom, tone);
    setPrompt(result);
  } finally {
    setIsLoading(false);
  }
};
```

### 3. Error Display

Provide user-friendly error messages:

```typescript
const [error, setError] = useState<string | null>(null);

try {
  const result = await generateComicPrompt(fandom, tone);
  setError(null);
} catch (err) {
  setError('Kunne ikke generere prompt. Vennligst prøv igjen.');
}
```

### 4. Caching

Implement simple caching to avoid redundant API calls:

```typescript
const promptCache = new Map<string, string>();

const getCachedPrompt = async (fandom: string, tone: string) => {
  const key = `${fandom}-${tone}`;
  
  if (promptCache.has(key)) {
    return promptCache.get(key);
  }
  
  const prompt = await generateComicPrompt(fandom, tone);
  promptCache.set(key, prompt);
  return prompt;
};
```

### 5. Timeout Handling

Set reasonable timeouts for API calls:

```typescript
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), ms)
    )
  ]);
};

const prompt = await withTimeout(
  generateComicPrompt(fandom, tone),
  30000 // 30 seconds
);
```

---

## Type Definitions

```typescript
/**
 * Supported fictional universes
 */
type Fandom = 
  | "Star Wars"
  | "Ringenes Herre"
  | "Marvel (MCU)"
  | "Pokémon"
  | "Avatar: The Last Airbender"
  | "Harry Potter";

/**
 * Supported tone options
 */
type Tone = "Humoristisk" | "Hjertevarm" | "Absurd";

/**
 * API response type
 */
interface ApiResponse {
  status: 'success' | 'error';
  data?: string;
  message?: string;
}
```

---

## Support

For API-related issues:
1. Check the [Troubleshooting Guide](../README.md#troubleshooting)
2. Review [Google Gemini API Documentation](https://ai.google.dev/docs)
3. Open an issue on [GitHub](https://github.com/GizzZmo/Fandom-Fusion-/issues)

---

<div align="center">

**[⬆ Back to Top](#-api-documentation)**

</div>
