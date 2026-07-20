'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface HistoricalData {
    time: string;
    load: number;
    ax: number;
    ay: number;
}

interface TelemetryChartProps {
    historyData: HistoricalData[];
}

export default function TelemetryChart({ historyData }: TelemetryChartProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl">
            <h3 className="text-base font-bold text-white mb-6">Structural Dynamic Waveform</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                        <Line type="monotone" dataKey="load" name="Load (g)" stroke="#38bdf8" strokeWidth={2} dot={false} isAnimationActive={false} />
                        <Line type="monotone" dataKey="ax" name="X-Acc" stroke="#fbbf24" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                        <Line type="monotone" dataKey="ay" name="Y-Acc" stroke="#22d3ee" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}