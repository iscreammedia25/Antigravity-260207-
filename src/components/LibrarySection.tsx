import React, { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, Heart, Search, SlidersHorizontal, ArrowLeft, Check } from 'lucide-react';
import { BOOKS_DATA, Book } from '../data/books';

interface LibrarySectionProps {
    userName: string;
    onStartLearning: (book: Book) => void;
    onViewInfo: (book: Book, origin?: 'history' | 'recommendation') => void;
    onClose?: () => void;
    onSeeAll?: () => void;
    isFullPage?: boolean;
}

type Zone = 'Book Zone' | 'Media Zone';

const LibrarySection: React.FC<LibrarySectionProps> = ({ userName, onViewInfo, onClose, onSeeAll, isFullPage = false }) => {
    const [activeZone, setActiveZone] = useState<Zone>('Book Zone');
    const [activeSubTab, setActiveSubTab] = useState<string>('All Books');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const zones: Record<Zone, string[]> = {
        'Book Zone': ['All Books', 'For you', 'Topics', "MD's pick"],
        'Media Zone': ['All Media', 'Greeting', 'Movie Book', 'Audio Book']
    };

    const handleZoneChange = (zone: Zone) => {
        setActiveZone(zone);
        setActiveSubTab(zones[zone][0]); // Default to first tab of the new zone
    };

    // If not full page, render the original "For You" slider (for backward compatibility on Home)
    if (!isFullPage) {
        // ... (Original LibrarySection logic here if we want to keep it on Home page)
        // For now, I'll keep the original slider code for the non-full-page version
        return <OriginalLibrarySlider userName={userName} onViewInfo={onViewInfo} onSeeAll={onSeeAll} />;
    }

    return (
        <div className="fixed inset-0 bg-[#F8FAFC] z-50 flex flex-col font-fredoka overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* 1. Top Navigation & Search Bar */}
            <header className="bg-white border-b-4 border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-sm z-30">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-7 h-7" />
                    </button>

                    {/* Search Bar */}
                    <div className="flex-1 relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-sky-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for books or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-14 pr-6 bg-slate-50 border-4 border-transparent focus:border-sky-100 focus:bg-white rounded-full text-lg font-bold text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                        />
                    </div>

                    {/* Filter Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`h-14 px-6 rounded-3xl border-4 flex items-center gap-3 transition-all active:scale-95 font-black ${isFilterOpen ? 'bg-sky-500 text-white border-sky-400' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                        >
                            <SlidersHorizontal className="w-6 h-6" />
                            <span>Filters</span>
                        </button>

                        {/* Filter Dropdown */}
                        {isFilterOpen && (
                            <div className="absolute top-16 right-0 w-72 bg-white rounded-[32px] shadow-2xl border-4 border-slate-50 p-6 z-50 animate-in zoom-in-95 slide-in-from-top-2 duration-200">
                                <h4 className="text-slate-800 font-black text-lg mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-sky-400" /> Advanced Filter
                                </h4>
                                <div className="space-y-6">
                                    <FilterSection title="Lexile Level" options={['BR - 200L', '200L - 400L', '400L+']} />
                                    <FilterSection title="Book Level" options={['Beginner', 'Intermediate', 'Advanced']} />
                                    <FilterSection title="Genre" options={['Classic', 'Creative']} />
                                </div>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full mt-6 py-4 bg-sky-500 text-white rounded-2xl font-black hover:bg-sky-600 transition-colors shadow-lg shadow-sky-100"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Zone Toggle Tabs */}
                <div className="flex gap-4 p-1.5 bg-slate-50 rounded-[28px] w-fit border-2 border-slate-100/50">
                    {(Object.keys(zones) as Zone[]).map((zone) => (
                        <button
                            key={zone}
                            onClick={() => handleZoneChange(zone)}
                            className={`px-8 py-3 rounded-[22px] font-black text-lg transition-all ${activeZone === zone ? 'bg-white text-sky-500 shadow-md transform scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {zone}
                        </button>
                    ))}
                </div>
            </header>

            {/* 2. Sub Navigation */}
            <nav className="bg-white border-b-2 border-slate-50 px-8 py-2 overflow-x-auto no-scrollbar">
                <div className="flex gap-8 whitespace-nowrap min-w-max">
                    {zones[activeZone].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveSubTab(tab)}
                            className={`relative py-4 text-xl font-black transition-all ${activeSubTab === tab ? 'text-sky-500' : 'text-slate-300 hover:text-slate-400'}`}
                        >
                            {tab}
                            {activeSubTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-sky-400 rounded-full animate-in fade-in slide-in-from-bottom-1" />
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* 3. Content Area Placeholder */}
            <main className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
                <div className="content-placeholder w-full h-full border-4 border-dashed border-slate-200 rounded-[48px] flex flex-col items-center justify-center text-center p-12 bg-white/50 backdrop-blur-sm">
                    <div className="w-32 h-32 bg-sky-50 rounded-full flex items-center justify-center text-sky-400 mb-8 animate-bounce">
                        <Sparkles className="w-16 h-16 fill-current" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 mb-4 font-jua">
                        {activeZone} - {activeSubTab}
                    </h2>
                    <p className="text-2xl text-slate-400 font-medium">
                        여기에 <span className="text-sky-400 font-black">[{activeZone} - {activeSubTab}]</span> 콘텐츠가 들어갈 예정입니다.
                    </p>
                    <div className="mt-12 grid grid-cols-2 gap-4">
                        <div className="w-48 h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                        <div className="w-48 h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Helper component for filter sections
const FilterSection = ({ title, options }: { title: string, options: string[] }) => {
    const [selected, setSelected] = useState(options[0]);
    return (
        <div className="space-y-3">
            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</h5>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => setSelected(opt)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selected === opt ? 'bg-sky-100 text-sky-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Original slider for backward compatibility on home screen
const OriginalLibrarySlider: React.FC<Pick<LibrarySectionProps, 'userName' | 'onViewInfo' | 'onSeeAll'>> = ({ onViewInfo, onSeeAll }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const books = BOOKS_DATA;
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            setCanScrollLeft(scrollRef.current.scrollLeft > 10);
        }
    };

    React.useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            return () => currentRef.removeEventListener('scroll', checkScroll);
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="card-bubble p-6 md:p-8 w-full h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-slate-700 flex items-center gap-4 font-jua">
                    <span className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-400 shadow-sm shadow-sky-100">
                        <Sparkles className="w-8 h-8 fill-current" />
                    </span>
                    For you
                </h3>
                <button
                    onClick={onSeeAll}
                    className="p-3 bg-sky-50 text-sky-400 font-black btn-jelly text-xs flex items-center gap-2 hover:bg-sky-100 hover:scale-105 active:scale-95 group font-fredoka"
                >
                    SEE ALL <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="relative group/library px-2">
                <div className="absolute bottom-6 left-0 right-0 h-14 bg-slate-200/60 rounded-full mx-4 border-b-4 border-slate-300/40 shadow-inner" />

                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-[35%] -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white text-sky-400 rounded-full shadow-lg border border-slate-100 flex items-center justify-center z-20 transition-all hover:bg-sky-50 active:scale-90 ${canScrollLeft ? 'opacity-0 group-hover/library:opacity-100' : 'opacity-0 invisible'}`}
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={`flex gap-3 md:gap-4 overflow-x-auto pt-8 pb-8 scroll-smooth custom-scrollbar relative z-10 cursor-grab active:cursor-grabbing ${isDragging ? 'scroll-auto' : 'scroll-smooth'}`}
                >
                    {books.map((book) => (
                        <div key={book.id} onClick={() => onViewInfo(book, 'recommendation')} className="w-36 md:w-40 flex-shrink-0 group cursor-pointer space-y-3 relative select-none">
                            <div className="aspect-[3/4] bg-slate-50 rounded-[32px] shadow-sm border-[4px] border-white group-hover:border-sky-300 transition-all group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-sky-100 overflow-hidden relative">
                                <img src={book.src} alt={book.title} className="w-full h-full object-cover pointer-events-none" />
                                {book.isBookmarked && (
                                    <div className="absolute top-0 left-4 z-10 transition-transform group-hover:scale-110">
                                        <div className="w-10 h-12 flex items-center justify-center pt-1 pb-4 rounded-b-xl border-2 border-t-0 border-white shadow-md transition-all bg-rose-500 text-white">
                                            <Heart className="w-6 h-6 fill-current" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-center text-slate-400 truncate px-4 uppercase tracking-[0.15em] group-hover:text-sky-400 transition-colors font-fredoka">{book.title}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-[35%] -translate-y-1/2 translate-x-6 w-12 h-12 bg-white text-sky-400 rounded-full shadow-lg border border-slate-100 flex items-center justify-center z-20 transition-all hover:bg-sky-50 active:scale-90 opacity-0 group-hover/library:opacity-100"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default LibrarySection;
