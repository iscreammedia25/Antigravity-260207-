'use client';

import React, { useState } from 'react';
import { Bell, Menu, Play, Heart, X, Video, Maximize, Sparkles, Map, Lock, CheckCircle2, Star, ChevronRight, Clock, Shield } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import LibrarySection from '@/components/LibrarySection';
import MultiSection from '@/components/MultiSection';
import WordSection from '@/components/WordSection';
import ReadSection from '@/components/ReadSection';
import { BOOKS_DATA, Book } from '@/data/books';
import { ReadingHistory } from '@/types/learning';
import { getReadingHistory } from '@/utils/storage';
import MyLibrarySection from '@/components/MyLibrarySection';

// --- Roadmap Components ---

function generateComplexPath(count: number, cols: number) {
  const spaceX = 260; const spaceY = 320;
  const startX = 100; const startY = 160;
  let d = `M ${startX} ${startY}`;
  for (let i = 1; i < count; i++) {
    const row = Math.floor(i / cols);
    const colIdx = i % cols;
    const isOddRow = row % 2 !== 0;
    let targetCol = isOddRow ? (cols - 1 - colIdx) : colIdx;
    d += ` L ${startX + targetCol * spaceX} ${startY + row * spaceY}`;
  }
  return d;
}

const SnakeRoadmap: React.FC<{ 
  books: Book[], 
  readingHistory: ReadingHistory[], 
  onViewInfo: (b: Book) => void,
  onStartLearning: (b: Book) => void
}> = ({ books, readingHistory, onViewInfo, onStartLearning }) => {
  const cols = 4;
  const sortedBooks = React.useMemo(() => {
    return [...books].sort((a, b) => {
      const getLexile = (l: string) => parseInt(l.match(/\d+/)?.[0] || '0');
      return getLexile(a.lexile) - getLexile(b.lexile);
    });
  }, [books]);

  const rowsArr = React.useMemo(() => {
    const rows: Book[][] = [];
    for (let i = 0; i < sortedBooks.length; i += cols) {
      const rowIdx = Math.floor(i / cols);
      const row = sortedBooks.slice(i, i + cols);
      if (rowIdx % 2 !== 0) {
        rows.push([...row].reverse());
      } else {
        rows.push(row);
      }
    }
    return rows;
  }, [sortedBooks]);

  return (
    <div className="flex flex-col gap-24 relative max-w-[1100px] mx-auto py-10">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-10">
        <path 
          d={generateComplexPath(sortedBooks.length, cols)} 
          fill="none" 
          stroke="#475569" 
          strokeWidth="10" 
          strokeDasharray="15 25" 
          strokeLinecap="round" 
        />
      </svg>

      {rowsArr.map((row, rowIdx) => (
        <div 
          key={rowIdx} 
          className={`flex gap-12 lg:gap-20 items-center ${rowIdx % 2 !== 0 ? 'flex-row-reverse pl-24' : 'pr-24'}`}
        >
          {row.map((book) => {
            const history = readingHistory.find(h => h.bookId === book.id);
            const isCompleted = history?.completedPhases.length === 4;
            const isActive = history && !isCompleted;
            
            const firstUnreadIdx = sortedBooks.findIndex(b => !readingHistory.some(h => h.bookId === b.id));
            const isNextTarget = !history && sortedBooks.indexOf(book) === firstUnreadIdx;
            const isLocked = !history && !isNextTarget && sortedBooks.indexOf(book) > firstUnreadIdx;

            return (
              <div key={book.id} className="relative z-10 group">
                <div 
                  onClick={() => isLocked ? null : (isActive || isNextTarget ? onStartLearning(book) : onViewInfo(book))}
                  className={`
                    relative w-44 lg:w-52 aspect-[3/4] rounded-[40px] overflow-hidden border-4 transition-all duration-500
                    ${isLocked ? 'grayscale opacity-30 blur-[1px] cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:-translate-y-4'}
                    ${isActive || isNextTarget ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)] z-20 scale-105' : 'border-white shadow-xl'}
                    ${isCompleted ? 'border-emerald-400 grayscale-0 opacity-80' : ''}
                  `}
                >
                  <img src={book.src} alt="" className="w-full h-full object-cover" />
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                      <Lock className="w-12 h-12 text-white/50" />
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-400">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 fill-current" />
                      </div>
                    </div>
                  )}
                  {(isActive || isNextTarget) && (
                    <>
                      <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full uppercase tracking-widest shadow-md">NEW</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                          <Play className="w-8 h-8 text-amber-500 fill-current ml-1" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-lg z-30 flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Level {book.lexile}</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

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
        },
        {
            bookId: 'OG0021',
            currentPhase: 'quiz',
            completedPhases: ['word', 'read'],
            lastUpdateTime: Date.now() - 10000
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
        <div className="h-full bg-[#F8FAFC] flex flex-col overflow-hidden">
            {/* View Switching Logic */}
            {view === 'home' && (
                <>
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
                                    <button 
                                        onClick={() => setIsMenuOpen(true)}
                                        className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors border-2 border-gray-50"
                                    >
                                        <Menu />
                                    </button>
                                </div>
                            </header>

                            {/* Sidebar / Menu Overlay */}
                            {isMenuOpen && (
                                <div className="fixed inset-0 z-[200] flex justify-end">
                                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                                    <div className="relative w-80 h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 p-8 flex flex-col">
                                        <div className="flex justify-between items-center mb-12">
                                            <h2 className="text-3xl font-black text-slate-800 font-jua">Ami's Menu</h2>
                                            <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><X /></button>
                                        </div>
                                        <nav className="space-y-4">
                                            {[
                                                { label: 'Account', icon: '👤' },
                                                { label: 'Vocabulary', icon: '📖' },
                                                { label: 'My Library', icon: '❤️', action: () => { setView('my-library'); setIsMenuOpen(false); } },
                                                { label: 'My Report', icon: '📊' }
                                            ].map((item) => (
                                                <button 
                                                    key={item.label}
                                                    onClick={item.action}
                                                    className="w-full p-5 rounded-2xl hover:bg-slate-50 flex items-center gap-4 transition-all group active:scale-95"
                                                >
                                                    <span className="text-2xl">{item.icon}</span>
                                                    <span className="text-xl font-black text-slate-600 group-hover:text-sky-500">{item.label}</span>
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            )}

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

                            {/* Reading Roadmap (Snake Path) */}
                            <div className="space-y-8 py-8 relative">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-200">
                                        <Map className="w-6 h-6 fill-current" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-800 font-jua">Ami's Road</h3>
                                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Follow the dots to become a master reader! 🗺️</p>
                                    </div>
                                </div>
                                
                                {BOOKS_DATA.length > 0 && (
                                    <SnakeRoadmap 
                                        books={BOOKS_DATA} 
                                        readingHistory={readingHistory} 
                                        onViewInfo={(book) => {
                                            setSelectedBook(book);
                                            setModalOrigin('recommendation');
                                        }}
                                        onStartLearning={startLearning}
                                    />
                                )}
                            </div>

                            {/* Library Section */}
                            <div className="w-full pb-8">
                                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-stretch">
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

