import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Fase 1: Data', value: 35 },
    { name: 'Fase 2: AI-modell', value: 30 },
    { name: 'Fase 3: UI', value: 15 },
    { name: 'Fase 4: Testing', value: 20 },
];
const COLORS = ['#7F00FF', '#00FFD1', '#FF00FF', '#F97316']; // Violet, Cyan, Magenta, Orange

const Architecture: React.FC = () => {
    return (
        <section id="arkitektur" className="mb-20 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white text-shadow-cyan">Teknologi og Arkitektur</h2>
                <p className="mt-4 text-lg text-[#9E9E9E]">En oversikt over systemets dataflyt og fordelingen av arbeidsinnsats.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#7F00FF] box-shadow-violet">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center text-shadow-cyan">Dataflyt og Systemarkitektur</h3>
                    <div className="space-y-4">
                        <div className="text-center p-4 bg-[#7F00FF]/10 border-2 border-[#7F00FF] rounded-lg">
                            <p className="font-semibold text-[#00FFD1]">Bruker (Web-app)</p>
                        </div>
                        <div className="text-center text-2xl text-[#7F00FF]">&darr;</div>
                        <div className="text-center p-4 bg-[#00FFD1]/10 border-2 border-[#00FFD1] rounded-lg">
                             <p className="font-semibold text-[#00FFD1]">Kall til Gemini API</p>
                        </div>
                        <div className="text-center text-2xl text-[#00FFD1]">&darr;</div>
                        <div className="text-center p-4 bg-[#00FFD1]/10 border-2 border-[#00FFD1] rounded-lg">
                            <p className="font-semibold text-[#00FFD1]">Gemini LLM (Finjustert med Fandom-data)</p>
                        </div>
                        <div className="text-center text-2xl text-[#00FFD1]">&darr;</div>
                         <div className="text-center p-4 bg-[#FF00FF]/10 border-2 border-[#FF00FF] rounded-lg">
                            <p className="font-semibold text-[#00FFD1]">Generert Innhold (tilbake til bruker)</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#7F00FF] h-[450px] box-shadow-violet">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center text-shadow-cyan">Estimert Tidsbruk per Fase</h3>
                     <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #7F00FF', color: '#00FFD1' }}
                                itemStyle={{ color: '#00FFD1' }}
                                formatter={(value: number) => `${value}%`} 
                            />
                            <Legend wrapperStyle={{color: '#9E9E9E'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default Architecture;