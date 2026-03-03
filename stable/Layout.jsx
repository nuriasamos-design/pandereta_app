import React from 'react';

const Layout = ({ children, currentTab, setCurrentTab, connectionStatus }) => {
    const menuItems = [
        { id: 'ritmos', label: 'Biblioteca de Ritmos', icon: '🥁' },
        { id: 'cancionero', label: 'Cancionero (Notebook)', icon: '📚' },
        { id: 'historia', label: 'Historia y Memoria', icon: '🕯️' },
        { id: 'tecnica', label: 'Especificaciones', icon: '📏' },
    ];

    return (
        <div className="flex h-screen bg-pandereta-bg overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-walnut-wood border-r border-brass-metal flex flex-col shadow-xl z-20">
                <div className="p-6 border-b border-brass-metal/30">
                    <h1 className="text-brass-metal text-xl font-bold tracking-widest uppercase font-serif">Pandereta App</h1>
                </div>
                <nav className="flex-1 py-4 px-2 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentTab === item.id
                                ? 'bg-brass-metal text-walnut-wood font-bold'
                                : 'text-stone-300 hover:bg-walnut-light'
                                } min-h-[48px]`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-pandereta-card border-b border-pandereta-gold/30 flex items-center justify-between px-8 shadow-md">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Buscar canción, ritmo o historia..."
                                className="w-full bg-stone-800 border-none rounded-full py-2 px-10 text-sm focus:ring-1 focus:ring-brass-metal"
                            />
                            <span className="absolute left-3 top-2.5 opacity-50">🔍</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-stone-800 rounded-full px-4 py-1.5 border border-brass-metal/20">
                            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                            <span className="text-xs font-mono uppercase tracking-tighter opacity-70">NotebookLM: {connectionStatus === 'connected' ? 'Ready' : 'Offline'}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-leather-tan border border-brass-metal flex items-center justify-center text-xs font-bold text-walnut-wood italic font-serif">
                            UA
                        </div>
                    </div>
                </header>

                {/* Dynamic Panel */}
                <main className="flex-1 overflow-y-auto p-8 bg-stone-900/50">
                    <div className="max-w-6xl mx-auto animate-fadeIn">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
