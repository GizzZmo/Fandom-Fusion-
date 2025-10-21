import React, { useState, useCallback } from 'react';
import { FANDOM_OPTIONS } from '../constants';
import { generateFusionPrompt } from '../services/geminiService';
import Loader from './Loader';

interface FusionDemoProps {
    apiKey: string;
}

const FusionDemo: React.FC<FusionDemoProps> = ({ apiKey }) => {
    const [fandom1, setFandom1] = useState<string>(FANDOM_OPTIONS[1]);
    const [fandom2, setFandom2] = useState<string>(FANDOM_OPTIONS[5]);
    const [result, setResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleGenerate = useCallback(async () => {
        if (fandom1 === fandom2) {
            setError("Vennligst velg to forskjellige universer for en fusion-prompt.");
            return;
        }
        if (!apiKey) {
            setError("Vennligst legg inn en API-nøkkel for å generere prompts.");
            return;
        }
        setError('');
        setIsLoading(true);
        setResult('');

        try {
            const response = await generateFusionPrompt(apiKey, fandom1, fandom2);
            setResult(response);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("En ukjent feil oppstod.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [apiKey, fandom1, fandom2]);

    return (
        <section id="fusion" className="mb-12 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white text-shadow-cyan">Kreativ Fusion</h2>
                <p className="mt-4 text-lg text-[#9E9E9E]">Hva skjer når to universer kolliderer? Velg to fandoms og la AI-en skape en unik crossover-idé.</p>
            </div>
             <div className="max-w-3xl mx-auto bg-[#1A1A1A] p-8 rounded-lg border border-[#F97316] box-shadow-violet" style={{boxShadow: '0 0 15px rgba(249, 115, 22, 0.5)'}}>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="fusion-fandom1-select" className="block text-sm font-medium text-[#9E9E9E] mb-1">Univers 1</label>
                        <select id="fusion-fandom1-select" value={fandom1} onChange={e => setFandom1(e.target.value)} className="w-full p-2 bg-black text-[#00FFD1] border border-[#F97316] rounded-md focus:ring-2 focus:ring-[#F97316] focus:outline-none">
                           {FANDOM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="fusion-fandom2-select" className="block text-sm font-medium text-[#9E9E9E] mb-1">Univers 2</label>
                        <select id="fusion-fandom2-select" value={fandom2} onChange={e => setFandom2(e.target.value)} className="w-full p-2 bg-black text-[#00FFD1] border border-[#F97316] rounded-md focus:ring-2 focus:ring-[#F97316] focus:outline-none">
                             {FANDOM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>
                 <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-orange-500 text-black font-bold py-3 px-4 rounded-md hover:bg-orange-400 transition-colors flex items-center justify-center space-x-2 disabled:bg-orange-500/50">
                    {isLoading ? <Loader /> : <span>&gt; Skap en Fusion-Prompt!</span>}
                </button>
                 <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white">Din AI-genererte Fusion-Prompt:</h4>
                    <div className="mt-2 p-4 bg-black/50 rounded-md min-h-[120px] text-[#9E9E9E] flex justify-center items-center text-center border border-[#F97316]/50">
                        {isLoading && <Loader />}
                        {!isLoading && error && <span className="text-red-500">{error}</span>}
                        {!isLoading && !error && !result && <span className="text-gray-500">Klar til å blande verdener?</span>}
                        {!isLoading && !error && result && <p className="text-[#00FFD1]">{result}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FusionDemo;