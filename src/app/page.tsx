'use client';

import React, { useState } from 'react';
import { Bell, Menu, Play } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import LibrarySection from '@/components/LibrarySection';
import LearningMode from '@/components/LearningMode';
import { BOOKS_DATA, Book } from '@/data/books';
import { ReadingHistory } from '@/types/learning';
import { getReadingHistory } from '@/utils/storage';

export default function Home() {
    const userName = "Ami";
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isLearningMode, setIsLearningMode] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(true);

    // Mock History for Demo (Initial state: Silent Stick and Milo)
    const mockHistory: ReadingHistory[] = [
        {
            bookId: 'silent-stick',
            currentPhase: 'read',
            completedPhases: ['watch'],
            lastUpdateTime: Date.now() - 20000
        },
        {
            bookId: 'milo',
            currentPhase: 'quiz',
            completedPhases: ['watch', 'read'],
            lastUpdateTime: Date.now() - 10000
        }
    ];

    const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [modalOrigin, setModalOrigin] = useState<'history' | 'recommendation'>('recommendation');
    const [isAddingBook, setIsAddingBook] = useState(false);
    const [animatingBook, setAnimatingBook] = useState<Book | null>(null);
    const [freshHeroBook, setFreshHeroBook] = useState<Book | null>(null);

    const [isFlashing, setIsFlashing] = useState(false);

    React.useEffect(() => {
        if (isDemoMode) {
            setReadingHistory(mockHistory);
        } else {
            setReadingHistory(getReadingHistory());
        }
    }, [isLearningMode, isDemoMode]); // eslint-disable-line react-hooks/exhaustive-deps

    const playWhoosh = () => {
        try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            const filter = context.createBiquadFilter();

            oscillator.type = 'triangle';
            filter.type = 'highpass';
            filter.Q.value = 10; // Add resonance for 'shimmer'

            oscillator.connect(filter);
            filter.connect(gain);
            gain.connect(context.destination);

            const now = context.currentTime;
            const duration = 1.0;

            // Frequency sweep: Swish up then down
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(1800, now + duration * 0.4);
            oscillator.frequency.exponentialRampToValueAtTime(600, now + duration);

            // Filter sweep: High-pass sweep for airiness
            filter.frequency.setValueAtTime(1000, now);
            filter.frequency.exponentialRampToValueAtTime(4000, now + duration * 0.5);
            filter.frequency.exponentialRampToValueAtTime(1500, now + duration);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

            oscillator.start(now);
            oscillator.stop(now + duration);
        } catch (e) {
            console.error("Audio failed:", e);
        }
    };

    const startLearning = (book: Book) => {
        console.log("Start Learning:", book.title);
        const isInHistory = readingHistory.some(h => h.bookId === book.id);

        // Check if this book is already the featured one in Fresh Mode
        const currentHeroId = freshHeroBook?.id || 'silent-stick';
        const isCurrentHero = readingHistory.length === 0 && book.id === currentHeroId;

        // In Fresh Mode (no history), selection from recommendations triggers replacement whoosh if it's a NEW book for the hero
        if (modalOrigin === 'recommendation' && !isInHistory && !isCurrentHero) {
            // Addition / Replacement Animation Flow
            playWhoosh();
            // Detect which visual slot is currently the placeholder (dashed border)
            const leftPlaceholder = document.querySelector('#hero-left-slot:has(.border-dashed)');
            const centerPlaceholder = document.querySelector('#hero-center-slot:has(.border-dashed)');
            const rightPlaceholder = document.querySelector('#hero-right-slot:has(.border-dashed)');

            // Fallback to center slot (Replacement logic for Fresh Mode or Full History)
            const centerSlot = document.querySelector('#hero-center-slot');

            let targetSlot: HTMLElement | null = (leftPlaceholder || centerPlaceholder || rightPlaceholder || centerSlot) as HTMLElement;
            let targetLogicalIndex = -1;

            if (targetSlot) {
                const indexAttr = targetSlot.getAttribute('data-index');
                targetLogicalIndex = indexAttr ? parseInt(indexAttr, 10) : -1;
                const rect = targetSlot.getBoundingClientRect();
                const targetX = rect.left + (rect.width / 2);
                const targetY = rect.top + (rect.height / 2);
                document.documentElement.style.setProperty('--target-x', `${targetX}px`);
                document.documentElement.style.setProperty('--target-y', `${targetY}px`);
            }

            setIsAddingBook(true);
            setAnimatingBook(book);
            setSelectedBook(null);

            // stage 1: Balanced Animation (1.0s)
            setTimeout(() => {
                setIsAddingBook(false);
                setAnimatingBook(null);

                // Landmark 1: Logic processing
                if (!isDemoMode && readingHistory.length === 0) {
                    // Fresh Mode: Simply replace the Hero cover
                    setFreshHeroBook(book);
                } else {
                    // History Mode: Handle slot targeting
                    const newEntry: ReadingHistory = {
                        bookId: book.id,
                        currentPhase: 'watch',
                        completedPhases: [],
                        lastUpdateTime: Date.now()
                    };

                    const finalTargetIndex = targetLogicalIndex >= 0 ? targetLogicalIndex : 2;

                    setReadingHistory(prev => {
                        const newHistory = [...prev];
                        while (newHistory.length <= finalTargetIndex) {
                            newHistory.push({ bookId: '', currentPhase: 'watch' as any, completedPhases: [], lastUpdateTime: 0 });
                        }
                        newHistory[finalTargetIndex] = newEntry;
                        return newHistory;
                    });

                    // Stage 3: Smooth Centering (if applicable)
                    if (finalTargetIndex !== 1) {
                        setTimeout(() => {
                            setReadingHistory([
                                { bookId: 'silent-stick', currentPhase: 'watch', completedPhases: [], lastUpdateTime: Date.now() - 1000 },
                                { bookId: book.id, currentPhase: 'watch', completedPhases: [], lastUpdateTime: Date.now() },
                                { bookId: 'milo', currentPhase: 'quiz', completedPhases: ['watch', 'read'], lastUpdateTime: Date.now() - 2000 }
                            ]);
                        }, 200); // eslint-disable-line no-magic-numbers
                    }
                }

                // Flash Effect
                setIsFlashing(true);
                setTimeout(() => setIsFlashing(false), 5000);

                // Auto-start learning after whoosh
                setCurrentBook(book);
                setIsLearningMode(true);
            }, 1000); // eslint-disable-line no-magic-numbers
        } else {
            setCurrentBook(book);
            setIsLearningMode(true);
        }
    };

    return (
        <div className="h-full bg-[#F8FAFC] flex flex-col overflow-hidden">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-yellow-300 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ami" alt="User Avatar" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-gray-800 tracking-tight font-jua">{userName} (7y)</h1>
                                <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Online & Learning
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button
                                onClick={() => setIsDemoMode(!isDemoMode)}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-[3px] shadow-sm ${isDemoMode ? 'bg-sky-500 text-white border-sky-400 shadow-sky-100' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                            >
                                {isDemoMode ? 'HISTORY MODE' : 'FRESH MODE'}
                            </button>
                            <button className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors border-2 border-gray-50"><Bell /></button>
                            <button className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors border-2 border-gray-50"><Menu /></button>
                        </div>
                    </header>

                    {/* Hero Section */}
                    <HeroSection
                        userName={userName}
                        readingHistory={readingHistory}
                        freshHeroBook={freshHeroBook}
                        onStartLearning={startLearning}
                        onViewInfo={(book, origin) => {
                            setSelectedBook(book);
                            setModalOrigin(origin || 'recommendation');
                        }}
                        isDemoMode={isDemoMode}
                        isFlashing={isFlashing}
                    />

                    {/* Library Section */}
                    <div className="w-full pb-8">
                        <LibrarySection
                            userName={userName}
                            onStartLearning={startLearning}
                            onViewInfo={(book, origin) => {
                                setSelectedBook(book);
                                setModalOrigin(origin || 'recommendation');
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Shared Book Detail Modal */}
            {selectedBook && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedBook(null)} />
                    <div className="card-bubble w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-50 animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 md:p-8 flex justify-between items-center border-b-[6px] border-slate-50">
                            <div className="w-12 h-12" /> {/* Spacer */}
                            <h2 className="text-3xl md:text-4xl font-black text-slate-700 font-jua text-center flex-1 mx-4 truncate">
                                {selectedBook.title}
                            </h2>
                            <button
                                onClick={() => setSelectedBook(null)}
                                className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10">
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="w-full md:w-1/2 flex-shrink-0">
                                    <div className="aspect-[3/4] rounded-[48px] overflow-hidden border-[8px] border-white shadow-2xl shadow-slate-200">
                                        <img src={selectedBook.src} alt={selectedBook.title} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 space-y-8">
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-5 py-2 bg-orange-100 text-orange-500 rounded-full font-black text-sm border-2 border-orange-200">Lexile: {selectedBook.lexile}</span>
                                        <span className="px-5 py-2 bg-green-100 text-green-500 rounded-full font-black text-sm border-2 border-green-200">{selectedBook.wordCount} Words</span>
                                        <span className="px-5 py-2 bg-sky-100 text-sky-500 rounded-full font-black text-sm border-2 border-sky-200">{selectedBook.category}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xl font-black text-slate-800 font-jua">Summary</h4>
                                        <p className="text-lg text-slate-600 leading-relaxed font-fredoka">{selectedBook.summary}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xl font-black text-slate-800 font-jua">Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedBook.keywords.map((word, i) => (
                                                <span key={i} className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm">#{word}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 md:p-10 bg-slate-50/50 flex justify-center w-full">
                            <button
                                onClick={() => { startLearning(selectedBook); setSelectedBook(null); }}
                                className={`w-full py-6 rounded-[28px] font-black text-4xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl ${modalOrigin === 'history' ? 'bg-[#fbbf24] text-[#0f172a] shadow-amber-900/40' : 'bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-amber-900/20'}`}
                            >
                                {modalOrigin === 'history' ? 'CONTINUE READING' : 'START READING'} <Play className="w-10 h-10 fill-current ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Learning Mode Overlay */}
            {isLearningMode && currentBook && (() => {
                const history = readingHistory.find(h => h.bookId === currentBook.id);
                return (
                    <LearningMode
                        book={currentBook}
                        initialPhase={history?.currentPhase}
                        initialUnlockedPhases={history ? ['watch', ...history.completedPhases] as any : undefined}
                        onClose={() => setIsLearningMode(false)}
                    />
                );
            })()}

            {/* Addition Animation Overlay */}
            {isAddingBook && animatingBook && (
                <div className="fixed inset-0 z-[200] pointer-events-none">
                    <div
                        className="absolute w-64 h-80 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white animate-suck-to-hero"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <img src={animatingBook.src} alt="Adding..." className="w-full h-full object-cover" />
                    </div>
                </div>
            )}
        </div>
    );
}
