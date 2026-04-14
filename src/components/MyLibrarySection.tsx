import React, { useState, useMemo } from 'react';
import { 
    Home, Bell, Menu, Star, ChevronLeft, Heart, 
    CheckCircle2, Map, BookOpen, XCircle, ArrowRight, Sparkles, Trophy,
    Play, Lock, Clock, Calendar, GripVertical
} from 'lucide-react';
import { BOOKS_DATA, Book } from '../data/books';
import { ReadingHistory } from '../types/learning';

interface MyLibrarySectionProps {
    userName: string;
    readingHistory: ReadingHistory[];
    onClose: () => void;
    onStartLearning: (book: Book) => void;
    onViewInfo: (book: Book) => void;
    onStopReading: (bookId: string) => void;
}

type LibraryTab = 'reading' | 'completed' | 'favorites' | 'roadmap';

// --- Utility: Parse Lexile for sorting ---
const getLexileValue = (lexile: string) => {
    const match = lexile.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
};

const MyLibrarySection: React.FC<MyLibrarySectionProps> = ({ 
    userName, 
    readingHistory, 
    onClose, 
    onStartLearning, 
    onViewInfo, 
    onStopReading 
}) => {
    const [activeTab, setActiveTab] = useState<LibraryTab>('reading');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // --- Data processing ---
    const roadmapBooks = useMemo(() => {
        return [...BOOKS_DATA].sort((a, b) => getLexileValue(a.lexile) - getLexileValue(b.lexile));
    }, []);

    const readingBooks = useMemo(() => {
        return readingHistory
            .filter(h => h.isActive !== false && h.completedPhases.length < 4)
            .sort((a, b) => b.lastUpdateTime - a.lastUpdateTime)
            .map(h => ({
                book: BOOKS_DATA.find(b => b.id === h.bookId) || BOOKS_DATA[0],
                history: h
            }));
    }, [readingHistory]);

    const completedBooks = useMemo(() => {
        return readingHistory
            .filter(h => h.completedPhases.length === 4)
            .sort((a, b) => b.lastUpdateTime - a.lastUpdateTime)
            .map(h => ({
                book: BOOKS_DATA.find(b => b.id === h.bookId) || BOOKS_DATA[0],
                history: h
            }));
    }, [readingHistory]);

    const favoriteBooks = useMemo(() => {
        return BOOKS_DATA.filter(b => b.isBookmarked);
    }, []);

    const tabs = [
        { id: 'reading', label: 'Active', icon: Clock },
        { id: 'completed', label: 'Finished', icon: Trophy },
        { id: 'favorites', label: 'Favorites', icon: Heart },
        { id: 'roadmap', label: 'Roadmap', icon: Map },
    ];

    return (
        <div className="fixed inset-0 bg-[#0f172a] z-[1000] flex flex-col font-fredoka overflow-hidden animate-in fade-in duration-300">
            {/* GNB Header (Dark Mode) */}
            <header className="h-20 w-full bg-[#0f172a] border-b border-white/5 shrink-0 flex items-center shadow-2xl relative z-50">
                <div className="max-w-[1600px] mx-auto w-full px-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-amber-400 rounded-2xl border-2 border-white/10 overflow-hidden shadow-lg">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ami" alt="User" />
                        </div>
                        <h1 className="text-xl font-black text-white font-jua flex items-center gap-2">
                            {userName}'s Library Center
                            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        </h1>
                    </div>

                    {/* Pill Tab Navigation */}
                    <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as LibraryTab)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black transition-all ${
                                    activeTab === tab.id 
                                        ? 'bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20' 
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="text-sm">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:scale-110 transition-all border border-white/5"
                    >
                        <XCircle className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Content Area (Light Mode) */}
            <main className="flex-1 overflow-y-auto bg-slate-50 relative custom-scrollbar">
                <div className="max-w-[1400px] mx-auto w-full px-8 py-12">
                    
                    {/* 1. Active Reading Section */}
                    {activeTab === 'reading' && (
                        <ActiveReadingTab 
                            readingHistory={readingHistory} 
                            onStartLearning={onStartLearning} 
                            onStopReading={onStopReading}
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                        />
                    )}

                    {/* 2. Finished Reading */}
                    {activeTab === 'completed' && (
                        <FinishedTab 
                            readingHistory={readingHistory} 
                            onViewInfo={onViewInfo}
                        />
                    )}

                    {/* 3. Favorites */}
                    {activeTab === 'favorites' && (
                        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 gap-y-12 py-6">
                            {favoriteBooks.length > 0 ? (
                                favoriteBooks.map((book, idx) => (
                                    <div 
                                        key={book.id} 
                                        onClick={() => onViewInfo(book)}
                                        className={`bg-white p-4 pb-12 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 cursor-pointer relative group ${idx % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
                                    >
                                        <div className="aspect-[1/1] overflow-hidden bg-slate-100 rounded-sm mb-4">
                                            <img src={book.src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                            <Heart className="w-5 h-5 text-rose-500 fill-current" />
                                        </div>
                                        <h4 className="font-black text-slate-700 font-jua text-center text-lg leading-tight uppercase tracking-tighter">{book.title}</h4>
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 border border-white/50 rotate-1 shadow-sm" />
                                    </div>
                                ))
                            ) : (
                                <EmptyState icon={Heart} message="Save your favorite books!" />
                            )}
                        </div>
                    )}

                    {/* 4. Roadmap (Snake Path) */}
                    {activeTab === 'roadmap' && (
                        <div className="space-y-16">
                            <div className="bg-white p-10 rounded-[48px] border-4 border-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 blur-3xl rounded-full" />
                                <div className="relative z-10 space-y-2">
                                    <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-600 rounded-full w-fit text-xs font-black uppercase tracking-[0.2em]">
                                        <Map className="w-3.5 h-3.5" /> Explorer's Path
                                    </div>
                                    <h2 className="text-6xl font-black text-slate-800 font-jua">Ami's Road</h2>
                                    <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Follow the dotted road to mastery! 🗺️</p>
                                </div>
                                <div className="relative z-10 flex items-center gap-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Books</p>
                                        <p className="text-2xl font-black text-slate-800 font-jua">{roadmapBooks.length}</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200" />
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Finished</p>
                                        <p className="text-2xl font-black text-slate-800 font-jua">{completedBooks.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-10 py-20 relative">
                                <SnakeRoadmap 
                                    books={roadmapBooks} 
                                    readingHistory={readingHistory} 
                                    onViewInfo={onViewInfo}
                                    onStartLearning={onStartLearning}
                                />
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

// --- Sub-components & Roadmap Logic ---

// --- Sub-components & Roadmap Logic ---

const ActiveReadingTab: React.FC<{ 
    readingHistory: ReadingHistory[], 
    onStartLearning: (book: Book) => void,
    onStopReading: (id: string) => void,
    selectedIds: string[],
    setSelectedIds: (ids: string[]) => void
}> = ({ readingHistory, onStartLearning, onStopReading, selectedIds, setSelectedIds }) => {
    const readingItems = useMemo(() => {
        return readingHistory
            .filter(h => h.isActive !== false && h.completedPhases.length < 4)
            .map(h => ({
                book: BOOKS_DATA.find(b => b.id === h.bookId) || BOOKS_DATA[0],
                history: h
            }));
    }, [readingHistory]);

    const handleToggleAll = () => {
        if (selectedIds.length === readingItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(readingItems.map(item => item.book.id));
        }
    };

    const handleToggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(idx => idx !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkDelete = () => {
        if (!confirm('Are you sure you want to remove the selected books from your active list?')) return;
        selectedIds.forEach(id => onStopReading(id));
        setSelectedIds([]);
    };

    // Smart navigation helper
    const handleContinue = (book: Book, history: ReadingHistory) => {
        // Logic to determine phase - here we just trigger the callback
        // The parent (App) should use the history.completedPhases to set the phase.
        onStartLearning(book);
    };

    if (readingItems.length === 0) {
        return <EmptyState icon={Clock} message="No active reading yet!" />;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Toolbar - Optimized */}
            <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-3xl border border-slate-100 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={handleToggleAll}
                        className="flex items-center gap-3 group"
                    >
                        <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${selectedIds.length === readingItems.length ? 'bg-sky-500 border-sky-500 shadow-lg shadow-sky-200' : 'bg-white border-slate-300 group-hover:border-sky-300'}`}>
                            {selectedIds.length === readingItems.length && <CheckCircle2 className="w-4 h-4 text-white fill-current" />}
                        </div>
                        <span className="font-black text-slate-600 text-sm uppercase tracking-widest">Select All</span>
                    </button>
                    
                    <div className="h-4 w-px bg-slate-200"></div>
                    
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                        {selectedIds.length} <span className="text-slate-300">/</span> {readingItems.length} Books Selected
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleBulkDelete}
                        disabled={selectedIds.length === 0}
                        className={`px-8 py-3 rounded-2xl font-black text-sm transition-all flex items-center gap-2 ${selectedIds.length > 0 ? 'bg-rose-500 text-white shadow-xl shadow-rose-200 hover:-translate-y-1' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                    >
                        <XCircle className="w-4 h-4" /> REMOVE SELECTED
                    </button>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest px-4">
                        <GripVertical className="w-3.5 h-3.5" /> Drag cards to reorder
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {readingItems.map(({ book, history }) => {
                    const isSelected = selectedIds.includes(book.id);
                    return (
                        <div 
                            key={book.id} 
                            className={`bg-white rounded-[40px] p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-4 relative group flex flex-col hover:-translate-y-2 ${isSelected ? 'border-sky-400 ring-4 ring-sky-50' : 'border-white'}`}
                        >
                            {/* Drag Handle & Reorder Hint - Always Visible */}
                            <div className="absolute top-1/2 -left-3 -translate-y-1/2 h-20 w-8 bg-white shadow-xl border border-slate-100 rounded-full flex flex-col items-center justify-center gap-1 z-40 cursor-grab active:cursor-grabbing hover:scale-110 transition-all border-l-4 border-l-sky-400">
                                <GripVertical className="w-5 h-5 text-sky-400" />
                                <span className="[writing-mode:vertical-lr] text-[8px] font-black text-sky-600 uppercase tracking-tighter">DRAG</span>
                            </div>

                            {/* Direct Delete Button */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); onStopReading(book.id); }}
                                className="absolute -top-3 -right-3 w-12 h-12 bg-white text-slate-200 hover:text-rose-500 hover:scale-110 transition-all z-30 shadow-2xl rounded-2xl flex items-center justify-center border-2 border-slate-50 group-hover:border-rose-100"
                            >
                                <XCircle className="w-7 h-7" />
                            </button>

                            {/* Selection Checkbox */}
                            <button 
                                onClick={() => handleToggleSelect(book.id)}
                                className={`absolute top-6 left-6 z-30 w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-xl hover:scale-110 ${isSelected ? 'bg-sky-500 text-white border-4 border-white' : 'bg-white/80 backdrop-blur-md text-slate-300 border-2 border-slate-100 opacity-0 group-hover:opacity-100'}`}
                            >
                                <CheckCircle2 className={`w-6 h-6 ${isSelected ? 'fill-current' : ''}`} />
                            </button>

                            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden mb-6 shadow-md cursor-pointer" onClick={() => handleToggleSelect(book.id)}>
                                <img 
                                    src={book.src} 
                                    alt={book.title} 
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${isSelected ? 'brightness-75' : ''}`}
                                />
                                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xl border border-white/50 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Learning Now</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <h4 className="text-2xl font-black text-slate-800 font-jua line-clamp-1 mb-2">
                                    {book.title}
                                </h4>
                                
                                <div className="flex justify-between items-center mb-4 text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                                    <span>Step {history.completedPhases.length + 1} <span className="text-slate-200 mx-2">|</span> {['Voca', 'Read', 'Talk', 'Quiz'][history.completedPhases.length] || 'Done'}</span>
                                    <span className="text-sky-500">{(history.completedPhases.length / 4) * 100}%</span>
                                </div>

                                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-10 border border-slate-200/50">
                                    <div 
                                        className="h-full bg-gradient-to-r from-sky-400 to-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-all duration-1000" 
                                        style={{ width: `${(history.completedPhases.length / 4) * 100}%` }}
                                    />
                                </div>

                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleContinue(book, history); }}
                                    className="w-full py-5 bg-[#fbbf24] hover:bg-[#f59e0b] hover:shadow-2xl hover:shadow-amber-200 text-[#0f172a] rounded-[28px] font-black text-lg flex items-center justify-center gap-3 transform active:scale-95 transition-all mt-auto shadow-xl"
                                >
                                    <span className="uppercase tracking-tight">Continue Reading</span>
                                    <Play className="w-6 h-6 fill-current" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const FinishedTab: React.FC<{ 
    readingHistory: ReadingHistory[], 
    onViewInfo: (book: Book) => void 
}> = ({ readingHistory, onViewInfo }) => {
    const finishedItems = useMemo(() => {
        return readingHistory
            .filter(h => h.completedPhases.length === 4)
            .map(h => ({
                book: BOOKS_DATA.find(b => b.id === h.bookId) || BOOKS_DATA[0],
                history: h
            }));
    }, [readingHistory]);

    if (finishedItems.length === 0) {
        return <EmptyState icon={Trophy} message="No trophies collected yet!" />;
    }

    return (
        <div className="space-y-16">
            <div className="bg-gradient-to-r from-amber-500/10 via-transparent to-transparent p-10 rounded-[48px] border-4 border-white shadow-xl flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-amber-400 text-slate-900 rounded-full w-fit text-[10px] font-black uppercase tracking-widest shadow-lg">
                        <Trophy className="w-3.5 h-3.5 fill-current" /> Hall of Fame
                    </div>
                    <h2 className="text-5xl font-black text-slate-800 font-jua uppercase tracking-tight">Achievements</h2>
                    <p className="text-slate-500 font-bold text-lg uppercase tracking-widest">You've mastered {finishedItems.length} wonderful stories! 🏆</p>
                </div>
                <div className="relative z-10 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl border-4 border-amber-100 animate-bounce">
                    <Trophy className="w-12 h-12 text-amber-500 fill-current" />
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-[100px] rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-10 gap-y-16">
                {finishedItems.map(({ book }) => (
                    <div key={book.id} className="group flex flex-col items-center">
                        <div className="relative w-full aspect-[3/4] rounded-[32px] overflow-hidden border-4 border-white shadow-xl group-hover:shadow-[0_40px_80px_rgba(251,191,36,0.2)] group-hover:-translate-y-4 transition-all duration-700 cursor-pointer">
                            <img 
                                src={book.src} 
                                alt={book.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 p-5 pt-10 flex flex-col items-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <button 
                                    onClick={() => onViewInfo(book)}
                                    className="w-full py-3 bg-white text-slate-900 rounded-2xl font-black text-xs hover:bg-amber-400 hover:text-white transition-all shadow-xl"
                                >
                                    Read Again
                                </button>
                            </div>
                            <div className="absolute top-4 right-4 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-2xl border-2 border-white rotate-12 group-hover:rotate-0 transition-transform">
                                <Trophy className="w-5 h-5 text-white fill-current" />
                            </div>
                        </div>
                        <div className="mt-6 text-center space-y-1">
                            <h4 className="font-black text-slate-700 font-jua text-lg line-clamp-1 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{book.title}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Mastered
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EmptyState: React.FC<{ icon: any, message: string }> = ({ icon: Icon, message }) => (
    <div className="col-span-full h-[500px] flex flex-col items-center justify-center text-slate-300">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Icon className="w-12 h-12 opacity-30" />
        </div>
        <p className="text-2xl font-black font-jua uppercase tracking-tighter opacity-40">{message}</p>
    </div>
);

const SnakeRoadmap: React.FC<{ 
    books: Book[], 
    readingHistory: ReadingHistory[], 
    onViewInfo: (b: Book) => void,
    onStartLearning: (b: Book) => void
}> = ({ books, readingHistory, onViewInfo, onStartLearning }) => {
    const cols = 4;
    const rowsArr = useMemo(() => {
        const rows: Book[][] = [];
        for (let i = 0; i < books.length; i += cols) {
            const rowIdx = Math.floor(i / cols);
            const row = books.slice(i, i + cols);
            if (rowIdx % 2 !== 0) {
                rows.push([...row].reverse());
            } else {
                rows.push(row);
            }
        }
        return rows;
    }, [books]);

    return (
        <div className="flex flex-col gap-24 relative max-w-[1100px] mx-auto">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-10">
                <path 
                    d={generateComplexPath(books.length, cols)} 
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
                        const firstUnreadIdx = books.findIndex(b => !readingHistory.some(h => h.bookId === b.id));
                        const isNextTarget = !history && books.indexOf(book) === firstUnreadIdx;
                        const isLocked = !history && !isNextTarget && books.indexOf(book) > firstUnreadIdx;

                        return (
                            <div key={book.id} className="relative z-10 group">
                                <div 
                                    onClick={() => isLocked ? null : (isActive || isNextTarget ? onStartLearning(book) : onViewInfo(book))}
                                    className={`
                                        relative w-44 lg:w-52 aspect-[3/4] rounded-[40px] overflow-hidden border-4 transition-all duration-500
                                        ${isLocked ? 'grayscale opacity-30 scale-90 blur-[1px] cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:-translate-y-4'}
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

export default MyLibrarySection;
