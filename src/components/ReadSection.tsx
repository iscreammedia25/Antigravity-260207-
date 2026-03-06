import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Play, Book as BookIcon, Check, Video, BookOpen, HelpCircle, MessageCircle, Settings, Volume2, Mic } from 'lucide-react';
import { Book } from '../data/books';
import { ReadingMode, ReadStep, SceneData } from '../types/learning';
import { MOCK_BOOK_META, MOCK_SCENES_DATA } from '../data/mockData';
import { convertDriveLink } from '../utils/googleDrive';

interface ReadSectionProps {
    book: Book;
    onClose: () => void;
}

const ReadSection: React.FC<ReadSectionProps> = ({ book, onClose }) => {
    const [readStep, setReadStep] = useState<ReadStep>('selection');
    const [readingMode, setReadingMode] = useState<ReadingMode | null>(null);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isScenePickerOpen, setIsScenePickerOpen] = useState(false);
    const [filteredScenes, setFilteredScenes] = useState<SceneData[]>([]);
    const [fetchedScript, setFetchedScript] = useState<string>('');
    const [isGnbVisible, setIsGnbVisible] = useState(true);
    const gnbTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetGnbTimer = () => {
        setIsGnbVisible(true);
        if (gnbTimeoutRef.current) clearTimeout(gnbTimeoutRef.current);
        gnbTimeoutRef.current = setTimeout(() => {
            if (audioRef.current && !audioRef.current.paused) {
                setIsGnbVisible(false);
            }
        }, 3000);
    };

    useEffect(() => {
        if (readStep === 'viewing') {
            resetGnbTimer();
        }
        return () => {
            if (gnbTimeoutRef.current) clearTimeout(gnbTimeoutRef.current);
        };
    }, [readStep]);

    // Settings State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [narrationOn, setNarrationOn] = useState(false);
    const [pageTurnOn, setPageTurnOn] = useState(false);
    const [narrationSpeed, setNarrationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
    const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playingSentenceIndex, setPlayingSentenceIndex] = useState<number | null>(null);
    const [isSceneAudioPlaying, setIsSceneAudioPlaying] = useState(false);
    const [maxReachedSceneIndex, setMaxReachedSceneIndex] = useState(0);
    const [showPraise, setShowPraise] = useState(false);
    const [unlockedReadAloudScenes, setUnlockedReadAloudScenes] = useState<Set<number>>(new Set());
    const unlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isReadAloudUnlocked = unlockedReadAloudScenes.has(currentSceneIndex);

    // Difficulty State
    const [difficulty, setDifficulty] = useState<'Easy' | 'Original' | 'Difficult'>('Original');
    const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
    const [isTextFading, setIsTextFading] = useState(false);

    const handleDifficultyChange = (newDiff: 'Easy' | 'Original' | 'Difficult') => {
        setIsTextFading(true);
        setIsDifficultyOpen(false);
        setTimeout(() => {
            setDifficulty(newDiff);
            setIsTextFading(false);
        }, 300);
    };

    const getDisplayScript = () => {
        const text = fetchedScript || filteredScenes[currentSceneIndex]?.script || '';
        if (difficulty === 'Easy') return `[Easy]\n${text}`;
        if (difficulty === 'Difficult') return `[Difficult]\n${text}`;
        return text;
    };

    useEffect(() => {
        if (readStep === 'viewing' && !narrationOn) {
            setUnlockedReadAloudScenes(prev => new Set(prev).add(currentSceneIndex));
        }
        return () => {
            if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
        };
    }, [currentSceneIndex, readStep, narrationOn]);

    useEffect(() => {
        const targetId = book.id === 'rainbow-cloud' ? '0001_lv4' : book.id;
        const scenes = MOCK_SCENES_DATA
            .filter(s => s.book_id === targetId)
            .sort((a, b) => {
                if (a.scene_no === '#Cover') return -1;
                if (b.scene_no === '#Cover') return 1;
                return a.scene_no.localeCompare(b.scene_no);
            });
        setFilteredScenes(scenes);
    }, [book.id]);

    // Auto-play audio on scene change
    useEffect(() => {
        if (readStep === 'viewing' && narrationOn && !isSettingsOpen) {
            playFullSceneAudio();
        }
    }, [currentSceneIndex, readStep]);

    useEffect(() => {
        if (readStep === 'viewing') {
            if (currentSceneIndex > maxReachedSceneIndex) {
                setMaxReachedSceneIndex(currentSceneIndex);
            }
        }
    }, [currentSceneIndex, readStep, maxReachedSceneIndex]);

    useEffect(() => {
        if (readStep === 'viewing' && filteredScenes[currentSceneIndex]) {
            const scene = filteredScenes[currentSceneIndex];
            const textUrl = scene.image_url
                .replace('/Image/', '/Data/')
                .replace('.png', '.txt')
                .replace('.jpg', '.txt');

            fetch(textUrl)
                .then(res => res.text())
                .then(text => {
                    if (text && !text.includes('<!DOCTYPE html>')) {
                        setFetchedScript(text);
                    } else {
                        setFetchedScript(scene.script || '');
                    }
                })
                .catch(() => {
                    setFetchedScript(scene.script || '');
                });
        }
    }, [currentSceneIndex, readStep, filteredScenes]);

    const playFullSceneAudio = () => {
        const scene = filteredScenes[currentSceneIndex];
        if (!scene || !scene.full_audio) return;
        if (audioRef.current) audioRef.current.pause();
        if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);

        // If narration is off, we still pause but don't start new audio
        if (!narrationOn) {
            setIsSceneAudioPlaying(false);
            setUnlockedReadAloudScenes(prev => new Set(prev).add(currentSceneIndex));
            return;
        }

        const audio = new Audio(scene.full_audio);
        audioRef.current = audio;

        // Apply playback speed
        const playbackRate = narrationSpeed === 'slow' ? 0.75 : narrationSpeed === 'fast' ? 1.5 : 1.0;
        audio.playbackRate = playbackRate;

        // Unlock Read Aloud
        const currentIdx = currentSceneIndex;
        if (!unlockedReadAloudScenes.has(currentIdx)) {
            audio.addEventListener('loadedmetadata', () => {
                const fastDurationMs = (audio.duration / 1.5) * 1000;
                unlockTimeoutRef.current = setTimeout(() => {
                    setUnlockedReadAloudScenes(prev => new Set(prev).add(currentIdx));
                }, fastDurationMs);
            });
        }

        setIsSceneAudioPlaying(true);
        setPlayingSentenceIndex(null);
        resetGnbTimer(); // Hide GNB when audio starts
        audio.play().catch(err => console.error("Audio play failed:", err));
        audio.onended = () => {
            setIsSceneAudioPlaying(false);
            setIsGnbVisible(true); // Show GNB back when done
            setUnlockedReadAloudScenes(prev => new Set(prev).add(currentSceneIndex));

            // Auto-advance logic
            if (pageTurnOn) {
                if (currentSceneIndex < filteredScenes.length - 1) {
                    setCurrentSceneIndex(prev => prev + 1);
                } else {
                    setShowPraise(true);
                }
            }
        };
    };

    const playSentenceAudio = (index: number) => {
        if (!narrationOn) return;
        const scene = filteredScenes[currentSceneIndex];
        if (!scene || !scene.full_audio) return;
        if (audioRef.current) audioRef.current.pause();
        const audio = new Audio(scene.full_audio);
        audioRef.current = audio;

        // Apply playback speed
        const playbackRate = narrationSpeed === 'slow' ? 0.75 : narrationSpeed === 'fast' ? 1.5 : 1.0;
        audio.playbackRate = playbackRate;

        setPlayingSentenceIndex(index);
        setIsSceneAudioPlaying(false);
        resetGnbTimer();
        audio.play().catch(err => console.error("Sentence audio play failed:", err));
        audio.onended = () => {
            setPlayingSentenceIndex(null);
            setIsGnbVisible(true);
        };
    };

    const getTextPositionClass = (index: number) => {
        switch (index) {
            case 0: return "top-8 left-8 md:top-16 md:left-16 text-left items-start";
            case 1: case 2: case 4: return "top-8 right-8 md:top-16 md:right-16 text-left items-start";
            case 3: return "bottom-24 right-8 md:bottom-32 md:right-16 text-left items-start";
            case 5: case 6: case 7: return "bottom-24 left-8 md:bottom-32 md:left-16 text-left items-start";
            case 8: return "top-1/2 -translate-y-1/2 left-24 md:left-32 text-left items-start";
            default: return "top-8 left-8 md:top-16 md:left-16 text-left items-start";
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col select-none overflow-hidden animate-in slide-in-from-bottom duration-500">
            {/* GNB */}
            <div className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out ${isGnbVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <nav className="h-24 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 flex items-center justify-between px-8 shadow-xl relative">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#FF6B00] shadow-inner">
                            <BookOpen size={28} />
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

                    {/* GNB Handle */}
                    <button
                        onClick={() => setIsGnbVisible(!isGnbVisible)}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-10 bg-white border-b-4 border-x-4 border-slate-50 rounded-b-[32px] flex items-center justify-center text-slate-300 hover:text-orange-400 shadow-lg transition-all z-50 pointer-events-auto"
                    >
                        {isGnbVisible ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </button>
                </nav>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Layer */}
                {readStep === 'viewing' && filteredScenes[currentSceneIndex] ? (
                    <img
                        src={filteredScenes[currentSceneIndex].image_url.startsWith('http') ? convertDriveLink(filteredScenes[currentSceneIndex].image_url) : filteredScenes[currentSceneIndex].image_url}
                        alt="scene"
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

                {/* Selection Step */}
                {readStep === 'selection' && (
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
                        <div className="relative z-20 w-full max-w-4xl bg-white rounded-[48px] shadow-2xl p-12 flex flex-col items-center gap-12">
                            <div className="flex gap-8 w-full">
                                <button onClick={() => { setReadingMode('ebook'); setNarrationOn(false); setPageTurnOn(false); }} className={`flex-1 group transition-all duration-300`}>
                                    <div className={`aspect-[4/3] bg-slate-50 rounded-[32px] p-8 border-4 transition-all flex flex-col items-center justify-center gap-6 ${readingMode === 'ebook' ? 'border-sky-400 bg-sky-50 shadow-lg' : 'border-slate-100'}`}>
                                        <div className="w-full h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border-4 border-white px-4">
                                            <img src="/UI/Ebook.png" alt="E-book" className="w-full h-full object-contain" onError={(e) => (e.target as any).src = 'https://img.icons8.com/color/144/storybook.png'} />
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-800 font-fredoka">E-book</h3>
                                    </div>
                                </button>
                                <button onClick={() => { setReadingMode('interactive'); setNarrationOn(true); setPageTurnOn(true); }} className={`flex-1 group transition-all duration-300`}>
                                    <div className={`aspect-[4/3] bg-slate-50 rounded-[32px] p-8 border-4 transition-all flex flex-col items-center justify-center gap-6 ${readingMode === 'interactive' ? 'border-sky-400 bg-sky-50 shadow-lg' : 'border-slate-100'}`}>
                                        <div className="w-full h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform overflow-hidden relative border-4 border-white px-4">
                                            <img src="/UI/Anibook.png" alt="Ani-book" className="w-full h-full object-contain" onError={(e) => (e.target as any).src = 'https://img.icons8.com/color/144/dragon.png'} />
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-800 font-fredoka">Ani-book</h3>
                                    </div>
                                </button>
                            </div>
                            <button onClick={() => setReadStep('intro')} disabled={!readingMode} className="w-full h-20 bg-slate-900 text-white rounded-[24px] text-2xl font-black shadow-xl hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-30">OK</button>
                        </div>
                    </div>
                )}

                {/* Intro Step */}
                {readStep === 'intro' && (
                    <div className="relative z-10 flex-1 flex flex-col animate-in fade-in duration-500">
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-16 py-6 bg-white/70 backdrop-blur-md rounded-[32px] shadow-2xl border-4 border-white/20">
                            <h1 className="text-7xl font-black text-slate-900 font-fredoka tracking-tight">{book.title}</h1>
                        </div>
                        <div className="absolute bottom-12 left-12 w-[580px] bg-white/70 backdrop-blur-md rounded-[48px] shadow-2xl p-12 flex flex-col gap-6 border-4 border-white/30">
                            <div className="flex gap-4">
                                <span className="px-5 py-2 bg-white rounded-2xl text-slate-900 font-black text-xl border-2 border-slate-200 uppercase">{readingMode}</span>
                                <span className="px-5 py-2 bg-white rounded-2xl text-slate-900 font-black text-xl border-2 border-slate-200 uppercase">Lexile {book.lexile}</span>
                            </div>
                            <p className="text-slate-900 text-[2.2rem] font-black leading-tight">"{filteredScenes[0]?.script?.substring(0, 100)}..."</p>

                            {/* Keywords */}
                            <div className="flex flex-col gap-3 mt-2">
                                <div className="flex items-center gap-3">
                                    <span className="px-4 py-1.5 bg-sky-100 text-sky-600 rounded-xl font-black text-sm uppercase">Keywords</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {book.keywords.map((kw, i) => (
                                        <span key={i} className="text-slate-600 font-black text-xl">#{kw}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setReadStep('viewing')} className="absolute bottom-12 right-12 px-24 h-28 bg-white rounded-[40px] flex items-center justify-center text-slate-900 text-5xl font-black font-fredoka shadow-2xl hover:scale-110 active:scale-95 transition-all border-8 border-white">START</button>
                    </div>
                )}

                {/* Viewing Step */}
                {readStep === 'viewing' && (
                    <div className="relative flex-1 flex flex-col" onClick={resetGnbTimer}>
                        {/* Read Aloud Button */}
                        <div className={`absolute left-12 z-40 transition-all duration-300 ${isGnbVisible ? 'top-[120px]' : 'top-12'}`}>
                            <button
                                disabled={!isReadAloudUnlocked}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (audioRef.current && !audioRef.current.paused) {
                                        audioRef.current.pause();
                                        setIsSceneAudioPlaying(false);
                                    }
                                    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
                                    console.log('Read Aloud Clicked');
                                }}
                                className={`flex items-center gap-3 px-6 py-4 rounded-3xl font-black text-xl shadow-lg transition-all border-4 ${isReadAloudUnlocked ? 'bg-[#FF6B00] text-white border-orange-400' : 'bg-black/40 text-white/50 border-white/10 cursor-not-allowed backdrop-blur-md'}`}
                            >
                                <Mic size={28} />
                                Read Aloud
                            </button>
                        </div>

                        {/* Difficulty Dropdown */}
                        <div className={`absolute right-12 transition-all duration-300 z-[120] ${isGnbVisible ? 'top-[120px]' : 'top-12'}`}>
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDifficultyOpen(!isDifficultyOpen);
                                    }}
                                    className="flex items-center gap-3 px-6 py-4 rounded-3xl font-black text-xl shadow-xl transition-all border-4 bg-white/95 text-slate-800 border-white/20 backdrop-blur-md hover:bg-white active:scale-95 pointer-events-auto"
                                >
                                    <span className="font-fredoka tracking-wide uppercase">{difficulty}</span>
                                    {isDifficultyOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </button>
                                {isDifficultyOpen && (
                                    <div className="absolute top-full mt-3 right-0 w-full bg-white/98 backdrop-blur-xl rounded-[24px] shadow-2xl overflow-hidden border-2 border-slate-100 flex flex-col pointer-events-auto animate-in slide-in-from-top-3 duration-300 z-[121]">
                                        {(['Easy', 'Original', 'Difficult'] as const).filter(d => d !== difficulty).map(d => (
                                            <button
                                                key={d}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDifficultyChange(d);
                                                }}
                                                className="py-4 px-6 text-xl font-black text-slate-600 hover:bg-slate-50 hover:text-orange-500 transition-all text-left font-fredoka uppercase tracking-wide border-b border-slate-50 last:border-0"
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {filteredScenes[currentSceneIndex] && (
                            <div className={`absolute z-50 p-12 max-w-[1400px] transition-all duration-500 flex items-start gap-8 pointer-events-none ${getTextPositionClass(currentSceneIndex).replace('items-start', '').replace('items-end', '')} ${getTextPositionClass(currentSceneIndex).includes('left-') ? 'ml-32' : ''} ${getTextPositionClass(currentSceneIndex).includes('right-') ? 'mr-32' : ''}`}>
                                <button onClick={(e) => { e.stopPropagation(); playFullSceneAudio(); }} className={`mt-40 w-14 h-14 bg-[#FF6B00] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#FF8500] hover:scale-110 transition-all pointer-events-auto flex-shrink-0 ${isSceneAudioPlaying ? 'ring-4 ring-orange-300' : ''}`}>
                                    <Play size={28} fill="currentColor" className="ml-1" />
                                </button>
                                <div className={`flex-1 pointer-events-auto transition-opacity duration-300 ${isTextFading ? 'opacity-0' : 'opacity-100'}`}>
                                    <p className={`font-black text-white leading-[1.3] drop-shadow-2xl font-fredoka whitespace-pre-line ${getTextPositionClass(currentSceneIndex).includes('text-right') ? 'text-right' : 'text-left'} ${textSize === 'small' ? 'text-2xl md:text-3xl lg:text-4xl' :
                                        textSize === 'large' ? 'text-5xl md:text-7xl lg:text-8xl' :
                                            'text-4xl md:text-5xl lg:text-6xl'
                                        }`}>
                                        {getDisplayScript().split(/(?<=[.!?]) +/).map((sentence, idx) => (
                                            <span key={idx} onClick={(e) => { e.stopPropagation(); playSentenceAudio(idx); }} className={`cursor-pointer hover:text-orange-300 transition-all inline-block mr-4 mb-3 ${playingSentenceIndex === idx ? 'text-orange-400 scale-105' : ''}`}>
                                                {sentence}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-y-0 inset-x-8 flex items-center justify-between pointer-events-none">
                            <button disabled={currentSceneIndex === 0} onClick={() => setCurrentSceneIndex(prev => prev - 1)} className={`w-24 h-24 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border-2 border-white/20 pointer-events-auto transition-all ${currentSceneIndex === 0 ? 'opacity-0' : 'opacity-100'}`}>
                                <ChevronLeft size={64} />
                            </button>
                            <button
                                onClick={() => {
                                    if (currentSceneIndex < filteredScenes.length - 1) {
                                        setCurrentSceneIndex(prev => prev + 1);
                                    } else {
                                        setShowPraise(true);
                                    }
                                }}
                                className="w-24 h-24 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-900 border-2 border-white pointer-events-auto transition-all shadow-2xl"
                            >
                                <ChevronRight size={64} />
                            </button>
                        </div>

                        {/* Scene Picker Trigger */}
                        <button
                            onClick={() => setIsScenePickerOpen(!isScenePickerOpen)}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-black/40 backdrop-blur-3xl rounded-full border border-white/20 z-70 hover:scale-105 active:scale-95 transition-all group"
                        >
                            <div className="text-white group-hover:text-[#FF6B00] transition-colors">
                                {isScenePickerOpen ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
                            </div>
                            <div className="flex items-center gap-3">
                                {filteredScenes.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSceneIndex ? 'bg-[#FF6B00] scale-150 shadow-[0_0_12px_#FF6B00]' : 'bg-white/40'}`}
                                    />
                                ))}
                            </div>
                        </button>

                        {/* Scene Picker Overlay */}
                        {isScenePickerOpen && (
                            <div className="absolute bottom-0 inset-x-0 bg-black/95 backdrop-blur-3xl border-t-2 border-white/10 z-[100] p-12 transition-all duration-500 animate-in slide-in-from-bottom flex flex-col gap-8">
                                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x pt-4">
                                    {filteredScenes.map((scene, idx) => {
                                        const isUnlocked = idx <= maxReachedSceneIndex;
                                        return (
                                            <button
                                                key={idx}
                                                disabled={!isUnlocked}
                                                onClick={() => {
                                                    setCurrentSceneIndex(idx);
                                                    setIsScenePickerOpen(false);
                                                }}
                                                className={`relative flex-shrink-0 w-72 aspect-video rounded-3xl overflow-hidden snap-start transition-all duration-300 ${idx === currentSceneIndex ? 'ring-6 ring-orange-500 scale-105 shadow-[0_0_50px_rgba(255,107,0,0.6)] z-10' : 'opacity-40 hover:opacity-100 ring-2 ring-white/10'} ${!isUnlocked ? 'grayscale cursor-not-allowed' : ''}`}
                                            >
                                                <img src={scene.image_url.startsWith('http') ? convertDriveLink(scene.image_url) : scene.image_url} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                                <div className="absolute bottom-4 left-6 text-white font-black text-xl">Scene {String(idx + 1).padStart(2, '0')}</div>
                                                {!isUnlocked && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                                        <BookIcon size={40} className="text-white/40" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Settings Button - Visible for all scenes in viewing phase */}
                        {readStep === 'viewing' && filteredScenes[currentSceneIndex] && (
                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                className="absolute bottom-12 left-12 w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border-2 border-white/20 transition-all active:scale-95 shadow-lg group z-[120]"
                            >
                                <Settings size={32} className="group-hover:rotate-45 transition-transform" />
                            </button>
                        )}

                        {/* Settings Popup - Prototype Style */}
                        {isSettingsOpen && (
                            <div
                                className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-transparent animate-in fade-in duration-300 cursor-pointer"
                                onClick={() => setIsSettingsOpen(false)}
                            >
                                <div
                                    className="bg-black/60 backdrop-blur-md rounded-[60px] p-16 w-full max-w-[560px] border-4 border-white/20 shadow-[0_32px_80px_rgba(0,0,0,0.9)] relative animate-in zoom-in-95 duration-300 pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center mb-12 relative h-12">
                                        <h2 className="text-[42px] font-black text-white font-fredoka w-full text-center drop-shadow-lg">Setting</h2>
                                        <button
                                            onClick={() => setIsSettingsOpen(false)}
                                            className="absolute right-0 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-10">
                                        {/* Narration Toggle */}
                                        <div className="flex justify-between items-center group/item hover:bg-white/5 p-4 rounded-[24px] transition-all">
                                            <span className="text-[28px] font-bold text-white drop-shadow-md font-fredoka uppercase tracking-wider">Narration</span>
                                            <div
                                                onClick={() => {
                                                    const newVal = !narrationOn;
                                                    setNarrationOn(newVal);
                                                    if (newVal) {
                                                        setPageTurnOn(true);
                                                        // Use a slight timeout to ensure state has propagated or just call play function
                                                        // Actually, the useEffect on currentSceneIndex might not trigger if index stays same
                                                        // So we trigger it here if turning on
                                                        setTimeout(() => playFullSceneAudio(), 0);
                                                    } else {
                                                        setPageTurnOn(false);
                                                        if (audioRef.current) audioRef.current.pause();
                                                        setIsSceneAudioPlaying(false);
                                                    }
                                                }}
                                                className={`w-[110px] h-[52px] rounded-[26px] border-2 transition-all duration-500 relative flex items-center px-1 cursor-pointer overflow-hidden ${narrationOn ? 'bg-white border-white shadow-[0_0_25px_rgba(255,255,255,0.4)]' : 'bg-slate-800 border-white/10 shadow-inner'}`}
                                            >
                                                <span className={`text-[15px] font-black uppercase transition-all duration-500 z-10 w-full text-center ${narrationOn ? 'pr-8 text-slate-900' : 'pl-8 text-white/40'}`}>
                                                    {narrationOn ? 'ON' : 'OFF'}
                                                </span>
                                                <div className={`w-[40px] h-[40px] rounded-full absolute shadow-xl transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) z-0 ${narrationOn ? 'translate-x-[60px] bg-slate-900' : 'translate-x-[2px] bg-white'}`} />
                                            </div>
                                        </div>

                                        {/* Page Turn Toggle */}
                                        <div className={`flex justify-between items-center group/item hover:bg-white/5 p-4 rounded-[24px] transition-all ${!narrationOn ? 'opacity-30' : ''}`}>
                                            <span className="text-[28px] font-bold text-white drop-shadow-md font-fredoka uppercase tracking-wider">Page Turn</span>
                                            <div
                                                onClick={() => {
                                                    if (narrationOn) {
                                                        setPageTurnOn(!pageTurnOn);
                                                    }
                                                }}
                                                className={`w-[110px] h-[52px] rounded-[26px] border-2 transition-all duration-500 relative flex items-center px-1 overflow-hidden ${narrationOn ? 'cursor-pointer' : 'cursor-not-allowed'} ${pageTurnOn ? 'bg-white border-white shadow-[0_0_25px_rgba(255,255,255,0.4)]' : 'bg-slate-800 border-white/10 shadow-inner'}`}
                                            >
                                                <span className={`text-[15px] font-black uppercase transition-all duration-500 z-10 w-full text-center ${pageTurnOn ? 'pr-8 text-slate-900' : 'pl-8 text-white/40'}`}>
                                                    {pageTurnOn ? 'ON' : 'OFF'}
                                                </span>
                                                <div className={`w-[40px] h-[40px] rounded-full absolute shadow-xl transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) z-0 ${pageTurnOn ? 'translate-x-[60px] bg-slate-900' : 'translate-x-[2px] bg-white'}`} />
                                            </div>
                                        </div>

                                        {/* Narration Speed */}
                                        <div className={`space-y-6 p-4 rounded-[24px] transition-all ${!narrationOn ? 'opacity-30' : ''}`}>
                                            <span className="text-[28px] font-bold text-white block text-left drop-shadow-md font-fredoka uppercase tracking-wider">Narration Speed</span>
                                            <div className="flex gap-4">
                                                {(['slow', 'normal', 'fast'] as const).map((speed) => (
                                                    <button
                                                        key={speed}
                                                        disabled={!narrationOn}
                                                        onClick={() => setNarrationSpeed(speed)}
                                                        className={`flex-1 py-5 rounded-[20px] font-black text-xl border-2 transition-all duration-300 ${narrationSpeed === speed ? 'bg-white text-slate-900 border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-105' : 'bg-slate-800 text-white/50 border-white/10 hover:border-white/30 hover:text-white'} ${!narrationOn ? 'cursor-not-allowed' : ''}`}
                                                    >
                                                        {speed === 'slow' ? 'Slow' : speed === 'fast' ? 'Fast' : 'Normal'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Text Size */}
                                        <div className="space-y-6">
                                            <span className="text-[30px] font-bold text-white block text-left drop-shadow-md">Text Size</span>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setTextSize('small')}
                                                    className={`flex-1 py-4 rounded-[16px] font-black border-2 transition-all ${textSize === 'small' ? 'bg-white text-black border-white shadow-xl' : 'bg-black text-white border-white/20 hover:border-white/40'}`}
                                                >
                                                    <span className="text-sm">작게</span>
                                                </button>
                                                <button
                                                    onClick={() => setTextSize('medium')}
                                                    className={`flex-1 py-4 rounded-[16px] font-black border-2 transition-all ${textSize === 'medium' ? 'bg-white text-black border-white shadow-xl' : 'bg-black text-white border-white/20 hover:border-white/40'}`}
                                                >
                                                    <span className="text-base">보통</span>
                                                </button>
                                                <button
                                                    onClick={() => setTextSize('large')}
                                                    className={`flex-1 py-4 rounded-[16px] font-black border-2 transition-all ${textSize === 'large' ? 'bg-white text-black border-white shadow-xl' : 'bg-black text-white border-white/20 hover:border-white/40'}`}
                                                >
                                                    <span className="text-xl">크게</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}




                        {/* Praise Overlay */}
                        {showPraise && (
                            <div
                                className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-500 cursor-pointer"
                                onClick={() => {
                                    setShowPraise(false);
                                    onClose();
                                }}
                            >
                                <div className="relative flex flex-col items-center justify-center animate-in zoom-in-50 duration-500">
                                    <div className="absolute inset-0 bg-yellow-400/30 blur-[100px] rounded-full"></div>
                                    <img src="/UI/praise_badge.png" alt="Great! Let's speak" className="w-[600px] h-auto object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-300" />
                                    <p className="mt-8 text-white text-2xl font-fredoka font-bold animate-pulse text-center">Reading Complete!<br />Click to finish</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReadSection;
