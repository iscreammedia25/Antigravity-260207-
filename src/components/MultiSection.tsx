import React from 'react';
import { ChevronRight, Play, Film, Headphones, Video } from 'lucide-react';

interface MultiSectionProps {
    onNavigate?: (tab: string) => void;
}

const MEDIA_DUMMY = [
    { id: 'm1', title: 'Hans in Luck Movie', type: 'Movie Book', color: 'bg-indigo-500', icon: Film, duration: '01:54', src: './public/Image/Cover/CS0003(Hans in Luck).png' },
    { id: 'm2', title: 'Hans in Luck Audio', type: 'Audio Book', color: 'bg-rose-500', icon: Headphones, duration: '05:30', src: './public/Image/Cover/CS0003(Hans in Luck).png' },
    { id: 'm3', title: 'The Rainbow Cloud in the Box', type: 'Vocab', color: 'bg-amber-500', icon: Video, duration: '02:15', src: './public/Image/Cover/OG0050(The Rainbow Cloud in the Box).png' },
    { id: 'm4', title: 'The Rainbow Cloud Movie', type: 'Movie Book', color: 'bg-indigo-500', icon: Film, duration: '01:54', src: './public/Image/Cover/OG0050(The Rainbow Cloud in the Box).png' },
    { id: 'm5', title: 'Milo and the Lost Color Audio', type: 'Audio Book', color: 'bg-rose-500', icon: Headphones, duration: '04:20', src: './public/Image/Cover/OG0021(Milo and the Lost Color).png' },
];

const MultiSection: React.FC<MultiSectionProps> = ({ onNavigate }) => {
    const handleNavigation = (tab: string) => {
        if (onNavigate) onNavigate(tab);
    };

    return (
        <div className="w-full bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-100/50">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
                        <Video className="w-5 h-5 text-indigo-500 fill-current" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 font-jua">Media Box</h3>
                </div>
                <button 
                    onClick={() => handleNavigation('All Media')}
                    className="flex items-center gap-2 px-5 py-2 bg-slate-50 text-slate-500 font-black rounded-full text-xs hover:bg-slate-100 hover:text-slate-800 transition-all group"
                >
                    SEE ALL <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Horizontal Slider */}
            <div className="relative">
                <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
                    {MEDIA_DUMMY.map((media) => (
                        <div 
                            key={media.id}
                            className="group shrink-0 w-[280px] md:w-[320px] transition-all cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video rounded-[28px] overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all border-4 border-white">
                                <img 
                                    src={media.src} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100" 
                                    alt="" 
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                
                                {/* Overlay Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <Play className="w-6 h-6 text-slate-900 fill-current ml-1" />
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-black text-white/90 tracking-tighter">
                                    {media.duration}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-1 space-y-2">
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 ${media.color} bg-opacity-10 rounded-full`}>
                                    <media.icon className={`w-3 h-3 ${media.color.replace('bg-', 'text-')}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${media.color.replace('bg-', 'text-')}`}>{media.type}</span>
                                </div>
                                <h4 className="font-black text-slate-700 text-lg line-clamp-1 group-hover:text-indigo-600 transition-colors">{media.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional side gradients for scroll indication */}
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default MultiSection;
