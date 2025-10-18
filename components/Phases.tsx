
import React, { useState } from 'react';
import { PHASE_DATA } from '../constants';

const Phases: React.FC = () => {
    const [activePhase, setActivePhase] = useState<number>(1);
    const currentPhaseData = PHASE_DATA.find(p => p.id === activePhase);

    return (
        <section id="faser" className="mb-20 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">De 4 Fasene i Prosjektet</h2>
                <p className="mt-4 text-lg text-gray-600">Prosjektet er delt inn i fire distinkte faser, fra datainnsamling til lansering. Klikk på en fase for å se detaljene.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 mb-8">
                {PHASE_DATA.map((phase, index) => (
                    <React.Fragment key={phase.id}>
                        <button 
                            onClick={() => setActivePhase(phase.id)}
                            className={`w-full md:w-auto text-center px-6 py-3 border-2 rounded-lg font-semibold transition ${activePhase === phase.id ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300'}`}
                        >
                            {phase.title}
                        </button>
                        {index < PHASE_DATA.length - 1 && <div className="hidden md:block text-gray-400 mt-3 text-2xl font-light">&rarr;</div>}
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-8 bg-white p-8 rounded-xl shadow-md border border-gray-200 min-h-[300px]">
                {currentPhaseData && (
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentPhaseData.fullTitle}</h3>
                        <p className="text-gray-600 mb-4">{currentPhaseData.description}</p>
                        {currentPhaseData.details}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Phases;
