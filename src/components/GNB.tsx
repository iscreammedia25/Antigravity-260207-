import React, { useState } from 'react';
import { Bell, Menu, Heart, Star, ChevronRight, BookOpen, Home } from 'lucide-react';

interface GNBProps {
    userName: string;
    onNavigate: (view: 'home' | 'my-library' | 'library') => void;
    currentView: 'home' | 'my-library' | 'library' | 'word' | 'read';
}

export default function GNB({ userName, onNavigate, currentView }: GNBProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isHome = currentView === 'home';
    const isLibrary = currentView === 'library';

    return (
        <header className="fixed top-0 left-0 w-full h-24 bg-[#0f172a] border-b border-white/10 flex justify-center items-center px-4 z-[100] shadow-2xl">
            <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
                {/* Left: Profile + Name */}
                <div className="flex items-center gap-6">
                    {/* Profile Avatar with Dropdown */}
                    <div className="relative">
                        <div
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-16 h-16 bg-yellow-300 rounded-full border-[6px] border-white/10 shadow-xl flex items-center justify-center overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-all"
                        >
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ami" alt="User Avatar" className="w-full h-full object-cover" />
                        </div>

                        {/* Profile Dropdown */}
                        {isMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-30" onClick={() => setIsMenuOpen(false)} />
                                <div className="absolute top-[80px] left-0 w-64 bg-white rounded-3xl border-[4px] border-slate-100 shadow-2xl z-40 overflow-hidden">
                                    <div className="p-2 space-y-1">
                                        {[
                                            { label: 'Account', icon: <Star className="w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" />, color: 'group-hover:bg-blue-100', textColor: 'group-hover:text-blue-500' },
                                            { label: 'Vocabulary', icon: <Bell className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition-colors" />, color: 'group-hover:bg-amber-100', textColor: 'group-hover:text-amber-500' },
                                            { label: 'My Library', icon: <Heart className="w-5 h-5 text-slate-500 group-hover:text-rose-500 transition-colors" />, color: 'group-hover:bg-rose-100', textColor: 'group-hover:text-rose-500', action: () => { onNavigate('my-library'); setIsMenuOpen(false); } },
                                            { label: 'My Report', icon: <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />, color: 'group-hover:bg-emerald-100', textColor: 'group-hover:text-emerald-500' },
                                        ].map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={item.action}
                                                className="w-full flex items-center gap-4 px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl transition-colors text-left group"
                                            >
                                                <div className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center ${item.color} transition-colors`}>
                                                    {item.icon}
                                                </div>
                                                <span className={`font-bold text-lg tracking-wide ${item.textColor} transition-colors`}>{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="cursor-pointer" onClick={() => onNavigate('home')}>
                        <h1 className="text-3xl font-black text-white tracking-tight font-jua">{userName}'s Adventure</h1>
                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-500/10 px-3 py-1 rounded-full w-fit mt-1 border border-emerald-500/20">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            Ready to Learn!
                        </div>
                    </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-2xl border border-white/10">
                    {/* Home Button (Only if not on home) */}
                    {!isHome && (
                        <button 
                            onClick={() => onNavigate('home')}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            title="Home"
                        >
                            <Home className="w-5 h-5" />
                        </button>
                    )}

                    {/* Library Icon (Book Zone) - Hide if already in library (Book/Media Zone) */}
                    {!isLibrary && (
                        <button 
                            onClick={() => onNavigate('library')}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            title="Go to Library"
                        >
                            <BookOpen className="w-5 h-5" />
                        </button>
                    )}

                    {/* Notification Bell */}
                    <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
                        <Bell className="w-5 h-5" />
                    </button>

                    {/* Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
