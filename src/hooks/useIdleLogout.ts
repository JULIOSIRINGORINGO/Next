'use client';

import { useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 menit

export function useIdleLogout() {
    const { data: session } = useSession();
    const isAuthenticated = !!session;
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const resetTimer = () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                signOut();
            }, IDLE_TIMEOUT);
        };

        // Event yang dianggap aktif
        const events = ['mousedown', 'mousemove', 'keydown',
            'scroll', 'touchstart', 'click'];

        events.forEach(e => window.addEventListener(e, resetTimer));
        resetTimer(); // mulai timer pertama kali

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            events.forEach(e => window.removeEventListener(e, resetTimer));
        };
    }, [isAuthenticated]);
}
