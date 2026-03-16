import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, RotateCcw, FastForward, Volume2, VolumeX, ToggleLeft as Toggle, ArrowRight } from 'lucide-react';
import { MediaItem } from '../types/media';

interface UnifiedPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    mediaList: MediaItem[];
    initialIndex: number;
    onMediaChange?: (index: number) => void;
}

const UnifiedPlayer: React.FC<UnifiedPlayerProps> = ({ isOpen, onClose, mediaList, initialIndex, onMediaChange }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showBridge, setShowBridge] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [showEndScreen, setShowEndScreen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const currentMedia = mediaList[currentIndex];
    const isVideo = currentMedia?.type !== 'Audio Book';
    const nextMedia = currentIndex < mediaList.length - 1 ? mediaList[currentIndex + 1] : null;

    useEffect(() => {
        setCurrentIndex(initialIndex);
        setIsPlaying(true);
        setShowEndScreen(false);
        setShowBridge(false);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setIsPlaying(false);
            if (videoRef.current) videoRef.current.pause();
            if (audioRef.current) audioRef.current.pause();
        }
    }, [isOpen]);

    // Handle Media End
    const handleEnd = () => {
        if (isAutoPlay && nextMedia) {
            startBridge();
        } else {
            setShowEndScreen(true);
            setIsPlaying(false);
        }
    };

    const startBridge = () => {
        setShowBridge(true);
        setCountdown(3);
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    playNext();
                    return 3;
                }
                return prev - 1;
            });
        }, 1000);
        timerRef.current = interval;
    };

    const playNext = () => {
        if (nextMedia) {
            setCurrentIndex(prev => prev + 1);
            setShowBridge(false);
            setShowEndScreen(false);
            setIsPlaying(true);
            if (onMediaChange) onMediaChange(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const togglePlay = () => {
        const media = isVideo ? videoRef.current : audioRef.current;
        if (!media) return;

        if (isPlaying) {
            media.pause();
        } else {
            media.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!isOpen || !currentMedia) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center font-fredoka overflow-hidden select-none animate-in fade-in duration-300">
            {/* Background Blur */}
            <div className="absolute inset-0 z-0 opacity-30 blur-3xl scale-110">
                <img src={currentMedia.thumbnail} className="w-full h-full object-cover" alt="" />
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
                <div className="flex flex-col">
                    <span className="text-sky-400 font-black text-sm uppercase tracking-widest">{currentMedia.type}</span>
                    <h2 className="text-white text-2xl font-black font-jua mt-1">{currentMedia.title}</h2>
                </div>

                <div className="flex items-center gap-6">
                    {/* Auto-play Toggle */}
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                        <span className="text-white font-bold text-sm">Auto-play</span>
                        <button 
                            onClick={() => setIsAutoPlay(!isAutoPlay)}
                            className={`w-12 h-6 rounded-full transition-all relative ${isAutoPlay ? 'bg-sky-500' : 'bg-slate-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAutoPlay ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white transition-all active:scale-90"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* Main Content Area (16:9) */}
            <div className="relative w-full aspect-video md:max-w-5xl bg-slate-900 overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={currentMedia.src}
                        className="w-full h-full object-contain"
                        autoPlay={isPlaying}
                        onEnded={handleEnd}
                        onTimeUpdate={(e) => setProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100)}
                        muted={isMuted}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-b from-sky-900/50 to-indigo-950/50">
                        <audio
                            ref={audioRef}
                            src={currentMedia.src}
                            autoPlay={isPlaying}
                            onEnded={handleEnd}
                            onTimeUpdate={(e) => setProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100)}
                            muted={isMuted}
                        />
                        
                        {/* Audio UI: Book Cover with floating animation */}
                        <div className="relative z-10 animate-bounce-slow">
                            <div className="w-64 h-80 bg-white p-3 rounded-[32px] shadow-[0_0_50px_rgba(0,191,255,0.3)] rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                <img src={currentMedia.thumbnail} className="w-full h-full object-cover rounded-[20px]" alt="" />
                            </div>
                            
                            {/* Decorative Sparkles/Musical Notes */}
                            <div className="absolute -top-10 -right-10 w-20 h-20 text-sky-300 opacity-60 animate-pulse">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                            </div>
                        </div>

                        {/* Visualizer Animation */}
                        <div className="absolute bottom-20 flex items-end gap-1.5 h-16">
                            {[...Array(20)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="w-2 bg-sky-400/60 rounded-full"
                                    style={{ 
                                        height: isPlaying ? `${Math.random() * 100 + 10}%` : '5px',
                                        transition: 'height 0.2s ease-in-out',
                                        animation: isPlaying ? `wave 1s ease-in-out infinite ${i * 0.05}s` : 'none'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Bridge UI Overlay */}
                {showBridge && nextMedia && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
                        <div className="flex flex-col items-center bg-white rounded-[48px] p-10 shadow-2xl scale-90 md:scale-100">
                            <div className="relative w-32 h-32 mb-6">
                                {/* Circular Progress */}
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="64" cy="64" r="58" className="stroke-slate-100 fill-none" strokeWidth="12" />
                                    <circle 
                                        cx="64" cy="64" r="58" 
                                        className="stroke-sky-500 fill-none transition-all duration-1000 ease-linear" 
                                        strokeWidth="12" 
                                        strokeDasharray={364.4}
                                        strokeDashoffset={364.4 - (364.4 * (4 - countdown)) / 3}
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-4xl font-black text-slate-800">{countdown}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-500">Next in {countdown}...</h3>
                            <button 
                                onClick={playNext}
                                className="mt-6 flex items-center gap-2 px-8 py-3 bg-sky-500 text-white rounded-2xl font-black hover:bg-sky-600 transition-all active:scale-95 shadow-lg shadow-sky-200"
                            >
                                Play Now <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* End Screen UI Overlay */}
                {showEndScreen && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center animate-in zoom-in duration-300">
                        <div className="bg-white rounded-[56px] p-8 md:p-12 max-w-lg w-full mx-4 shadow-2xl flex flex-col items-center text-center">
                            <p className="text-sky-500 font-extrabold text-sm uppercase tracking-[0.2em] mb-4">Finished Studying!</p>
                            
                            {nextMedia ? (
                                <>
                                    <div className="w-full aspect-video bg-slate-100 rounded-[32px] overflow-hidden mb-6 border-4 border-slate-50 relative group/next">
                                        <img src={nextMedia.thumbnail} className="w-full h-full object-cover" alt="" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-sky-500 shadow-xl">
                                                <Play className="w-8 h-8 fill-current ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-700 font-jua mb-2">Next Content:</h3>
                                    <p className="text-xl font-bold text-slate-500 mb-10">{nextMedia.title}</p>
                                    
                                    <div className="flex gap-4 w-full">
                                        <button 
                                            onClick={onClose}
                                            className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-[28px] font-black text-lg hover:bg-slate-200 transition-all active:scale-95"
                                        >
                                            Close
                                        </button>
                                        <button 
                                            onClick={playNext}
                                            className="flex-[1.5] py-5 bg-sky-500 text-white rounded-[28px] font-black text-lg hover:bg-sky-600 transition-all active:scale-95 shadow-xl shadow-sky-100 flex items-center justify-center gap-3"
                                        >
                                            Play Next <Play className="w-6 h-6 fill-current" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-32 h-32 bg-sky-50 rounded-full flex items-center justify-center text-sky-400 mb-8">
                                        <RotateCcw className="w-16 h-16" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 font-jua mb-10">You've watched everything!</h3>
                                    <button 
                                        onClick={onClose}
                                        className="w-full py-5 bg-sky-500 text-white rounded-[28px] font-black text-xl hover:bg-sky-600 shadow-xl shadow-sky-100"
                                    >
                                        Back to Library
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="mt-10 w-full max-w-5xl px-6 flex flex-col gap-6 z-50">
                {/* Progress Bar */}
                <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-md cursor-pointer border border-white/5">
                    <div 
                        className="absolute h-full bg-gradient-to-r from-sky-400 to-sky-300 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button 
                            onClick={togglePlay}
                            className="w-20 h-20 bg-white text-sky-500 rounded-[28px] flex items-center justify-center shadow-xl hover:scale-105 active:scale-90 transition-all"
                        >
                            {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
                        </button>
                        
                        <div className="flex items-center gap-4 text-white/50">
                            <button className="hover:text-white transition-colors"><RotateCcw className="w-8 h-8" /></button>
                            <button className="hover:text-white transition-colors" onClick={playNext}><FastForward className="w-10 h-10" /></button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        >
                            {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0) rotate(3deg); }
                    50% { transform: translateY(-20px) rotate(-1deg); }
                }
                @keyframes wave {
                    0%, 100% { transform: scaleY(0.5); }
                    50% { transform: scaleY(1.2); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default UnifiedPlayer;
