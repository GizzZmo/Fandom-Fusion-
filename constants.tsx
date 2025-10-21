
import React from 'react';

export const FANDOM_OPTIONS = [
    "Star Wars",
    "Ringenes Herre",
    "Marvel (MCU)",
    "Pokémon",
    "Avatar: The Last Airbender",
    "Harry Potter",
    "Star Trek",
    "Doctor Who",
    "The Legend of Zelda"
];

export const TONE_OPTIONS = ["Humoristisk", "Hjertevarm", "Absurd"];

export const PHASE_DATA = [
    {
        id: 1,
        title: "Fase 1: Datainnsamling",
        fullTitle: "Fase 1: Datainnsamling og Kunnskapsbase (Uke 1-4)",
        description: "Fundamentet for hele prosjektet. Vi samler inn og strukturerer data for å gi AI-en dyp kunnskap om hvert univers.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjN0YwMEZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjgiLz48cGF0aCBkPSJNNTAgNDJWMTUiLz48cGF0aCBkPSJNNTAgNTh2MjciLz48cGF0aCBkPSJNNTggNTBoMjciLz48cGF0aCBkPSJNNDIgNTBIMTUiLz48L2c+PGcgc3Ryb2tlPSIjMDBGRkQxIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik01MCAxNSBhIDM1IDIgMCAxIDEgMCA3MCIvPjxwYXRoIGQ9Ik01MCAxNSBhIDM1IDIwIDAgMSAwIDAgNzAiLz48cGF0aCBkPSJNNTAgMTUgYSAxNSAzNSAwIDEgMSAwIDcwIi8+PHBhdGggZD0iTTUwIDE1IGEgMTUgMzUgMCAxIDAgMCA3MCIvPjwvZz48L3N2Zz4=",
        details: (
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Datakilder</h4>
                    <ul className="list-disc list-inside space-y-1 text-[#9E9E9E]">
                        <li><b>Primærkilder (Dyp Lore):</b> Fandom-wikier for strukturert data.</li>
                        <li><b>Sekundærkilder (Fankultur):</b> Reddit, TV Tropes, og fanfiction-arkiver for kontekst og populære temaer.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2">Datapunkter</h4>
                    <ul className="list-disc list-inside space-y-1 text-[#9E9E9E]">
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
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkMSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIiBmeD0iNTAlIiBmeT0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBGRkQxO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzdGMDBCRjtzdG9wLW9wYWNpdHk6MSIgLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMjAgNTAgQSAzMCAzMCAwIDAgMSA4MCA1MCBBIDMwIDMwIDAgMCAxIDIwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiM3RjAwRkYiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik0zMCA0MCBRIDUwIDIwIDcwIDQwIiBzdHJva2U9IiMwMEZGRDEiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0zMCA2MCBRIDUwIDgwIDcwIDYwIiBzdHJva2U9IiMwMEZGRDEiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik00MCAzMCBRIDIwIDUwIDQwIDcwIiBzdHJva2U9IiMwMEZGRDEiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik02MCAzMCBRIDgwIDUwIDYwIDcwIiBzdHJva2U9IiMwMEZGRDEiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUiIGZpbGw9InVybCgjZ3JhZDEpIi8+PC9zdmc+",
        details: (
             <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Språkmodell (LLM)</h4>
                    <ul className="list-disc list-inside space-y-1 text-[#9E9E9E]">
                        <li><b>Valg:</b> Kraftig modell som Google Gemini.</li>
                        <li><b>Finjustering:</b> Modellen trenes på vår innsamlede data for å bli en 'ekspert' på hvert univers og unngå faktafeil.</li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold text-lg mb-2">Prompt-arkitekt</h4>
                    <p className="text-[#9E9E9E]">Vi definerer maler for gode, visuelle tegneserie-prompts og logikk for å justere `fandom`, `tone`, `fokus` og `karakterer`.</p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Fase 3: Brukergrensesnitt",
        fullTitle: "Fase 3: Brukergrensesnitt og Implementering (Uke 9-10)",
        description: "Utvikling av en enkel og intuitiv web-applikasjon der brukere kan generere prompts.",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMTAiIHk9IjE1IiB3aWR0aD0iODAiIGhlaWdodD0iNzAiIHJ4PSI1IiBzdHJva2U9IiM3RjAwRkYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0iIzBEMEQwRCIgLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjI1IiByPSIzIiBmaWxsPSIjRkYwMEZGIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIyNSIgcj0iMyIgZmlsbD0iI0Y5NzMxNiIvPjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwIiByeD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBGRkQxIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik03NSA0NSBsIC01IC0yLjUgbCA1IC0yLjUgeiIgZmlsbD0iIzAwRkZEMSivPjxyZWN0IHg9IjM1IiB5PSI2MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjE1IiByeD0iMyIgZmlsbD0iIzdGMDBGRiIgLz48dGV4dCB4PSI1MCIgeT0iNzAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iIzAwMDAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPiYjNjE7IEdPPC90ZXh0Pjwvc3ZnPg==",
        details: (
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Design av Web-app</h4>
                     <ul className="list-disc list-inside space-y-1 text-[#9E9E9E]">
                        <li>Dropdown-meny for valg av univers.</li>
                        <li>Knapper/slidere for tone og fokus.</li>
                        <li>En stor "Generer Prompt"-knapp og et resultatfelt.</li>
                    </ul>
                </div>
                <div>
                   <h4 className="font-semibold text-lg mb-2">Teknisk Utvikling</h4>
                    <ul className="list-disc list-inside space-y-1 text-[#9E9E9E]">
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
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA1MCw1MCBtIC0yMCwwIGEgMjAsMjAgMCAxLDAgNDAsMCBhIDIwLDIwIDAgMSwwIC00MCwwIiBmaWxsPSJub25lIiBzdHJva2U9IiM3RjAwRkYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0gNTAsMzAgTCA1MCwyMCBNIDUwLDcwIEwgNTAsODAgTSA3MCw1MCBMIDgwLDUwIE0gMzAsNTAgTCAyMCw1MCIgc3Ryb2tlPSIjN0YwMEZGIiBzdHJva2Utd2lkdGg9IjIiIC8+PHBhdGggZD0iTSAyNSA3MCBsIDUgNSBsIDEwIC0xNSIgc3Ryb2tlPSIjMDBGRkQxIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0gNjAgMzAgbCAxNSAxNSBNIDYwIDQ1IGwgMTUgLTE1IiBzdHJva2U9IiNGOTczMTYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTUwIDUwIEwgODUgNzUiIHN0cm9rZT0iIzAwRkZEMS41IiBzdHJva2UtZGFzaGFycmF5PSI0IDIiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNODEgNzUgbCA1IC01IGwgMCA1IHoiIGZpbGw9IiMwMEZGRDEiLz48L3N2Zz4=",
        details: (
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2">Testing og Feedback</h4>
                     <ul className="list-disc list-inside space-y-1 text-[#9E9E9E]">
                        <li><b>Betatesting:</b> Inviterer tegneserieskapere og fan-artister.</li>
                        <li><b>Feedback-mekanisme:</b> 'Tommel opp/ned' for å forbedre AI-modellen over tid (RLHF).</li>
                    </ul>
                </div>
                <div>
                   <h4 className="font-semibold text-lg mb-2">Kontinuerlig Oppdatering</h4>
                    <p className="text-[#9E9E9E]">Planlegger periodisk oppdatering av kunskapsbasen for å inkludere innhold fra nye filmer, serier og bøker.</p>
                </div>
            </div>
        )
    },
];
