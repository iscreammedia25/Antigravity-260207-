import React, { useState, useRef, useEffect } from 'react';
import { X, Video, Play, Square, SkipBack, SkipForward, Volume2, Settings, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { Book } from '../data/books';

interface WatchSectionProps {
    book: Book;
    onNext: () => void;
    onClose: () => void;
}

const WatchSection: React.FC<WatchSectionProps> = ({ book, onNext, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);
    const [isGnbVisible, setIsGnbVisible] = useState(true);
    const gnbTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetGnbTimer = () => {
        setIsGnbVisible(true);
        if (gnbTimeoutRef.current) clearTimeout(gnbTimeoutRef.current);
        gnbTimeoutRef.current = setTimeout(() => {
            if (videoRef.current && !videoRef.current.paused) {
                setIsGnbVisible(false);
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
        videoRef.current?.pause(); // Ensure it's paused
    };

    const cyclePlaybackSpeed = () => {
        const speeds = [0.5, 1, 1.5, 2];
        const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
        const nextSpeed = speeds[nextIndex];
        setPlaybackSpeed(nextSpeed);
        if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col select-none overflow-hidden animate-in slide-in-from-bottom duration-500">
            {/* Nav / GNB */}
            <div className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out ${isGnbVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <nav className="h-24 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 flex items-center justify-between px-8 shadow-xl relative">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#FF6B00] shadow-inner">
                            <Video size={28} fill="currentColor" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-700 font-jua truncate max-w-[300px]">
                            {book.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={onClose}
                            className="w-14 h-14 bg-slate-50 rounded-2xl border-4 border-white flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsGnbVisible(!isGnbVisible)}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-10 bg-white border-b-4 border-x-4 border-slate-50 rounded-b-[32px] flex items-center justify-center text-slate-300 hover:text-orange-400 shadow-lg transition-all"
                    >
                        {isGnbVisible ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center bg-black relative" onClick={resetGnbTimer}>
                <div className="w-full h-full max-w-screen-2xl p-4 flex flex-col gap-6">
                    <div className="relative flex-1 bg-black rounded-[24px] overflow-hidden group/player min-h-[60vh]">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            src={book.videoUrl}
                            autoPlay
                            playsInline
                            onPlay={handlePlay}
                            onEnded={handleVideoEnd}
                            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                        />

                        {showNextButton && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
                                <button
                                    onClick={onNext}
                                    className="group relative px-12 py-5 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-4 border-4 border-orange-400"
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="text-slate-400 text-sm font-black uppercase tracking-widest">Great Watching!</span>
                                        <span className="text-slate-900 text-3xl font-black font-fredoka uppercase">Read Next</span>
                                    </div>
                                    <div className="w-14 h-14 bg-sky-400 rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg">
                                        <ChevronRight size={40} strokeWidth={3} />
                                    </div>
                                </button>
                            </div>
                        )}

                        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center z-20 transition-all duration-300 pointer-events-none ${isPlaying ? 'opacity-0 group-hover/player:opacity-100' : 'opacity-100'}`}>
                            <button
                                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/30 shadow-2xl hover:scale-110 active:scale-95 transition-all group pointer-events-auto"
                            >
                                {isPlaying ? <Square size={64} fill="currentColor" /> : <Play size={64} fill="currentColor" className="ml-2" />}
                            </button>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <button onClick={(e) => { e.stopPropagation(); handleSeek(-3); }} className="text-white hover:text-sky-400 transition-colors active:scale-90"><SkipBack size={32} fill="currentColor" /></button>
                                    <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 active:scale-95 transition-all">
                                        {isPlaying ? <Square size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); handleSeek(3); }} className="text-white hover:text-sky-400 transition-colors active:scale-90"><SkipForward size={32} fill="currentColor" /></button>
                                </div>

                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); cyclePlaybackSpeed(); }}
                                        className="h-10 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-black transition-all border border-white/20 shadow-lg active:scale-95"
                                    >
                                        Speed: {playbackSpeed}x
                                    </button>
                                    <button className="text-white hover:text-sky-400 transition-colors" onClick={(e) => e.stopPropagation()}><Volume2 size={24} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-24 flex items-center justify-end px-4 z-[60]">
                        {showNextButton && (
                            <button
                                onClick={onNext}
                                className="px-12 py-6 bg-[#FF6B00] text-white rounded-3xl font-black text-2xl flex items-center gap-4 shadow-xl shadow-orange-200 animate-twinkle hover:scale-105 active:scale-95 transition-all"
                            >
                                Read Next <ChevronRight size={32} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchSection;
