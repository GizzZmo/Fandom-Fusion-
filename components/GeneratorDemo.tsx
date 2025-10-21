import React, { useState, useCallback, useEffect } from 'react';
import { FANDOM_OPTIONS, TONE_OPTIONS } from '../constants';
import { generateComicPrompt, expandPromptToPanels, generateDialogueForPrompt } from '../services/geminiService';
import Loader from './Loader';

// Helper component to render formatted text from Gemini
// Fix: Changed `keyof JSX.IntrinsicElements` to `React.ElementType` to fix "Cannot find namespace 'JSX'" error.
const FormattedText: React.FC<{ text: string; regex: RegExp; tag: React.ElementType }> = ({ text, regex, tag }) => {
    const parts = text.split(regex);
    const Tag = tag;

    return (
        <p>
            {parts.map((part, i) =>
                i % 2 === 1 ? <Tag key={i} className="block mt-2 mb-1">{part}</Tag> : <span key={i}>{part}</span>
            )}
        </p>
    );
};

interface PromptHistoryItem {
    prompt: string;
    fandom: string;
    tone: string;
    characters: string;
    focus: string;
}

interface GeneratorDemoProps {
    apiKey: string;
}

const GeneratorDemo: React.FC<GeneratorDemoProps> = ({ apiKey }) => {
    const [fandom, setFandom] = useState<string>(FANDOM_OPTIONS[0]);
    const [tone, setTone] = useState<string>(TONE_OPTIONS[0]);
    const [characters, setCharacters] = useState<string>('');
    const [focus, setFocus] = useState<string>('');

    const [prompt, setPrompt] = useState<string>('');
    const [expandedPrompt, setExpandedPrompt] = useState<string>('');
    const [dialogue, setDialogue] = useState<string>('');
    
    const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
    const [isLoadingExpanded, setIsLoadingExpanded] = useState(false);
    const [isLoadingDialogue, setIsLoadingDialogue] = useState(false);
    const [error, setError] = useState<string>('');
    const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([]);
    const [generationStatus, setGenerationStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('promptHistory');
            if (storedHistory) {
                setPromptHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to parse prompt history from localStorage", error);
            setPromptHistory([]);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('promptHistory', JSON.stringify(promptHistory));
        } catch (error) {
            console.error("Failed to save prompt history to localStorage", error);
        }
    }, [promptHistory]);

    useEffect(() => {
        if (generationStatus === 'success' || generationStatus === 'error') {
            const timer = setTimeout(() => {
                setGenerationStatus('idle');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [generationStatus]);


    const handleGeneratePrompt = useCallback(async () => {
        if (!apiKey) {
            setError("Vennligst legg inn en API-nøkkel for å generere prompts.");
            setGenerationStatus('error');
            return;
        }

        setIsLoadingPrompt(true);
        setPrompt('');
        setExpandedPrompt('');
        setDialogue('');
        setError('');

        try {
            const result = await generateComicPrompt(apiKey, fandom, tone, characters, focus);
            setPrompt(result);
            setGenerationStatus('success');

            if (result) {
                const newHistoryItem: PromptHistoryItem = { prompt: result, fandom, tone, characters, focus };
                setPromptHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 5));
            }
        } catch (err) {
            setGenerationStatus('error');
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("En ukjent feil oppstod.");
            }
        } finally {
            setIsLoadingPrompt(false);
        }
    }, [apiKey, fandom, tone, characters, focus]);

    const handleExpandPrompt = useCallback(async () => {
        if (!prompt) return;
        setIsLoadingExpanded(true);
        setExpandedPrompt('');
        try {
            const result = await expandPromptToPanels(apiKey, prompt);
            setExpandedPrompt(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "En ukjent feil oppstod.";
            setExpandedPrompt(`Feil under utviding: ${message}`);
        } finally {
            setIsLoadingExpanded(false);
        }
    }, [apiKey, prompt]);

    const handleGenerateDialogue = useCallback(async () => {
        if (!prompt) return;
        setIsLoadingDialogue(true);
        setDialogue('');
        try {
            const result = await generateDialogueForPrompt(apiKey, prompt, expandedPrompt);
            setDialogue(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "En ukjent feil oppstod.";
            setDialogue(`Feil under dialoggenerering: ${message}`);
        } finally {
            setIsLoadingDialogue(false);
        }
    }, [apiKey, prompt, expandedPrompt]);

    const handleHistoryClick = (item: PromptHistoryItem) => {
        setFandom(item.fandom);
        setTone(item.tone);
        setCharacters(item.characters);
        setFocus(item.focus);
        setPrompt(item.prompt);
        setExpandedPrompt('');
        setDialogue('');
        setError('');
    };

    const getButtonClass = () => {
        if (generationStatus === 'success') return 'bg-green-500 hover:bg-green-600';
        if (generationStatus === 'error') return 'bg-red-600 hover:bg-red-700';
        return 'bg-[#7F00FF] hover:bg-[#5D00B8] disabled:bg-[#7F00FF]/50';
    };

    const getButtonContent = () => {
        if (isLoadingPrompt) return <Loader />;
        if (generationStatus === 'success') return <span>✓ Suksess!</span>;
        if (generationStatus === 'error') return <span>✗ Feil Oppstod</span>;
        return <span>&gt; Generer AI-Prompt</span>;
    };


    return (
        <section id="demo" className="mb-20 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white text-shadow-cyan">Interaktiv Generator Demo</h2>
                <p className="mt-4 text-lg text-[#9E9E9E]">Prøv en forenklet versjon av prompt-generatoren. Velg et univers og en tone for å se et eksempel.</p>
            </div>

            <div className="max-w-3xl mx-auto bg-[#1A1A1A] p-8 rounded-lg border border-[#7F00FF] box-shadow-violet">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="fandom-select" className="block text-sm font-medium text-[#9E9E9E] mb-1">Velg Fandom</label>
                        <select id="fandom-select" value={fandom} onChange={e => setFandom(e.target.value)} className="w-full p-2 bg-black text-[#00FFD1] border border-[#7F00FF] rounded-md focus:ring-2 focus:ring-[#00FFD1] focus:outline-none">
                            {FANDOM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9E9E9E] mb-1">Velg Tone</label>
                        <div className="flex flex-wrap gap-2">
                            {TONE_OPTIONS.map(opt => (
                                <button key={opt} onClick={() => setTone(opt)} className={`flex-grow px-4 py-2 text-sm border-2 rounded-md transition-colors ${tone === opt ? 'bg-[#7F00FF] text-black border-[#7F00FF]' : 'border-[#7F00FF] text-[#00FFD1]'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="characters-input" className="block text-sm font-medium text-[#9E9E9E] mb-1">Karakterer (valgfritt)</label>
                        <input 
                            type="text" 
                            id="characters-input" 
                            value={characters} 
                            onChange={e => setCharacters(e.target.value)}
                            placeholder="F.eks. Luke Skywalker, Darth Vader" 
                            className="w-full p-2 bg-black text-[#00FFD1] border border-[#7F00FF] rounded-md focus:ring-2 focus:ring-[#00FFD1] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="focus-input" className="block text-sm font-medium text-[#9E9E9E] mb-1">Fokus (valgfritt)</label>
                        <input 
                            type="text" 
                            id="focus-input" 
                            value={focus} 
                            onChange={e => setFocus(e.target.value)}
                            placeholder="F.eks. Et uventet teknisk problem" 
                            className="w-full p-2 bg-black text-[#00FFD1] border border-[#7F00FF] rounded-md focus:ring-2 focus:ring-[#00FFD1] focus:outline-none"
                        />
                    </div>
                </div>
                 <button 
                    onClick={handleGeneratePrompt} 
                    disabled={isLoadingPrompt} 
                    className={`w-full text-black font-bold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center space-x-2 ${getButtonClass()}`}
                >
                    {getButtonContent()}
                </button>
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white">Din AI-genererte Prompt:</h4>
                    <div className="mt-2 p-4 bg-black/50 rounded-md min-h-[120px] text-[#9E9E9E] flex justify-center items-center text-center border border-[#7F00FF]/50">
                        {isLoadingPrompt && <Loader />}
                        {!isLoadingPrompt && error && <p className="text-red-500">{error}</p>}
                        {!isLoadingPrompt && !error && !prompt && <span className="text-gray-500">Kjør system... Ventende på input...</span>}
                        {!isLoadingPrompt && !error && prompt && <p className="text-[#00FFD1]">{prompt}</p>}
                    </div>
                    {prompt && !error && (
                        <div className="mt-4 space-y-4">
                            <div className="p-4 border border-[#00FFD1]/50 bg-black/30 rounded-md">
                                <button onClick={handleExpandPrompt} disabled={isLoadingExpanded} className="w-full text-[#00FFD1] font-bold flex items-center justify-center space-x-2 disabled:opacity-50">
                                   {isLoadingExpanded ? <Loader /> : <span>&gt; Utvid Idéen (3 Paneler)</span>}
                                </button>
                                {expandedPrompt && !isLoadingExpanded && (
                                    <div className="mt-2 text-[#9E9E9E]">
                                        {expandedPrompt.startsWith('Feil under utviding:') ? (
                                            <p className="text-red-500">{expandedPrompt}</p>
                                        ) : (
                                            <FormattedText text={expandedPrompt} regex={/(Panel \d:)/g} tag="strong" />
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border border-[#FF00FF]/50 bg-black/30 rounded-md">
                                 <button onClick={handleGenerateDialogue} disabled={isLoadingDialogue} className="w-full text-[#FF00FF] font-bold flex items-center justify-center space-x-2 disabled:opacity-50">
                                    {isLoadingDialogue ? <Loader /> : <span>&gt; Generer Dialog</span>}
                                </button>
                                {dialogue && !isLoadingDialogue && (
                                    <div className="mt-2 text-[#9E9E9E]">
                                        {dialogue.startsWith('Feil under dialoggenerering:') ? (
                                            <p className="text-red-500">{dialogue}</p>
                                        ) : (
                                            <FormattedText text={dialogue} regex={/(\w+:)/g} tag="strong" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {promptHistory.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[#7F00FF]/50">
                        <h4 className="text-lg font-semibold text-white mb-3">Tidligere Prompts:</h4>
                        <div className="space-y-2">
                            {promptHistory.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleHistoryClick(item)}
                                    className="w-full text-left p-3 bg-black/50 hover:bg-[#1a1a1a] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#00FFD1] border border-[#7F00FF]/30"
                                    aria-label={`Gjenbruk prompt: ${item.prompt}`}
                                >
                                    <p className="text-sm text-[#9E9E9E] truncate">{item.prompt}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.fandom} &bull; {item.tone}
                                        {item.characters && ` &bull; Karakterer: ${item.characters}`}
                                        {item.focus && ` &bull; Fokus: ${item.focus}`}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GeneratorDemo;