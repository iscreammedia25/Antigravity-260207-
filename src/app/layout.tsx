import type { Metadata } from 'next';
import { Fredoka, Jua } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-fredoka'
});

const jua = Jua({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-jua'
});

export const metadata: Metadata = {
    title: 'Kids Reading Adventure',
    description: 'A fun English reading adventure for kids!',
};

import OrientationWarning from '@/components/OrientationWarning';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${fredoka.variable} ${jua.variable} font-fredoka bg-[#020617] text-slate-800 flex items-center justify-center min-h-screen overflow-hidden`}>
                {/* Background Depth Effect */}
                <div className="fixed inset-0 z-0 bg-radial-gradient from-slate-900 via-slate-950 to-black opacity-100"
                    style={{ background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)' }}
                />

                <OrientationWarning />

                {/* Physical Tablet Bezel Container */}
                <div className="relative z-10 p-[1.5vh] pb-[2.5vh] bg-[#111827] rounded-[4.5vh] shadow-[0_0_100px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(255,255,255,0.05)] border-[1px] border-white/5 mx-auto max-w-[185vh] max-h-[59vw]">
                    {/* Dark Screen Frame */}
                    <div className="relative rounded-[3.2vh] overflow-hidden bg-white shadow-inner flex items-center justify-center">
                        {/* 16:9 Kiosk Content Shell */}
                        <main
                            id="app-shell"
                            className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-video bg-yellow-50 overflow-hidden flex flex-col"
                        >
                            {children}
                        </main>
                    </div>

                    {/* Subtle Bezel Details: Camera or Button if needed */}
                    <div className="absolute top-[1.5vh] left-1/2 -translate-x-1/2 w-[4vh] h-[0.4vh] bg-white/5 rounded-full" />
                </div>
            </body>
        </html>
    );
}
