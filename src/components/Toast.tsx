'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
}

interface ToastContextType {
    showToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => { } });

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const showToast = useCallback((message: string, type: 'success' | 'error') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {mounted && createPortal(
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10001] flex flex-col gap-2 pointer-events-none">
                    <AnimatePresence>
                        {toasts.map((toast) => (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, y: -20, x: 0, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, x: 0, scale: 0.95 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl text-white min-w-[320px] max-w-[90vw] pointer-events-auto ${toast.type === 'success' ? 'bg-accent' : 'bg-red-500'
                                    }`}
                            >
                                {toast.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                ) : (
                                    <XCircle className="w-5 h-5 flex-shrink-0" />
                                )}
                                <span className="text-sm font-medium flex-1">{toast.message}</span>
                                <button onClick={() => removeToast(toast.id)} className="hover:opacity-70">
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};
