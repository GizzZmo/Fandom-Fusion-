
import React from 'react';

export const FANDOM_OPTIONS = [
    "Star Wars",
    "Ringenes Herre",
    "Marvel (MCU)",
    "Pokémon",
    "Avatar: The Last Airbender",
    "Harry Potter"
];

export const TONE_OPTIONS = ["Humoristisk", "Hjertevarm", "Absurd"];

export const PHASE_DATA = [
    {
        id: 1,
        title: "Fase 1: Datainnsamling",
        fullTitle: "Fase 1: Datainnsamling og Kunnskapsbase (Uke 1-4)",
        description: "Fundamentet for hele prosjektet. Vi samler inn og strukturerer data for å gi AI-en dyp kunnskap om hvert univers.",
        details: (
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Datakilder</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li><b>Primærkilder (Dyp Lore):</b> Fandom-wikier for strukturert data.</li>
                        <li><b>Sekundærkilder (Fankultur):</b> Reddit, TV Tropes, og fanfiction-arkiver for kontekst og populære temaer.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2">Datapunkter</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Karakterprofiler (personlighet, relasjoner)</li>
                        <li>Stedsbeskrivelser og atmosfære</li>
                        <li>Objekter, magi og teknologi</li>
                        <li>Typiske scenarier og narrative troper</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Fase 2: AI-modell",
        fullTitle: "Fase 2: AI-modell og Prompt-logikk (Uke 5-8)",
        description: "Her bygger vi 'hjernen' i systemet. En generell språkmodell blir spesialisert til å forstå og generere innhold for spesifikke fandoms.",
        details: (
             <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Språkmodell (LLM)</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li><b>Valg:</b> Kraftig modell som Google Gemini.</li>
                        <li><b>Finjustering:</b> Modellen trenes på vår innsamlede data for å bli en 'ekspert' på hvert univers og unngå faktafeil.</li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold text-lg mb-2">Prompt-arkitekt</h4>
                    <p className="text-gray-600">Vi definerer maler for gode, visuelle tegneserie-prompts og logikk for å justere `fandom`, `tone`, `fokus` og `karakterer`.</p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Fase 3: Brukergrensesnitt",
        fullTitle: "Fase 3: Brukergrensesnitt og Implementering (Uke 9-10)",
        description: "Utvikling av en enkel og intuitiv web-applikasjon der brukere kan generere prompts.",
        details: (
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Design av Web-app</h4>
                     <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Dropdown-meny for valg av univers.</li>
                        <li>Knapper/slidere for tone og fokus.</li>
                        <li>En stor "Generer Prompt"-knapp og et resultatfelt.</li>
                    </ul>
                </div>
                <div>
                   <h4 className="font-semibold text-lg mb-2">Teknisk Utvikling</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li><b>Frontend:</b> React eller Svelte.</li>
                        <li><b>Backend:</b> Python med Flask eller FastAPI for API-kall til Gemini.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Fase 4: Testing & Iterasjon",
        fullTitle: "Fase 4: Testing, Lansering og Iterasjon (Uke 11-12+)",
        description: "Sikrer kvalitet gjennom testing og kontinuerlig forbedring basert på tilbakemeldinger fra brukere.",
        details: (
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Testing og Feedback</h4>
                     <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li><b>Betatesting:</b> Inviterer tegneserieskapere og fan-artister.</li>
                        <li><b>Feedback-mekanisme:</b> 'Tommel opp/ned' for å forbedre AI-modellen over tid (RLHF).</li>
                    </ul>
                </div>
                <div>
                   <h4 className="font-semibold text-lg mb-2">Kontinuerlig Oppdatering</h4>
                    <p className="text-gray-600">Planlegger periodisk oppdatering av kunskapsbasen for å inkludere innhold fra nye filmer, serier og bøker.</p>
                </div>
            </div>
        )
    },
];
