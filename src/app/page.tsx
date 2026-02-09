'use client';

import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import LibrarySection from '@/components/LibrarySection';
import LearningMode from '@/components/LearningMode';
import { BOOKS_DATA, Book } from '@/data/books';

export default function Home() {
    const userName = "Ami";
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isLearningMode, setIsLearningMode] = useState(false);

    const startLearning = (book: Book) => {
        console.log("Start Learning:", book.title);
        // alert("Starting learning mode for: " + book.title);
        setCurrentBook(book);
        setIsLearningMode(true);
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 border-[12px] border-slate-200">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-yellow-300 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ami" alt="User Avatar" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-gray-800 tracking-tight">{userName} (7y)</h1>
                            <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Online & Learning
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors border-2 border-gray-50"><Bell /></button>
                        <button className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors border-2 border-gray-50"><Menu /></button>
                    </div>
                </header>

                {/* Hero Section */}
                <HeroSection userName={userName} onStartLearning={startLearning} />

                {/* Library Section - Expanded */}
                <div className="w-full">
                    <LibrarySection userName={userName} onStartLearning={startLearning} />
                </div>
            </div>

            {/* Learning Mode Overlay */}
            {isLearningMode && currentBook && (
                <LearningMode
                    book={currentBook}
                    onClose={() => setIsLearningMode(false)}
                />
            )}
        </main>
    );
}
