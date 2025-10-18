import React, { useState, useCallback } from 'react';
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

const GeneratorDemo: React.FC = () => {
    const [fandom, setFandom] = useState<string>(FANDOM_OPTIONS[0]);
    const [tone, setTone] = useState<string>(TONE_OPTIONS[0]);

    const [prompt, setPrompt] = useState<string>('');
    const [expandedPrompt, setExpandedPrompt] = useState<string>('');
    const [dialogue, setDialogue] = useState<string>('');
    
    const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
    const [isLoadingExpanded, setIsLoadingExpanded] = useState(false);
    const [isLoadingDialogue, setIsLoadingDialogue] = useState(false);

    const handleGeneratePrompt = useCallback(async () => {
        setIsLoadingPrompt(true);
        setPrompt('');
        setExpandedPrompt('');
        setDialogue('');
        const result = await generateComicPrompt(fandom, tone);
        setPrompt(result);
        setIsLoadingPrompt(false);
    }, [fandom, tone]);

    const handleExpandPrompt = useCallback(async () => {
        if (!prompt) return;
        setIsLoadingExpanded(true);
        setExpandedPrompt('');
        const result = await expandPromptToPanels(prompt);
        setExpandedPrompt(result);
        setIsLoadingExpanded(false);
    }, [prompt]);

    const handleGenerateDialogue = useCallback(async () => {
        if (!prompt) return;
        setIsLoadingDialogue(true);
        setDialogue('');
        const result = await generateDialogueForPrompt(prompt, expandedPrompt);
        setDialogue(result);
        setIsLoadingDialogue(false);
    }, [prompt, expandedPrompt]);


    return (
        <section id="demo" className="mb-20 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Interaktiv Generator Demo</h2>
                <p className="mt-4 text-lg text-gray-600">Prøv en forenklet versjon av prompt-generatoren. Velg et univers og en tone for å se et eksempel.</p>
            </div>

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="fandom-select" className="block text-sm font-medium text-gray-700 mb-1">Velg Univers</label>
                        <select id="fandom-select" value={fandom} onChange={e => setFandom(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            {FANDOM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Velg Tone</label>
                        <div className="flex flex-wrap gap-2">
                            {TONE_OPTIONS.map(opt => (
                                <button key={opt} onClick={() => setTone(opt)} className={`flex-grow px-4 py-2 text-sm border rounded-md transition-colors ${tone === opt ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                 <button onClick={handleGeneratePrompt} disabled={isLoadingPrompt} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400">
                    {isLoadingPrompt ? <Loader /> : <span>✨ Generer AI-Prompt</span>}
                </button>
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800">Din AI-genererte Prompt:</h4>
                    <div className="mt-2 p-4 bg-gray-100 rounded-md min-h-[120px] text-gray-700 flex justify-center items-center">
                        {isLoadingPrompt && <Loader />}
                        {!isLoadingPrompt && !prompt && <span className="text-gray-500">Velg et univers og en tone, og la AI-en skape en unik idé for deg!</span>}
                        {!isLoadingPrompt && prompt && <p>{prompt}</p>}
                    </div>
                    {prompt && !prompt.startsWith("En feil oppstod") && (
                        <div className="mt-4 space-y-4">
                            <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                                <button onClick={handleExpandPrompt} disabled={isLoadingExpanded} className="w-full text-green-800 font-bold flex items-center justify-center space-x-2 disabled:opacity-50">
                                   {isLoadingExpanded ? <Loader /> : <span>✨ Utvid Idéen (3 Paneler)</span>}
                                </button>
                                {expandedPrompt && !isLoadingExpanded && (
                                    <div className="mt-2 text-gray-700">
                                        <FormattedText text={expandedPrompt} regex={/(Panel \d:)/g} tag="strong" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border border-purple-200 bg-purple-50 rounded-md">
                                 <button onClick={handleGenerateDialogue} disabled={isLoadingDialogue} className="w-full text-purple-800 font-bold flex items-center justify-center space-x-2 disabled:opacity-50">
                                    {isLoadingDialogue ? <Loader /> : <span>✨ Generer Dialog</span>}
                                </button>
                                {dialogue && !isLoadingDialogue && (
                                    <div className="mt-2 text-gray-700">
                                        <FormattedText text={dialogue} regex={/(\w+:)/g} tag="strong" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GeneratorDemo;
