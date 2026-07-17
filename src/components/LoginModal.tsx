'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Eye, EyeOff, Lock, X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { useTranslations } from 'next-intl';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const t = useTranslations();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (result?.error) {
                showToast(t('toast.error_auth'), 'error');
            } else {
                showToast(t('toast.login_success'), 'success');
                onClose();
                setEmail('');
                setPassword('');
                router.push('/dashboard');
            }
        } catch {
            showToast(t('toast.error_auth'), 'error');
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-overlay"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-[380px] p-8 flex flex-col glass-modal text-black dark:text-white overflow-hidden"
                    >
                        {/* Close button */}
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors z-10 w-8 h-8 flex items-center justify-center text-black dark:text-white border border-slate-200 dark:border-white/10 shadow-none">
                            <X className="w-4 h-4" />
                        </button>

                        {/* Top Icon */}
                        <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6">
                            <img
                                src="/icon.svg"
                                alt="Logo"
                                className="w-full h-full object-contain dark:invert"
                            />
                        </div>

                        <h2
                            className="text-2xl font-black text-center mb-2 tracking-tight text-black dark:text-white uppercase"
                        >
                            {t('common.login_title')}
                        </h2>
                        <p
                            className="text-xs text-center mb-8 font-bold text-black/50 dark:text-white/50 uppercase tracking-widest"
                        >
                            {t('common.login_subtitle')}
                        </p>

                        <form onSubmit={handleSubmit} className="w-full space-y-4 relative z-10">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black dark:text-white" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-11 !rounded-2xl shadow-none ring-0 focus:ring-0 placeholder:text-black/50 dark:placeholder:text-white/50"
                                    placeholder={t('common.username_placeholder')}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black dark:text-white" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-11 pr-11 !rounded-2xl shadow-none ring-0 focus:ring-0 placeholder:text-black/50 dark:placeholder:text-white/50"
                                    placeholder={t('common.password_placeholder')}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4 text-black dark:text-white" /> : <Eye className="w-4 h-4 text-black dark:text-white" />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-modal-save w-full py-3.5 !rounded-2xl mt-4 shadow-none ring-0 active:scale-95 transition-transform"
                            >
                                {loading ? t('common.loading') : t('common.sign_in')}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default LoginModal;
