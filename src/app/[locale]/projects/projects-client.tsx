'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, Layout } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getSkillIconData, loadIcon } from '@/utils/skillIconMap';
import { optimizeCloudinaryUrl } from '@/utils/cloudinary';

function TechBadge({ tech }: { tech: string }) {
    const { iconName, brandColor } = getSkillIconData(tech);
    const IconComponent = loadIcon(iconName);
    const isWhite = brandColor?.toLowerCase() === '#ffffff' || brandColor?.toLowerCase() === 'white';

    return (
        <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 group-hover:border-accent transition-all duration-300 hover:scale-110" title={tech}>
                {IconComponent ? (
                    <IconComponent
                        className={`w-6 h-6 transition-all ${isWhite ? 'text-black dark:text-white' : ''}`}
                        style={{
                            color: isWhite ? undefined : brandColor,
                            filter: 'brightness(1.15) saturate(1.1)'
                        }}
                    />
                ) : (
                    <div className="w-6 h-6 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-black dark:text-white text-center max-w-[48px] truncate">{tech}</span>
        </div>
    );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
    live_url: string;
    github_url: string;
    tech_stack: string;
    featured: boolean;
    order_index: number;
}

interface ProjectsClientProps {
    projects: Project[];
    profile: any;
}

export default function ProjectsClient({ projects, profile }: ProjectsClientProps) {
    const t = useTranslations();

    return (
        <div className="py-12 md:py-16 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold flex items-center gap-3">
                        <Layout className="w-8 h-8 text-accent" /> {t('projects.title')}
                    </h1>
                    <p className="text-lg text-black dark:text-white font-bold max-w-xl">
                        {t('projects.subtitle')}
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative glass-card border-slate-200 dark:border-white/10 overflow-hidden hover:border-accent transition-all duration-500 flex flex-col h-[420px] md:h-[480px]"
                        >
                            <div className="relative h-48 md:h-60 overflow-hidden bg-white/30 dark:bg-black/20 backdrop-blur-sm border-b border-slate-200 dark:border-white/10">
                                {project.image_url ? (
                                    <img
                                        src={optimizeCloudinaryUrl(project.image_url.startsWith('http') ? project.image_url : `${API_URL}${project.image_url}`)}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-20">
                                        <Layout className="w-20 h-20" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {project.featured && (
                                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-accent text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                                        <Star className="w-3.5 h-3.5 fill-white" /> {t('featured')}
                                    </div>
                                )}
                            </div>

                            <div className="p-5 md:p-7 flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors line-clamp-1">{project.title}</h3>
                                        <p className="text-black dark:text-white font-bold text-xs md:text-sm leading-relaxed line-clamp-3">{project.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-2">
                                        {(() => {
                                            let techs: string[] = [];
                                            try {
                                                const parsed = JSON.parse(project.tech_stack || '[]');
                                                techs = Array.isArray(parsed) ? parsed : [];
                                            } catch {
                                                techs = (project.tech_stack || '').split(',').map(t => t.trim()).filter(Boolean);
                                            }
                                            return techs.map((tech, i) => (
                                                <TechBadge key={i} tech={tech} />
                                            ));
                                        })()}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-light-border dark:border-dark-border mt-6">
                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent/20 dark:bg-accent/10 backdrop-blur-md border border-accent/30 dark:border-accent/20 text-accent dark:text-accent hover:bg-accent/30 dark:hover:bg-accent/20 text-xs font-black transition-all group/btn"
                                        >
                                            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:scale-110" /> {t('demo')}
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-bold transition-all group/btn text-light-text dark:text-white"
                                        >
                                            <Github className="w-4 h-4 transition-transform group-hover/btn:scale-110" /> {t('code')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
