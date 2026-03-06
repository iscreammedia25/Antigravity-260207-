import React from 'react';
import { Video, Film, Headphones, ChevronRight } from 'lucide-react';

const MultiSection: React.FC = () => {
    return (
        <div className="card-bubble p-6 md:p-8 w-full h-full flex flex-col relative overflow-hidden bg-white shadow-sm border border-slate-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-slate-700 font-jua">
                    Media Box
                </h3>
                <a href="#" className="p-2 bg-sky-50 text-sky-400 font-black btn-jelly text-xs flex items-center gap-1 hover:bg-sky-100 hover:scale-105 active:scale-95 group font-fredoka">
                    SEE ALL <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto w-full pr-2 custom-scrollbar">
                {/* Greeting Item */}
                <button className="w-full bg-slate-50 hover:bg-sky-50 transition-colors rounded-3xl p-4 flex items-center gap-4 text-left group border-2 border-transparent hover:border-sky-100 active:scale-[0.98]">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                        <Video className="w-7 h-7 fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-700 text-lg font-jua truncate">Greeting</p>
                        <p className="text-sm font-bold text-slate-400 truncate mt-0.5">Start your day</p>
                    </div>
                </button>

                {/* Movie Item */}
                <button className="w-full bg-slate-50 hover:bg-sky-50 transition-colors rounded-3xl p-4 flex items-center gap-4 text-left group border-2 border-transparent hover:border-sky-100 active:scale-[0.98]">
                    <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                        <Film className="w-7 h-7 fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-700 text-lg font-jua truncate">Movie</p>
                        <p className="text-sm font-bold text-slate-400 truncate mt-0.5">Fun animations</p>
                    </div>
                </button>

                {/* Audio Item */}
                <button className="w-full bg-slate-50 hover:bg-sky-50 transition-colors rounded-3xl p-4 flex items-center gap-4 text-left group border-2 border-transparent hover:border-sky-100 active:scale-[0.98]">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                        <Headphones className="w-7 h-7 fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-700 text-lg font-jua truncate">Audio</p>
                        <p className="text-sm font-bold text-slate-400 truncate mt-0.5">Listen to stories</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default MultiSection;
