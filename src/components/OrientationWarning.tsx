'use client';

import React, { useEffect, useState } from 'react';
import { RotateCw } from 'lucide-react';

export default function OrientationWarning() {
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    if (!isPortrait) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col items-center justify-center p-8 text-center text-white">
            <div className="mb-8 animate-bounce">
                <RotateCw size={80} className="text-yellow-400" />
            </div>
            <h2 className="text-3xl font-black mb-4 font-jua">가로 모드로 돌려주세요!</h2>
            <p className="text-xl font-medium opacity-80 font-fredoka">
                이 앱은 가로 모드(태블릿 환경)에 최적화되어 있습니다.<br />
                기기를 가로로 회전하여 즐거운 학습을 시작하세요.
            </p>
        </div>
    );
}
