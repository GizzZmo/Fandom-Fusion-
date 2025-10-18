/**
 * Fandom-Fusion Main Application
 * 
 * This is the root component of the Fandom-Fusion project dashboard.
 * It manages the overall layout, navigation state, and renders all major sections:
 * - Project overview
 * - Development phases
 * - Technical architecture
 * - Interactive prompt generator
 * - Crossover fusion generator
 * 
 * The app uses scroll-based navigation to highlight the active section in the header.
 * 
 * @module App
 */

import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import Phases from './components/Phases';
import Architecture from './components/Architecture';
import GeneratorDemo from './components/GeneratorDemo';
import FusionDemo from './components/FusionDemo';
import Footer from './components/Footer';

/**
 * Main application component
 * 
 * Manages scroll-based section tracking and renders the complete dashboard
 * 
 * @component
 */
const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('oversikt');
    const sectionRefs = {
        oversikt: useRef<HTMLElement>(null),
        faser: useRef<HTMLElement>(null),
        arkitektur: useRef<HTMLElement>(null),
        demo: useRef<HTMLElement>(null),
        fusion: useRef<HTMLElement>(null),
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
                <div ref={sectionRefs.faser}><Phases /></div>
                <div ref={sectionRefs.arkitektur}><Architecture /></div>
                <div ref={sectionRefs.demo}><GeneratorDemo /></div>
                <div ref={sectionRefs.fusion}><FusionDemo /></div>
            </main>
            <Footer />
        </>
    );
};

export default App;
