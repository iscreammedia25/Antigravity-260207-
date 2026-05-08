import React from 'react';
import { HelpCircle, ChevronRight, X, Lock } from 'lucide-react';

interface QuizSectionProps {
    onNext: () => void;
    onClose: () => void;
    onSwitchPhase?: (phase: string) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onNext, onClose, onSwitchPhase }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col font-fredoka">
            {/* GNB (Consistency) */}
            <nav className="h-24 bg-white border-b-2 border-slate-100 flex items-center justify-between px-8 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500 shadow-inner">
                        <HelpCircle size={28} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-700 font-jua">Quiz</h1>
                </div>
                <div className="flex bg-slate-100/80 p-1.5 rounded-[22px] border border-white/50 shadow-inner">
                    <button onClick={() => onSwitchPhase?.('word')} className="px-6 py-2.5 text-slate-400 font-black">VOCA</button>
                    <button onClick={() => onSwitchPhase?.('read')} className="px-6 py-2.5 text-slate-400 font-black">READING</button>
                    <button className="px-6 py-2.5 rounded-[18px] bg-white text-purple-500 font-black shadow-sm">QUIZ</button>
                    <button onClick={() => onSwitchPhase?.('speak')} className="px-6 py-2.5 text-slate-400 font-black">TALKING</button>
                </div>
                <button onClick={onClose} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><X size={24} /></button>
            </nav>

            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-purple-50/30">
                <div className="w-full max-w-2xl bg-white rounded-[48px] p-16 shadow-2xl text-center border-4 border-white flex flex-col items-center gap-8">
                    <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-4 animate-bounce">
                        <Lock size={64} />
                    </div>
                    <h2 className="text-5xl font-black text-slate-800">Quiz Phase Coming Soon!</h2>
                    <p className="text-2xl font-bold text-slate-500">Ready to test your knowledge? Let's move to the next stage for now.</p>
                    <button 
                        onClick={onNext}
                        className="mt-8 px-16 h-24 bg-purple-500 hover:bg-purple-400 text-white rounded-[32px] font-black text-3xl shadow-xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95"
                    >
                        GO TO TALKING <ChevronRight size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizSection;
