'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

const CACHE_KEY = 'app_translations_cache';
const GOOGLE_TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt&t&q=';

let memoryCache: Record<string, string> = {};

const loadCache = (): Record<string, string> => {
    if (Object.keys(memoryCache).length > 0) return memoryCache;
    try {
        const stored = localStorage.getItem(CACHE_KEY);
        if (stored) {
            memoryCache = JSON.parse(stored);
            return memoryCache;
        }
    } catch {}
    return {};
};

const saveCache = (cache: Record<string, string>) => {
    memoryCache = cache;
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {}
};

let isTranslating = false;
const translationQueue: { text: string; resolve: (val: string) => void }[] = [];

const processQueue = async () => {
    if (isTranslating || translationQueue.length === 0) return;
    isTranslating = true;

    const { text, resolve } = translationQueue.shift()!;
    const cache = loadCache();

    if (cache[text]) {
        resolve(cache[text]);
        isTranslating = false;
        processQueue();
        return;
    }

    try {
        const response = await fetch(`${GOOGLE_TRANSLATE_API}${encodeURIComponent(text)}`);
        const data = await response.json();
        let translatedText = '';
        if (data && data[0] && Array.isArray(data[0])) {
            translatedText = data[0].map((segment: any) => segment[0]).join('');
        }
        if (translatedText) {
            cache[text] = translatedText;
            saveCache(cache);
            resolve(translatedText);
        } else {
            resolve(text);
        }
    } catch {
        resolve(text);
    } finally {
        isTranslating = false;
        setTimeout(processQueue, 300);
    }
};

interface TranslatedTextProps {
    text: string | null | undefined;
    className?: string;
    as?: React.ElementType;
    style?: React.CSSProperties;
}

export default function TranslatedText({ text, className = '', as: Component = 'span', style }: TranslatedTextProps) {
    const language = useLocale();
    const [translated, setTranslated] = useState(text || '');
    const [isTranslating, setIsTranslating] = useState(false);

    const translateText = useCallback(async (input: string | null | undefined): Promise<string> => {
        if (!input || input.trim() === '') return '';
        if (language === 'id') return input;
        const cache = loadCache();
        if (cache[input]) return cache[input];
        return new Promise<string>((resolve) => {
            translationQueue.push({ text: input, resolve });
            processQueue();
        });
    }, [language]);

    useEffect(() => {
        let isMounted = true;
        if (!text) { setTranslated(''); return; }
        if (language === 'id') { setTranslated(text); return; }

        const fetchTranslation = async () => {
            setIsTranslating(true);
            try {
                const result = await translateText(text);
                if (isMounted) setTranslated(result);
            } finally {
                if (isMounted) setIsTranslating(false);
            }
        };
        fetchTranslation();
        return () => { isMounted = false; };
    }, [text, language, translateText]);

    return (
        <Component
            className={`${className} ${isTranslating ? 'animate-pulse' : 'transition-colors duration-300'}`}
            style={style}
        >
            {translated}
        </Component>
    );
}
