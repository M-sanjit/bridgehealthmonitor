'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ConnectionStatus from './components/ConnectionStatus';
import SensorCard from './components/SensorCard';

interface SensorData {
    load: number;
    ax: number;
    ay: number;
}

export default function Home() {
    const [sensorValues, setSensorValues] = useState<SensorData>({ load: 0.0, ax: 0.0, ay: 0.0 });
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const socket: Socket = io('http://127.0.0.1:5000', {
            transports: ['websocket', 'polling'],
            upgrade: true,
            forceNew: true
        });

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        socket.on('sensor_data', (incomingData: SensorData) => {
            setSensorValues(incomingData);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Block Container */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">BridgeSense-AI</h1>
                        <p className="text-slate-400 text-sm mt-1">Real-Time Structural Health Analytics Dashboard</p>
                    </div>
                    <ConnectionStatus isConnected={isConnected} />
                </header>

                {/* Modular Metrics Render Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SensorCard
                        title="Structural Load"
                        value={sensorValues.load}
                        unit="g"
                        sensorModel="HX711"
                        description="Live strain force measurements on bridge deck"
                        precision={2}
                        variant="default"
                    />
                    <SensorCard
                        title="Vibration Axis-X"
                        value={sensorValues.ax}
                        unit="m/s²"
                        sensorModel="MPU6050"
                        description="Lateral displacement / torsional movement tracking"
                        precision={4}
                        variant="amber"
                    />
                    <SensorCard
                        title="Vibration Axis-Y"
                        value={sensorValues.ay}
                        unit="m/s²"
                        sensorModel="MPU6050"
                        description="Vertical load compression / displacement monitoring"
                        precision={4}
                        variant="cyan"
                    />
                </section>

            </div>
        </main>
    );
}