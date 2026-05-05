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

type LibraryTab = 'reading' | 'completed' | 'wishlist' | 'roadmap';

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
    const [ratingFilters, setRatingFilters] = useState<Record<number, boolean>>({
        5: true, 4: true, 3: true, 2: true, 1: true
    });

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

    // Re-compute on every render so BOOKS_DATA mutations (isBookmarked toggle) are reflected
    const favoriteBooks = BOOKS_DATA.filter(b => b.isBookmarked);

    const leftTabs = [
        { id: 'reading', label: 'In Progress', icon: Clock },
        { id: 'completed', label: 'Completed', icon: Trophy },
        { id: 'wishlist', label: '❤️ Wishlist', icon: Heart },
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
                            ratingFilters={ratingFilters}
                            setRatingFilters={setRatingFilters}
                        />
                    )}

                    {/* 3. Wishlist */}
                    {activeTab === 'wishlist' && (
                        <WishlistTab 
                            favoriteBooks={favoriteBooks} 
                            readingHistory={readingHistory} 
                            onViewInfo={onViewInfo}
                            onNavigate={setActiveTab}
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
        return (
            <EmptyState 
                icon={BookOpen} 
                title="No adventures started!"
                message="Every great story begins with a single page. Pick a book and start your journey!"
                ctaText="Go to Library"
                onCtaClick={() => onNavigate('Picks')} // Should also switch zone to Library in real app
            />
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-slate-50/80 px-5 py-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleToggleAll}
                        className="flex items-center gap-2.5 group"
                    >
                        <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${selectedIds.length === readingItems.length && readingItems.length > 0 ? 'bg-sky-500 border-sky-500' : 'bg-white border-slate-300 group-hover:border-sky-300'}`}>
                            {selectedIds.length === readingItems.length && readingItems.length > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-current" />}
                        </div>
                        <span className="font-black text-slate-500 text-sm uppercase tracking-wider">Select All</span>
                    </button>
                    <div className="h-4 w-px bg-slate-200" />
                    <span className="text-xs font-bold text-slate-400">
                        {selectedIds.length > 0 ? `${selectedIds.length} selected` : `${readingItems.length} books`}
                    </span>
                </div>

                <button
                    onClick={handleBulkDelete}
                    disabled={selectedIds.length === 0}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all ${selectedIds.length > 0 ? 'bg-rose-500 text-white shadow-lg shadow-rose-100 hover:bg-rose-600 hover:-translate-y-0.5' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                >
                    <XCircle className="w-4 h-4" />
                    Remove{selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {readingItems.map(({ book, history }) => {
                    const isSelected = selectedIds.includes(book.id);
                    const progressPercent = Math.round((history.completedPhases.length / 4) * 100);
                    
                    return (
                        <div
                            key={book.id}
                            className={`bg-white rounded-[40px] p-5 shadow-xl hover:shadow-2xl transition-all duration-500 border-4 relative group flex flex-col hover:-translate-y-2 ${isSelected ? 'border-sky-400 ring-4 ring-sky-50' : 'border-white'}`}
                        >
                            {/* Selection Checkbox */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleToggleSelect(book.id); }}
                                className={`absolute top-5 left-5 z-30 w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-xl hover:scale-110 ${isSelected ? 'bg-sky-500 text-white border-4 border-white' : 'bg-white/80 backdrop-blur-md text-slate-300 border-2 border-slate-100 opacity-0 group-hover:opacity-100'}`}
                            >
                                <CheckCircle2 className={`w-6 h-6 ${isSelected ? 'fill-current' : ''}`} />
                            </button>

                            {/* Top: Cover centered and larger */}
                            <div 
                                className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden mb-5 shadow-md cursor-pointer"
                                onClick={() => handleToggleSelect(book.id)}
                            >
                                <img
                                    src={book.src}
                                    alt={book.title}
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${isSelected ? 'brightness-75' : ''}`}
                                />
                            </div>

                            {/* Middle: Progress Bar with Label */}
                            <div className="space-y-2 mb-5 px-1">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                                    <span className="text-xs font-black text-sky-500">{progressPercent}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-0.5">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-all duration-1000"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            {/* Bottom: CTA Button (Hero Style - Yellow) */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleContinue(book, history); }}
                                className="w-full py-4 bg-[#fbbf24] hover:bg-amber-400 text-[#0f172a] rounded-[24px] font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-lg shadow-amber-500/20"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                <span>Continue Reading</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const FinishedTab: React.FC<{ 
    readingHistory: ReadingHistory[], 
    onViewInfo: (book: Book) => void,
    ratingFilters: Record<number, boolean>,
    setRatingFilters: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}> = ({ readingHistory, onViewInfo, ratingFilters, setRatingFilters }) => {
    
    const finishedItems = useMemo(() => {
        return readingHistory
            .filter(h => h.completedPhases.length === 4)
            .map(h => {
                const book = BOOKS_DATA.find(b => b.id === h.bookId) || BOOKS_DATA[0];
                // Handle cases where rating is missing in mock data
                const rating = book.rating || 0;
                return { book, history: h, rating };
            })
            .filter(item => {
                const r = item.book.rating || 4; // default to 4 for demo if missing
                return ratingFilters[r as number];
            });
    }, [readingHistory, ratingFilters]);

    const toggleRatingFilter = (rating: number) => {
        setRatingFilters(prev => ({ ...prev, [rating]: !prev[rating] }));
    };

    // Demo enhancement: Ensure at least 4 items for "My Favorites" to show scrolling
    const favoriteItems = useMemo(() => {
        const actualFavorites = finishedItems.filter(item => item.book.rating === 5);
        if (actualFavorites.length < 4) {
            // Fill with other completed books or some default books for demo
            const others = finishedItems.filter(item => item.book.rating !== 5);
            return [...actualFavorites, ...others].slice(0, 4);
        }
        return actualFavorites;
    }, [finishedItems]);

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4">
            {finishedItems.length === 0 ? (
                <EmptyState 
                    icon={Trophy} 
                    title="No trophies yet!"
                    message="Finish your first book to earn a shiny trophy and see your achievements here."
                    ctaText="Complete a Book!"
                    onCtaClick={() => onNavigate('In Progress')} 
                />
            ) : (
                <>
                    {/* 1. Top Section: My Reading Journey (Mini Dashboard) */}
                    <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-8 rounded-[40px] shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-0">
                <div className="absolute inset-0 bg-white/5 opacity-50 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-20 h-20 bg-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-4 border-[#fcd34d]">
                        <Trophy className="w-10 h-10 text-white fill-white" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-white font-jua uppercase tracking-tight mb-1 drop-shadow-sm">My Reading Journey</h3>
                        <div className="flex items-end gap-3">
                            <p className="text-xl font-bold text-white/90">
                                Wow! You've successfully finished <span className="text-[#fde047] font-black text-3xl drop-shadow-md mx-1">{finishedItems.length}</span> books!
                            </p>
                            {/* Mini decorative bar chart */}
                            <div className="flex items-end gap-1.5 ml-2 mb-1.5">
                                <div className="w-2.5 h-4 bg-[#6ee7b7] rounded-full shadow-sm"></div>
                                <div className="w-2.5 h-6 bg-[#67e8f9] rounded-full shadow-sm"></div>
                                <div className="w-2.5 h-8 bg-[#f9a8d4] rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="px-8 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-full font-black text-lg shadow-[0_6px_0_#0f766e] active:shadow-[0_0px_0_#0f766e] active:translate-y-1.5 transition-all relative z-10 whitespace-nowrap">
                    View My Report
                </button>
            </div>


            {/* 2. Bottom Section: All Completed Books (Grid) */}
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <select className="appearance-none h-12 pl-5 pr-10 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-600 outline-none focus:border-indigo-400 transition-all cursor-pointer shadow-sm">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>

                        {/* Rating Filters */}
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-slate-100 shadow-sm">
                            <span className="font-black text-slate-400 text-[10px] uppercase tracking-widest mr-2">Ratings</span>
                            {[5, 4, 3, 2, 1].map(r => (
                                <button
                                    key={r}
                                    onClick={() => toggleRatingFilter(r)}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all border-2 ${
                                        ratingFilters[r] 
                                            ? 'bg-amber-50 border-amber-200 text-amber-500 shadow-sm scale-105' 
                                            : 'bg-slate-50 border-transparent text-slate-300 hover:border-slate-200'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        {[...Array(r)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${ratingFilters[r] ? 'fill-current' : ''}`} />
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {finishedItems.length === 0 ? (
                    <EmptyState 
                        icon={Trophy} 
                        title="Trophy shelf is empty!"
                        message="Complete your first book to earn a shiny trophy and see your progress grow here."
                        ctaText="Start Your First Book"
                        onCtaClick={() => {}} // Navigate to library logic
                    />
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {finishedItems.map(({ book }, idx) => {
                            let rating = book.rating;
                            if (!rating || rating <= 0) {
                                rating = idx % 2 === 0 ? 4 : 2;
                            }
                            return (
                                <div key={book.id} onClick={() => onViewInfo(book)} className="relative group cursor-pointer aspect-[3/4] rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-[3px] border-slate-100 hover:border-indigo-100 bg-slate-50 w-full">
                                    <img src={book.src} alt={book.title} className="w-full h-full object-cover pointer-events-none" />
                                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    
                                    {/* Top-right: Completed green badge */}
                                    <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500 rounded-full shadow-md">
                                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                                        <span className="text-[8px] font-black text-white leading-none">Completed</span>
                                    </div>
                                    
                                    {/* Bottom center: star emoji */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-max">
                                        <div className="bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm border border-amber-100 text-[11px] leading-none">
                                            {'⭐'.repeat(rating)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

const WishlistTab: React.FC<{
    favoriteBooks: Book[],
    readingHistory: ReadingHistory[],
    onViewInfo: (book: Book) => void,
    onNavigate: (tab: LibraryTab) => void
}> = ({ favoriteBooks, readingHistory, onViewInfo }) => {

    const [unreadOnly, setUnreadOnly] = React.useState(false);
    const [sortBy, setSortBy] = React.useState('Recent');

    const completedIds = useMemo(() => {
        return readingHistory.filter(h => h.completedPhases.length === 4).map(h => h.bookId);
    }, [readingHistory]);

    const inProgressIds = useMemo(() => {
        return readingHistory.filter(h => h.isActive !== false && h.completedPhases.length < 4).map(h => h.bookId);
    }, [readingHistory]);

    const wishlistBooks = useMemo(() => {
        return favoriteBooks.filter(b => !completedIds.includes(b.id)).map(book => ({
            ...book,
            isInProgress: inProgressIds.includes(book.id)
        }));
    }, [favoriteBooks, completedIds, inProgressIds]);

    const displayBooks = useMemo(() => {
        let books = [...wishlistBooks];
        
        // Filter
        if (unreadOnly) {
            books = books.filter(book => !book.isInProgress);
        }

        // Sort
        if (sortBy === 'ABC') {
            books.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'ZYX') {
            books.sort((a, b) => b.title.localeCompare(a.title));
        }
        // 'Recent' is the default order (as per original array)

        return books;
    }, [wishlistBooks, unreadOnly, sortBy]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            {/* Top Toolbar: Sorting & Filters */}
            <div className="flex items-center justify-between mb-6 mt-2">
                {/* Left: Sorting Dropdown */}
                <div className="relative group">
                    <select
                        className="appearance-none h-14 pl-6 pr-12 border-2 border-slate-100 rounded-2xl font-bold outline-none transition-all bg-white text-slate-600 focus:border-[#fbbf24] cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="Recent">Newest First</option>
                        <option value="ABC">A to Z</option>
                        <option value="ZYX">Z to A</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                
                {/* Right: Toggle Filter */}
                <div 
                    className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border-2 border-slate-100 shadow-sm cursor-pointer hover:border-slate-200 transition-colors group"
                    onClick={() => setUnreadOnly(!unreadOnly)}
                >
                    <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${unreadOnly ? 'bg-[#fbbf24]' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${unreadOnly ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                    <span className={`font-black text-sm select-none transition-colors ${unreadOnly ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        Unread Only
                    </span>
                </div>
            </div>

            {/* Title */}
            <div className="flex items-center gap-6 mb-6">
                <h3 className="text-3xl font-black text-slate-800 font-jua uppercase tracking-tight">❤️ Wishlist</h3>
            </div>

            {/* Grid */}
            {displayBooks.length === 0 ? (
                <EmptyState 
                    icon={Heart} 
                    title="Wishlist is lonely!"
                    message="Find books that spark your curiosity and heart them to save for later."
                    ctaText="Find My Favorites"
                    onCtaClick={() => onNavigate('Picks')} 
                />
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {displayBooks.map(book => (
                        <div key={book.id} onClick={() => onViewInfo(book)} className="relative group cursor-pointer aspect-[3/4] rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-[3px] border-slate-100 hover:border-pink-200 bg-slate-50 w-full">
                            <img src={book.src} alt={book.title} className="w-full h-full object-cover pointer-events-none" />
                            <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            
                            {book.isInProgress && (
                                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 bg-amber-400 rounded-full shadow-lg">
                                    <Play className="w-3 h-3 text-slate-900 fill-current" />
                                    <span className="text-[10px] font-black text-slate-900 leading-none">In Progress</span>
                                </div>
                            )}

                            <button
                                className="absolute bottom-2 right-2 w-9 h-9 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-20 border-2 border-slate-50"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const EmptyState: React.FC<{ 
    icon: any, 
    title: string,
    message: string,
    ctaText?: string,
    onCtaClick?: () => void
}> = ({ icon: Icon, title, message, ctaText, onCtaClick }) => (
    <div className="col-span-full py-24 px-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
        <div className="relative mb-8">
            <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
                <Icon className="w-20 h-20 text-slate-200" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white rounded-full border-4 border-slate-50 flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                    <span className="text-indigo-400 font-black text-xl">?</span>
                </div>
            </div>
        </div>
        <h3 className="text-3xl font-black text-slate-700 font-jua mb-3 uppercase tracking-tight">{title}</h3>
        <p className="text-slate-400 font-bold text-lg max-w-sm mb-10 leading-relaxed">{message}</p>
        
        {ctaText && (
            <button 
                onClick={onCtaClick}
                className="px-10 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-200 flex items-center gap-3 group"
            >
                {ctaText}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
        )}
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
