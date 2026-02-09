import React from 'react';
import { Play } from 'lucide-react';
import { BOOKS_DATA, Book } from '../data/books';

interface HeroSectionProps {
  userName: string;
  onStartLearning: (book: Book) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userName, onStartLearning }) => {
  // Find "Rainbow Cloud" for the hero recommendation
  const recommendedBook = BOOKS_DATA.find(b => b.id === 'rainbow-cloud') || BOOKS_DATA[0];

  return (
    <section className="relative overflow-hidden card-bubble p-8 md:p-12 transition-all duration-700 bg-gradient-to-br from-orange-400 to-orange-500 border-none shadow-orange-200">
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl"></div>

      <div className="flex flex-col md:flex-row items-center gap-12 w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Featured Book */}
        <div className="relative group flex-shrink-0">
          <div className="absolute -inset-4 bg-white/40 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-56 h-72 bg-white rounded-[32px] shadow-2xl flex-shrink-0 relative overflow-hidden transform -rotate-3 border-[6px] border-white transition-all group-hover:rotate-0 group-hover:scale-105">
            <img src={recommendedBook.src} alt={recommendedBook.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <p className="text-white font-black text-xs font-jua uppercase tracking-wide">Recommended!</p>
            </div>
          </div>
        </div>

        {/* Text and Actions */}
        <div className="text-white space-y-8 text-center md:text-left flex-1">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black drop-shadow-md leading-tight tracking-tight font-jua">
              Ready for a<br />New Adventure?
            </h2>
            <p className="text-orange-50 text-xl font-medium opacity-100 leading-relaxed font-fredoka max-w-lg">
              We've prepared <span className="text-yellow-200 font-bold">"{recommendedBook.title}"</span> just for you, {userName}!
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <button
              onClick={() => onStartLearning(recommendedBook)}
              className="px-10 py-5 bg-green-400 text-white btn-jelly text-2xl flex items-center gap-3 hover:bg-green-500 hover:scale-105 active:scale-95"
            >
              Start Reading <Play className="w-6 h-6 fill-current" />
            </button>
            <button className="px-8 py-5 bg-white/30 backdrop-blur-md text-white btn-jelly text-lg hover:bg-white/40 border-white/50">
              Other Books
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
