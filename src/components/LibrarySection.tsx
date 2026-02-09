import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, X, Bookmark, Play } from 'lucide-react';
import { BOOKS_DATA, Book } from '../data/books';

interface LibrarySectionProps {
    userName: string;
    onStartLearning: (book: Book) => void;
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ userName, onStartLearning }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [books, setBooks] = useState<Book[]>(BOOKS_DATA);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            setCanScrollLeft(scrollRef.current.scrollLeft > 10);
        }
    };

    useEffect(() => {
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

    const toggleBookmark = (bookId: string) => {
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.id === bookId ? { ...book, isBookmarked: !book.isBookmarked } : book
            )
        );
        if (selectedBook && selectedBook.id === bookId) {
            setSelectedBook(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null);
        }
    };

    return (
        <div className="card-bubble p-6 md:p-8 w-full relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-slate-700 flex items-center gap-4 font-jua">
                    <span className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-400 shadow-sm shadow-sky-100">
                        <Sparkles className="w-8 h-8 fill-current" />
                    </span>
                    Recommended for {userName}
                </h3>
                <a href="#" className="p-3 bg-sky-50 text-sky-400 font-black btn-jelly text-xs flex items-center gap-2 hover:bg-sky-100 hover:scale-105 active:scale-95 group font-fredoka">
                    SEE ALL <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            <div className="relative group/library px-2">
                {/* Bookshelf Base */}
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
                        <div key={book.id} onClick={() => setSelectedBook(book)} className="w-36 md:w-40 flex-shrink-0 group cursor-pointer space-y-3 relative select-none">
                            <div className="aspect-[3/4] bg-slate-50 rounded-[32px] shadow-sm border-[4px] border-white group-hover:border-sky-300 transition-all group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-sky-100 overflow-hidden relative">
                                <img src={book.src} alt={book.title} className="w-full h-full object-cover pointer-events-none" />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Card Bookmark Ribbon - Only show when bookmarked */}
                                {book.isBookmarked && (
                                    <div className="absolute top-0 left-4 z-10 transition-transform group-hover:scale-110">
                                        <div className="w-10 h-12 flex items-center justify-center pt-1 pb-4 rounded-b-xl border-2 border-t-0 border-white shadow-md transition-all bg-[#FF6B00] text-white">
                                            <Bookmark className="w-6 h-6 fill-current" />
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

            {/* Book Detail Modal */}
            {selectedBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedBook(null)} />
                    <div className="card-bubble w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-in zoom-in-95 duration-200">
                        {/* Bookmark Ribbon - Stuck to Top */}
                        <div className="absolute top-0 left-12 z-20 pointer-events-none">
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleBookmark(selectedBook.id); }}
                                className={`w-16 h-24 flex items-center justify-center pt-2 pb-8 transition-all pointer-events-auto active:scale-95 shadow-xl rounded-b-3xl border-[6px] border-t-0 border-white ${selectedBook.isBookmarked ? 'bg-[#FF6B00] text-white' : 'bg-white text-slate-200'}`}
                            >
                                <Bookmark className={`w-10 h-10 ${selectedBook.isBookmarked ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Modal Header */}
                        <div className="p-6 md:p-8 flex justify-between items-center border-b-[6px] border-slate-50">
                            <div className="w-16" /> {/* Placeholder for Ribbon space balance */}
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
                            <div className="flex flex-col md:flex-row gap-10">
                                {/* Left: Image */}
                                <div className="w-full md:w-1/2 flex-shrink-0">
                                    <div className="aspect-[3/4] rounded-[48px] overflow-hidden border-[8px] border-white shadow-2xl shadow-slate-200">
                                        <img src={selectedBook.src} alt={selectedBook.title} className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                {/* Right: Info */}
                                <div className="w-full md:w-1/2 space-y-8">
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-5 py-2 bg-orange-100 text-orange-500 rounded-full font-black text-sm border-2 border-orange-200">
                                            Lexile: {selectedBook.lexile}
                                        </span>
                                        <span className="px-5 py-2 bg-green-100 text-green-500 rounded-full font-black text-sm border-2 border-green-200">
                                            {selectedBook.wordCount} Words
                                        </span>
                                        <span className="px-5 py-2 bg-sky-100 text-sky-500 rounded-full font-black text-sm border-2 border-sky-200">
                                            {selectedBook.category}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xl font-black text-slate-800 font-jua">Summary</h4>
                                        <p className="text-lg text-slate-600 leading-relaxed font-fredoka">
                                            {selectedBook.summary}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xl font-black text-slate-800 font-jua">Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedBook.keywords.map((word, i) => (
                                                <span key={i} className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm">
                                                    #{word}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 md:p-10 bg-slate-50/50">
                            <button
                                onClick={() => { onStartLearning(selectedBook); setSelectedBook(null); }}
                                className="w-full py-6 bg-orange-500 text-white btn-jelly text-3xl flex items-center justify-center gap-4 hover:bg-orange-600 transition-colors"
                            >
                                START READING <Play className="w-8 h-8 fill-current" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LibrarySection;
