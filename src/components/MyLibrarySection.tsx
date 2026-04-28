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

    const leftTabs = [
        { id: 'reading', label: 'In Progress', icon: Clock },
        { id: 'completed', label: 'Completed', icon: Trophy },
        { id: 'favorites', label: 'Favorites', icon: Heart },
    ];

    return (
        <div className="min-h-screen flex flex-col font-fredoka bg-slate-50 pt-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Sub-Navigation Header */}
            <div className="bg-white border-b border-slate-200 sticky top-24 z-40 shadow-sm">
                <div className="max-w-[1400px] mx-auto w-full px-8 flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <h2 className="text-xl font-black text-slate-800 font-jua flex items-center gap-2">
                            My Library
                        </h2>

                        {/* Roadmap on the left now */}
                        <button
                            onClick={() => setActiveTab('roadmap')}
                            className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl font-black transition-all border-2 border-transparent active:scale-95 ${
                                activeTab === 'roadmap'
                                    ? 'bg-[#fbbf24] text-[#0f172a] shadow-[0_0_20px_rgba(251,191,36,0.4)] scale-105'
                                    : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                            }`}
                        >
                            <Map className={`w-5 h-5 ${activeTab === 'roadmap' ? 'animate-bounce' : ''}`} />
                            <span className="text-sm uppercase tracking-widest">Roadmap</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Text Tabs on the right */}
                        <div className="flex items-center gap-2 mr-4">
                            {leftTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as LibraryTab)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black transition-all ${
                                        activeTab === tab.id 
                                            ? 'bg-slate-800 text-white shadow-md' 
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span className="text-sm uppercase tracking-widest">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                        
                        <div className="w-px h-8 bg-slate-200" />

                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 bg-slate-50 w-full">
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
                        <FavoritesTab 
                            favoriteBooks={favoriteBooks} 
                            readingHistory={readingHistory} 
                            onViewInfo={onViewInfo} 
                        />
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

                            <div className="py-20 relative w-full overflow-hidden">
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
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    
    const finishedItems = useMemo(() => {
        let items = readingHistory
            .filter(h => h.completedPhases.length === 4)
            .map(h => ({
                book: BOOKS_DATA.find(b => b.id === h.bookId) || BOOKS_DATA[0],
                history: h
            }));
        if (showFavoritesOnly) {
            items = items.filter(item => item.book.isBookmarked);
        }
        return items;
    }, [readingHistory, showFavoritesOnly]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-end mb-6">
                <label className="flex items-center gap-3 cursor-pointer group bg-white px-4 py-2 rounded-2xl shadow-sm border-2 border-slate-100 hover:border-pink-200 transition-colors">
                    <Heart className={`w-5 h-5 transition-colors ${showFavoritesOnly ? 'fill-pink-500 text-pink-500' : 'text-slate-300'}`} />
                    <span className="font-bold text-slate-600">Favorites Only</span>
                    <div className="relative ml-2">
                        <input type="checkbox" className="sr-only peer" checked={showFavoritesOnly} onChange={() => setShowFavoritesOnly(!showFavoritesOnly)} />
                        <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-pink-500 transition-all"></div>
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                    </div>
                </label>
            </div>
            
            {finishedItems.length === 0 ? (
                <EmptyState icon={showFavoritesOnly ? Heart : Trophy} message={showFavoritesOnly ? "No favorite completed books!" : "No trophies collected yet!"} />
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                    {finishedItems.map(({ book }) => (
                        <div key={book.id} onClick={() => onViewInfo(book)} className="relative group cursor-pointer aspect-[3/4] rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-[3px] border-slate-100 hover:border-indigo-100 bg-slate-50 w-full">
                            <img src={book.src} alt={book.title} className="w-full h-full object-cover pointer-events-none" />
                            <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            
                            <button className="absolute bottom-2 right-2 w-9 h-9 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-20 group/btn border-2 border-slate-50" onClick={(e) => { e.stopPropagation(); /* React version does not have global toggleHeart yet, would need parent prop. Placeholder: */ console.log('toggle heart'); }}>
                                <Heart className={`w-4 h-4 transition-colors ${book.isBookmarked ? 'fill-pink-500 text-pink-500' : 'text-slate-300 group-hover:text-pink-400'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FavoritesTab: React.FC<{
    favoriteBooks: Book[],
    readingHistory: ReadingHistory[],
    onViewInfo: (book: Book) => void
}> = ({ favoriteBooks, readingHistory, onViewInfo }) => {
    const [subCategory, setSubCategory] = useState<'All' | 'SavedForLater' | 'HallOfFame'>('All');

    const completedIds = useMemo(() => {
        return readingHistory.filter(h => h.completedPhases.length === 4).map(h => h.bookId);
    }, [readingHistory]);

    const savedForLater = favoriteBooks.filter(b => !completedIds.includes(b.id));
    const hallOfFame = favoriteBooks.filter(b => completedIds.includes(b.id));

    const renderCoverGallery = (books: Book[], isCarousel = false) => {
        if (books.length === 0) return null;
        
        const wrapperClass = isCarousel 
            ? "flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 cursor-grab active:cursor-grabbing select-none custom-scrollbar" 
            : "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 animate-in fade-in slide-in-from-bottom-4";

        return (
            <div className={wrapperClass}>
                {books.map(book => (
                    <div key={book.id} onClick={() => onViewInfo(book)} className={`relative group cursor-pointer aspect-[3/4] rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-[3px] border-slate-100 hover:border-indigo-100 bg-slate-50 ${isCarousel ? 'w-32 md:w-40 shrink-0' : 'w-full'}`}>
                        <img src={book.src} alt={book.title} className="w-full h-full object-cover pointer-events-none" />
                        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        
                        <button className="absolute bottom-2 right-2 w-9 h-9 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-20 group/btn border-2 border-slate-50" onClick={(e) => { e.stopPropagation(); console.log('toggle heart'); }}>
                            <Heart className={`w-4 h-4 transition-colors ${book.isBookmarked ? 'fill-pink-500 text-pink-500' : 'text-slate-300 group-hover:text-pink-400'}`} />
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    if (favoriteBooks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
                <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-lg">
                    <Heart className="w-12 h-12 text-pink-300" />
                </div>
                <h2 className="text-3xl font-black text-slate-700 font-jua mb-4">No Favorites Yet</h2>
                <p className="text-slate-500 font-bold text-lg">Find books you love and tap the heart icon to save them here!</p>
            </div>
        );
    }

    if (subCategory === 'SavedForLater') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setSubCategory('All')} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group active:scale-95">
                        <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </button>
                    <div>
                        <h3 className="text-3xl font-black text-slate-800 font-jua">Saved for Later</h3>
                    </div>
                </div>
                {renderCoverGallery(savedForLater, false)}
            </div>
        );
    }

    if (subCategory === 'HallOfFame') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setSubCategory('All')} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group active:scale-95">
                        <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </button>
                    <div>
                        <h3 className="text-3xl font-black text-amber-900 font-jua">Hall of Fame</h3>
                    </div>
                </div>
                {renderCoverGallery(hallOfFame, false)}
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {savedForLater.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-sky-500" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 font-jua uppercase tracking-tight">Saved for Later</h3>
                        </div>
                        <button onClick={() => setSubCategory('SavedForLater')} className="text-[#fbbf24] font-black px-5 py-2.5 bg-[#0f172a] rounded-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider shadow-lg shadow-slate-900/20">See All</button>
                    </div>
                    {renderCoverGallery(savedForLater, true)}
                </div>
            )}
            
            {hallOfFame.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-200 rounded-xl flex items-center justify-center shadow-inner">
                                <Trophy className="w-5 h-5 text-amber-600" />
                            </div>
                            <h3 className="text-3xl font-black text-amber-900 font-jua uppercase tracking-tight">Hall of Fame</h3>
                        </div>
                        <button onClick={() => setSubCategory('HallOfFame')} className="text-[#fbbf24] font-black px-5 py-2.5 bg-[#0f172a] rounded-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider shadow-lg shadow-slate-900/20">See All</button>
                    </div>
                    {renderCoverGallery(hallOfFame, true)}
                </div>
            )}
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
    const containerRef = React.useRef<HTMLDivElement>(null);
    const pathRef = React.useRef<SVGPathElement>(null);
    
    const rowsArr = React.useMemo(() => {
        const rows: { items: Book[], isOddRow: boolean }[] = [];
        for (let i = 0; i < books.length; i += cols) {
            const row = books.slice(i, i + cols);
            const isOddRow = (Math.floor(i / cols) % 2 !== 0);
            rows.push({ items: isOddRow ? [...row].reverse() : row, isOddRow });
        }
        return rows;
    }, [books]);

    React.useEffect(() => {
        const drawLine = () => {
            if (!containerRef.current || !pathRef.current) return;
            const nodesRaw = Array.from(containerRef.current.querySelectorAll('.react-roadmap-node')) as HTMLElement[];
            const nodes = nodesRaw.sort((a, b) => parseInt(a.dataset.index!) - parseInt(b.dataset.index!));
            
            if (nodes.length < 2) return;
            
            const svgRect = pathRef.current.parentElement!.getBoundingClientRect();
            let d = '';
            nodes.forEach((node, i) => {
                const rect = node.getBoundingClientRect();
                const x = rect.left - svgRect.left + rect.width / 2;
                const y = rect.top - svgRect.top + rect.height / 2;
                if (i === 0) d += `M ${x} ${y}`;
                else d += ` L ${x} ${y}`;
            });
            pathRef.current.setAttribute('d', d);
        };
        
        // Short delay to ensure DOM is fully rendered
        const timeoutId = setTimeout(drawLine, 100);
        window.addEventListener('resize', drawLine);
        
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', drawLine);
        };
    }, [books]);

    return (
        <div className="relative w-full max-w-[1200px] mx-auto py-20 px-4 sm:px-10">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.3 }}>
                <path 
                    ref={pathRef}
                    d="" 
                    fill="none" 
                    stroke="#94a3b8" 
                    strokeWidth="8" 
                    strokeDasharray="16 16" 
                    strokeLinecap="round" 
                />
            </svg>

            <div ref={containerRef} className="flex flex-col gap-24 relative z-10">
                {rowsArr.map((rowObj, rowIdx) => (
                    <div 
                        key={rowIdx} 
                        className={`flex items-center gap-8 md:gap-16 w-full justify-around ${rowObj.isOddRow ? 'flex-row-reverse pr-12 md:pr-24' : 'flex-row pl-12 md:pl-24'}`}
                    >
                        {rowObj.items.map((book) => {
                            const originalIdx = books.findIndex(b => b.id === book.id);
                            const history = readingHistory.find(h => h.bookId === book.id);
                            const isCompleted = history?.completedPhases.length === 4;
                            const isActive = history && !isCompleted;
                            const firstUnreadIdx = books.findIndex(b => !readingHistory.some(h => h.bookId === b.id));
                            const isNextTarget = !history && books.indexOf(book) === firstUnreadIdx;
                            const isLocked = !history && !isNextTarget && books.indexOf(book) > firstUnreadIdx;

                            return (
                                <div key={book.id} className="react-roadmap-node relative group flex flex-col items-center transition-all duration-500" data-index={originalIdx}>
                                    <div 
                                        onClick={() => isLocked ? null : (isActive || isNextTarget ? onStartLearning(book) : onViewInfo(book))}
                                        className={`
                                            relative w-32 md:w-44 lg:w-48 aspect-[3/4] rounded-[32px] overflow-hidden border-4 transition-all duration-500
                                            ${isLocked ? 'grayscale opacity-40 scale-90 blur-[1px] cursor-not-allowed border-white' : 'cursor-pointer hover:scale-105 hover:-translate-y-4'}
                                            ${isActive || isNextTarget ? 'border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.6)] z-20 scale-110' : 'border-white shadow-xl'}
                                            ${isCompleted ? 'border-emerald-400 grayscale-0 opacity-90' : ''}
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
                                                <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full uppercase tracking-widest shadow-md animate-pulse">CURRENT</div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                                        <Play className="w-8 h-8 text-amber-500 fill-current ml-1" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-6 px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-lg z-30 flex items-center gap-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                        <Sparkles className="w-3 h-3 text-amber-400" />
                                        <p className="text-[11px] font-black text-slate-600 uppercase tracking-tighter line-clamp-1 max-w-[120px]">{book.title}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyLibrarySection;
