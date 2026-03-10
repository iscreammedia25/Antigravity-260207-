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
    const [mediaSortBy, setMediaSortBy] = useState('Recent');
    const [mediaShowUnplayedOnly, setMediaShowUnplayedOnly] = useState(false);
    const [mediaFilters, setMediaFilters] = useState<Record<string, boolean>>({
        'Greeting': true,
        'Movie Book': true,
        'Audio Book': true
    });

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

            {/* 3. Content Area Placeholder & Media Zone */}
            <main className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
                {activeZone === 'Media Zone' ? (
                    <MediaZoneContent
                        activeSubTab={activeSubTab}
                        mediaSortBy={mediaSortBy}
                        setMediaSortBy={setMediaSortBy}
                        mediaShowUnplayedOnly={mediaShowUnplayedOnly}
                        setMediaShowUnplayedOnly={setMediaShowUnplayedOnly}
                        mediaFilters={mediaFilters}
                        toggleMediaFilter={(type: string) => setMediaFilters(prev => ({ ...prev, [type]: !prev[type] }))}
                        onViewInfo={onViewInfo}
                    />
                ) : (
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
                )}
            </main>
        </div>
    );
};

const mockMediaData = BOOKS_DATA.map(book => {
    // create pseudo-random stable boolean for unplayed
    const hash = book.id.length;
    return {
        baseId: book.id,
        bookTitle: book.title,
        items: [
            { id: `${book.id}__greeting`, type: 'Greeting', title: `${book.title} Greeting`, src: book.src, rt: '01:20', isUnplayed: hash % 2 === 0 },
            { id: `${book.id}__movie`, type: 'Movie Book', title: `${book.title} Movie`, src: book.src, rt: '05:45', isUnplayed: hash % 3 === 0 },
            { id: `${book.id}__audio`, type: 'Audio Book', title: `${book.title} Audio`, src: book.src, rt: '04:30', isUnplayed: hash % 4 === 0 }
        ]
    };
});

const MediaZoneContent = ({ activeSubTab, mediaSortBy, setMediaSortBy, mediaShowUnplayedOnly, setMediaShowUnplayedOnly, mediaFilters, toggleMediaFilter, onViewInfo }: any) => {
    let groupsToRender = [...mockMediaData];

    if (mediaSortBy === 'ABC') {
        groupsToRender.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
    } else if (mediaSortBy === 'ZYX') {
        groupsToRender.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
    }

    const renderMediaCardsList = (items: any[], isGrid = false) => {
        return items.map(item => (
            <div key={item.id} className={`group cursor-pointer ${isGrid ? 'w-full' : 'w-64 shrink-0'} flex flex-col gap-3 transition-all duration-300 transform origin-left`}
                onClick={() => {
                    const book = BOOKS_DATA.find(b => b.id === item.id.split('__')[0]);
                    if (book) onViewInfo(book, 'library');
                }}>
                <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 relative border-4 border-white ring-1 ring-slate-100">
                    <img src={item.src} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                            <svg className="w-8 h-8 ml-1 text-sky-500 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white font-black text-xs tabular-nums tracking-wider shadow-sm border border-white/20">
                        {item.rt}
                    </div>
                    {item.isUnplayed && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-[#fbbf24] text-[#0f172a] font-black text-[9px] uppercase tracking-widest rounded-full shadow-md z-10 border-2 border-transparent group-hover:border-white/50 transition-colors">NEW</div>
                    )}
                </div>
                <div className="px-1">
                    <h4 className="text-[15px] font-bold text-slate-700 line-clamp-1 group-hover:text-sky-500 transition-colors font-jua">{item.title}</h4>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                        {item.type}
                    </p>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <select value={mediaSortBy} onChange={e => setMediaSortBy(e.target.value)}
                            className="appearance-none h-14 pl-6 pr-12 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-600 outline-none focus:border-[#fbbf24] transition-all cursor-pointer">
                            <option value="Recent">Newest First</option>
                            <option value="ABC">A to Z</option>
                            <option value="ZYX">Z to A</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" className="sr-only peer" checked={mediaShowUnplayedOnly} onChange={() => setMediaShowUnplayedOnly(!mediaShowUnplayedOnly)} />
                            <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:bg-[#fbbf24] transition-all"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                        </div>
                        <span className="font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Unplayed Only</span>
                    </label>
                </div>
                {activeSubTab === 'All Media' && (
                    <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border-2 border-slate-100 shadow-sm animate-in fade-in slide-in-from-right-4">
                        <span className="font-bold text-slate-400 text-sm uppercase tracking-wider mr-2">Filters</span>
                        {['Greeting', 'Movie Book', 'Audio Book'].map(type => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                <div className={`relative flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all ${mediaFilters[type] ? 'bg-sky-500 border-sky-500 text-white shadow-sm' : 'border-slate-300 text-transparent bg-white group-hover:border-sky-400'}`}>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <input type="checkbox" className="sr-only" checked={mediaFilters[type]} onChange={() => toggleMediaFilter(type)} />
                                </div>
                                <span className="font-bold text-slate-600 group-hover:text-sky-500 transition-colors select-none whitespace-nowrap">{type}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {activeSubTab === 'All Media' ? (
                <div className="space-y-6 pb-20">
                    {groupsToRender.map(group => {
                        let items = group.items.filter((item: any) => mediaFilters[item.type]);
                        if (mediaShowUnplayedOnly) items = items.filter((item: any) => item.isUnplayed);
                        if (items.length === 0) return null;

                        return (
                            <div key={group.baseId} className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-white p-6 rounded-[32px] shadow-sm border-[3px] border-slate-100 flex gap-6 overflow-hidden relative">
                                <div className="w-48 shrink-0 flex flex-col justify-center border-r-2 border-slate-100 pr-6">
                                    <h3 className="text-2xl font-black text-slate-700 font-jua leading-tight mb-2">{group.bookTitle}</h3>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{items.length} Series</p>
                                </div>
                                <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-2 flex-1">
                                    {renderMediaCardsList(items)}
                                </div>
                            </div>
                        );
                    })}
                    {groupsToRender.every(group => {
                        let items = group.items.filter((item: any) => mediaFilters[item.type]);
                        if (mediaShowUnplayedOnly) items = items.filter((item: any) => item.isUnplayed);
                        return items.length === 0;
                    }) && (
                            <div className="flex flex-col items-center justify-center py-20 opacity-40 w-full animate-in fade-in">
                                <svg className="w-24 h-24 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13.5 8.5-5 5" /><path d="m8.5 8.5 5 5" /><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                <h2 className="text-3xl font-black">No Media Matches the Filters</h2>
                            </div>
                        )}
                </div>
            ) : (() => {
                let items: any[] = [];
                groupsToRender.forEach(group => {
                    items.push(...group.items.filter((item: any) => item.type === activeSubTab));
                });
                if (mediaShowUnplayedOnly) items = items.filter((item: any) => item.isUnplayed);

                if (items.length > 0) {
                    return (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-10 animate-in fade-in pb-20">
                            {renderMediaCardsList(items, true)}
                        </div>
                    );
                } else {
                    return (
                        <div className="flex flex-col items-center justify-center py-20 opacity-40 w-full animate-in fade-in">
                            <svg className="w-24 h-24 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13.5 8.5-5 5" /><path d="m8.5 8.5 5 5" /><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <h2 className="text-3xl font-black">No Media Found</h2>
                        </div>
                    );
                }
            })()}
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
