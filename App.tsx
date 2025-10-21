import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import Phases from './components/Phases';
import Architecture from './components/Architecture';
import GeneratorDemo from './components/GeneratorDemo';
import FusionDemo from './components/FusionDemo';
import Footer from './components/Footer';
import ApiKeyManager from './components/ApiKeyManager';

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('oversikt');
    const [apiKey, setApiKey] = useState<string>('');

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);
    
    // FIX: The ref type was changed from the generic HTMLElement to the more specific HTMLDivElement.
    // This ensures type compatibility with the `ref` prop of the `div` elements they are attached to, resolving the TypeScript error.
    const sectionRefs = {
        oversikt: useRef<HTMLDivElement>(null),
        faser: useRef<HTMLDivElement>(null),
        arkitektur: useRef<HTMLDivElement>(null),
        demo: useRef<HTMLDivElement>(null),
        fusion: useRef<HTMLDivElement>(null),
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { id: 'oversikt', ref: sectionRefs.oversikt },
                { id: 'faser', ref: sectionRefs.faser },
                { id: 'arkitektur', ref: sectionRefs.arkitektur },
                { id: 'demo', ref: sectionRefs.demo },
                { id: 'fusion', ref: sectionRefs.fusion },
            ];

            const currentSection = sections.find(section => {
                if (section.ref.current) {
                    const top = section.ref.current.offsetTop - 80;
                    const bottom = top + section.ref.current.offsetHeight;
                    return window.scrollY >= top && window.scrollY < bottom;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <Header activeSection={activeSection} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div ref={sectionRefs.oversikt}><Overview /></div>
                <ApiKeyManager apiKey={apiKey} setApiKey={setApiKey} />
                <div ref={sectionRefs.faser}><Phases /></div>
                <div ref={sectionRefs.arkitektur}><Architecture /></div>
                <div ref={sectionRefs.demo}><GeneratorDemo apiKey={apiKey} /></div>
                <div ref={sectionRefs.fusion}><FusionDemo apiKey={apiKey} /></div>
            </main>
            <Footer />
        </>
    );
};

export default App;