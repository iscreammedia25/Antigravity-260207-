import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ChevronRight, Volume2, Check } from 'lucide-react';

interface OnboardingProps {
    onComplete: () => void;
    onClose: () => void;
}

const CATEGORIES = [
    { id: 'Fairy Tales', icon: '🏰' },
    { id: 'Heroes', icon: '🦸' },
    { id: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'Friends & School', icon: '🏫' },
    { id: 'Me & Growing Up', icon: '🌱' },
    { id: 'Animals', icon: '🦁' },
    { id: 'Nature', icon: '🌳' },
    { id: 'Sports & Hobbies', icon: '⚽' },
    { id: 'Arts & Music', icon: '🎨' },
    { id: 'Science & Technology', icon: '🚀' },
    { id: 'Space', icon: '🪐' },
    { id: 'World & History', icon: '🗺️' }
];

const MOODS = [
    { id: 'Fun', icon: '😂' },
    { id: 'Adventure', icon: '🏕️' },
    { id: 'Warm', icon: '☕' },
    { id: 'Calm', icon: '😌' },
    { id: 'Brave', icon: '🦁' },
    { id: 'Proud', icon: '🥇' },
    { id: 'Inspiring', icon: '✨' },
    { id: 'Serious', icon: '🤔' },
    { id: 'Touching', icon: '🥺' },
    { id: 'Challenge', icon: '🧗' }
];

const CHARACTERS = [
    { id: 'Brave Hero', icon: '🦸‍♂️' },
    { id: 'Kind Friend', icon: '🤝' },
    { id: 'Funny Friend', icon: '🤡' },
    { id: 'Curious Explorer', icon: '🔍' },
    { id: 'Creative Artist', icon: '🧑‍🎨' },
    { id: 'Smart Inventor', icon: '💡' },
    { id: 'Animal Friend', icon: '🐶' },
    { id: 'Quiet Thinker', icon: '🧘' },
    { id: 'Strong Player', icon: '🏋️' },
    { id: 'Magical Character', icon: '🧙' }
];

const LEVEL_TESTS = [
    {
        targets: [
            { word: 'book', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop' },
            { word: 'rabbit', image: 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e3258?q=80&w=800&auto=format&fit=crop' },
            { word: 'castle', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop' },
            { word: 'instrument', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop' }
        ],
        distractors: ['sun', 'kitchen', 'crown', 'waterfall']
    },
    {
        targets: [
            { word: 'run', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop' },
            { word: 'smile', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop' },
            { word: 'bridge', image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=800&auto=format&fit=crop' },
            { word: 'trophy', image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?q=80&w=800&auto=format&fit=crop' }
        ],
        distractors: ['eat', 'climb', 'party', 'competition']
    },
    {
        targets: [
            { word: 'boy', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop' },
            { word: 'friend', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop' },
            { word: 'uniform', image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?q=80&w=800&auto=format&fit=crop' },
            { word: 'inventor', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop' }
        ],
        distractors: ['baby', 'teacher', 'glasses', 'scientist']
    }
];

export default function Onboarding({ onComplete, onClose }: OnboardingProps) {
    const [step, setStep] = useState(0); // 0 to 5
    
    // Taste States
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
    const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

    // Level States
    const [levelAnswers, setLevelAnswers] = useState<Record<number, string[]>>({ 1: [], 3: [], 5: [] });
    const [reviewStep, setReviewStep] = useState(3);

    // Shuffle words only once per level step
    const currentLevelTest = useMemo(() => {
        if (step === 1) return LEVEL_TESTS[0];
        if (step === 3) return LEVEL_TESTS[1];
        if (step === 5) return LEVEL_TESTS[2];
        return null;
    }, [step]);

    // Generate options once per step
    const currentOptions = useMemo(() => {
        if (!currentLevelTest) return [];
        const allWords = [...currentLevelTest.targets.map(t => t.word), ...currentLevelTest.distractors];
        return allWords.sort(() => Math.random() - 0.5);
    }, [currentLevelTest]);

    const handleTasteSelection = (item: string, currentSelected: string[], setFunction: (val: string[]) => void) => {
        if (currentSelected.includes(item)) {
            setFunction(currentSelected.filter(i => i !== item));
        } else {
            setFunction([...currentSelected, item]);
        }
    };

    const handleNext = () => {
        if (step === 5) {
            onComplete();
        } else {
            setStep(prev => prev + 1);
        }
    };

    const renderNavigation = (canProceed: boolean) => {
        const isLastStep = step === 5;
        const currentAnswers = levelAnswers[step] || [];
        const isLevelComplete = currentAnswers.length >= 4;
        
        let nextBtnClass = 'text-[#0f172a] hover:text-[#f97316] hover:translate-x-1 active:scale-95';
        if (!canProceed) nextBtnClass = 'opacity-30 cursor-not-allowed text-slate-400';
        else if (isLastStep && isLevelComplete) nextBtnClass = 'text-[#f97316] hover:text-orange-500 animate-pulse scale-110 active:scale-95 drop-shadow-md';

        return (
            <div className="flex items-center justify-between w-full max-w-md mx-auto mt-6 px-4">
                {/* Back Button */}
                <button 
                    onClick={() => setStep(prev => Math.max(0, prev - 1))}
                    className={`flex items-center gap-2 font-black text-lg transition-all duration-300 ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-600 active:scale-95'}`}
                >
                    <i data-lucide="chevron-left" className="w-6 h-6"></i> BACK
                </button>

                {/* Dots */}
                <div className="flex items-center justify-center gap-3">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <div 
                            key={i} 
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${step === i ? 'bg-[#f97316] scale-150' : step > i ? 'bg-[#fdba74]' : 'bg-orange-100'}`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button 
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`flex items-center gap-2 font-black text-lg transition-all duration-300 ${nextBtnClass}`}
                >
                    {isLastStep ? 'DONE' : 'NEXT'} <i data-lucide={isLastStep ? "check" : "chevron-right"} className="w-6 h-6"></i>
                </button>
            </div>
        );
    };

    const renderTasteStep = (
        title: string, 
        items: {id: string, icon: string}[], 
        selectedItems: string[], 
        setFunction: (val: string[]) => void
    ) => {
        const canProceed = selectedItems.length > 0;

        return (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto w-full px-4 pt-12">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 font-fredoka mb-4 flex items-center justify-center gap-3">
                        {title}
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-xl text-slate-500 font-bold">
                        <span>Select all you like!</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                    {items.map((item) => {
                        const isSelected = selectedItems.includes(item.id);

                        return (
                            <button
                                type="button"
                                key={item.id}
                                onClick={() => handleTasteSelection(item.id, selectedItems, setFunction)}
                                className={`
                                    relative p-6 rounded-[24px] flex flex-col items-center justify-center gap-4 transition-all duration-300
                                    ${isSelected ? 'bg-white border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)] scale-[1.02] z-10' : 
                                      'bg-white border-2 border-slate-100 hover:border-sky-200 hover:bg-sky-50 shadow-sm'}
                                `}
                            >
                                <div className="text-5xl mb-2">{item.icon}</div>
                                <span className={`font-black text-lg text-center font-fredoka leading-tight ${isSelected ? 'text-sky-600' : 'text-slate-600'}`}>
                                    {item.id}
                                </span>
                                {isSelected && (
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white shadow-md">
                                        <Check className="w-5 h-5 stroke-[3]" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
                
                <div className="mt-12 flex flex-col items-center w-full">
                    {renderNavigation(canProceed)}
                </div>
            </div>
        );
    };

    const renderLevelStep = () => {
        if (!currentLevelTest) return null;

        const currentAnswers = levelAnswers[step] || [];
        const isComplete = currentAnswers.length >= 4;
        const activeIndex = isComplete ? reviewStep : currentAnswers.length;
        const currentTarget = currentLevelTest.targets[activeIndex];
        const selectedWord = isComplete ? currentAnswers[reviewStep] : null;

        const handleWordClick = (word: string) => {
            const newAnswers = [...currentAnswers, word];
            setLevelAnswers(prev => ({ ...prev, [step]: newAnswers }));
            if (newAnswers.length === 4) {
                setReviewStep(3);
            }
        };

        return (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-right duration-500 max-w-5xl mx-auto w-full px-4 pt-12 pb-24">
                <div className="text-center mb-8 w-full flex flex-col items-center justify-center gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 font-fredoka flex items-center justify-center gap-3">
                        Choose the right word!
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        {isComplete && (
                            <button onClick={() => setReviewStep(Math.max(0, reviewStep - 1))} disabled={reviewStep === 0} className="p-2 hover:bg-slate-200 rounded-full disabled:opacity-30 transition-all">
                                <i data-lucide="chevron-left" className="w-5 h-5 text-slate-600"></i>
                            </button>
                        )}
                        <div className="px-5 py-1.5 bg-slate-100 rounded-full font-bold text-slate-500 text-lg">
                            {activeIndex + 1} / 4
                        </div>
                        {isComplete && (
                            <button onClick={() => setReviewStep(Math.min(3, reviewStep + 1))} disabled={reviewStep === 3} className="p-2 hover:bg-slate-200 rounded-full disabled:opacity-30 transition-all">
                                <i data-lucide="chevron-right" className="w-5 h-5 text-slate-600"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Center Image Area */}
                <div className="w-full md:w-[calc(50%-0.5rem)] aspect-video md:aspect-[4/3] relative bg-slate-100 rounded-[32px] overflow-hidden shadow-xl mb-10 border-4 border-white transition-all duration-300 mx-auto">
                    {currentTarget ? (
                        <img 
                            key={currentTarget.word} 
                            src={currentTarget.image} 
                            className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500" 
                            alt="flashcard" 
                        />
                    ) : (
                        <div className="absolute inset-0 bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                    {/* Celebration Overlay */}
                    {step === 5 && isComplete && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md animate-in fade-in duration-700 pointer-events-none">
                            <div className="text-5xl md:text-7xl font-black text-amber-500 drop-shadow-[0_0_20px_rgba(255,255,255,1)] animate-bounce flex flex-col items-center gap-4">
                                🎉 Fantastic! 🎉
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom: Word Options */}
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeIndex}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        {currentOptions.map((word) => {
                            const isSelected = selectedWord === word;
                            
                            return (
                                <button
                                    type="button"
                                    key={word}
                                    onClick={() => handleWordClick(word)}
                                    disabled={isComplete}
                                    className={`
                                        py-6 rounded-2xl font-black text-2xl font-fredoka tracking-wider transition-all duration-200
                                        ${isComplete 
                                            ? (isSelected ? 'bg-sky-50 border-2 border-sky-400 text-sky-600 shadow-sm scale-105 z-10' : 'bg-white border-2 border-slate-100 text-slate-300 opacity-60 cursor-default')
                                            : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50 hover:-translate-y-1 shadow-sm active:scale-95'
                                        }
                                    `}
                                >
                                    {word}
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                <div className="mt-10 flex flex-col items-center w-full">
                    {/* Skip / Don't Know button */}
                    {isComplete ? (
                        selectedWord === 'UNKNOWN' ? (
                            <div className="px-8 py-3 rounded-full font-bold bg-slate-100 text-slate-400 border-2 border-slate-200 mb-6">
                                Skipped 🤔
                            </div>
                        ) : <div className="h-12 mb-6"></div> // spacer
                    ) : (
                        <button 
                            type="button"
                            onClick={() => handleWordClick('UNKNOWN')}
                            className="px-8 py-3 rounded-full font-bold text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors mb-6"
                        >
                            I don't know 🤔
                        </button>
                    )}

                    {renderNavigation(isComplete)}
                </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-[#fffdf8] z-[100000] flex flex-col overflow-y-auto font-fredoka">
            {/* Minimal Header */}
            <div className="absolute top-6 right-6 z-50">
                <button onClick={onClose} className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                    <span className="font-black">X</span>
                </button>
            </div>

            {step === 0 && renderTasteStep('What stories do you like?', CATEGORIES, selectedCategories, setSelectedCategories)}
            {step === 1 && renderLevelStep()}
            {step === 2 && renderTasteStep('What mood are you looking for?', MOODS, selectedMoods, setSelectedMoods)}
            {step === 3 && renderLevelStep()}
            {step === 4 && renderTasteStep('Who is your favorite character?', CHARACTERS, selectedCharacters, setSelectedCharacters)}
            {step === 5 && renderLevelStep()}
        </div>
    );
}
