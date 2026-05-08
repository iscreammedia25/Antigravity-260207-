import React, { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, Heart, Search, SlidersHorizontal, ArrowLeft, Check, X, Headphones, Clapperboard, BookText } from 'lucide-react';
import { BOOKS_DATA, Book } from '../data/books';
import UnifiedPlayer from './UnifiedPlayer';
import { MediaItem } from '../types/media';

interface LibrarySectionProps {
    userName: string;
    onStartLearning: (book: Book) => void;
    onViewInfo: (book: Book, origin?: 'history' | 'recommendation') => void;
    onClose?: () => void;
    onSeeAll?: () => void;
    isFullPage?: boolean;
    initialTab?: { zone: string; subTab: string } | null;
}

type Zone = 'Book Zone' | 'Media Zone' | 'My Library';

const LibrarySection: React.FC<LibrarySectionProps> = ({ userName, onViewInfo, onClose, onSeeAll, isFullPage = false, initialTab }) => {
    const [activeZone, setActiveZone] = useState<Zone>((initialTab?.zone as Zone) || 'Book Zone');
    const [activeSubTab, setActiveSubTab] = useState<string>(initialTab?.subTab || (activeZone === 'Media Zone' ? 'All Media' : activeZone === 'My Library' ? 'Now Reading' : 'Picks'));

    React.useEffect(() => {
        if (initialTab) {
            setActiveZone(initialTab.zone as Zone);
            setActiveSubTab(initialTab.subTab);
        }
    }, [initialTab]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchExecuted, setIsSearchExecuted] = useState(false);
    const [searchSelectedIndex, setSearchSelectedIndex] = useState(-1);
    const [mediaSortBy, setMediaSortBy] = useState('New');
    const [mediaShowUnplayedOnly, setMediaShowUnplayedOnly] = useState(false);
    const [mediaFilters, setMediaFilters] = useState<Record<string, boolean>>({
        'Vocab': true,
        'Movie Book': true,
        'Audio Book': true
    });
    const [bookSortBy, setBookSortBy] = useState('New');
    const [bookShowUnreadOnly, setBookShowUnreadOnly] = useState(false);
    const [picksActiveCategory, setPicksActiveCategory] = useState('All');
    const [topicsActiveCategory, setTopicsActiveCategory] = useState('All');

    // New Filter States
    const [categoryFilters, setCategoryFilters] = useState<Record<string, boolean>>({
        'Classics': true, 'Sports': true, 'Science': true, 'Fantasy': true,
        'Nature': true, 'World': true, 'Career': true, 'Family': true, 'Music': true, 'Body': true
    });
    const [levelFilters, setLevelFilters] = useState<Record<string, boolean>>({
        'Lv1': true, 'Lv2': true, 'Lv3': true, 'Lv4': true
    });
    const [lexileFilters, setLexileFilters] = useState<Record<string, boolean>>({
        '100~250': true, '251~500': true, '501~700': true, '701~900': true
    });
    const [wordCountFilters, setWordCountFilters] = useState<Record<string, boolean>>({
        '100~200': true, '200~400': true, '300~500': true, '400~600': true
    });

    // Player State
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [playerMediaList, setPlayerMediaList] = useState<MediaItem[]>([]);
    const [playerStartIndex, setPlayerStartIndex] = useState(0);

    const zones: Record<Zone, string[]> = {
        'Book Zone': ['Picks', 'For you', 'Topics'],
        'Media Zone': ['All Media', 'Vocab', 'Movie Book', 'Audio Book'],
        'My Library': ['Now Reading', 'Completed', '❤️ Wishlist', 'Roadmap']
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
        <div className="fixed inset-0 bg-[#0f172a] z-50 flex flex-col font-fredoka overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* 1. Top Navigation & Search Bar */}
            <header className="px-6 py-6 flex flex-col gap-6 z-30">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-white/10 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-7 h-7" />
                    </button>

                    {/* Search Bar */}
                    <div className="flex-1 relative group z-50">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for books or keywords..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setIsSearchExecuted(false);
                                setSearchSelectedIndex(-1);
                            }}
                            onKeyDown={(e) => {
                                const matchedBooks = BOOKS_DATA.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
                                if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                                    e.preventDefault();
                                    if (searchSelectedIndex < matchedBooks.length - 1) {
                                        setSearchSelectedIndex(prev => prev + 1);
                                    }
                                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                                    e.preventDefault();
                                    if (searchSelectedIndex > 0) {
                                        setSearchSelectedIndex(prev => prev - 1);
                                    }
                                } else if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (searchSelectedIndex >= 0 && searchSelectedIndex < matchedBooks.length) {
                                        setSearchQuery(matchedBooks[searchSelectedIndex].title);
                                        setIsSearchExecuted(true);
                                        setSearchSelectedIndex(-1);
                                    } else if (searchQuery.trim()) {
                                        setIsSearchExecuted(true);
                                    }
                                }
                            }}
                            className="w-full h-14 pl-14 pr-12 bg-white border-2 border-transparent focus:border-[#fbbf24] rounded-[20px] text-lg font-bold text-slate-800 placeholder:text-slate-400 transition-all outline-none shadow-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setIsSearchExecuted(false);
                                    setSearchSelectedIndex(-1);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        {/* Dropdown for Matching Books */}
                        {searchQuery && !isSearchExecuted && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-3xl shadow-2xl border-2 border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Matching Books</h4>
                                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                                    {BOOKS_DATA.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map((book, index) => (
                                        <button
                                            key={book.id}
                                            onClick={() => {
                                                setSearchQuery(book.title);
                                                setIsSearchExecuted(true);
                                                setSearchSelectedIndex(-1);
                                            }}
                                            onMouseEnter={() => setSearchSelectedIndex(index)}
                                            className={`flex items-center gap-4 p-3 rounded-2xl transition-colors text-left w-full group ${searchSelectedIndex === index ? 'bg-sky-50' : 'hover:bg-sky-50'}`}
                                        >
                                            <div className="w-12 h-16 bg-slate-200 rounded-xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                                                <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                                            </div>
                                            <span className={`font-bold text-lg transition-colors ${searchSelectedIndex === index ? 'text-sky-500' : 'text-slate-700 group-hover:text-sky-500'}`}>{book.title}</span>
                                        </button>
                                    ))}
                                    {BOOKS_DATA.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                        <div className="p-4 text-center text-slate-400 font-bold">No matches found</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={() => {
                            if (searchQuery.trim()) setIsSearchExecuted(true);
                        }}
                        className="h-14 px-8 bg-[#fbbf24] text-[#0f172a] font-black text-lg rounded-[20px] shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all whitespace-nowrap"
                    >
                        Search
                    </button>

                    {/* Filter Button */}
                    <div className="relative z-50">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`h-14 px-6 rounded-[20px] border-2 flex items-center gap-3 transition-all active:scale-95 font-black ${isFilterOpen ? 'bg-[#1e293b] text-white border-[#1e293b]' : 'bg-[#1e293b] text-white border-transparent hover:bg-slate-800'}`}
                        >
                            <SlidersHorizontal className="w-6 h-6" />
                        </button>

                        {/* Filter Dropdown */}
                        {isFilterOpen && (
                            <div className="absolute top-[calc(100%+8px)] right-0 w-[500px] bg-white rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.15)] border-2 border-slate-100 p-8 animate-in zoom-in-95 slide-in-from-top-2 duration-200 text-slate-800 max-h-[80vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-8">
                                    <FilterSection title="Level" options={['Lv1', 'Lv2', 'Lv3', 'Lv4']} state={levelFilters} setState={setLevelFilters} />
                                    <FilterSection title="Lexile" options={['100~250', '251~500', '501~700', '701~900']} state={lexileFilters} setState={setLexileFilters} />
                                    <FilterSection title="Word Count" options={['100~200', '200~400', '300~500', '400~600']} state={wordCountFilters} setState={setWordCountFilters} />
                                    <FilterSection title="Category" options={['Classics', 'Sports', 'Science', 'Fantasy', 'Nature', 'World', 'Career', 'Family', 'Music', 'Body']} state={categoryFilters} setState={setCategoryFilters} isGrid />
                                </div>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full mt-8 py-4 bg-[#0f172a] text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                                >
                                    OK
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Zone Toggle Tabs */}
                {!isSearchExecuted && (
                    <div className="flex gap-4 p-1.5 bg-black/30 rounded-[28px] w-fit border-2 border-white/5 shadow-inner">
                        {(Object.keys(zones) as Zone[]).filter(z => z !== 'My Library').map((zone) => (
                            <button
                                key={zone}
                                onClick={() => handleZoneChange(zone)}
                                className={`inline-flex flex-row items-center gap-2.5 px-8 py-3 rounded-[22px] font-black text-lg transition-all whitespace-nowrap ${activeZone === zone ? 'bg-[#fbbf24] text-[#0f172a] shadow-xl shadow-amber-500/20 transform scale-[1.05]' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {zone === 'Book Zone' ? (
                                    <div className="flex flex-row items-center gap-2 justify-center">
                                        <BookOpen className="w-5 h-5 shrink-0" />
                                        <span className="whitespace-nowrap">Book</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-center gap-2 justify-center">
                                        <Play className="w-5 h-5 fill-current shrink-0" />
                                        <span className="whitespace-nowrap">Media</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {/* 2. Sub Navigation */}
            {!isSearchExecuted && activeZone && zones[activeZone] && (
                <nav className="px-8 py-2 overflow-x-auto no-scrollbar border-b border-white/5">
                    <div className="flex gap-8 whitespace-nowrap min-w-max">
                        {zones[activeZone].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSubTab(tab)}
                                className={`relative py-4 text-xl font-black transition-all ${activeSubTab === tab ? 'text-[#fbbf24]' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {tab}
                                {activeSubTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#fbbf24] rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-in fade-in slide-in-from-bottom-1" />
                                )}
                            </button>
                        ))}
                    </div>
                </nav>
            )}

            {/* 3. Content Area */}
            <main className={`flex-1 overflow-y-auto px-10 py-8 relative ${isSearchExecuted ? 'bg-slate-50 text-slate-800' : ''}`}>
                {isSearchExecuted ? (
                    <SearchResultsView 
                        query={searchQuery} 
                        onViewInfo={onViewInfo}
                        onPlayMedia={(list, index) => {
                            setPlayerMediaList(list);
                            setPlayerStartIndex(index);
                            setIsPlayerOpen(true);
                        }}
                    />
                ) : activeZone === 'Media Zone' ? (
                    <MediaZoneContent
                        activeSubTab={activeSubTab}
                        mediaSortBy={mediaSortBy}
                        setMediaSortBy={setMediaSortBy}
                        mediaShowUnplayedOnly={mediaShowUnplayedOnly}
                        setMediaShowUnplayedOnly={setMediaShowUnplayedOnly}
                        mediaFilters={mediaFilters}
                        toggleMediaFilter={(type: string) => setMediaFilters(prev => ({ ...prev, [type]: !prev[type] }))}
                        onPlayMedia={(list: MediaItem[], index: number) => {
                            setPlayerMediaList(list);
                            setPlayerStartIndex(index);
                            setIsPlayerOpen(true);
                        }}
                    />
                ) : (activeSubTab === 'Topics' || activeSubTab === 'Picks') ? (
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    {/* Sort Dropdown: Disabled in Picks > All */}
                                    <select 
                                        value={bookSortBy} 
                                        onChange={e => setBookSortBy(e.target.value)}
                                        disabled={activeSubTab === 'Picks' && picksActiveCategory === 'All'}
                                        className={`appearance-none h-14 pl-6 pr-12 border-2 rounded-2xl font-bold outline-none transition-all ${activeSubTab === 'Picks' && picksActiveCategory === 'All' ? 'bg-slate-700/30 border-white/5 text-slate-500 cursor-not-allowed' : 'bg-white/5 border-white/5 text-slate-300 focus:border-[#fbbf24]/50 cursor-pointer'}`}
                                    >
                                        <option value="New" className="bg-[#1e293b]">New</option>
                                        <option value="Level-ASC" className="bg-[#1e293b]">Level (↑)</option>
                                        <option value="Level-DESC" className="bg-[#1e293b]">Level (↓)</option>
                                    </select>
                                    <ChevronRight className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none rotate-90 ${activeSubTab === 'Picks' && picksActiveCategory === 'All' ? 'text-slate-600' : 'text-slate-400'}`} />
                                </div>
                            </div>

                            <div className="flex items-center justify-end flex-1 min-w-[200px]">
                                {(() => {
                                    const isUnreadToggleDisabled = activeSubTab === 'Picks' && picksActiveCategory === 'All';
                                    return (
                                        <div 
                                            className={`flex items-center gap-3 bg-white/5 px-5 py-3 rounded-full border-2 border-white/5 shadow-sm transition-all group ${isUnreadToggleDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-white/10'}`}
                                            onClick={() => !isUnreadToggleDisabled && setBookShowUnreadOnly(!bookShowUnreadOnly)}
                                        >
                                            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${bookShowUnreadOnly && !isUnreadToggleDisabled ? 'bg-[#fbbf24]' : 'bg-slate-700/50 shadow-inner'}`}>
                                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-md ${bookShowUnreadOnly && !isUnreadToggleDisabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </div>
                                            <span className={`font-black text-sm select-none transition-colors ${isUnreadToggleDisabled ? 'text-slate-500' : bookShowUnreadOnly ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                                                Unread Only
                                            </span>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                        {activeSubTab === 'Topics' ? (
                            <TopicsGridView 
                                onViewInfo={onViewInfo} 
                                sortBy={bookSortBy} 
                                showUnreadOnly={bookShowUnreadOnly} 
                                activeCategory={topicsActiveCategory}
                                setActiveCategory={setTopicsActiveCategory}
                            />
                        ) : (
                            <PicksCarouselView 
                                onViewInfo={onViewInfo} 
                                activeCategory={picksActiveCategory}
                                setActiveCategory={setPicksActiveCategory}
                                sortBy={bookSortBy}
                                showUnreadOnly={bookShowUnreadOnly}
                            />
                        )}
                    </div>
                ) : activeZone === 'My Library' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4">
                        {/* Simplified My Library Content for now */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 pb-32">
                            {BOOKS_DATA.slice(0, 12).map(book => (
                                <div key={book.id} onClick={() => onViewInfo(book)} className="group cursor-pointer">
                                    <div className="w-full aspect-[3/4] bg-white/10 rounded-[32px] overflow-hidden relative group-hover:scale-105 transition-all duration-300 border-4 border-transparent group-hover:border-[#fbbf24]/50 shadow-2xl">
                                        <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="mt-4 text-center text-lg font-bold text-slate-200 truncate px-2">{book.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 pb-32">
                        {BOOKS_DATA.filter((book, i) => {
                            const match = book.id.match(/\d+/);
                            const num = match ? parseInt(match[0], 10) : 0;
                            return (num + i) % 3 === 0;
                        }).map(book => {
                            const match = book.id.match(/\d+/);
                            const num = match ? parseInt(match[0], 10) : 0;
                            const isCompleted = (num % 3) === 2;
                            
                            return (
                                <div key={book.id} onClick={() => onViewInfo(book, 'recommendation')} className="group cursor-pointer flex flex-col items-center">
                                    <div className="w-full aspect-[3/4] bg-white/10 rounded-[40px] overflow-hidden relative group-hover:scale-105 transition-all duration-300 border-4 border-transparent group-hover:border-[#fbbf24]/50 shadow-2xl">
                                        <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        {/* Circular Heart Button */}
                                        {!isCompleted && (
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    book.isBookmarked = !book.isBookmarked;
                                                    // Force re-render if needed, but for now we'll rely on the parent or next render
                                                    (e.currentTarget.querySelector('svg') as any).classList.toggle('fill-current');
                                                    (e.currentTarget.querySelector('svg') as any).classList.toggle('text-rose-500');
                                                    (e.currentTarget.querySelector('svg') as any).classList.toggle('text-slate-300');
                                                }}
                                                className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all z-20"
                                            >
                                                <Heart className={`w-5 h-5 transition-colors ${book.isBookmarked ? 'fill-current text-rose-500' : 'text-slate-300'}`} />
                                            </button>
                                        )}
                                    </div>
                                    <h4 className="mt-4 text-center text-xl font-black text-slate-200 font-jua group-hover:text-[#fbbf24] transition-colors leading-tight px-2">{book.title}</h4>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Unified Media Player */}
            <UnifiedPlayer 
                isOpen={isPlayerOpen}
                onClose={() => setIsPlayerOpen(false)}
                mediaList={playerMediaList}
                initialIndex={playerStartIndex}
            />
        </div>
    );
};

const mockMediaData = BOOKS_DATA.map(book => {
    // create pseudo-random stable boolean for unplayed
    const hash = book.id.length;
    // Map to Unified Player's MediaItem format
    const greeting: MediaItem = { 
        id: `${book.id}__greeting`, bookId: book.id, type: 'Vocab', title: book.title, 
        src: book.videoUrl || 'https://vjs.zencdn.net/v/oceans.mp4', 
        thumbnail: book.src, duration: '01:20', isUnplayed: hash % 2 === 0, bookTitle: book.title 
    };
    const folderPath = book.src.replace('/Cover/', '/Book/').replace('.png', '');
    const movieThumb = `${folderPath}/${book.id}_SC00_I.png`;

    const movie: MediaItem = { 
        id: `${book.id}__movie`, bookId: book.id, type: 'Movie Book', title: `${book.title} Movie`, 
        src: book.videoUrl || '/Video/the_silent_stick_watch.mp4', 
        thumbnail: `${folderPath}/${book.id}_SC01_I.png`, 
        duration: '05:45', isUnplayed: hash % 3 === 0, bookTitle: book.title 
    };
    const audio: MediaItem = { 
        id: `${book.id}__audio`, bookId: book.id, type: 'Audio Book', title: `${book.title} Audio`, 
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Test audio
        thumbnail: book.src, duration: '04:30', isUnplayed: hash % 4 === 0, bookTitle: book.title 
    };

    return {
        baseId: book.id,
        bookTitle: book.title,
        items: [greeting, movie, audio]
    };
});

const MediaZoneContent = ({ activeSubTab, mediaSortBy, setMediaSortBy, mediaShowUnplayedOnly, setMediaShowUnplayedOnly, mediaFilters, toggleMediaFilter, onPlayMedia }: any) => {
    let groupsToRender = [...mockMediaData];

    if (mediaSortBy === 'ABC') {
        groupsToRender.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
    } else if (mediaSortBy === 'ZYX') {
        groupsToRender.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
    }

    const renderMediaCardsList = (items: any[], isGrid = false) => {
        return items.map((item, idx) => (
            <div key={item.id} className={`group cursor-pointer ${isGrid ? 'w-full' : 'w-64 shrink-0'} flex flex-col gap-3 transition-all duration-300 transform origin-left focus:outline-none`}
                onClick={() => onPlayMedia(items, idx)}>
                <div className="aspect-video bg-slate-900/5 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 relative border-4 border-white ring-1 ring-slate-100 pointer-events-none flex items-center justify-center">
                    {item.type === 'Vocab' ? (
                        <video 
                            src={`${item.src}#t=0.001`} 
                            className="w-full h-full object-cover" 
                            preload="metadata"
                            muted
                            playsInline
                        />
                    ) : item.type === 'Audio Book' ? (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center p-4">
                            <img src={item.thumbnail} className="h-full w-auto object-contain shadow-md rounded-lg" alt="" />
                        </div>
                    ) : (
                        <img src={item.thumbnail} onError={(e: any) => { e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`; }} className="w-full h-full object-cover" alt="" />
                    )}
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                            <svg className="w-8 h-8 ml-1 text-sky-500 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white font-black text-xs tabular-nums tracking-wider shadow-sm border border-white/20">
                        {item.duration}
                    </div>
                    {item.isUnplayed && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-[#fbbf24] text-[#0f172a] font-black text-[9px] uppercase tracking-widest rounded-full shadow-md z-10 border-2 border-transparent group-hover:border-white/50 transition-colors">NEW</div>
                    )}
                </div>
                <div className="px-1 mt-3">
                    <h4 className="text-[15px] font-bold text-slate-700 line-clamp-1 group-hover:text-sky-500 transition-colors font-jua">
                        {item.title}
                    </h4>
                    {/* Media Type Icon Badge */}
                    <div className={`absolute top-3 left-3 w-9 h-9 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border-2 transition-all group-hover:scale-110 ${
                        item.type === 'Vocab' ? 'bg-purple-50 border-purple-100 text-purple-500' : 
                        item.type === 'Movie Book' ? 'bg-orange-50 border-orange-100 text-orange-500' : 
                        'bg-sky-50 border-sky-100 text-sky-500'
                    }`}>
                        {item.type === 'Vocab' && <BookText className="w-5 h-5" />}
                        {item.type === 'Movie Book' && <Clapperboard className="w-5 h-5" />}
                        {item.type === 'Audio Book' && <Headphones className="w-5 h-5" />}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                {/* Left Side: Sorting and Media Type Filters (only in All Media) */}
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <select value={mediaSortBy} onChange={e => setMediaSortBy(e.target.value)}
                            className="appearance-none h-14 pl-6 pr-12 bg-white/5 border-2 border-white/5 rounded-2xl font-bold text-slate-300 outline-none focus:border-[#fbbf24]/50 transition-all cursor-pointer">
                            <option>New</option>
                            <option>Level (↑)</option>
                            <option>Level (↓)</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    
                    {activeSubTab === 'All Media' && (
                        <div className="flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-2xl border-2 border-white/5 shadow-sm animate-in fade-in slide-in-from-right-4">
                            <span className="font-bold text-slate-500 text-xs uppercase tracking-widest mr-2">Filters</span>
                            {['Vocab', 'Movie Book', 'Audio Book'].map(type => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`relative flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all ${mediaFilters[type] ? 'bg-sky-500 border-sky-500 text-white shadow-sm' : 'border-white/20 text-transparent bg-transparent group-hover:border-sky-400'}`}>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <input type="checkbox" className="sr-only" checked={mediaFilters[type]} onChange={() => toggleMediaFilter(type)} />
                                    </div>
                                    <span className="font-bold text-slate-400 group-hover:text-slate-200 transition-colors select-none whitespace-nowrap text-sm">{type}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Unplayed Only Toggle */}
                <div className="flex items-center justify-end flex-1 min-w-[200px]">
                    <div 
                        className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-full border-2 border-white/5 shadow-sm cursor-pointer hover:border-white/10 transition-colors group"
                        onClick={() => setMediaShowUnplayedOnly(!mediaShowUnplayedOnly)}
                    >
                        <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${mediaShowUnplayedOnly ? 'bg-[#fbbf24]' : 'bg-slate-700/50 shadow-inner'}`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-md ${mediaShowUnplayedOnly ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                        <span className={`font-black text-sm select-none transition-colors ${mediaShowUnplayedOnly ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                            Unplayed Only
                        </span>
                    </div>
                </div>
            </div>

            {activeSubTab === 'All Media' ? (
                <div className="space-y-6 pb-20">
                    {groupsToRender.map(group => {
                        let items = group.items.filter((item: any) => mediaFilters[item.type]);
                        if (mediaShowUnplayedOnly) items = items.filter((item: any) => item.isUnplayed);
                        if (items.length === 0) return null;

                        return (
                            <div key={group.baseId} className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-white/5 p-6 rounded-[40px] shadow-sm border-2 border-white/5 flex gap-8 overflow-hidden relative group/row">
                                <div className="w-36 shrink-0 flex flex-col items-center justify-center border-r-2 border-white/5 pr-8 relative">
                                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group-hover/row:scale-105 transition-transform duration-300 relative">
                                        <img src={BOOKS_DATA.find(b => b.id === group.baseId)?.src} alt={group.bookTitle} className="w-full h-full object-cover" />
                                        
                                        {/* Random Status Badges for Media Zone Book Cover */}
                                        {(() => {
                                            const match = group.baseId.match(/\d+/);
                                            const num = match ? parseInt(match[0], 10) : 0;
                                            const randomState = (num + 1) % 3; // Offset to diversify from other sections
                                            
                                            if (randomState === 2) {
                                                return (
                                                    <>
                                                        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500 rounded-full shadow-md z-10">
                                                            <Check className="w-2.5 h-2.5 text-white" />
                                                            <span className="text-[8px] font-black text-white leading-none">Completed</span>
                                                        </div>
                                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-max z-20">
                                                            <div className="bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm border border-amber-100 text-[10px] leading-none">
                                                                {'⭐'.repeat(3 + (num % 3))}
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            } else if (randomState === 1) {
                                                return (
                                                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-amber-400 rounded-full shadow-lg z-10">
                                                        <span className="text-[10px] font-black text-slate-900 leading-none">Now Reading</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}

                                        {/* Heart Toggle for Book Cover (if not completed) */}
                                        {(() => {
                                            const match = group.baseId.match(/\d+/);
                                            const num = match ? parseInt(match[0], 10) : 0;
                                            const randomState = (num + 1) % 3;
                                            const book = BOOKS_DATA.find(b => b.id === group.baseId);
                                            
                                            if (randomState !== 2 && book) {
                                                return (
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            book.isBookmarked = !book.isBookmarked;
                                                            const icon = e.currentTarget.querySelector('svg');
                                                            if (icon) {
                                                                icon.classList.toggle('fill-current');
                                                                e.currentTarget.classList.toggle('text-rose-500');
                                                                e.currentTarget.classList.toggle('text-slate-300');
                                                            }
                                                        }}
                                                        className={`absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white transition-all active:scale-95 z-20 ${book.isBookmarked ? 'text-rose-500' : 'text-slate-300'}`}
                                                    >
                                                        <Heart className={`w-4 h-4 transition-colors ${book.isBookmarked ? 'fill-current' : ''}`} />
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>
                                </div>
                                <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-2 flex-1">
                                    {items.map((item, idx) => (
                                        <div key={item.id} className="group cursor-pointer w-64 shrink-0 flex flex-col transition-all duration-300 transform origin-left"
                                             onClick={(e) => {
                                                 e.stopPropagation();
                                                 onPlayMedia(items, idx);
                                             }}>
                                            <div className="aspect-video bg-slate-900/5 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 relative border-4 border-white ring-1 ring-slate-100 pointer-events-none flex items-center justify-center">
                                                {item.type === 'Vocab' ? (
                                                    <video 
                                                        src={`${item.src}#t=0.001`} 
                                                        className="w-full h-full object-cover" 
                                                        preload="metadata"
                                                        muted
                                                        playsInline
                                                    />
                                                ) : item.type === 'Audio Book' ? (
                                                    <div className="w-full h-full bg-slate-50 flex items-center justify-center p-4">
                                                        <img src={item.thumbnail} className="h-full w-auto object-contain shadow-md rounded-lg" alt="" />
                                                    </div>
                                                ) : (
                                                    <img src={item.thumbnail} onError={(e: any) => { e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`; }} className="w-full h-full object-cover" alt="" />
                                                )}
                                                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white font-black text-xs tabular-nums tracking-wider shadow-sm border border-white/20">
                                                    {item.duration}
                                                </div>
                                                
                                                {/* Media Type Icon Badge */}
                                                <div className={`absolute top-3 left-3 w-9 h-9 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border-2 transition-all group-hover:scale-110 ${
                                                    item.type === 'Vocab' ? 'bg-purple-50 border-purple-100 text-purple-500' : 
                                                    item.type === 'Movie Book' ? 'bg-orange-50 border-orange-100 text-orange-500' : 
                                                    'bg-sky-50 border-sky-100 text-sky-500'
                                                }`}>
                                                    {item.type === 'Vocab' && <BookText className="w-5 h-5" />}
                                                    {item.type === 'Movie Book' && <Clapperboard className="w-5 h-5" />}
                                                    {item.type === 'Audio Book' && <Headphones className="w-5 h-5" />}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                            {items.map((item, idx) => (
                                <div key={item.id} className="group cursor-pointer w-full flex flex-col transition-all duration-300 transform origin-left"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPlayMedia(items, idx);
                                    }}>
                                    <div className="aspect-video bg-slate-900/5 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 relative border-4 border-white ring-1 ring-slate-100 pointer-events-none flex items-center justify-center">
                                        {item.type === 'Vocab' ? (
                                            <video 
                                                src={`${item.src}#t=0.001`} 
                                                className="w-full h-full object-cover" 
                                                preload="metadata"
                                                muted
                                                playsInline
                                            />
                                        ) : item.type === 'Audio Book' ? (
                                            <div className="w-full h-full bg-slate-50 flex items-center justify-center p-4">
                                                <img src={item.thumbnail} className="h-full w-auto object-contain shadow-md rounded-lg" alt="" />
                                            </div>
                                        ) : (
                                            <img src={item.thumbnail} onError={(e: any) => { e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`; }} className="w-full h-full object-cover" alt="" />
                                        )}
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white font-black text-xs tabular-nums tracking-wider shadow-sm border border-white/20">
                                            {item.duration}
                                        </div>
                                        
                                        {/* Media Type Icon Badge */}
                                        <div className={`absolute top-3 left-3 w-9 h-9 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border-2 transition-all group-hover:scale-110 ${
                                            item.type === 'Vocab' ? 'bg-purple-50 border-purple-100 text-purple-500' : 
                                            item.type === 'Movie Book' ? 'bg-orange-50 border-orange-100 text-orange-500' : 
                                            'bg-sky-50 border-sky-100 text-sky-500'
                                        }`}>
                                            {item.type === 'Vocab' && <BookText className="w-5 h-5" />}
                                            {item.type === 'Movie Book' && <Clapperboard className="w-5 h-5" />}
                                            {item.type === 'Audio Book' && <Headphones className="w-5 h-5" />}
                                        </div>
                                    </div>
                                    <div className="px-1 mt-3">
                                        <h4 className="text-[15px] font-bold text-slate-700 line-clamp-1 group-hover:text-sky-500 transition-colors font-jua">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
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

const SearchResultsView = ({ query, onViewInfo, onPlayMedia }: { query: string, onViewInfo: any, onPlayMedia: any }) => {
    const matchedBooks = BOOKS_DATA.filter(b => b.title.toLowerCase().includes(query.toLowerCase()));
    
    // Flatten mockMediaData for search
    let matchedMedia: any[] = [];
    mockMediaData.forEach(group => {
        if (group.bookTitle.toLowerCase().includes(query.toLowerCase())) {
            matchedMedia.push(...group.items);
        }
    });

    const hasResults = matchedBooks.length > 0 || matchedMedia.length > 0;

    if (!hasResults) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full animate-in fade-in zoom-in-95 duration-300 -mt-10">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center mb-8 relative">
                    <Search className="w-12 h-12 text-slate-300" />
                    <div className="absolute inset-0 bg-slate-100/50 rounded-full animate-ping opacity-20"></div>
                </div>
                <h2 className="text-3xl font-black text-slate-700 mb-3 font-jua">No results for "{query}"</h2>
                <p className="text-lg font-bold text-slate-400">Try different keywords or check your spelling!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Books Section */}
            {matchedBooks.length > 0 && (
                <section>
                    <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 font-jua">
                        <Sparkles className="w-6 h-6 text-sky-400" />
                        Books
                        <span className="bg-sky-100 text-sky-500 px-2 py-0.5 rounded-full text-sm font-black">{matchedBooks.length}</span>
                    </h3>
                    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar pr-10">
                        {matchedBooks.map(book => (
                            <div key={book.id} onClick={() => onViewInfo(book, 'recommendation')} className="group cursor-pointer flex flex-col gap-3 w-[160px] shrink-0">
                                <div className="w-full aspect-[3/4] bg-slate-100 rounded-[32px] overflow-hidden relative group-hover:-translate-y-2 transition-all duration-300 border-[4px] border-white shadow-md group-hover:shadow-2xl group-hover:shadow-sky-200">
                                    <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-center text-[15px] font-black text-slate-700 font-jua group-hover:text-sky-500 transition-colors px-1 line-clamp-2">{book.title}</h4>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Media Section */}
            {matchedMedia.length > 0 && (
                <section>
                    <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 font-jua">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                        Media
                        <span className="bg-amber-100 text-amber-500 px-2 py-0.5 rounded-full text-sm font-black">{matchedMedia.length}</span>
                    </h3>
                    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar pr-10">
                        {matchedMedia.map((item, idx) => (
                            <div key={item.id} className="group cursor-pointer w-[280px] shrink-0 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-2"
                                onClick={() => onPlayMedia(matchedMedia, idx)}>
                                <div className="aspect-video bg-slate-100 rounded-[32px] overflow-hidden shadow-sm group-hover:shadow-xl group-hover:shadow-amber-200 transition-all duration-300 relative border-4 border-white pointer-events-none flex items-center justify-center">
                                    {item.type === 'Vocab' ? (
                                        <video 
                                            src={`${item.src}#t=0.001`} 
                                            className="w-full h-full object-cover" 
                                            preload="metadata"
                                            muted
                                            playsInline
                                        />
                                    ) : item.type === 'Audio Book' ? (
                                        <div className="w-full h-full bg-slate-50 flex items-center justify-center p-4">
                                            <img src={item.thumbnail} className="h-full w-auto object-contain shadow-md rounded-lg" alt="" />
                                        </div>
                                    ) : (
                                        <img src={item.thumbnail} onError={(e: any) => { e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`; }} className="w-full h-full object-cover" alt="" />
                                    )}
                                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white font-black text-xs tabular-nums tracking-wider shadow-sm border border-white/20">
                                        {item.duration}
                                    </div>
                                </div>
                                <div className="px-2 pointer-events-none">
                                    <h4 className="text-[16px] font-bold text-slate-700 line-clamp-1 group-hover:text-amber-500 transition-colors font-jua">
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

// Helper component for filter sections
const FilterSection = ({ title, options, state, setState, isGrid }: { title: string, options: string[], state: Record<string, boolean>, setState: any, isGrid?: boolean }) => {
    return (
        <div className="space-y-4">
            <h5 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center justify-between">
                {title}
            </h5>
            <div className={isGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-wrap gap-3'}>
                {options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => setState({ ...state, [opt]: !state[opt] })}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${state[opt] ? 'bg-sky-50 text-sky-600 border-sky-200 shadow-sm' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Topics Tab: Grid view with category chip filter
const TOPIC_CATEGORIES = ['All', 'Classics', 'Sports', 'Science', 'Fantasy', 'Nature', 'World', 'Career', 'Family', 'Music', 'Body'];

const TopicsGridView = ({ onViewInfo, sortBy, showUnreadOnly, activeCategory, setActiveCategory }: { onViewInfo: any, sortBy: string, showUnreadOnly: boolean, activeCategory: string, setActiveCategory: any }) => {
    const filteredBooks = React.useMemo(() => {
        let books = [...BOOKS_DATA];

        // 1. Category Filter
        if (activeCategory !== 'All') {
            books = books.filter(b => {
                // Mock category filtering based on hash since BOOKS_DATA doesn't have categories yet
                const hash = b.id.length + b.title.length;
                const cats = ['Classics', 'Sports', 'Science', 'Fantasy', 'Nature', 'World', 'Career', 'Family', 'Music', 'Body'];
                const bookCat = cats[hash % cats.length];
                return bookCat === activeCategory;
            });
        }

        // 2. Unread Filter
        if (showUnreadOnly) {
            books = books.filter(b => {
                const match = b.id.match(/\d+/);
                const num = match ? parseInt(match[0], 10) : 0;
                const randomState = num % 3;
                return randomState === 0; // 0: Unread, 1: In Progress, 2: Completed
            });
        }

        // 3. Sorting
        if (sortBy === 'ABC') {
            books.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'ZYX') {
            books.sort((a, b) => b.title.localeCompare(a.title));
        }

        return books;
    }, [activeCategory, showUnreadOnly, sortBy]);

    return (
        <div className="flex flex-col gap-8 pb-32">
            {/* Category chips */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {TOPIC_CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-7 py-3 rounded-full font-black text-base transition-all whitespace-nowrap border-2 ${
                            activeCategory === cat
                                ? 'bg-[#fbbf24] text-[#0f172a] border-[#fbbf24] shadow-lg shadow-amber-200/40 scale-105'
                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            {/* Book grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {filteredBooks.map(book => {
                    const match = book.id.match(/\d+/);
                    const num = match ? parseInt(match[0], 10) : 0;
                    const randomState = num % 3;
                    const isCompleted = randomState === 2;
                    const isInProgress = randomState === 1;

                    return (
                        <div key={book.id} onClick={() => onViewInfo(book, 'recommendation')} className="group cursor-pointer flex flex-col items-center">
                            <div className="w-full aspect-[3/4] bg-white/10 rounded-[40px] overflow-hidden relative group-hover:scale-105 transition-all duration-300 border-4 border-transparent group-hover:border-[#fbbf24]/50 shadow-2xl">
                                <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                {isCompleted && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-emerald-500 rounded-full shadow-lg z-10">
                                        <Check className="w-4 h-4 text-white" />
                                        <span className="text-xs font-black text-white leading-none">Completed</span>
                                    </div>
                                )}
                                {isInProgress && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 bg-amber-400 rounded-full shadow-xl z-10">
                                        <span className="text-xs font-black text-slate-900 leading-none">Now Reading</span>
                                    </div>
                                )}

                                {/* Floating Heart Button */}
                                {!isCompleted && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            book.isBookmarked = !book.isBookmarked;
                                            const svg = e.currentTarget.querySelector('svg');
                                            if (svg) {
                                                svg.classList.toggle('fill-current');
                                                svg.classList.toggle('text-rose-500');
                                                svg.classList.toggle('text-slate-300');
                                            }
                                        }}
                                        className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all z-20"
                                    >
                                        <Heart className={`w-5 h-5 transition-colors ${book.isBookmarked ? 'fill-current text-rose-500' : 'text-slate-300'}`} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Picks Tab: Thematic featured categories
const PICKS_CATEGORIES = ['Spring', 'Christmas', 'New', 'Award'];

const PICKS_THEMES: Record<string, { icon: string, titleColor: string, comment: string }> = {
    'Spring': { icon: '🌸', titleColor: 'text-emerald-500', comment: 'Enjoy the fresh stories! 😊' },
    'Christmas': { icon: '🎄', titleColor: 'text-rose-500', comment: 'Warm your heart with winter tales ❄️' },
    'New': { icon: '✨', titleColor: 'text-sky-500', comment: "Check out this week's fresh arrivals!" },
    'Award': { icon: '🏆', titleColor: 'text-amber-500', comment: 'Bestsellers everyone is talking about!' }
};

const PicksCarouselView = ({ onViewInfo, activeCategory, setActiveCategory, sortBy, showUnreadOnly }: { onViewInfo: any, activeCategory: string, setActiveCategory: any, sortBy: string, showUnreadOnly: boolean }) => {
    const categoriesToShow = activeCategory === 'All' ? PICKS_CATEGORIES : [activeCategory];
    return (
        <div className="flex flex-col gap-10 pb-32">
            {/* Category chips */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar mb-4">
                {['All', ...PICKS_CATEGORIES].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-7 py-3 rounded-full font-black text-base transition-all whitespace-nowrap border-2 ${
                            activeCategory === cat
                                ? 'bg-[#fbbf24] text-[#0f172a] border-[#fbbf24] shadow-lg shadow-amber-200/40 scale-105'
                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            {/* Thematic Category Blocks or Full Grid View */}
            <div className="space-y-16">
                {categoriesToShow.map((cat, index) => {
                    const theme = PICKS_THEMES[cat] || { icon: '📌', titleColor: 'text-slate-800', comment: 'Handpicked for you!' };
                    
                    if (activeCategory !== 'All') {
                        // Detailed Grid View for a specific category
                        const fullBooksCount = 18; // Show more books for the grid view
                        let fullBooks = [...BOOKS_DATA].slice((index * 3) % BOOKS_DATA.length).concat([...BOOKS_DATA]).slice(0, fullBooksCount);
                        
                        // Apply Unread Only Filter
                        if (showUnreadOnly) {
                            fullBooks = fullBooks.filter(book => {
                                const match = book.id.match(/\d+/);
                                const num = match ? parseInt(match[0], 10) : 0;
                                return (num % 3) === 0; // 0: Unread, 1: In Progress, 2: Completed
                            });
                        }
                        
                        return (
                            <div key={cat} className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4">
                                <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none" />
                                    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center shadow-inner shrink-0 relative z-10 border-4 border-white">
                                        <span className="text-7xl drop-shadow-md">{theme.icon}</span>
                                    </div>
                                    <div className="text-center md:text-left relative z-10 mt-2 md:mt-4">
                                        <h2 className={`text-5xl md:text-6xl font-black font-jua uppercase tracking-tight mb-3 ${theme.titleColor}`}>
                                            {cat}
                                        </h2>
                                        <p className="text-xl font-bold text-slate-500">
                                            {theme.comment}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Full Grid of Books */}
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
                                    {fullBooks.map(book => {
                                        const match = book.id.match(/\d+/);
                                        const num = match ? parseInt(match[0], 10) : 0;
                                        const randomState = num % 3;
                                        const isCompleted = randomState === 2;
                                        const isInProgress = randomState === 1;

                                        return (
                                            <div key={book.id + cat} onClick={() => onViewInfo(book, 'recommendation')} className="group cursor-pointer flex flex-col items-center">
                                                <div className="w-full aspect-[3/4] bg-slate-100 rounded-[28px] overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-300 shadow-md group-hover:shadow-2xl border-4 border-white group-hover:border-sky-100">
                                                    <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {isCompleted && (
                                                        <>
                                                            <div className="absolute top-3 right-3 flex items-center gap-0.5 px-2 py-1 bg-emerald-500 rounded-full shadow-md z-10">
                                                                <Check className="w-3 h-3 text-white" />
                                                                <span className="text-[9px] font-black text-white leading-none">Completed</span>
                                                            </div>
                                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max z-20">
                                                                <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-xl shadow-md border border-amber-100 text-[10px] leading-none">
                                                                    {'⭐'.repeat(3 + (num % 3))}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {isInProgress && (
                                                        <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-amber-400 rounded-full shadow-lg z-10">
                                                            <span className="text-[11px] font-black text-slate-900 leading-none">Now Reading</span>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Floating Heart Button */}
                                                    {!isCompleted && (
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                book.isBookmarked = !book.isBookmarked;
                                                                const svg = e.currentTarget.querySelector('svg');
                                                                if (svg) {
                                                                    svg.classList.toggle('fill-current');
                                                                    svg.classList.toggle('text-rose-500');
                                                                    svg.classList.toggle('text-slate-300');
                                                                }
                                                            }}
                                                            className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white hover:scale-110 active:scale-95 transition-all z-20"
                                                        >
                                                            <Heart className={`w-4 h-4 transition-colors ${book.isBookmarked ? 'fill-current text-rose-500' : 'text-slate-300'}`} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    // Standard "All" view (Featured + Horizontal Scroll)
                    const count = 5 + (index % 5);
                    const books = [...BOOKS_DATA].slice((index * 3) % BOOKS_DATA.length).concat([...BOOKS_DATA]).slice(0, count);
                    const featuredBook = books[0];
                    const listBooks = books.slice(1);

                    return (
                        <div key={cat} className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
                            {/* Thematic Header */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
                                <div className="flex items-center gap-5">
                                    <span className="text-6xl drop-shadow-sm">{theme.icon}</span>
                                    <div>
                                        <h3 className={`text-4xl font-black font-jua uppercase tracking-tight ${theme.titleColor}`}>
                                            {cat}
                                        </h3>
                                        <p className="text-slate-500 font-bold text-lg mt-1">MD comment: <span className="text-slate-700">{theme.comment}</span></p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveCategory(cat)}
                                    className="text-slate-400 hover:text-slate-600 font-black px-6 py-3 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all text-sm uppercase tracking-wider active:scale-95"
                                >
                                    See All
                                </button>
                            </div>

                            {/* Content Layout */}
                            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                                {/* Featured Book (Hero) */}
                                {featuredBook && (() => {
                                    const match = featuredBook.id.match(/\d+/);
                                    const num = match ? parseInt(match[0], 10) : 0;
                                    const randomState = num % 3;
                                    const isCompleted = randomState === 2;
                                    const isInProgress = randomState === 1;

                                    return (
                                        <div 
                                            onClick={() => onViewInfo(featuredBook, 'recommendation')}
                                            className="w-full lg:w-[35%] shrink-0 group cursor-pointer"
                                        >
                                            <div className="w-full aspect-[3/4] bg-slate-100 rounded-[32px] overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-300 shadow-md group-hover:shadow-2xl">
                                                <img src={featuredBook.src} alt={featuredBook.title} className="w-full h-full object-cover" />
                                                {isCompleted && (
                                                    <>
                                                        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-emerald-500 rounded-full shadow-lg z-10">
                                                            <Check className="w-4 h-4 text-white" />
                                                            <span className="text-xs font-black text-white leading-none">Completed</span>
                                                        </div>
                                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max z-20">
                                                            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-amber-100 text-xs leading-none">
                                                                {'⭐'.repeat(3 + (num % 3))}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {isInProgress && (
                                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 bg-amber-400 rounded-full shadow-xl z-10">
                                                        <span className="text-xs font-black text-slate-900 leading-none">Now Reading</span>
                                                    </div>
                                                )}
                                                
                                                {/* Floating Heart Button */}
                                                {!isCompleted && (
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            featuredBook.isBookmarked = !featuredBook.isBookmarked;
                                                            const svg = e.currentTarget.querySelector('svg');
                                                            if (svg) {
                                                                svg.classList.toggle('fill-current');
                                                                svg.classList.toggle('text-rose-500');
                                                                svg.classList.toggle('text-slate-300');
                                                            }
                                                        }}
                                                        className="absolute bottom-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all z-20"
                                                    >
                                                        <Heart className={`w-6 h-6 transition-colors ${featuredBook.isBookmarked ? 'fill-current text-rose-500' : 'text-slate-300'}`} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Horizontal Scroll of Other Books (2 Rows) */}
                                <div className="flex-1 overflow-x-auto pb-6 custom-scrollbar min-w-0">
                                    <div className="grid grid-rows-2 grid-flow-col gap-x-6 gap-y-6 auto-cols-max">
                                        {listBooks.map(book => {
                                            const match = book.id.match(/\d+/);
                                            const num = match ? parseInt(match[0], 10) : 0;
                                            const randomState = num % 3;
                                            const isCompleted = randomState === 2;
                                            const isInProgress = randomState === 1;

                                            return (
                                                <div key={book.id + cat} onClick={() => onViewInfo(book, 'recommendation')} className="group cursor-pointer w-36 md:w-44 shrink-0 flex flex-col items-center">
                                                    <div className="w-full aspect-[3/4] bg-slate-100 rounded-[24px] overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-300 shadow-sm group-hover:shadow-xl border-4 border-transparent group-hover:border-slate-100">
                                                        <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                                                        {isCompleted && (
                                                            <>
                                                                <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500 rounded-full shadow-md z-10">
                                                                    <Check className="w-2.5 h-2.5 text-white" />
                                                                    <span className="text-[8px] font-black text-white leading-none">Completed</span>
                                                                </div>
                                                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-max z-20">
                                                                    <div className="bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm border border-amber-100 text-[9px] leading-none">
                                                                        {'⭐'.repeat(3 + (num % 3))}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        {isInProgress && (
                                                            <div className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 bg-amber-400 rounded-full shadow-lg z-10">
                                                                <span className="text-[10px] font-black text-slate-900 leading-none">Now Reading</span>
                                                            </div>
                                                        )}

                                                        {/* Floating Heart Button */}
                                                        {!isCompleted && (
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    book.isBookmarked = !book.isBookmarked;
                                                                    const svg = e.currentTarget.querySelector('svg');
                                                                    if (svg) {
                                                                        svg.classList.toggle('fill-current');
                                                                        svg.classList.toggle('text-rose-500');
                                                                        svg.classList.toggle('text-slate-300');
                                                                    }
                                                                }}
                                                                className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white hover:scale-110 active:scale-95 transition-all z-20"
                                                            >
                                                                <Heart className={`w-3.5 h-3.5 transition-colors ${book.isBookmarked ? 'fill-current text-rose-500' : 'text-slate-300'}`} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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
                    className="px-5 py-2.5 bg-[#0f172a] text-[#fbbf24] font-black rounded-2xl text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all group font-fredoka uppercase tracking-widest shadow-lg shadow-black/10"
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
                    {books.filter((book, i) => {
                        const match = book.id.match(/\d+/);
                        const num = match ? parseInt(match[0], 10) : 0;
                        return (num + i) % 3 === 0;
                    }).map((book) => {
                        // All books here are filtered to be unread for "For you" slider
                        const randomState = 0;
                        const isCompleted = false;
                        const isInProgress = false;

                        return (
                        <div key={book.id} onClick={() => onViewInfo(book, 'recommendation')} className="w-36 md:w-40 flex-shrink-0 group cursor-pointer space-y-3 relative select-none">
                            <div className="aspect-[3/4] bg-slate-50 rounded-[32px] shadow-sm border-[4px] border-white group-hover:border-sky-300 transition-all group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-sky-100 overflow-hidden relative">
                                <img src={book.src} alt={book.title} className="w-full h-full object-cover pointer-events-none" />
                                
                                {isCompleted && (
                                    <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500 rounded-full shadow-md z-10">
                                        <Check className="w-2.5 h-2.5 text-white" />
                                        <span className="text-[8px] font-black text-white leading-none">Completed</span>
                                    </div>
                                )}
                                {isInProgress && (
                                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 bg-amber-400 rounded-full shadow-lg z-10">
                                        <span className="text-[10px] font-black text-slate-900 leading-none">Now Reading</span>
                                    </div>
                                )}

                                {isCompleted ? (
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-max z-20">
                                        <div className="bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm border border-amber-100 text-[11px] leading-none">
                                            {'⭐'.repeat(book.rating || 4)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute bottom-3 right-3 z-10 transition-transform group-hover:scale-110">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                book.isBookmarked = !book.isBookmarked;
                                                // Force re-render simple toggle
                                                const icon = e.currentTarget.querySelector('svg');
                                                if (icon) {
                                                    icon.classList.toggle('fill-current');
                                                    e.currentTarget.classList.toggle('text-rose-500');
                                                    e.currentTarget.classList.toggle('text-slate-300');
                                                }
                                            }}
                                            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all active:scale-95 ${book.isBookmarked ? 'text-rose-500' : 'text-slate-300'}`}
                                        >
                                            <Heart className={`w-6 h-6 transition-colors ${book.isBookmarked ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-center text-slate-400 truncate px-4 uppercase tracking-[0.15em] group-hover:text-sky-400 transition-colors font-fredoka">{book.title}</p>
                        </div>
                        );
                    })}
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
