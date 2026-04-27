'use client';

import React, { useState } from 'react';
import { Bell, Menu, Play, Heart, X, Video, Maximize, Star, ChevronRight } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import LibrarySection from '@/components/LibrarySection';
import MultiSection from '@/components/MultiSection';
import WordSection from '@/components/WordSection';
import ReadSection from '@/components/ReadSection';
import { BOOKS_DATA, Book } from '@/data/books';
import { ReadingHistory } from '@/types/learning';
import { getReadingHistory } from '@/utils/storage';
import MyLibrarySection from '@/components/MyLibrarySection';


export default function Home() {
    const userName = "Ami";
    const [view, setView] = useState<'home' | 'word' | 'read' | 'library' | 'my-library'>('home');
    const [libraryTab, setLibraryTab] = useState<{ zone: string, subTab: string } | null>(null);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isDemoMode, setIsDemoMode] = useState(true);

    // Mock History for Demo (Initial state: Silent Stick, Hans, Milo)
    const mockHistory: ReadingHistory[] = [
        {
            bookId: 'OG0046',
            currentPhase: 'word',
            completedPhases: [],
            lastUpdateTime: Date.now() - 20000
        },
        {
            bookId: 'CS0003',
            currentPhase: 'read',
            completedPhases: ['word'],
            lastUpdateTime: Date.now() - 30000
        }
    ];

    const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [modalOrigin, setModalOrigin] = useState<'history' | 'recommendation'>('recommendation');
    const [isAddingBook, setIsAddingBook] = useState(false);
    const [animatingBook, setAnimatingBook] = useState<Book | null>(null);
    const [freshHeroBook, setFreshHeroBook] = useState<Book | null>(BOOKS_DATA.find(b => b.id === 'CS0003') || null);

    const [isFlashing, setIsFlashing] = useState(false);
    const [isPlayingInline, setIsPlayingInline] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const inlineVideoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        setIsPlayingInline(false);
    }, [selectedBook]);

    React.useEffect(() => {
        if (isDemoMode) {
            setReadingHistory(mockHistory);
        } else {
            setReadingHistory(getReadingHistory());
        }
    }, [view, isDemoMode]); // eslint-disable-line react-hooks/exhaustive-deps

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
                        currentPhase: 'word',
                        completedPhases: [],
                        lastUpdateTime: Date.now()
                    };

                    const finalTargetIndex = targetLogicalIndex >= 0 ? targetLogicalIndex : 2;

                    setReadingHistory(prev => {
                        const newHistory = [...prev];
                        while (newHistory.length <= finalTargetIndex) {
                            newHistory.push({ bookId: '', currentPhase: 'word', completedPhases: [], lastUpdateTime: 0 });
                        }
                        newHistory[finalTargetIndex] = newEntry;
                        return newHistory;
                    });

                    // Stage 3: Smooth Centering (if applicable)
                    if (finalTargetIndex !== 1) {
                        setTimeout(() => {
                            setReadingHistory([
                                { bookId: 'silent-stick', currentPhase: 'word', completedPhases: [], lastUpdateTime: Date.now() - 1000 },
                                { bookId: book.id, currentPhase: 'word', completedPhases: [], lastUpdateTime: Date.now() },
                                { bookId: 'milo', currentPhase: 'quiz', completedPhases: ['word', 'read'], lastUpdateTime: Date.now() - 2000 }
                            ]);
                        }, 200); // eslint-disable-line no-magic-numbers
                    }
                }

                // Flash Effect
                setIsFlashing(true);
                setTimeout(() => setIsFlashing(false), 5000);

                // Auto-start learning after whoosh
                const hist = readingHistory.find(h => h.bookId === book.id);
                const hasWordResources = ['milo', 'OG0021', 'hans-in-luck', 'CS0003'].includes(book.id);
                setCurrentBook(book);
                
                // Determine target view based on history
                let targetView: 'word' | 'read' | 'talk' | 'quiz' = 'word';
                if (hist && hist.currentPhase) {
                    targetView = hist.currentPhase as any;
                } else if (!hasWordResources) {
                    targetView = 'read';
                }
                
                setView(targetView);
            }, 1000); // eslint-disable-line no-magic-numbers
        } else {
            const hist = readingHistory.find(h => h.bookId === book.id);
            const hasWordResources = ['milo', 'OG0021', 'hans-in-luck', 'CS0003'].includes(book.id);
            setCurrentBook(book);

            // Determine target view based on history
            let targetView: 'word' | 'read' | 'talk' | 'quiz' = 'word';
            if (hist && hist.currentPhase) {
                targetView = hist.currentPhase as any;
            } else if (!hasWordResources) {
                targetView = 'read';
            }

            setView(targetView);
        }
    };

    const stopReading = (bookId: string) => {
        setReadingHistory(prev => 
            prev.map(h => h.bookId === bookId ? { ...h, isActive: false } : h)
        );
    };

    return (
        <div className="min-h-screen">
            {/* View Switching Logic */}
            {view === 'home' && (
                <>
                    {/* Fixed Header (GNB) */}
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
                                                        { label: 'My Library', icon: <Heart className="w-5 h-5 text-slate-500 group-hover:text-rose-500 transition-colors" />, color: 'group-hover:bg-rose-100', textColor: 'group-hover:text-rose-500', action: () => { setView('my-library'); setIsMenuOpen(false); } },
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

                                <div>
                                    <h1 className="text-3xl font-black text-white tracking-tight font-jua">{userName}'s Adventure</h1>
                                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-500/10 px-3 py-1 rounded-full w-fit mt-1 border border-emerald-500/20">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                        Ready to Learn!
                                    </div>
                                </div>
                            </div>

                            {/* Right: Action Buttons */}
                            <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-2xl border border-white/10">
                                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
                                    <Bell className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Main Scrollable Content */}
                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                        <div className="pt-28 space-y-12 pb-12 min-h-screen">
                            {/* Hero Section */}
                            <HeroSection
                                userName={userName}
                                readingHistory={readingHistory}
                                freshHeroBook={freshHeroBook}
                                onStartLearning={startLearning}
                                onViewInfo={(book, origin) => {
                                    setSelectedBook(book);
                                    setModalOrigin(origin || 'recommendation');
                                    if (origin === 'history') {
                                        setLibraryTab({ zone: 'Book Zone', subTab: 'Reading History' });
                                    } else {
                                        setLibraryTab({ zone: 'Book Zone', subTab: 'All Books' });
                                    }
                                }}
                                isDemoMode={isDemoMode}
                                isFlashing={isFlashing}
                            />

                            {/* Library + Media Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-stretch w-full mb-8">
                                <div className="overflow-hidden flex">
                                    <LibrarySection
                                        userName={userName}
                                        onStartLearning={startLearning}
                                        onViewInfo={(book, origin) => {
                                            setSelectedBook(book);
                                            setModalOrigin(origin || 'recommendation');
                                            if (origin === 'history') {
                                                setLibraryTab({ zone: 'Book Zone', subTab: 'Reading History' });
                                            } else {
                                                setLibraryTab({ zone: 'Book Zone', subTab: 'All Books' });
                                            }
                                        }}
                                        onSeeAll={() => {
                                            setLibraryTab({ zone: 'Book Zone', subTab: 'All Books' });
                                            setView('library');
                                        }}
                                    />
                                </div>
                                <div className="flex min-h-[300px]">
                                    <MultiSection onNavigate={(tab) => {
                                        setLibraryTab({ zone: 'Media Zone', subTab: tab });
                                        setView('library');
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DEV Mode Toggle FAB */}
                    <div className="fixed bottom-6 right-6 z-[3000]">
                        <button
                            onClick={() => setIsDemoMode(!isDemoMode)}
                            className={`px-6 py-3 rounded-2xl text-xs font-black transition-all border-[3px] shadow-xl whitespace-nowrap ${isDemoMode ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white hover:border-slate-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'} active:scale-95`}
                        >
                            DEV: {isDemoMode ? 'HISTORY MODE' : 'FRESH MODE'}
                        </button>
                    </div>

                    {/* Shared Book Detail Modal */}
                    {selectedBook && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedBook(null)} />
                            <div className="card-bubble w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-50 animate-in zoom-in-95 duration-200">
                                {/* Circular Bookmark Button */}
                                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                                    <button
                                        onClick={() => {
                                            if (selectedBook) {
                                                const originalBook = BOOKS_DATA.find(b => b.id === selectedBook.id);
                                                if (originalBook) {
                                                    originalBook.isBookmarked = !originalBook.isBookmarked;
                                                    setSelectedBook({ ...originalBook });
                                                }
                                            }
                                        }}
                                        className={`w-14 h-14 flex items-center justify-center transition-all pointer-events-auto active:scale-95 shadow-xl rounded-full border-4 border-white bg-white ${selectedBook.isBookmarked ? 'text-rose-500' : 'text-slate-300'}`}
                                    >
                                        <Heart className={`w-8 h-8 transition-colors ${selectedBook.isBookmarked ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                {/* Modal Header */}
                                <div className="p-6 md:p-8 flex justify-between items-center border-b-[6px] border-slate-50">
                                    <div className="w-14 h-14" /> {/* Spacer for Bookmark Button */}
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-700 font-jua text-center flex-1 mx-4 truncate">
                                        {selectedBook.title}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedBook(null)}
                                        className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                                    >
                                        <X className="w-8 h-8" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                                    <div className="flex flex-col gap-6">
                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-3 justify-start">
                                            <span className="px-5 py-2 bg-orange-100 text-orange-500 rounded-full font-black text-sm border-2 border-orange-200">Lexile: {selectedBook.lexile}</span>
                                            <span className="px-5 py-2 bg-green-100 text-green-500 rounded-full font-black text-sm border-2 border-green-200">{selectedBook.wordCount} Words</span>
                                            <span className="px-5 py-2 bg-sky-100 text-sky-500 rounded-full font-black text-sm border-2 border-sky-200">{selectedBook.category}</span>
                                        </div>

                                        {/* Top: Video Thumbnail */}
                                        <div
                                            className="w-full aspect-video bg-slate-200 rounded-3xl overflow-hidden border-[6px] border-white shadow-lg shadow-slate-200/50 group flex items-center justify-center relative video-container"
                                        >
                                            {isPlayingInline ? (
                                                <video
                                                    ref={inlineVideoRef}
                                                    id="inline-video"
                                                    className="absolute inset-0 w-full h-full object-cover z-20"
                                                    controls
                                                    autoPlay
                                                    playsInline
                                                    src={selectedBook.videoUrl}
                                                />
                                            ) : (
                                                <>
                                                    <video
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                        src={`${selectedBook.videoUrl}#t=0.001`}
                                                        preload="metadata"
                                                        muted
                                                        playsInline
                                                    />
                                                    <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-colors duration-300" />
                                                    <button
                                                        className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 shadow-2xl group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                                                        onClick={() => setIsPlayingInline(true)}
                                                    >
                                                        <Play className="w-10 h-10 text-slate-800 ml-1" fill="currentColor" />
                                                    </button>
                                                    <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg border border-white/20 flex items-center gap-2 pointer-events-none">
                                                        <Video className="w-4 h-4" /> Greeting Video
                                                    </div>
                                                </>
                                            )}

                                            {isPlayingInline && (
                                                <button
                                                    className="absolute bottom-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all shadow-lg z-30 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const video = inlineVideoRef.current;

                                                        if (video) {
                                                            if (!document.fullscreenElement) {
                                                                if (video.requestFullscreen) {
                                                                    video.requestFullscreen().catch((err: any) => {
                                                                        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                                                                    });
                                                                } else if ((video as any).webkitRequestFullscreen) {
                                                                    (video as any).webkitRequestFullscreen();
                                                                } else if ((video as any).msRequestFullscreen) {
                                                                    (video as any).msRequestFullscreen();
                                                                } else if ((video as any).webkitEnterFullscreen) {
                                                                    (video as any).webkitEnterFullscreen();
                                                                }
                                                            } else {
                                                                if (document.exitFullscreen) {
                                                                    document.exitFullscreen();
                                                                }
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <Maximize className="w-6 h-6" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Bottom: Details */}
                                        <div className="w-full flex-col gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <h4 className="text-xl font-black text-slate-800 font-jua">Summary</h4>
                                                    <p className="text-lg text-slate-600 leading-relaxed font-fredoka">{selectedBook.summary}</p>
                                                </div>
                                                <div className="space-y-3">
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
                </>
            )}

            {view === 'library' && (
                <LibrarySection
                    key={libraryTab ? `${libraryTab.zone}-${libraryTab.subTab}` : 'default-library'}
                    userName={userName}
                    onStartLearning={startLearning}
                    onViewInfo={(book, origin) => {
                        setSelectedBook(book);
                        setModalOrigin(origin || 'recommendation');
                        if (origin === 'history') {
                            setLibraryTab({ zone: 'Book Zone', subTab: 'Reading History' });
                        } else {
                            setLibraryTab({ zone: 'Book Zone', subTab: 'All Books' });
                        }
                    }}
                    onClose={() => setView('home')}
                    isFullPage={true}
                    initialTab={libraryTab}
                />
            )}

            {view === 'word' && currentBook && (
                <WordSection
                    book={currentBook}
                    onNext={() => setView('read')}
                    onClose={() => setView('home')}
                    onSwitchPhase={(phase) => setView(phase as any)}
                />
            )}

            {view === 'read' && currentBook && (
                <ReadSection
                    book={currentBook}
                    onClose={() => setView('home')}
                    onSwitchPhase={(phase) => setView(phase as any)}
                />
            )}

            {view === 'my-library' && (
                <MyLibrarySection
                    userName={userName}
                    readingHistory={readingHistory}
                    onClose={() => setView('home')}
                    onStartLearning={startLearning}
                    onViewInfo={(book) => {
                        setSelectedBook(book);
                        setModalOrigin('recommendation');
                    }}
                    onStopReading={stopReading}
                />
            )}

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

