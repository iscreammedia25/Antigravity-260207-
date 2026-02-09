import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Play, Square, SkipBack, SkipForward, Settings, Volume2, Lock, CheckCircle2, Video, BookOpen, HelpCircle, MessageCircle, ChevronLeft, ChevronRight, Book as BookIcon, Sparkles } from 'lucide-react';
import { Book } from '../data/books';
import { ReadingMode, ReadStep, SceneData, BookMeta } from '../types/learning';
import { MOCK_BOOK_META, MOCK_SCENES_DATA } from '../data/mockData';

type Phase = 'watch' | 'read' | 'quiz' | 'talk';

interface LearningModeProps {
    book: Book;
    onClose: () => void;
}

const ChevronRight = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const LearningMode: React.FC<LearningModeProps> = ({ book, onClose }) => {
    const [currentPhase, setCurrentPhase] = useState<Phase>('watch');
    const [isGnbVisible, setIsGnbVisible] = useState(true);
    const [isPhaseMenuOpen, setIsPhaseMenuOpen] = useState(false);
    const [unlockedPhases, setUnlockedPhases] = useState<Phase[]>(['watch']);
    const [isActive, setIsActive] = useState(false);

    // Reading Phase State
    const [readStep, setReadStep] = useState<ReadStep>('selection');
    const [readingMode, setReadingMode] = useState<ReadingMode | null>(null);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

    // Video Player State
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);

    const gnbTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Trigger slide-up animation
        const timer = setTimeout(() => setIsActive(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsActive(false);
        setTimeout(onClose, 600);
    };

    // Auto-hide GNB
    const resetGnbTimer = () => {
        setIsGnbVisible(true);
        if (gnbTimeoutRef.current) clearTimeout(gnbTimeoutRef.current);
        gnbTimeoutRef.current = setTimeout(() => {
            if (videoRef.current && !videoRef.current.paused) {
                setIsGnbVisible(false);
                setIsPhaseMenuOpen(false);
            }
        }, 3000);
    };

    useEffect(() => {
        resetGnbTimer();
        return () => {
            if (gnbTimeoutRef.current) clearTimeout(gnbTimeoutRef.current);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsGnbVisible(true);
            } else {
                videoRef.current.play();
                setShowNextButton(false);
                setIsGnbVisible(false);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const handlePlay = () => {
        setIsPlaying(true);
        setShowNextButton(false);
        resetGnbTimer();
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setShowNextButton(true);
        setIsGnbVisible(true);
        if (!unlockedPhases.includes('read')) {
            setUnlockedPhases(prev => [...prev, 'read']);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex flex-col select-none overflow-hidden transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
            {/* Layer 2: GNB & Controls (z-50) */}
            <div className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out ${isGnbVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <nav
                    className="h-24 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 flex items-center justify-between px-8 shadow-xl relative"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 shadow-inner">
                            <Video size={28} fill="currentColor" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-700 font-jua truncate max-w-[300px]">
                            {book.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Phase Dropdown */}
                        <div className="relative">
                            <button
                                onClick={(e: React.MouseEvent) => { e.stopPropagation(); setIsPhaseMenuOpen(!isPhaseMenuOpen); }}
                                className="flex items-center gap-3 px-6 py-2.5 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:bg-slate-100 transition-colors font-fredoka font-bold text-slate-600"
                            >
                                <span className="capitalize">{currentPhase}</span>
                                {isPhaseMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>

                            {isPhaseMenuOpen && (
                                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border-4 border-slate-50 p-2 z-[120] animate-in slide-in-from-top-2 duration-200">
                                    {(['watch', 'read', 'quiz', 'talk'] as Phase[]).map((phase) => {
                                        const isUnlocked = unlockedPhases.includes(phase);
                                        const isActivePhase = currentPhase === phase;
                                        return (
                                            <button
                                                key={phase}
                                                disabled={!isUnlocked}
                                                onClick={() => { setCurrentPhase(phase); setIsPhaseMenuOpen(false); }}
                                                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all ${isActivePhase ? 'bg-sky-50 text-sky-500' : 'hover:bg-slate-50'} ${!isUnlocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActivePhase ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                        {phase === 'watch' && <Video size={20} />}
                                                        {phase === 'read' && <BookOpen size={20} />}
                                                        {phase === 'quiz' && <HelpCircle size={20} />}
                                                        {phase === 'talk' && <MessageCircle size={20} />}
                                                    </div>
                                                    <span className="font-black text-lg capitalize">{phase}</span>
                                                </div>
                                                {!isUnlocked && <Lock size={18} className="text-slate-300" />}
                                                {isUnlocked && phase !== currentPhase && <CheckCircle2 size={18} className="text-green-400" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-14 h-14 bg-slate-50 rounded-2xl border-4 border-white flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    {/* Toggle Handle Button (Sticky when Nav hides) */}
                    <button
                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); setIsGnbVisible(!isGnbVisible); }}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-10 bg-white border-b-4 border-x-4 border-slate-50 rounded-b-[32px] flex items-center justify-center text-slate-300 hover:text-sky-400 shadow-lg transition-all active:h-12 pointer-events-auto"
                    >
                        {isGnbVisible ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </button>
                </nav>
            </div>

            {/* Layer 1: Cinematic Content Area (z-0) */}
            <div
                className="flex-1 flex flex-col items-center justify-center bg-black relative"
            >
                {currentPhase === 'watch' && (
                    <div className="w-full h-full max-w-screen-2xl p-4 flex flex-col gap-6">
                        {/* Video Player Container */}
                        <div className="relative flex-1 bg-black rounded-[24px] overflow-hidden group/player min-h-[60vh]">
                            <video
                                ref={videoRef}
                                src={book.videoUrl}
                                className="w-full h-full object-contain"
                                autoPlay
                                onPlay={handlePlay}
                                onEnded={handleVideoEnd}
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            />

                            {/* YouTube Style Central Play/Pause Overlay */}
                            <div className={`absolute inset-0 bg-black/20 flex items-center justify-center z-20 transition-all duration-300 pointer-events-none ${isPlaying ? 'opacity-0 group-hover/player:opacity-100' : 'opacity-100'}`}>
                                <button
                                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); togglePlay(); }}
                                    className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/30 shadow-2xl hover:scale-110 active:scale-95 transition-all group pointer-events-auto"
                                >
                                    {isPlaying ? <Square size={64} fill="currentColor" /> : <Play size={64} fill="currentColor" className="ml-2" />}
                                </button>
                            </div>

                            {/* Custom Controls Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity flex flex-col gap-6">
                                {/* Progress Bar Placeholder */}
                                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-sky-400 w-1/3 rounded-full" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-8">
                                        <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleSeek(-3); }} className="text-white hover:text-sky-400 transition-colors active:scale-90"><SkipBack size={32} fill="currentColor" /></button>
                                        <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); togglePlay(); }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 active:scale-95 transition-all">
                                            {isPlaying ? <Square size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                                        </button>
                                        <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleSeek(3); }} className="text-white hover:text-sky-400 transition-colors active:scale-90"><SkipForward size={32} fill="currentColor" /></button>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex bg-white/10 rounded-2xl p-1 border border-white/20" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                            {[0.5, 1, 1.5, 2].map(speed => (
                                                <button
                                                    key={speed}
                                                    onClick={() => {
                                                        setPlaybackSpeed(speed);
                                                        if (videoRef.current) videoRef.current.playbackRate = speed;
                                                    }}
                                                    className={`px-4 py-1.5 rounded-xl text-sm font-black transition-all ${playbackSpeed === speed ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
                                                >
                                                    {speed}x
                                                </button>
                                            ))}
                                        </div>
                                        <button className="text-white hover:text-sky-400 transition-colors" onClick={(e) => e.stopPropagation()}><Volume2 size={24} /></button>
                                        <button className="text-white hover:text-sky-400 transition-colors" onClick={(e) => e.stopPropagation()}><Settings size={24} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Next Phase Button (Animated) */}
                        <div className="h-24 flex items-center justify-end px-4 z-[60]">
                            {showNextButton && (
                                <button
                                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); setCurrentPhase('read'); }}
                                    className="px-12 py-6 bg-[#FF6B00] text-white rounded-3xl font-black text-2xl flex items-center gap-4 shadow-xl shadow-orange-200 animate-twinkle hover:scale-105 active:scale-95 transition-all"
                                >
                                    Read Next <ChevronRight size={32} />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Read Phase - 3 Steps Flow */}
                {currentPhase === 'read' && (
                    <div className="w-full h-full flex flex-col relative overflow-hidden">
                        {/* Background Layer: Cover Image (Darkened) */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                            style={{
                                backgroundImage: `url(${MOCK_BOOK_META.cover_url})`,
                                filter: 'brightness(0.3) blur(8px)'
                            }}
                        />

                        {/* Step 1: Mode Selection */}
                        {readStep === 'selection' && (
                            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
                                <h2 className="text-5xl font-black text-white mb-12 font-jua text-center drop-shadow-2xl">
                                    How would you like to read?
                                </h2>
                                <div className="flex gap-8 max-w-5xl w-full">
                                    {/* E-Book Card */}
                                    <button
                                        onClick={() => setReadingMode('ebook')}
                                        className={`flex-1 group relative p-10 rounded-[40px] border-4 transition-all duration-300 ${readingMode === 'ebook' ? 'bg-white border-sky-400 scale-105 shadow-2xl' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                                    >
                                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-colors ${readingMode === 'ebook' ? 'bg-sky-500 text-white' : 'bg-white/20 text-white'}`}>
                                            <BookIcon size={48} />
                                        </div>
                                        <h3 className={`text-3xl font-black mb-4 ${readingMode === 'ebook' ? 'text-slate-800' : 'text-white'}`}>E-Book</h3>
                                        <p className={`text-lg font-medium opacity-80 ${readingMode === 'ebook' ? 'text-slate-600' : 'text-slate-300'}`}>Classic reading experience with clean text.</p>
                                    </button>

                                    {/* Interactive Card */}
                                    <button
                                        onClick={() => setReadingMode('interactive')}
                                        className={`flex-1 group relative p-10 rounded-[40px] border-4 transition-all duration-300 ${readingMode === 'interactive' ? 'bg-white border-orange-400 scale-105 shadow-2xl' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                                    >
                                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-colors ${readingMode === 'interactive' ? 'bg-orange-500 text-white' : 'bg-white/20 text-white'}`}>
                                            <Sparkles size={48} />
                                        </div>
                                        <h3 className={`text-3xl font-black mb-4 ${readingMode === 'interactive' ? 'text-slate-800' : 'text-white'}`}>Interactive</h3>
                                        <p className={`text-lg font-medium opacity-80 ${readingMode === 'interactive' ? 'text-slate-600' : 'text-slate-300'}`}>Read along with voice, images, and fun effects!</p>
                                    </button>
                                </div>

                                <button
                                    disabled={!readingMode}
                                    onClick={() => setReadStep('intro')}
                                    className={`mt-16 px-16 py-6 rounded-3xl font-black text-3xl transition-all ${readingMode ? 'bg-[#FF6B00] text-white shadow-2xl animate-pulse cursor-pointer hover:scale-110 active:scale-95' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                                >
                                    OK
                                </button>
                            </div>
                        )}

                        {/* Step 2: Book Intro */}
                        {readStep === 'intro' && (
                            <div className="relative z-10 flex-1 flex flex-col items-center justify-between p-16 animate-in slide-in-from-bottom-10 duration-700">
                                <div className="w-full max-w-6xl flex flex-col items-center gap-6">
                                    <div className="px-6 py-2 bg-sky-500 text-white rounded-full font-black text-xl shadow-lg">Level {MOCK_BOOK_META.level}</div>
                                    <h2 className="text-7xl font-black text-white text-center font-jua drop-shadow-2xl">{MOCK_BOOK_META.title}</h2>
                                </div>

                                <div className="w-full max-w-7xl flex items-end justify-between gap-12">
                                    <div className="flex-1 bg-black/60 backdrop-blur-xl p-12 rounded-[48px] border-2 border-white/10 flex flex-col gap-8 shadow-2xl">
                                        <div className="flex gap-12 text-white">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sky-300 text-sm font-bold uppercase tracking-widest">Lexile</span>
                                                <span className="text-3xl font-black tracking-tight">{MOCK_BOOK_META.lexile}</span>
                                            </div>
                                            <div className="w-px h-12 bg-white/20" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sky-300 text-sm font-bold uppercase tracking-widest">Words</span>
                                                <span className="text-3xl font-black tracking-tight">{MOCK_BOOK_META.word_count}</span>
                                            </div>
                                        </div>
                                        <p className="text-2xl text-slate-100 font-medium leading-[1.6]">
                                            {MOCK_BOOK_META.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {MOCK_BOOK_META.keywords.map(kw => (
                                                <span key={kw} className="px-4 py-2 bg-white/10 rounded-xl text-sky-200 font-bold border border-white/10">#{kw}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setReadStep('viewing')}
                                        className="w-48 h-48 bg-white text-slate-900 rounded-full flex items-center justify-center font-black text-4xl shadow-2xl hover:scale-110 active:scale-95 transition-all animate-twinkle"
                                    >
                                        START
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Reading Viewer */}
                        {readStep === 'viewing' && (
                            <div className="relative z-10 flex-1 flex flex-col p-8 animate-in fade-in duration-500">
                                <div className="flex-1 flex gap-8 max-w-[1600px] mx-auto w-full">
                                    {/* Left: Image Panel */}
                                    <div className="flex-[1.2] rounded-[48px] overflow-hidden shadow-2xl bg-white/5 border border-white/10 relative group/view">
                                        <img
                                            src={MOCK_SCENES_DATA[currentSceneIndex].image_url}
                                            alt="scene"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                        <div className="absolute bottom-8 left-8 px-6 py-2 bg-black/40 backdrop-blur-md rounded-2xl text-white font-black">
                                            {MOCK_SCENES_DATA[currentSceneIndex].scene_no}
                                        </div>
                                    </div>

                                    {/* Right: Text Panel */}
                                    <div className="flex-1 flex flex-col gap-6">
                                        <div className="flex-1 bg-white rounded-[48px] shadow-2xl p-16 flex flex-col justify-center gap-12">
                                            <p className="text-5xl font-bold text-slate-800 leading-[1.4] tracking-tight">
                                                {MOCK_SCENES_DATA[currentSceneIndex].script}
                                            </p>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-sky-500 transition-all duration-500"
                                                    style={{ width: `${((currentSceneIndex + 1) / MOCK_SCENES_DATA.length) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className="flex gap-4">
                                            <button
                                                disabled={currentSceneIndex === 0}
                                                onClick={() => setCurrentSceneIndex((prev: number) => prev - 1)}
                                                className={`flex-1 h-32 rounded-[32px] border-4 flex items-center justify-center transition-all ${currentSceneIndex === 0 ? 'border-white/5 opacity-20' : 'bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95'}`}
                                            >
                                                <ChevronLeft size={48} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (currentSceneIndex < MOCK_SCENES_DATA.length - 1) {
                                                        setCurrentSceneIndex((prev: number) => prev + 1);
                                                    } else {
                                                        // End of reading - maybe go to Quiz?
                                                        if (!unlockedPhases.includes('quiz')) {
                                                            setUnlockedPhases((prev: Phase[]) => [...prev, 'quiz']);
                                                        }
                                                        setCurrentPhase('quiz');
                                                    }
                                                }}
                                                className="flex-[2] h-32 bg-white text-slate-900 rounded-[32px] flex items-center justify-center font-black text-3xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                                            >
                                                {currentSceneIndex < MOCK_SCENES_DATA.length - 1 ? (
                                                    <span className="flex items-center gap-4">Next Scene <ChevronRight size={32} /></span>
                                                ) : (
                                                    <span className="flex items-center gap-4 text-orange-600">Finish & Quiz <Sparkles size={32} /></span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {currentPhase !== 'watch' && currentPhase !== 'read' && (
                    <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center text-slate-300">
                            {currentPhase === 'read' && <BookOpen size={64} />}
                            {currentPhase === 'quiz' && <HelpCircle size={64} />}
                            {currentPhase === 'talk' && <MessageCircle size={64} />}
                        </div>
                        <h2 className="text-4xl font-black text-slate-300 font-jua">Coming Soon!</h2>
                        <button
                            onClick={(e: React.MouseEvent) => { e.stopPropagation(); setCurrentPhase('watch'); }}
                            className="text-sky-400 font-bold flex items-center gap-2 hover:underline"
                        >
                            <Video size={20} /> Back to Watch
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningMode;
