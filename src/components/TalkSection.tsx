import React, { useState, useEffect } from 'react';
import { X, Mic, Check, Volume2, RotateCw, BookOpen, MessageCircle, Lock, ChevronRight, Sparkles } from 'lucide-react';
import { Book } from '../data/books';

interface TalkSectionProps {
    book: Book;
    onClose: () => void;
    onSwitchPhase?: (phase: string) => void;
}

const TalkSection: React.FC<TalkSectionProps> = ({ book, onClose, onSwitchPhase }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [hasRecorded, setHasRecorded] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [sttProgress, setSttProgress] = useState(-1);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock Dialogue Data
    const dialogues = [
        { speaker: "Mike", text: "Can I borrow your color?", translation: "네 색연필 좀 빌려줄 수 있어?" },
        { speaker: "Ami", text: "Sure! Here you go.", translation: "물론이지! 여기 있어." },
        { speaker: "Mike", text: "Thank you so much!", translation: "정말 고마워!" }
    ];

    const currentDialogue = dialogues[currentStep];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            setSttProgress(-1);
            const words = currentDialogue.text.split(' ');
            let wordIdx = 0;
            interval = setInterval(() => {
                if (wordIdx < words.length) {
                    setSttProgress(wordIdx);
                    wordIdx++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsRecording(false);
                        setHasRecorded(true);
                    }, 500);
                }
            }, 600);
        }
        return () => clearInterval(interval);
    }, [isRecording, currentDialogue.text]);

    const handleNext = () => {
        if (currentStep < dialogues.length - 1) {
            setCurrentStep(prev => prev + 1);
            setHasRecorded(false);
            setSttProgress(-1);
        } else {
            setShowSuccess(true);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col select-none overflow-hidden font-fredoka">
            {/* GNB */}
            <nav className="h-24 bg-white border-b-2 border-slate-100 flex items-center justify-between px-8 shadow-sm relative z-50">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 shadow-inner">
                        <MessageCircle size={28} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-700 font-jua truncate max-w-[300px]">
                        Talking
                    </h1>
                </div>

                {/* Progress Tabs */}
                <div className="flex bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-[22px] border border-white/50 shadow-inner">
                    <button onClick={() => onSwitchPhase?.('word')} className="px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 text-slate-400 hover:text-slate-600">
                        <RotateCw size={16} /> VOCA
                    </button>
                    <button onClick={() => onSwitchPhase?.('read')} className="px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 text-slate-400 hover:text-slate-600">
                        <BookOpen size={16} /> READING
                    </button>
                    <button onClick={() => onSwitchPhase?.('quiz')} className="px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 text-slate-400 hover:text-slate-600">
                        <Lock size={16} /> QUIZ
                    </button>
                    <button className="px-6 py-2.5 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 bg-white text-sky-500 shadow-sm">
                        <MessageCircle size={16} /> TALKING
                    </button>
                </div>

                <button onClick={onClose} className="w-12 h-12 bg-slate-50 rounded-xl border-2 border-white flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                    <X size={24} />
                </button>
            </nav>

            {/* Main Content: 16:9 Split Layout */}
            <div className="flex-1 relative flex flex-row items-stretch p-0 bg-gradient-to-r from-white to-sky-50 overflow-hidden">
                
                {/* Left Side: Character Area (Interactive) */}
                <div className="flex-1 flex flex-col items-center justify-center p-12 relative border-r-2 border-slate-100/50">
                    <div className="relative group">
                        {/* Glowing Ring when recording */}
                        <div className={`absolute -inset-12 rounded-full bg-sky-400/20 blur-3xl transition-all duration-500 ${isRecording ? 'opacity-100 scale-125' : 'opacity-0 scale-100'}`} />
                        
                        {/* Circular Image Container (Larger for split view) */}
                        <div className={`relative w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full border-[16px] border-white shadow-2xl overflow-hidden bg-white transition-all duration-500 ${isRecording ? 'scale-105' : ''}`}>
                            <img 
                                src={`/Image/Character/${currentDialogue.speaker}.png`} 
                                alt={currentDialogue.speaker}
                                className="w-full h-full object-cover"
                                onError={(e) => (e.target as any).src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mike'} 
                            />
                            {/* Recording Overlay */}
                            {isRecording && (
                                <div className="absolute inset-0 bg-sky-500/10 flex items-center justify-center">
                                    <div className="flex gap-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-3 h-16 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Name Tag */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-12 py-3 rounded-[24px] shadow-2xl border-4 border-slate-50 z-20">
                            <span className="text-3xl font-black text-slate-700 font-jua tracking-wider">
                                {currentDialogue.speaker === 'Mike' ? '마이크' : '아미'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Dialogue & Controls Area */}
                <div className="w-[45%] lg:w-[40%] flex flex-col items-center justify-center p-16 gap-12 bg-white/40 backdrop-blur-md relative z-10 border-l border-white/50">
                    {/* Dialogue Box */}
                    <div className="w-full flex flex-col gap-8 text-center animate-in slide-in-from-right duration-700">
                        <div className="bg-sky-500 text-white self-center px-8 py-2 rounded-full font-black text-base uppercase tracking-[0.2em] shadow-lg mb-4">
                            Repeat After Me
                        </div>

                        <div className="min-h-[200px] flex flex-col justify-center">
                            <h2 className="text-5xl lg:text-6xl font-black text-slate-800 leading-tight">
                                {currentDialogue.text.split(' ').map((word, idx) => (
                                    <span 
                                        key={idx} 
                                        className={`inline-block transition-all duration-300 mx-2 ${idx <= sttProgress ? 'text-sky-500 scale-110 drop-shadow-sm' : 'text-slate-400'}`}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </h2>
                            <p className="text-3xl font-bold text-slate-400 italic mt-6">
                                {currentDialogue.translation}
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="w-full flex flex-col items-center gap-8 mt-4">
                        <div className="flex items-center gap-10">
                            {!hasRecorded ? (
                                <button
                                    onClick={() => setIsRecording(true)}
                                    disabled={isRecording}
                                    className={`group relative w-36 h-36 rounded-full flex items-center justify-center transition-all active:scale-95 ${isRecording ? 'bg-slate-200 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-400 shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:shadow-[0_25px_50px_rgba(14,165,233,0.4)]'}`}
                                >
                                    <Mic size={64} className={`text-white transition-all ${isRecording ? 'scale-75 opacity-50' : 'group-hover:scale-110'}`} />
                                    {!isRecording && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-20" />
                                            <div className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-10 delay-300" />
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="flex items-center gap-8 animate-in zoom-in duration-300">
                                    <button 
                                        onClick={() => { setHasRecorded(false); setSttProgress(-1); }}
                                        className="w-24 h-24 bg-white rounded-[24px] flex items-center justify-center text-slate-400 hover:text-sky-500 shadow-xl border-2 border-slate-50 transition-all hover:scale-110"
                                    >
                                        <RotateCw size={40} />
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        className="px-16 h-28 bg-green-500 hover:bg-green-400 text-white rounded-[32px] font-black text-4xl shadow-[0_20px_40px_rgba(34,197,94,0.3)] flex items-center gap-4 transition-all hover:scale-105 active:scale-95"
                                    >
                                        NEXT <ChevronRight size={44} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={() => {}} 
                            className="flex items-center gap-3 text-slate-400 hover:text-sky-500 font-bold text-xl transition-colors"
                        >
                            <Volume2 size={24} /> Listen to Ami
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[200] bg-sky-500/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-8 animate-in fade-in zoom-in duration-500">
                    <div className="relative mb-8">
                        <Sparkles className="w-32 h-32 text-yellow-300 animate-bounce" />
                        <div className="absolute inset-0 animate-ping bg-yellow-300/30 rounded-full" />
                    </div>
                    <h2 className="text-7xl font-black mb-4 drop-shadow-lg text-center">AWESOME!</h2>
                    <p className="text-3xl font-bold opacity-90 mb-12 text-center">You've completed your adventure!</p>
                    <button 
                        onClick={onClose}
                        className="px-16 py-8 bg-white text-sky-600 rounded-[40px] font-black text-4xl shadow-2xl hover:scale-110 active:scale-95 transition-all"
                    >
                        GO HOME
                    </button>
                </div>
            )}
        </div>
    );
};

export default TalkSection;
