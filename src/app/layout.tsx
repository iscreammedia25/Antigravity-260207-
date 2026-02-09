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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${fredoka.variable} ${jua.variable} font-fredoka bg-yellow-50 text-slate-800`}>
                {children}
            </body>
        </html>
    );
}
