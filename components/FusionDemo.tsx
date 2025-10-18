
import React, { useState, useCallback } from 'react';
import { FANDOM_OPTIONS } from '../constants';
import { generateFusionPrompt } from '../services/geminiService';
import Loader from './Loader';

const FusionDemo: React.FC = () => {
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
        setError('');
        setIsLoading(true);
        setResult('');
        const response = await generateFusionPrompt(fandom1, fandom2);
        setResult(response);
        setIsLoading(false);
    }, [fandom1, fandom2]);

    return (
        <section id="fusion" className="mb-12 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Kreativ Fusion</h2>
                <p className="mt-4 text-lg text-gray-600">Hva skjer når to universer kolliderer? Velg to fandoms og la AI-en skape en unik crossover-idé.</p>
            </div>
             <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="fusion-fandom1-select" className="block text-sm font-medium text-gray-700 mb-1">Univers 1</label>
                        <select id="fusion-fandom1-select" value={fandom1} onChange={e => setFandom1(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
                           {FANDOM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="fusion-fandom2-select" className="block text-sm font-medium text-gray-700 mb-1">Univers 2</label>
                        <select id="fusion-fandom2-select" value={fandom2} onChange={e => setFandom2(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
                             {FANDOM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>
                 <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2 disabled:bg-yellow-300">
                    {isLoading ? <Loader /> : <span>✨ Skap en Fusion-Prompt!</span>}
                </button>
                 <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800">Din AI-genererte Fusion-Prompt:</h4>
                    <div className="mt-2 p-4 bg-gray-100 rounded-md min-h-[120px] text-gray-700 flex justify-center items-center">
                        {isLoading && <Loader />}
                        {!isLoading && error && <span className="text-red-500">{error}</span>}
                        {!isLoading && !error && !result && <span className="text-gray-500">Klar til å blande verdener?</span>}
                        {!isLoading && !error && result && <p>{result}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FusionDemo;
