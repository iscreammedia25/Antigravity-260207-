import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Play, Square, SkipBack, SkipForward, Settings, Volume2, Lock, CheckCircle2, Video, BookOpen, HelpCircle, MessageCircle, ChevronLeft, ChevronRight, Book as BookIcon, Sparkles, Bell, Menu, Check } from 'lucide-react';
import { Book } from '../data/books';
import { ReadingMode, ReadStep, SceneData, BookMeta, LearningPhase } from '../types/learning';
import { MOCK_BOOK_META, MOCK_SCENES_DATA } from '../data/mockData';
import { convertDriveLink } from '../utils/googleDrive';
import { updateReadingProgress } from '../utils/storage';

type Phase = LearningPhase;

interface LearningModeProps {
    book: Book;
    onClose: () => void;
    initialPhase?: Phase;
    initialUnlockedPhases?: Phase[];
}

const LearningMode: React.FC<LearningModeProps> = ({
    book,
    onClose,
    initialPhase = 'watch',
    initialUnlockedPhases = ['watch']
}) => {
    const [currentPhase, setCurrentPhase] = useState<Phase>(initialPhase);
    const [isGnbVisible, setIsGnbVisible] = useState(true);
    const [isPhaseMenuOpen, setIsPhaseMenuOpen] = useState(false);
    const [unlockedPhases, setUnlockedPhases] = useState<Phase[]>(initialUnlockedPhases);
    const [isActive, setIsActive] = useState(false);

    // Reading Phase State
    const [readStep, setReadStep] = useState<ReadStep>('selection');
    const [readingMode, setReadingMode] = useState<ReadingMode | null>(null);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [maxReachedSceneIndex, setMaxReachedSceneIndex] = useState(0);
    const [isScenePickerOpen, setIsScenePickerOpen] = useState(false);
    const [showSelectionPopup, setShowSelectionPopup] = useState(false);
    const [filteredScenes, setFilteredScenes] = useState<SceneData[]>([]);

    // [NEW] Praise & Selection State
    const [showPraise, setShowPraise] = useState(false);
    const [showSceneSelect, setShowSceneSelect] = useState(false);
    const [selectedScenes, setSelectedScenes] = useState<number[]>([0]);

    // Video Player State
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);

    // [NEW] Audio System
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playingSentenceIndex, setPlayingSentenceIndex] = useState<number | null>(null);
    const [isSceneAudioPlaying, setIsSceneAudioPlaying] = useState(false);

    const playFullSceneAudio = () => {
        const scene = filteredScenes[currentSceneIndex];
        if (!scene || !scene.full_audio) return;

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(scene.full_audio);
        audioRef.current = audio;
        setIsSceneAudioPlaying(true);
        setPlayingSentenceIndex(null);

        audio.play().catch(err => console.error("Audio play failed:", err));
        audio.onended = () => setIsSceneAudioPlaying(false);
    };

    const playSentenceAudio = (index: number) => {
        const scene = filteredScenes[currentSceneIndex];
        if (!scene) return;

        // Note: For Silent Stick, each scene has one sentence. 
        // We'll use the full_audio for now as there are no separate sentence files.
        // If they existed, we'd use a naming pattern like _01, _02 etc.
        const audioUrl = scene.full_audio;

        if (!audioUrl) return;

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        setPlayingSentenceIndex(index);
        setIsSceneAudioPlaying(false);

        audio.play().catch(err => console.error("Sentence audio play failed:", err));
        audio.onended = () => setPlayingSentenceIndex(null);
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setPlayingSentenceIndex(null);
        setIsSceneAudioPlaying(false);
    };

    // Stop audio when changing scenes
    useEffect(() => {
        stopAudio();
    }, [currentSceneIndex]);

    // Auto-unlock scenes when reaching them
    useEffect(() => {
        if (currentSceneIndex > maxReachedSceneIndex) {
            setMaxReachedSceneIndex(currentSceneIndex);
        }
    }, [currentSceneIndex, maxReachedSceneIndex]);

    const gnbTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            console.log(`[VideoLoad] Book: ${book.id}, URL: ${book.videoUrl}`);
            videoRef.current.load();
        }
    }, [book.videoUrl, book.id]);

    useEffect(() => {
        // Trigger slide-up animation
        const timer = setTimeout(() => setIsActive(true), 10);
        return () => clearTimeout(timer);
    }, []);


    const getTextPositionClass = (index: number) => {
        console.log(`[DEBUG] Scene Index: ${index}`);
        switch (index) {
            case 0: // SC01
                return "top-8 left-8 md:top-16 md:left-16 text-left items-start";
            case 1: // SC02
            case 2: // SC03
            case 4: // SC05
                return "top-8 right-8 md:top-16 md:right-16 text-left items-start";
            case 3: // SC04
                return "bottom-24 right-8 md:bottom-32 md:right-16 text-left items-start";
            case 5: // SC06
            case 6: // SC07
            case 7: // SC08
                return "bottom-24 left-8 md:bottom-32 md:left-16 text-left items-start";
            case 8: // SC09
                return "top-1/2 -translate-y-1/2 left-24 md:left-32 text-left items-start";
            default:
                return "top-8 left-8 md:top-16 md:left-16 text-left items-start";
        }
    };

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
        updateReadingProgress(book.id, 'watch', true);
        // Auto-show selection popup as requested
        setShowSelectionPopup(true);
    };

    // Prepare data for reading
    useEffect(() => {
        if (currentPhase === 'read') {
            // Filter by current book id (or sample id for testing)
            const targetId = book.id === 'rainbow-cloud' ? '0001_lv4' : book.id;
            const scenes = MOCK_SCENES_DATA
                .filter(s => s.book_id === targetId)
                .sort((a, b) => {
                    if (a.scene_no === '#Cover') return -1;
                    if (b.scene_no === '#Cover') return 1;
                    return a.scene_no.localeCompare(b.scene_no);
                });
            setFilteredScenes(scenes);
            setCurrentSceneIndex(0);
            setMaxReachedSceneIndex(0); // Reset for new book
        }
    }, [currentPhase, book.id]);

    useEffect(() => {
        if (currentPhase === 'read' && readStep === 'viewing') {
            if (currentSceneIndex > maxReachedSceneIndex) {
                setMaxReachedSceneIndex(currentSceneIndex);
            }
        }
    }, [currentSceneIndex, currentPhase, readStep, maxReachedSceneIndex]);

    // [NEW] Fetch Text from File (Data Folder)
    const [fetchedScript, setFetchedScript] = useState<string>('');

    useEffect(() => {
        if (readStep === 'viewing' && filteredScenes[currentSceneIndex]) {
            const scene = filteredScenes[currentSceneIndex];
            // Derive Fetch URL from Image URL: /Image/... -> /Data/... .png -> .txt
            // Example: /Image/Book/OG_0001.../SC01.png -> /Data/Book/OG_0001.../SC01.txt
            const textUrl = scene.image_url
                .replace('/Image/', '/Data/')
                .replace('.png', '.txt')
                .replace('.jpg', '.txt');

            console.log(`[DEBUG] Fetching script from: ${textUrl}`);

            fetch(textUrl)
                .then(res => res.text())
                .then(text => {
                    if (text && !text.includes('<!DOCTYPE html>')) { // Avoid HTML error pages
                        console.log(`[DEBUG] Fetched text: ${text.substring(0, 20)}...`);
                        setFetchedScript(text);
                    } else {
                        console.warn('[DEBUG] Failed to fetch text or got HTML');
                        setFetchedScript(scene.script || ''); // Fallback
                    }
                })
                .catch(err => {
                    console.error('[DEBUG] Fetch error:', err);
                    setFetchedScript(scene.script || '');
                });
        }
    }, [currentSceneIndex, readStep, filteredScenes]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex flex-col select-none overflow-hidden transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
            {/* DEBUG OVERLAY */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: 200, height: 100, background: 'red', zIndex: 9999, color: 'white', fontWeight: 'bold', padding: 10 }}>
                DEBUG MODE ACTIVE<br />
                Phase: {currentPhase}<br />
                Step: {readStep}<br />
                Scene: {currentSceneIndex}<br />
                Fetched: {fetchedScript ? 'YES' : 'NO'}
            </div>

            {/* Layer 2: GNB & Controls (z-50) */}
            <div className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out ${isGnbVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <nav
                    className="h-24 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 flex items-center justify-between px-8 shadow-xl relative"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#FF6B00] shadow-inner">
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
                                className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl border-2 transition-colors font-fredoka font-bold bg-orange-50 border-orange-100 text-[#FF6B00]`}
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
                                                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all ${isActivePhase ? 'bg-orange-50 text-[#FF6B00]' : 'hover:bg-slate-50'} ${!isUnlocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActivePhase ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                        {phase === 'watch' && <Video size={20} />}
                                                        {phase === 'read' && <BookOpen size={20} />}
                                                        {phase === 'quiz' && <HelpCircle size={20} />}
                                                        {phase === 'speak' && <MessageCircle size={20} />}
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
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-10 bg-white border-b-4 border-x-4 border-slate-50 rounded-b-[32px] flex items-center justify-center text-slate-300 hover:text-orange-400 shadow-lg transition-all active:h-12 pointer-events-auto"
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
                                key={book.videoUrl}
                                ref={videoRef}
                                className="w-full h-full object-contain"
                                src={book.videoUrl}
                                autoPlay
                                playsInline
                                onPlay={handlePlay}
                                onEnded={handleVideoEnd}
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            >
                                Your browser does not support the video tag.
                            </video>

                            {/* [NEW] Read Next Action Button (After Video Ends) */}
                            {showNextButton && (
                                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
                                    <button
                                        onClick={() => {
                                            setCurrentPhase('read');
                                            setShowSelectionPopup(true);
                                            setReadStep('selection');
                                        }}
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

                {/* Read Phase - Logic-driven Flow */}
                {
                    currentPhase === 'read' && (
                        <div className="w-full h-full flex flex-col relative overflow-hidden">
                            {/* Background Layer: E-Book Image or Intro BG */}
                            {readStep === 'viewing' && filteredScenes[currentSceneIndex] ? (
                                <img
                                    src={filteredScenes[currentSceneIndex].image_url.startsWith('http') ? convertDriveLink(filteredScenes[currentSceneIndex].image_url) : filteredScenes[currentSceneIndex].image_url}
                                    alt="scene"
                                    referrerPolicy="no-referrer"
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                                />
                            ) : (
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                                    style={{
                                        backgroundImage: `url(${convertDriveLink(MOCK_BOOK_META.cover_url)})`,
                                        filter: 'brightness(0.3) blur(8px)'
                                    }}
                                />
                            )}

                            {/* Step 1: Mode Selection Popup (Thematic Backdrop) */}
                            {readStep === 'selection' && (
                                <div className="relative z-10 flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
                                    <div className="absolute inset-0">
                                        <img
                                            src="/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC01.png"
                                            alt="scene-bg"
                                            className="w-full h-full object-cover opacity-60 brightness-75"
                                        />
                                        <div className="absolute inset-0 bg-black/40" />
                                    </div>

                                    <div className="relative z-20 w-full max-w-4xl bg-white rounded-[48px] shadow-2xl p-12 flex flex-col items-center gap-12">
                                        <div className="flex gap-8 w-full">
                                            <button
                                                onClick={() => setReadingMode('ebook')}
                                                className={`flex-1 group transition-all duration-300`}
                                            >
                                                <div className={`aspect-[4/3] bg-slate-50 rounded-[32px] p-8 border-4 transition-all flex flex-col items-center justify-center gap-6 group-hover:bg-sky-50 outline-none
                                                ${readingMode === 'ebook' ? 'border-sky-400 bg-sky-50 shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'border-slate-100 group-hover:border-sky-200'}`}>
                                                    <div className="w-full h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden relative border-4 border-white px-4">
                                                        <img
                                                            src="/UI/Ebook.png"
                                                            alt="E-book"
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://img.icons8.com/color/144/storybook.png';
                                                            }}
                                                        />
                                                    </div>
                                                    <h3 className="text-3xl font-black text-slate-800 font-fredoka">E-book</h3>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setReadingMode('interactive')}
                                                className={`flex-1 group transition-all duration-300`}
                                            >
                                                <div className={`aspect-[4/3] bg-slate-50 rounded-[32px] p-8 border-4 transition-all flex flex-col items-center justify-center gap-6 group-hover:bg-sky-50 outline-none
                                                ${readingMode === 'interactive' ? 'border-sky-400 bg-sky-50 shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'border-slate-100 group-hover:border-sky-200'}`}>
                                                    <div className="w-full h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform overflow-hidden relative border-4 border-white px-4">
                                                        <img
                                                            src="/UI/Anibook.png"
                                                            alt="Ani-book"
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://img.icons8.com/color/144/dragon.png';
                                                            }}
                                                        />
                                                    </div>
                                                    <h3 className="text-3xl font-black text-slate-800 font-fredoka">Ani-book</h3>
                                                </div>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setReadStep('intro')}
                                            disabled={!readingMode}
                                            className="w-full h-20 bg-slate-900 text-white rounded-[24px] text-2xl font-black shadow-xl hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
                                        >
                                            OK
                                        </button>
                                        <p className="text-slate-400 font-bold">* You <span className="underline decoration-slate-300">can't change the mode</span> while reading.</p>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Intro Preview Screen */}
                            {readStep === 'intro' && (
                                <div className="relative z-10 flex-1 flex flex-col animate-in fade-in duration-500">
                                    <div className="absolute inset-0">
                                        <img src="/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC01.png" alt="scene-bg" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="absolute top-20 left-1/2 -translate-x-1/2 px-16 py-6 bg-white/70 backdrop-blur-md rounded-[32px] shadow-2xl border-4 border-white/20">
                                        <h1 className="text-7xl font-black text-slate-900 font-fredoka tracking-tight">{book.title}</h1>
                                    </div>

                                    <div className="absolute bottom-12 left-12 w-[580px] bg-white/70 backdrop-blur-md rounded-[48px] shadow-2xl p-12 flex flex-col gap-6 border-4 border-white/30">
                                        <div className="flex gap-4">
                                            <span className="px-5 py-2 bg-white rounded-2xl text-slate-900 font-black text-xl border-2 border-slate-200 uppercase tracking-tight">{readingMode}</span>
                                            <span className="px-5 py-2 bg-white rounded-2xl text-slate-900 font-black text-xl border-2 border-slate-200 uppercase tracking-tight">Lexile {book.lexile}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-slate-900 text-[2.2rem] font-black leading-tight">
                                                "{filteredScenes[0]?.script?.substring(0, 100)}..."
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-3 mt-2">
                                            <div className="flex items-center gap-3">
                                                <span className="px-4 py-1.5 bg-sky-100 text-sky-600 rounded-xl font-black text-sm uppercase">Keywords</span>
                                            </div>
                                            <p className="text-slate-600 font-black text-xl leading-relaxed">
                                                {book.keywords.join(', ')}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setReadStep('viewing')}
                                        className="absolute bottom-12 right-12 px-24 h-28 bg-white rounded-[40px] flex items-center justify-center text-slate-900 text-5xl font-black font-fredoka shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all border-8 border-white group"
                                    >
                                        START
                                    </button>
                                </div>
                            )}

                            {/* Step 3: Viewing Viewer (Shared Overlay) */}
                            {readStep === 'viewing' && (
                                <div className="relative flex-1 flex flex-col">
                                    {/* Shared Text Overlay */}
                                    {filteredScenes[currentSceneIndex] && (
                                        <div className={`absolute z-50 p-12 max-w-[1400px] transition-all duration-500 ease-in-out flex items-start gap-8 pointer-events-none ${getTextPositionClass(currentSceneIndex).replace('items-start', '').replace('items-end', '')} ${getTextPositionClass(currentSceneIndex).includes('left-') ? 'ml-32' : ''} ${getTextPositionClass(currentSceneIndex).includes('right-') ? 'mr-32' : ''}`}>
                                            {/* Play Button - Scene-wide */}
                                            {/* Play Button - Scene-wide (Redesigned) */}
                                            {/* Play Button - Scene-wide (Redesigned) */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); playFullSceneAudio(); }}
                                                className={`mt-40 w-14 h-14 bg-[#FF6B00] rounded-full shadow-[0_4px_15px_rgba(255,107,0,0.5)] flex items-center justify-center text-white hover:bg-[#FF8500] hover:scale-110 active:scale-95 transition-all pointer-events-auto flex-shrink-0 ${isSceneAudioPlaying ? 'ring-4 ring-orange-300' : ''}`}
                                            >
                                                <Play size={28} fill="currentColor" className="ml-1" />
                                            </button>

                                            <div className="flex-1 pointer-events-auto">
                                                <p className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] font-fredoka whitespace-pre-line ${getTextPositionClass(currentSceneIndex).includes('text-right') ? 'text-right' : 'text-left'}`}>
                                                    {(fetchedScript || filteredScenes[currentSceneIndex].script).split(/(?<=[.!?]) +/).map((sentence, idx) => (
                                                        <span
                                                            key={idx}
                                                            onClick={(e) => { e.stopPropagation(); playSentenceAudio(idx); }}
                                                            className={`cursor-pointer hover:text-orange-300 transition-all inline-block mr-4 mb-3 ${playingSentenceIndex === idx ? 'text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.9)] scale-105' : ''}`}
                                                        >
                                                            {sentence}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Bottom-Center Dot Pagination Button */}
                                    {!isScenePickerOpen && (
                                        <button
                                            onClick={() => setIsScenePickerOpen(true)}
                                            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-black/40 backdrop-blur-3xl rounded-full border border-white/20 z-40 hover:scale-105 active:scale-95 transition-all group"
                                        >
                                            <div className="text-white group-hover:text-[#FF6B00] transition-colors">
                                                <ChevronUp size={24} />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {filteredScenes.map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSceneIndex ? 'bg-[#FF6B00] scale-150 shadow-[0_0_12px_#FF6B00]' : 'bg-white/40 group-hover:bg-white/60'}`}
                                                    />
                                                ))}
                                            </div>
                                        </button>
                                    )}

                                    {/* Navigation Buttons (Floating) */}
                                    <div className="absolute inset-y-0 inset-x-8 flex items-center justify-between pointer-events-none">
                                        <button
                                            disabled={currentSceneIndex === 0}
                                            onClick={() => {
                                                setCurrentSceneIndex(prev => prev - 1);
                                                setIsScenePickerOpen(false);
                                            }}
                                            className={`w-24 h-24 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border-2 border-white/20 pointer-events-auto transition-all active:scale-90 ${currentSceneIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
                                        >
                                            <ChevronLeft size={64} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (currentSceneIndex < filteredScenes.length - 1) {
                                                    setCurrentSceneIndex(prev => prev + 1);
                                                    setIsScenePickerOpen(false);
                                                } else {
                                                    setShowPraise(true);
                                                }
                                            }}
                                            className="w-24 h-24 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-900 border-2 border-white pointer-events-auto transition-all active:scale-90 shadow-2xl"
                                        >
                                            <ChevronRight size={64} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Shared Scene Picker Overlay */}
                            {isScenePickerOpen && (
                                <>
                                    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={() => setIsScenePickerOpen(false)} />
                                    <div className="absolute bottom-0 inset-x-0 bg-black/95 backdrop-blur-3xl border-t-2 border-white/10 z-[70] p-12 transition-all duration-500 animate-in slide-in-from-bottom flex flex-col gap-8">
                                        <button
                                            onClick={() => setIsScenePickerOpen(false)}
                                            className="w-full flex justify-center group"
                                        >
                                            <div className="bg-white/10 rounded-full px-12 py-3 border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-all">
                                                <ChevronDown size={32} className="text-white" />
                                                <span className="text-white font-black uppercase tracking-widest text-xl">Close Picker</span>
                                            </div>
                                        </button>
                                        <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x pt-4">
                                            {filteredScenes.map((scene, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setCurrentSceneIndex(idx);
                                                        setIsScenePickerOpen(false);
                                                    }}
                                                    className={`relative flex-shrink-0 w-72 aspect-video rounded-3xl overflow-hidden snap-start transition-all duration-300 ${idx === currentSceneIndex ? 'ring-6 ring-orange-500 scale-105 shadow-[0_0_50px_rgba(255,107,0,0.6)] z-10' : 'opacity-50 hover:opacity-100 ring-2 ring-white/10'}`}
                                                >
                                                    <img src={scene.image_url} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                                    <div className="absolute bottom-4 left-6 text-white font-black text-xl">Scene {String(idx + 1).padStart(2, '0')}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                }

                {
                    currentPhase !== 'watch' && currentPhase !== 'read' && (
                        <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
                            <div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center text-slate-300">
                                {currentPhase === 'quiz' && <HelpCircle size={64} />}
                                {currentPhase === 'speak' && <MessageCircle size={64} />}
                            </div>
                            <h2 className="text-4xl font-black text-slate-300 font-jua">Coming Soon!</h2>
                            <button
                                onClick={(e: React.MouseEvent) => { e.stopPropagation(); setCurrentPhase('watch'); }}
                                className="text-sky-400 font-bold flex items-center gap-2 hover:underline"
                            >
                                <Video size={20} /> Back to Watch
                            </button>
                        </div>
                    )
                }
                {/* [NEW] Praise Overlay (Read Complete) */}
                {showPraise && (
                    <div
                        className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-500 cursor-pointer"
                        onClick={() => {
                            setShowPraise(false);
                            setShowSceneSelect(true);
                        }}
                    >
                        <div className="relative flex flex-col items-center justify-center animate-in zoom-in-50 duration-500">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-yellow-400/30 blur-[100px] rounded-full"></div>

                            {/* Praise Badge Image */}
                            <img src="/UI/praise_badge.png" alt="Great! Let's speak" className="w-[600px] h-auto object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-300" />

                            <p className="mt-8 text-white text-2xl font-fredoka font-bold animate-pulse">Click to continue</p>
                        </div>
                    </div>
                )}

                {/* [NEW] Scene Selection Modal (Speak) */}
                {showSceneSelect && (
                    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
                        <div className="bg-white rounded-[40px] p-8 w-[90%] max-w-5xl shadow-2xl animate-in slide-in-from-bottom-10 duration-500 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowSceneSelect(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <X size={32} className="text-slate-400" />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-black text-slate-800 font-fredoka mb-2">Scenes you want to Read Aloud</h2>
                                <div className="flex items-center justify-center gap-2">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <div
                                            className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors ${selectedScenes.length === filteredScenes.length ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-300 text-transparent'}`}
                                            onClick={() => {
                                                if (selectedScenes.length === filteredScenes.length) {
                                                    setSelectedScenes([]);
                                                } else {
                                                    setSelectedScenes(filteredScenes.map((_, i) => i));
                                                }
                                            }}
                                        >
                                            <Check size={16} />
                                        </div>
                                        <span className="text-slate-500 font-bold text-lg">All</span>
                                    </label>
                                </div>
                            </div>

                            {/* Scene Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto p-2">
                                {filteredScenes.map((scene, idx) => {
                                    const isSelected = selectedScenes.includes(idx);
                                    return (
                                        <div key={idx} className="relative group cursor-pointer" onClick={() => {
                                            if (isSelected) {
                                                setSelectedScenes(prev => prev.filter(i => i !== idx));
                                            } else {
                                                setSelectedScenes(prev => [...prev, idx]);
                                            }
                                        }}>
                                            <div className={`aspect-video bg-slate-100 rounded-xl overflow-hidden border-4 transition-all duration-200 ${isSelected ? 'border-orange-500 ring-4 ring-orange-200' : 'border-slate-200 group-hover:border-orange-300'}`}>
                                                <img src={scene.image_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />

                                                {/* Checkbox Overlay */}
                                                <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 ${isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300 bg-white text-transparent'}`}>
                                                    <Check size={20} strokeWidth={3} />
                                                </div>

                                                {/* Scene Label */}
                                                <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-center py-1 text-sm font-bold backdrop-blur-sm">
                                                    Scene {idx + 1}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer Action */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => {
                                        if (selectedScenes.length === 0) {
                                            alert("Please select at least one scene!");
                                            return;
                                        }
                                        setShowSceneSelect(false);
                                        // Set phase to 'speak' instead of 'quiz'
                                        setCurrentPhase('speak');
                                        if (!unlockedPhases.includes('speak')) {
                                            setUnlockedPhases(prev => [...prev, 'speak']);
                                            updateReadingProgress(book.id, 'read', true);
                                        }
                                    }}
                                    className="px-16 py-4 bg-white border-4 border-slate-200 text-slate-700 rounded-full text-2xl font-black font-fredoka hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-xl hover:shadow-orange-200 active:scale-95"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
};

export default LearningMode;
