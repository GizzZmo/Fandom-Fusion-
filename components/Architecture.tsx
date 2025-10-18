
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Fase 1: Data', value: 35 },
    { name: 'Fase 2: AI-modell', value: 30 },
    { name: 'Fase 3: UI', value: 15 },
    { name: 'Fase 4: Testing', value: 20 },
];
const COLORS = ['#3B82F6', '#22C55E', '#8B5CF6', '#F97316'];

const Architecture: React.FC = () => {
    return (
        <section id="arkitektur" className="mb-20 pt-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Teknologi og Arkitektur</h2>
                <p className="mt-4 text-lg text-gray-600">En oversikt over systemets dataflyt og fordelingen av arbeidsinnsats.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Dataflyt og Systemarkitektur</h3>
                    <div className="space-y-4">
                        <div className="text-center p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                            <p className="font-semibold">Bruker (Web-app)</p>
                        </div>
                        <div className="text-center text-2xl text-blue-400">&darr;</div>
                        <div className="text-center p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                             <p className="font-semibold">Kall til Gemini API</p>
                        </div>
                        <div className="text-center text-2xl text-green-400">&darr;</div>
                        <div className="text-center p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                            <p className="font-semibold">Gemini LLM (Finjustert med Fandom-data)</p>
                        </div>
                        <div className="text-center text-2xl text-green-400">&darr;</div>
                         <div className="text-center p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
                            <p className="font-semibold">Generert Innhold (tilbake til bruker)</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 h-[450px]">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Estimert Tidsbruk per Fase</h3>
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
                            <Tooltip formatter={(value: number) => `${value}%`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default Architecture;
