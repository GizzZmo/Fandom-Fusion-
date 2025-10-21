
import React, { useState } from 'react';
import { PHASE_DATA } from '../constants';

const Phases: React.FC = () => {
    const [activePhase, setActivePhase] = useState<number>(1);
    const currentPhaseData = PHASE_DATA.find(p => p.id === activePhase);

    return (
        <section id="faser" className="mb-20 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white text-shadow-cyan">De 4 Fasene i Prosjektet</h2>
                <p className="mt-4 text-lg text-[#9E9E9E]">Prosjektet er delt inn i fire distinkte faser, fra datainnsamling til lansering. Klikk på en fase for å se detaljene.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 mb-8">
                {PHASE_DATA.map((phase, index) => (
                    <React.Fragment key={phase.id}>
                        <button 
                            onClick={() => setActivePhase(phase.id)}
                            className={`w-full md:w-auto text-center px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 ${activePhase === phase.id ? 'bg-[#7F00FF] text-black border-[#7F00FF]' : 'border-[#7F00FF] text-[#00FFD1] hover:bg-[#7F00FF]/20'}`}
                        >
                            {phase.title}
                        </button>
                        {index < PHASE_DATA.length - 1 && <div className="hidden md:block text-[#7F00FF] mt-3 text-2xl font-light">&rarr;</div>}
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-8 bg-[#1A1A1A] p-8 rounded-lg border border-[#7F00FF] min-h-[300px] box-shadow-violet">
                {currentPhaseData && (
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="order-2 md:order-1 text-left">
                            <h3 className="text-2xl font-bold text-white mb-4 text-shadow-cyan">{currentPhaseData.fullTitle}</h3>
                            <p className="text-[#9E9E9E] mb-4">{currentPhaseData.description}</p>
                            {currentPhaseData.details}
                        </div>
                        <div className="order-1 md:order-2 flex justify-center items-center">
                            <img 
                                src={currentPhaseData.image} 
                                alt={`Illustrasjon for ${currentPhaseData.title}`} 
                                className="w-full max-w-xs h-auto object-contain rounded-lg bg-black/20 p-2"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Phases;
