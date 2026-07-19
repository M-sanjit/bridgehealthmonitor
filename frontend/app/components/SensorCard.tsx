interface SensorCardProps {
    title: string;
    value: number;
    unit: string;
    sensorModel: string;
    description: string;
    precision?: number;
    variant?: 'default' | 'amber' | 'cyan';
}

export default function SensorCard({
                                       title,
                                       value,
                                       unit,
                                       sensorModel,
                                       description,
                                       precision = 2,
                                       variant = 'default',
                                   }: SensorCardProps) {

    const colorMap = {
        default: 'text-white',
        amber: 'text-amber-400',
        cyan: 'text-cyan-400',
    };

    const modelBadgeColor = {
        default: 'text-slate-400',
        amber: 'text-amber-500',
        cyan: 'text-cyan-500',
    };

    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl hover:border-slate-700 transition duration-200">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">{title}</span>
                <span className={`text-xs bg-slate-800 px-2 py-1 rounded font-mono ${modelBadgeColor[variant]}`}>
          {sensorModel}
        </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
        <span className={`text-5xl font-black tracking-tight ${colorMap[variant]}`}>
          {value.toFixed(precision)}
        </span>
                <span className="text-sm font-medium text-slate-500">{unit}</span>
            </div>
            <div className="mt-4 text-xs text-slate-500">
                {description}
            </div>
        </div>
    );
}