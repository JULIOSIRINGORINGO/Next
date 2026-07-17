'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TranslatedText from '@/components/TranslatedText';
import AchievementDetailModal from '@/components/AchievementDetailModal';

interface Achievement {
    id: string;
    title: string;
    description: string;
    issuer: string;
    date: string;
    image_url: string;
    category: string;
    credential_id?: string;
    credential_url?: string;
    type?: string;
}

interface AchievementsClientProps {
    achievements: Achievement[];
    profile: any;
}

export default function AchievementsClient({ achievements, profile }: AchievementsClientProps) {
    const t = useTranslations();
    const [selected, setSelected] = useState<Achievement | null>(null);

    return (
        <div className="py-12 md:py-16 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold flex items-center gap-3">
                        <Award className="w-8 h-8 text-accent" /> {t('achievements.title')}
                    </h1>
                    <p className="text-lg text-black dark:text-white font-bold max-w-xl">
                        {t('achievements.subtitle')}
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {achievements.map((item, i) => {
                        const isPdf = item.image_url?.toLowerCase().endsWith('.pdf');
                        const hasImage = !!item.image_url;

                        return (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative glass-card border-slate-200 dark:border-white/10 overflow-hidden hover:border-accent transition-all duration-500 flex flex-col cursor-pointer"
                                onClick={() => setSelected(item)}
                            >
                                <div className="absolute top-4 right-4 z-10">
                                    <TranslatedText
                                        text={item.category}
                                        as="span"
                                        className="px-3 py-1 rounded-full bg-accent backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest inline-block"
                                    />
                                </div>

                                <div className="relative h-36 md:h-44 overflow-hidden bg-white/30 dark:bg-black/20 border-b border-slate-200 dark:border-white/10 group-hover:bg-white/40 dark:group-hover:bg-black/30 backdrop-blur-sm transition-colors">
                                    {hasImage && !isPdf ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                            <Award className="w-12 h-12 text-accent" />
                                            {isPdf && <span className="text-[10px] font-bold uppercase tracking-widest">{t('achievements.pdf_certificate')}</span>}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 md:p-5 space-y-3">
                                    <div className="space-y-1">
                                        <TranslatedText text={item.title} as="h3" className="font-bold text-base md:text-lg group-hover:text-accent transition-colors line-clamp-1" />
                                        {item.issuer && (
                                            <p className="text-accent font-bold text-xs flex items-center gap-1.5">
                                                <ShieldCheck className="w-3.5 h-3.5" /> <TranslatedText text={item.issuer} />
                                            </p>
                                        )}
                                    </div>

                                    <TranslatedText text={item.description} as="p" className="text-black dark:text-white text-xs font-bold leading-relaxed line-clamp-2" />

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-black dark:text-white">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {item.date ? new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <AchievementDetailModal
                isOpen={!!selected}
                onClose={() => setSelected(null)}
                achievement={selected}
            />
        </div>
    );
}
