import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOKS_DATA, Book } from '../data/books';
import { ReadingHistory, LearningPhase } from '../types/learning';

interface HeroSectionProps {
  userName: string;
  readingHistory: ReadingHistory[];
  freshHeroBook?: Book | null;
  onStartLearning: (book: Book) => void;
  onViewInfo: (book: Book, origin?: 'history' | 'recommendation') => void;
  isDemoMode?: boolean;
  isFlashing?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userName, readingHistory, freshHeroBook, onStartLearning, onViewInfo, isDemoMode, isFlashing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine if we are in History mode based on the prop or content
  const isHistoryMode = isDemoMode || readingHistory.length > 0;

  // Prepare cards: Up to 3 history items OR 3 recommendations if Fresh mode
  const cards = isHistoryMode
    ? (readingHistory.length === 2
      ? [
        { book: BOOKS_DATA.find(b => b.id === 'milo') || BOOKS_DATA[0], history: readingHistory.find(h => h.bookId === 'milo') || readingHistory[1] },
        { book: BOOKS_DATA.find(b => b.id === 'silent-stick') || BOOKS_DATA[0], history: readingHistory.find(h => h.bookId === 'silent-stick') || readingHistory[0] },
        { book: null as any, history: null as any } // Empty placeholder
      ]
      : readingHistory.slice(0, 3).map(h => ({
        book: BOOKS_DATA.find(b => b.id === h.bookId) || BOOKS_DATA[0],
        history: h
      }))
    )
    : [
      { book: freshHeroBook || BOOKS_DATA.find(b => b.id === 'silent-stick') || BOOKS_DATA[0], history: null },
      { book: BOOKS_DATA.find(b => b.id === 'missing-planet') || BOOKS_DATA[0], history: null },
      { book: BOOKS_DATA.find(b => b.id === 'milo') || BOOKS_DATA[0], history: null },
    ];

  // Initialize to center (Silent Stick) on mode enter
  React.useEffect(() => {
    if (isHistoryMode) {
      setCurrentIndex(1);
    }
  }, [isHistoryMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentCard = cards[currentIndex];
  const { book, history } = currentCard || { book: BOOKS_DATA[0], history: null };

  const phases: LearningPhase[] = ['watch', 'read', 'quiz', 'speak'];
  const completedCount = history ? history.completedPhases.length : 0;
  const progressPercent = (completedCount / phases.length) * 100;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className={`relative overflow-hidden card-bubble p-6 md:p-10 transition-all duration-700 border-none shadow-2xl ${isHistoryMode ? 'bg-[#0f172a]' : 'bg-[#fbbf24]'}`}>
      {/* Decorative Orbs (Removed for clean solid look as per user request) */}

      {/* Main Content Unit */}
      <div
        className="flex flex-col md:flex-row items-center gap-12 w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500"
      >

        {/* Books Container */}
        <div className="relative flex items-center justify-center w-full md:w-[320px] h-[340px] flex-shrink-0">

          {/* Peeking Cards (Increased Visibility) */}
          {isHistoryMode && cards.length > 1 && (
            <>
              <div id="hero-left-slot" data-index={(currentIndex - 1 + cards.length) % cards.length} className="absolute left-[-22%] scale-75 opacity-70 pointer-events-none transform -rotate-6 transition-all duration-500">
                <div className="w-48 h-64 bg-slate-900/60 backdrop-blur-md rounded-[28px] shadow-xl overflow-hidden border-2 border-white/20">
                  {cards[(currentIndex - 1 + cards.length) % cards.length].book ? (
                    <img id="hero-left-thumb" src={cards[(currentIndex - 1 + cards.length) % cards.length].book.src} alt="prev" className="w-full h-full object-cover brightness-90" />
                  ) : (
                    <div className="w-full h-full border-4 border-dashed border-white/30 rounded-[28px] flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center">
                        <span className="text-white/20 text-3xl font-fredoka">+</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div id="hero-right-slot" data-index={(currentIndex + 1) % cards.length} className="absolute right-[-22%] scale-75 opacity-70 pointer-events-none transform rotate-6 transition-all duration-500">
                <div className="w-48 h-64 bg-slate-900/60 backdrop-blur-md rounded-[28px] shadow-xl overflow-hidden border-2 border-white/20">
                  {cards[(currentIndex + 1) % cards.length].book ? (
                    <img id="hero-right-thumb" src={cards[(currentIndex + 1) % cards.length].book.src} alt="next" className="w-full h-full object-cover brightness-90" />
                  ) : (
                    <div className="w-full h-full border-4 border-dashed border-white/30 rounded-[28px] flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center">
                        <span className="text-white/20 text-3xl font-fredoka">+</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Current Main Card Cover Area */}
          <div id="hero-center-slot" data-index={currentIndex} className="relative z-10 group">
            <div className={`w-56 h-[280px] rounded-[28px] shadow-2xl overflow-hidden transform border-4 ${isHistoryMode ? 'border-white' : 'border-[#0f172a]/10'} transition-all group-hover:scale-105 cursor-pointer ${!book ? 'bg-slate-900/60 backdrop-blur-xl' : 'bg-white'}`} onClick={() => book && onViewInfo(book, isHistoryMode ? 'history' : 'recommendation')}>
              {book ? (
                <>
                  <img src={book.src} alt={book.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <p className="text-white font-black text-[9px] uppercase tracking-widest opacity-90">{isHistoryMode ? 'In Progress' : 'Recommended'}</p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 min-h-[40%]">
                    <h3
                      className="text-white font-black font-fredoka leading-tight text-center transition-all duration-300"
                      style={{
                        fontSize: book.title.length > 20 ? '1rem' : book.title.length > 14 ? '1.25rem' : '1.5rem',
                        lineHeight: '1.1'
                      }}
                    >
                      {book.title}
                    </h3>
                  </div>
                </>
              ) : (
                <div className="w-full h-full border-4 border-dashed border-white/20 rounded-[28px] flex flex-col items-center justify-center gap-4 bg-slate-900/20">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center">
                    <span className="text-white/20 text-5xl font-fredoka">+</span>
                  </div>
                  <p className="text-white/20 font-black text-xl uppercase tracking-widest font-fredoka">Empty</p>
                </div>
              )}
            </div>

            {/* Navigation Arrows (Overlaid on Thumbnail Edges) */}
            {isHistoryMode && cards.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 transition-all border border-white/40 shadow-lg pointer-events-auto active:scale-90"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 transition-all border border-white/40 shadow-lg pointer-events-auto active:scale-90"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Text and Actions (Indented right) */}
        <div className={`flex-1 space-y-8 md:pl-16 transition-all duration-700 ${isHistoryMode ? 'text-white' : 'text-[#0f172a]'}`}>
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black drop-shadow-md leading-tight font-fredoka tracking-tight whitespace-nowrap">
              {isHistoryMode ? `Continue Your\nAdventure, ${userName}!` : `Start Your\nAdventure, ${userName}!`}
            </h2>
          </div>

          {/* Progress Section (Enlarged and Re-arranged) */}
          <div className="space-y-3 max-w-2xl">
            <div className={`flex flex-col md:flex-row items-baseline justify-between font-black font-fredoka gap-6 ${isHistoryMode ? 'text-white' : 'text-[#0f172a]'}`}>
              <div
                className="flex flex-wrap gap-x-8 gap-y-2 uppercase tracking-normal font-black"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', lineHeight: '1' }}
              >
                {phases.map((p, idx) => {
                  const isCompleted = history?.completedPhases.includes(p);
                  const isCurrent = history?.currentPhase === p;
                  const color = isCurrent
                    ? (isHistoryMode ? 'text-yellow-300' : 'text-orange-600')
                    : isCompleted
                      ? (isHistoryMode ? 'text-green-300' : 'text-green-600')
                      : (isHistoryMode ? 'text-white/40' : 'text-[#0f172a]/40');
                  return (
                    <span key={p} className={`${color} transition-all drop-shadow-md`}>
                      {p}{idx < phases.length - 1 && ' >'}
                    </span>
                  );
                })}
              </div>
              <div
                className={`flex items-baseline gap-4 font-black ${isHistoryMode ? 'text-sky-100' : 'text-[#0f172a]'}`}
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: '1' }}
              >
                {progressPercent}% <span className="opacity-80 uppercase" style={{ fontSize: '0.6em' }}>Completed!</span>
              </div>
            </div>

            <div className={`h-4 w-full rounded-full overflow-hidden border p-0.5 shadow-inner ${isHistoryMode ? 'bg-black/20 border-white/10' : 'bg-[#0f172a]/10 border-[#0f172a]/10'}`}>
              <div
                className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${isHistoryMode ? 'from-sky-400 to-blue-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]' : 'from-orange-500 to-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.2)]'}`}
                style={{ width: `${history ? Math.max(progressPercent, 5) : 100}%` }}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onStartLearning(book)}
              className={`w-full md:max-w-md py-6 rounded-[28px] font-black text-4xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl ${isHistoryMode ? 'bg-[#fbbf24] text-[#0f172a] shadow-amber-900/40' : 'bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-amber-900/20'} ${isFlashing ? 'animate-pulse scale-105 mb-2' : ''}`}
            >
              {isHistoryMode ? 'CONTINUE READING' : 'START READING'} <Play className="w-10 h-10 fill-current ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
