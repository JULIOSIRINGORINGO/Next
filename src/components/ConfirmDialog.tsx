'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-overlay"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-sm overflow-hidden flex flex-col p-8 glass-modal text-adaptive !mt-0"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl">⚠️</span>
                            <h3 className="text-xl font-bold">{title}</h3>
                        </div>
                        <p className="text-black dark:text-white/80 mb-8 text-sm font-bold leading-relaxed">{message}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={onCancel}
                                className="btn-modal-cancel flex-1"
                            >
                                Batal
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 px-6 py-3 rounded-xl bg-[#ef4444] text-white font-bold hover:bg-[#dc2626] transition-all"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ConfirmDialog;
