'use client';

import { useRef } from 'react';
import SkillIcon from '@/components/SkillIcon';
import { useTranslations } from 'next-intl';

interface Profile {
    name: string;
    location: string | null;
    work_status: string | null;
    bio_home: string | null;
    avatar_url: string | null;
}

interface Skill {
    id: number;
    name: string;
    iconName: string | null;
    category: string;
}

interface HomeClientProps {
    profile: Profile | null;
    skills: Skill[];
}

const CATEGORY_ORDER = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Database', 'Tools & DevOps', 'Cloud', 'AI'];

function SkillItem({ skill, index }: { skill: Skill; index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            className="animate-fade-in-up"
            style={{ animationDelay: `${Math.min(index * 30, 600)}ms`, animationFillMode: 'both' }}
        >
            <SkillIcon
                name={skill.name}
                iconSlug={skill.iconName || ''}
            />
        </div>
    );
}

export default function HomeClient({ profile, skills }: HomeClientProps) {
    const t = useTranslations();

    const grouped = CATEGORY_ORDER
        .map(cat => ({
            category: cat,
            items: skills.filter(s => s.category === cat),
        }))
        .filter(g => g.items.length > 0);

    const uncategorized = skills.filter(s => !CATEGORY_ORDER.includes(s.category));
    if (uncategorized.length > 0) {
        grouped.push({ category: 'Other', items: uncategorized });
    }

    return (
        <div className="py-12 md:py-20 lg:py-24 space-y-16">
            <div className="space-y-6 animate-fade-in-up">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                        {t('home.greeting')}{' '}
                        <span className="text-accent font-normal" style={{ fontFamily: 'var(--font-grand-hotel), cursive' }}>
                            {profile?.name || '...'}
                        </span>
                    </h1>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base font-bold text-black dark:text-white pt-2 border-b border-slate-200 dark:border-white/10 pb-4 w-fit shadow-none">
                        {profile?.location && (
                            <div className="flex items-center gap-1.5 italic">
                                <span>•</span>
                                <span className="not-italic">{profile.location}</span>
                            </div>
                        )}
                        {profile?.work_status && (
                            <div className="flex items-center gap-1.5 italic">
                                <span>•</span>
                                <span className="not-italic">{profile.work_status}</span>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-base md:text-xl text-black dark:text-white max-w-2xl leading-relaxed whitespace-pre-wrap font-bold shadow-none text-justify">
                    {profile?.bio_home || '...'}
                </p>
            </div>

            <hr className="border-light-border dark:border-dark-border opacity-50" />

            {grouped.length > 0 && (
                <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                    <div>
                        <h2 className="text-2xl font-extrabold flex items-center gap-3">
                            <span className="text-accent">{'</>'}</span> {t('home.skills_title')}
                        </h2>
                        <p className="text-black dark:text-white mt-1 font-bold shadow-none">
                            {t('home.skills_subtitle')}
                        </p>
                    </div>

                    <div className="space-y-10">
                        {grouped.map(group => (
                            <div key={group.category}>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
                                    {t(`home.categories.${group.category}`)}
                                </h3>
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
                                    {group.items.map((skill, idx) => (
                                        <SkillItem key={skill.id} skill={skill} index={idx} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
