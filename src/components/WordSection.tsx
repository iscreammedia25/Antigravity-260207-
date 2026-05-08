import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronRight, Volume2, RotateCw, BookOpen, Lock, MessageCircle, HelpCircle } from 'lucide-react';
import { Book } from '../data/books';
import { speakWithElevenLabs } from '../utils/elevenlabs';

interface WordSectionProps {
    book: Book;
    onNext: () => void;
    onClose: () => void;
    onSwitchPhase?: (phase: string) => void;
}

interface CardData {
    frontImage: string;
    backVideo: string;
    subtitle: string;
    wordLabel: string;
}

const getCardsForBook = (book: Book): { cards: CardData[], bgImageUrl: string } => {
    let cards: CardData[] = [];
    let bgImageUrl = "";

    if (book.id === 'milo' || book.id === 'OG0021') {
        const path = "/Word/OG0021(Milo and the Lost Color)";
        cards = [
            { frontImage: `${path}/Milo_ask.jpeg`, backVideo: `${path}/Milo_ask.mp4`, wordLabel: "ask", subtitle: "To ask means to say a question when you want to know something!" },
            { frontImage: `${path}/Milo_feel.jpeg`, backVideo: `${path}/Milo_feel.mp4`, wordLabel: "feel", subtitle: "To feel is to touch something. Wow, this leaf feels so soft." },
            { frontImage: `${path}/Milo_glow.jpeg`, backVideo: `${path}/Milo_glow.mp4`, wordLabel: "glow", subtitle: "To glow means to shine softly in the dark. I'm glowing!" },
            { frontImage: `${path}/Milo_mix.jpeg`, backVideo: `${path}/Milo_mix.mp4`, wordLabel: "mix", subtitle: "To mix is to put different things together. Let's mix red and blue!" }
        ];
        bgImageUrl = "/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC00_I.png";
    } else if (book.id === 'hans-in-luck' || book.id === 'CS0003') {
        const path = "/Word/CS0003(Hans in Luck)";
        cards = [
            { frontImage: `${path}/Hans_gold.png`, backVideo: `${path}/Hans_gold.mp4`, wordLabel: "gold", subtitle: "Gold is a shiny, yellow treasure that glitters like a piece of the sun!" },
            { frontImage: `${path}/Hans_goose.png`, backVideo: `${path}/Hans_goose.mp4`, wordLabel: "goose", subtitle: "A goose is a big, white bird that loves to swim and goes \"Honk, honk!\"" },
            { frontImage: `${path}/Hans_trade.png`, backVideo: `${path}/Hans_trade.mp4`, wordLabel: "trade", subtitle: "To trade is to give something you have to a friend to get something else in return." },
            { frontImage: `${path}/Hans_horse.png`, backVideo: `${path}/Hans_horse.mp4`, wordLabel: "horse", subtitle: "A horse is a big, strong animal that you can ride to go for a fast run!" }
        ];
        bgImageUrl = "/Image/Book/CS0003(Hans in Luck)/CS0003_SC00_I.png";
    } else {
        const folderNameMap: Record<string, string> = {
            'silent-stick': 'OG0046(The Silent Stick)',
            'OG0046': 'OG0046(The Silent Stick)',
            'rainbow-cloud': 'OG0050(The Rainbow Cloud in the Box)',
            'OG0050': 'OG0050(The Rainbow Cloud in the Box)'
        };
        const folder = folderNameMap[book.id];
        if (folder) {
            bgImageUrl = `/Image/Book/${folder}/${book.id}_SC00_I.png`;
        } else {
            bgImageUrl = book.src;
        }
        cards = [{ frontImage: book.src, backVideo: "", wordLabel: "Read", subtitle: "Let's read this story together!" }];
    }
    return { cards, bgImageUrl };
};

const WordSection: React.FC<WordSectionProps> = ({ book, onNext, onClose, onSwitchPhase }) => {
    const { cards, bgImageUrl } = getCardsForBook(book);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const [visibleLabel, setVisibleLabel] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentCard = cards[currentCardIndex];
    const isTextRevealed = revealedIndices.has(currentCardIndex);

    // Reset revealed state when book changes
    useEffect(() => {
        setRevealedIndices(new Set());
    }, [book.id]);

    // Card/Index Reset (Partial)
    useEffect(() => {
        setIsFlipped(false);
        setDisplayText("");
        setIsTypingComplete(false);
        
        // Immediate show if already revealed, else clear for delay
        if (revealedIndices.has(currentCardIndex)) {
            setVisibleLabel(cards[currentCardIndex].wordLabel);
        } else {
            setVisibleLabel("");
        }
    }, [currentCardIndex, revealedIndices, cards]);

    // Delayed Text Reveal logic
    useEffect(() => {
        if (!revealedIndices.has(currentCardIndex)) {
            const timer = setTimeout(() => {
                setRevealedIndices(prev => {
                    const next = new Set(Array.from(prev));
                    next.add(currentCardIndex);
                    return next;
                });
                setVisibleLabel(currentCard.wordLabel);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [currentCardIndex, revealedIndices, currentCard.wordLabel]);

    // Determine Voice ID based on book
    const getVoiceId = () => {
        if (book.id === 'milo' || book.id === 'OG0021') return "RgEAVgtchm6TZk0TamG9";
        if (book.id === 'hans-in-luck' || book.id === 'CS0003') return "cVv62OzK6vs7ocpR7lNB";
        return "RgEAVgtchm6TZk0TamG9"; // Default
    };

    // TTS Logic (Immediate on reveal front)
    const playTTS = async () => {
        // const voiceId = getVoiceId();
        // // Try ElevenLabs first
        // const audioUrl = await speakWithElevenLabs(currentCard.wordLabel, voiceId);
        // if (audioUrl) {
        //     if (audioRef.current) audioRef.current.pause();
        //     const audio = new Audio(audioUrl);
        //     audioRef.current = audio;
        //     audio.play().catch(e => console.error("ElevenLabs Play Error:", e));
        //     return;
        // }

        // Fallback to Browser TTS (Temporarily made Primary)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(currentCard.wordLabel);
            utterance.lang = 'en-US';
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    const playSubtitleTTS = async () => {
        // const voiceId = getVoiceId();
        // // Try ElevenLabs first
        // const audioUrl = await speakWithElevenLabs(currentCard.subtitle, voiceId);
        // if (audioUrl) {
        //     if (audioRef.current) audioRef.current.pause();
        //     const audio = new Audio(audioUrl);
        //     audioRef.current = audio;
        //     audio.play().catch(e => console.error("ElevenLabs Subtitle Play Error:", e));
        //     return;
        // }

        // Fallback to Browser TTS (Temporarily made Primary)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(currentCard.subtitle);
            utterance.lang = 'en-US';
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        // [TTS Auto-play Restored]
        // Automatic playback for Vocabulary word label (front) and subtitle (back)
        if (!isFlipped) {
            // Use 500ms delay on mount to ensure speech engine is ready
            const timer = setTimeout(() => {
                playTTS();
            }, 500);
            return () => clearTimeout(timer);
        } else {
            // Play subtitle TTS when flipped to back
            playSubtitleTTS();
        }
    }, [currentCardIndex, isFlipped, currentCard.wordLabel, currentCard.subtitle]);

    // Typing effect when flipped
    useEffect(() => {
        if (isFlipped && !isTypingComplete) {
            let index = 0;
            const typingTimer = setInterval(() => {
                if (index <= currentCard.subtitle.length) {
                    setDisplayText(currentCard.subtitle.slice(0, index));
                    index++;
                } else {
                    setIsTypingComplete(true);
                    clearInterval(typingTimer);
                }
            }, 50);
            return () => clearInterval(typingTimer);
        }
    }, [isFlipped, isTypingComplete, currentCard.subtitle]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        if (videoRef.current) {
            if (!isFlipped) videoRef.current.play();
            else videoRef.current.pause();
        }
    };

    const nextCard = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
        }
    };

    const prevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(prev => prev - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col select-none overflow-hidden animate-in slide-in-from-bottom duration-500">
            {/* Background Layer (SC00) */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={bgImageUrl} 
                    alt="background" 
                    className="w-full h-full object-contain opacity-20"
                    onError={(e) => (e.target as any).src = book.src}
                />
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
            </div>
            {/* GNB / Tabs */}
            <nav className="h-24 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 flex items-center justify-between px-8 shadow-xl z-50 fixed top-0 inset-x-0 transition-transform duration-300">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 shadow-inner">
                        <RotateCw size={28} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-sky-400 uppercase tracking-widest leading-none">Flash Card</span>
                        <h1 className="text-xl font-black text-slate-700 font-jua truncate max-w-[200px]">
                            {book.title}
                        </h1>
                    </div>
                </div>

                {/* Phase Selection Tabs */}
                <div className="flex bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-[22px] border border-white/50 shadow-inner overflow-hidden">
                    <button 
                        className="relative px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 group overflow-hidden bg-white text-orange-500 shadow-sm"
                    >
                        <RotateCw size={16} />
                        Vocabulary
                    </button>
                    <button 
                        onClick={() => onSwitchPhase && onSwitchPhase('read')}
                        className="relative px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 group overflow-hidden text-slate-400 hover:text-slate-700"
                    >
                        <BookOpen size={16} />
                        Reading
                    </button>
                    <button 
                        onClick={() => onSwitchPhase && onSwitchPhase('quiz')}
                        className="relative px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 group overflow-hidden text-slate-400 hover:text-slate-700"
                    >
                        <HelpCircle size={16} />
                        Quiz
                    </button>
                    <button 
                        onClick={() => onSwitchPhase && onSwitchPhase('speak')}
                        className="relative px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 group overflow-hidden text-slate-400 hover:text-slate-700"
                    >
                        <MessageCircle size={16} />
                        Talking
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-14 h-14 bg-slate-50 rounded-2xl border-4 border-white flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 group"
                >
                    <X size={32} className="group-hover:rotate-90 transition-transform" />
                </button>
            </nav>

            <div className="h-24 flex-shrink-0" /> {/* Spacer for fixed GNB */}

            {/* Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-8">
                <div className="w-full max-w-[1000px] flex items-center justify-between gap-8 h-full">
                    {/* Previous Button */}
                    <div className="w-20 hidden md:flex items-center justify-center">
                        {currentCardIndex > 0 && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); prevCard(); }}
                                className="w-16 h-16 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-xl hover:scale-110 active:scale-90"
                            >
                                <ChevronRight size={40} className="rotate-180" />
                            </button>
                        )}
                    </div>

                    {/* 3D Card Container (Slightly larger) */}
                    <div 
                        className={`relative flex-1 aspect-[4/3] max-w-[900px] cursor-pointer perspective-2000 transition-all duration-700`}
                        onClick={handleFlip}
                    >
                        <div
                            className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] cursor-pointer ${isFlipped ? '[transform:rotateY(180deg)]' : ''} ${!isFlipped ? 'animate-card-float' : ''}`}
                            onClick={handleFlip}
                        >
                            
                            {/* Front Side */}
                            <div className={`absolute inset-0 w-full h-full backface-hidden rounded-[32px] overflow-hidden border-4 border-white/50 shadow-2xl bg-white ${!isFlipped && isTextRevealed ? 'animate-soft-glow' : ''}`}>
                                <div className="absolute inset-0">
                                    <img 
                                        src={currentCard.frontImage} 
                                        alt="Word Front" 
                                        className="w-full h-full object-contain bg-white"
                                    />

                                    {/* Speaker Button on Front */}
                                    <div className="absolute top-6 right-6 z-10">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); playTTS(); }}
                                            className="w-16 h-16 bg-sky-100 hover:bg-sky-200 text-sky-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                                        >
                                            <Volume2 size={36} strokeWidth={3} />
                                        </button>
                                    </div>

                                    {/* Bottom overlay for text (Black text on light overlay) */}
                                    <div className={`absolute inset-x-0 bottom-0 h-1/4 bg-white/40 backdrop-blur-sm flex items-end justify-center pb-12 transition-all duration-1000 ${isTextRevealed ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                        <span className="text-black text-6xl font-black font-fredoka drop-shadow-sm tracking-tight uppercase">
                                            {visibleLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[32px] overflow-hidden border-4 border-white/50 shadow-2xl bg-white">
                                <video
                                    ref={videoRef}
                                    src={currentCard.backVideo}
                                    className="w-full h-full object-contain"
                                    loop
                                    muted
                                    playsInline
                                />
                                
                                {/* Subtitle Box (Slimmer) */}
                                {isFlipped && (
                                    <div className="absolute inset-x-0 bottom-6 px-10">
                                        <div className="bg-white/90 backdrop-blur-md rounded-[28px] py-4 px-8 shadow-2xl border-4 border-sky-200 flex flex-col gap-1 min-h-[80px] items-center justify-center">
                                            <div className="w-10 h-1 bg-sky-200 rounded-full mb-1 opacity-50" />
                                            <p className="text-slate-800 text-2xl font-black font-fredoka leading-normal text-center">
                                                {displayText}
                                                {!isTypingComplete && <span className="inline-block w-1 h-6 bg-sky-400 ml-1 animate-pulse" />}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pagination Indicators */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                            {cards.map((_, i) => (
                                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentCardIndex ? 'bg-orange-500 w-8' : 'bg-white/30'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="w-20 hidden md:flex items-center justify-center">
                        {currentCardIndex < cards.length - 1 && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); nextCard(); }}
                                className="w-16 h-16 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-xl hover:scale-110 active:scale-90"
                            >
                                <ChevronRight size={40} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Final Navigation CTA in bottom-right */}
                {currentCardIndex === cards.length - 1 && (
                    <div className="absolute bottom-12 right-12 animate-in fade-in slide-in-from-right duration-500 delay-500">
                        <button
                            onClick={onNext}
                            className="bg-sky-400 text-white pl-10 pr-6 py-5 rounded-[40px] flex items-center gap-6 shadow-2xl hover:bg-sky-500 active:scale-95 transition-all group"
                        >
                            <span className="text-3xl font-black font-fredoka uppercase tracking-wider">Reading</span>
                            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                <ChevronRight size={44} strokeWidth={4} />
                            </div>
                        </button>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .perspective-2000 {
                    perspective: 2000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes soft-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 0px rgba(56, 189, 248, 0); }
                    50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6), 0 0 25px rgba(56, 189, 248, 0.4); }
                }
                .animate-soft-glow {
                    animation: soft-glow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default WordSection;
