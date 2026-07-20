interface ConnectionStatusProps {
    isConnected: boolean;
}

export default function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
    return (
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
                {isConnected ? 'System Live' : 'System Offline'}
            </span>
        </div>
    );
}