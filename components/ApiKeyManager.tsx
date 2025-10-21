import React, { useState, useEffect } from 'react';

interface ApiKeyManagerProps {
    apiKey: string;
    setApiKey: (key: string) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ apiKey, setApiKey }) => {
    const [localApiKey, setLocalApiKey] = useState(apiKey);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setLocalApiKey(apiKey);
    }, [apiKey]);

    const handleSave = () => {
        setApiKey(localApiKey);
        localStorage.setItem('gemini_api_key', localApiKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <section className="mb-20 pt-8 text-center">
            <div className="max-w-xl mx-auto bg-[#1A1A1A] p-6 rounded-lg border border-[#7F00FF] box-shadow-violet">
                <h3 className="text-xl font-bold mb-4 text-shadow-cyan">Konfigurer API-Nøkkel</h3>
                <p className="text-[#9E9E9E] mb-4 text-sm">
                    Lim inn din Google Gemini API-nøkkel her for å aktivere generatoren. Nøkkelen lagres kun i din nettleser.
                </p>
                <div className="flex items-center space-x-4">
                    <input
                        type="password"
                        value={localApiKey}
                        onChange={(e) => setLocalApiKey(e.target.value)}
                        placeholder="Lim inn din API-nøkkel..."
                        className="flex-grow bg-black text-[#00FFD1] p-2 border border-[#7F00FF] rounded-md focus:ring-2 focus:ring-[#00FFD1] focus:outline-none transition-all"
                    />
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 font-bold rounded-md transition-all duration-300 ${saved ? 'bg-green-500 text-black' : 'bg-[#7F00FF] text-black hover:bg-[#00FFD1]'}`}
                    >
                        {saved ? 'Lagret!' : 'Lagre'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ApiKeyManager;