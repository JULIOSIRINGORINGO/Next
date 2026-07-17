import type { IconType } from 'react-icons';

export interface SkillIconEntry {
    iconName: string;
    gradient: string;
    brandColor: string;
}

const skillIconData: Record<string, SkillIconEntry> = {
    python: { iconName: 'SiPython', gradient: 'from-blue-500 to-yellow-400', brandColor: '#3776AB' },
    javascript: { iconName: 'SiJavascript', gradient: 'from-yellow-300 to-yellow-500', brandColor: '#F7DF1E' },
    typescript: { iconName: 'SiTypescript', gradient: 'from-blue-500 to-blue-700', brandColor: '#3178C6' },
    java: { iconName: 'DiJava', gradient: 'from-red-500 to-orange-500', brandColor: '#007396' },
    csharp: { iconName: 'SiSharp', gradient: 'from-gray-700 to-gray-900', brandColor: '#239120' },
    c: { iconName: 'SiC', gradient: 'from-blue-500 to-blue-700', brandColor: '#A8B9CC' },
    cplusplus: { iconName: 'SiCplusplus', gradient: 'from-blue-600 to-indigo-700', brandColor: '#00599C' },
    rust: { iconName: 'SiRust', gradient: 'from-orange-500 to-red-600', brandColor: '#DEA584' },
    go: { iconName: 'SiGo', gradient: 'from-cyan-400 to-blue-500', brandColor: '#00ADD8' },
    dart: { iconName: 'SiDart', gradient: 'from-blue-400 to-cyan-500', brandColor: '#0175C2' },
    kotlin: { iconName: 'SiKotlin', gradient: 'from-purple-500 to-orange-400', brandColor: '#7F52FF' },
    swift: { iconName: 'SiSwift', gradient: 'from-orange-400 to-red-500', brandColor: '#F05138' },
    php: { iconName: 'SiPhp', gradient: 'from-indigo-400 to-purple-600', brandColor: '#777BB4' },
    html5: { iconName: 'SiHtml5', gradient: 'from-orange-400 to-orange-600', brandColor: '#E34F26' },
    css3: { iconName: 'SiCss', gradient: 'from-blue-400 to-blue-600', brandColor: '#1572B6' },
    react: { iconName: 'SiReact', gradient: 'from-cyan-400 to-blue-500', brandColor: '#61DAFB' },
    nextdotjs: { iconName: 'SiNextdotjs', gradient: 'from-gray-600 to-gray-900', brandColor: '#FFFFFF' },
    nextjs: { iconName: 'SiNextdotjs', gradient: 'from-gray-600 to-gray-900', brandColor: '#FFFFFF' },
    vuedotjs: { iconName: 'SiVuedotjs', gradient: 'from-green-400 to-[var(--accent)]', brandColor: '#4FC08D' },
    vue: { iconName: 'SiVuedotjs', gradient: 'from-green-400 to-[var(--accent)]', brandColor: '#4FC08D' },
    angular: { iconName: 'SiAngular', gradient: 'from-red-500 to-red-700', brandColor: '#DD0031' },
    svelte: { iconName: 'SiSvelte', gradient: 'from-orange-500 to-red-500', brandColor: '#FF3E00' },
    astro: { iconName: 'SiAstro', gradient: 'from-purple-500 to-orange-500', brandColor: '#FF5D01' },
    tailwindcss: { iconName: 'SiTailwindcss', gradient: 'from-cyan-400 to-blue-500', brandColor: '#06B6D4' },
    fastapi: { iconName: 'SiFastapi', gradient: 'from-teal-400 to-[var(--accent)]', brandColor: '#05998B' },
    django: { iconName: 'SiDjango', gradient: 'from-green-700 to-green-900', brandColor: '#092E20' },
    flask: { iconName: 'SiFlask', gradient: 'from-gray-500 to-gray-800', brandColor: '#000000' },
    laravel: { iconName: 'SiLaravel', gradient: 'from-red-500 to-red-700', brandColor: '#FF2D20' },
    nodedotjs: { iconName: 'SiNodedotjs', gradient: 'from-green-500 to-green-700', brandColor: '#339933' },
    nodejs: { iconName: 'SiNodedotjs', gradient: 'from-green-500 to-green-700', brandColor: '#339933' },
    sqlite: { iconName: 'SiSqlite', gradient: 'from-sky-400 to-blue-600', brandColor: '#003B57' },
    mongodb: { iconName: 'SiMongodb', gradient: 'from-green-500 to-green-700', brandColor: '#47A248' },
    postgresql: { iconName: 'SiPostgresql', gradient: 'from-blue-500 to-indigo-600', brandColor: '#4169E1' },
    mysql: { iconName: 'SiMysql', gradient: 'from-blue-500 to-orange-500', brandColor: '#4479A1' },
    redis: { iconName: 'SiRedis', gradient: 'from-red-500 to-red-700', brandColor: '#DC382D' },
    firebase: { iconName: 'SiFirebase', gradient: 'from-yellow-400 to-orange-500', brandColor: '#FFCA28' },
    git: { iconName: 'SiGit', gradient: 'from-orange-500 to-red-600', brandColor: '#F05032' },
    docker: { iconName: 'SiDocker', gradient: 'from-blue-400 to-cyan-500', brandColor: '#2496ED' },
    linux: { iconName: 'SiLinux', gradient: 'from-yellow-400 to-yellow-600', brandColor: '#FCC624' },
    nginx: { iconName: 'SiNginx', gradient: 'from-green-500 to-green-700', brandColor: '#009639' },
    amazonwebservices: { iconName: 'FaAws', gradient: 'from-orange-400 to-yellow-500', brandColor: '#232F3E' },
    aws: { iconName: 'FaAws', gradient: 'from-orange-400 to-yellow-500', brandColor: '#232F3E' },
    googlecloud: { iconName: 'SiGooglecloud', gradient: 'from-blue-400 to-red-400', brandColor: '#4285F4' },
    vercel: { iconName: 'SiVercel', gradient: 'from-gray-600 to-gray-900', brandColor: '#000000' },
    netlify: { iconName: 'SiNetlify', gradient: 'from-teal-400 to-cyan-500', brandColor: '#00C7B7' },
    flutter: { iconName: 'SiFlutter', gradient: 'from-blue-400 to-cyan-400', brandColor: '#02569B' },
    graphql: { iconName: 'SiGraphql', gradient: 'from-pink-500 to-purple-600', brandColor: '#E10098' },
    figma: { iconName: 'SiFigma', gradient: 'from-purple-500 to-pink-500', brandColor: '#F24E1E' },
    nuxtdotjs: { iconName: 'SiNuxt', gradient: 'from-gray-700 to-gray-900', brandColor: '#00DC82' },
    bootstrap: { iconName: 'FaBootstrap', gradient: 'from-gray-700 to-gray-900', brandColor: '#7952B3' },
    vite: { iconName: 'SiVite', gradient: 'from-gray-700 to-gray-900', brandColor: '#646CFF' },
    express: { iconName: 'SiExpress', gradient: 'from-gray-700 to-gray-900', brandColor: '#111111' },
    nestjs: { iconName: 'SiNestjs', gradient: 'from-gray-700 to-gray-900', brandColor: '#E0234E' },
    dotnet: { iconName: 'SiDotnet', gradient: 'from-gray-700 to-gray-900', brandColor: '#512BD4' },
    reactnative: { iconName: 'FaReact', gradient: 'from-gray-700 to-gray-900', brandColor: '#61DAFB' },
    supabase: { iconName: 'SiSupabase', gradient: 'from-gray-700 to-gray-900', brandColor: '#3ECF8E' },
    github: { iconName: 'FaGithub', gradient: 'from-gray-700 to-gray-900', brandColor: '#181717' },
    githubactions: { iconName: 'SiGithubactions', gradient: 'from-gray-700 to-gray-900', brandColor: '#2088FF' },
    postman: { iconName: 'SiPostman', gradient: 'from-gray-700 to-gray-900', brandColor: '#FF6C37' },
    amazonaws: { iconName: 'FaAws', gradient: 'from-gray-700 to-gray-900', brandColor: '#FF9900' },
    microsoftazure: { iconName: 'VscAzure', gradient: 'from-gray-700 to-gray-900', brandColor: '#0078D4' },
};

const fallbackEntry: SkillIconEntry = {
    iconName: 'SiSimpleicons',
    gradient: 'from-gray-500 to-gray-700',
    brandColor: '#FFFFFF',
};

const nameToSlug: Record<string, string> = {
    'html5': 'html5', 'css3': 'css3', 'javascript': 'javascript', 'typescript': 'typescript',
    'python': 'python', 'java': 'java', 'c#': 'csharp', 'csharp': 'csharp',
    'go': 'go', 'kotlin': 'kotlin', 'swift': 'swift', 'dart': 'dart', 'php': 'php',
    'react': 'react', 'next.js': 'nextdotjs', 'nextdotjs': 'nextdotjs', 'nextjs': 'nextdotjs',
    'vue.js': 'vuedotjs', 'vue': 'vuedotjs', 'nuxt.js': 'nuxtdotjs', 'nuxt': 'nuxtdotjs',
    'angular': 'angular', 'svelte': 'svelte', 'astro': 'astro',
    'tailwind css': 'tailwindcss', 'tailwind': 'tailwindcss', 'tailwindcss': 'tailwindcss',
    'bootstrap': 'bootstrap', 'vite': 'vite',
    'node.js': 'nodedotjs', 'nodejs': 'nodedotjs', 'fastapi': 'fastapi',
    'django': 'django', 'flask': 'flask', 'laravel': 'laravel', 'express': 'express',
    'nestjs': 'nestjs', 'graphql': 'graphql', '.net': 'dotnet', 'dotnet': 'dotnet',
    'flutter': 'flutter', 'react native': 'reactnative',
    'postgresql': 'postgresql', 'mysql': 'mysql', 'sqlite': 'sqlite',
    'mongodb': 'mongodb', 'redis': 'redis', 'supabase': 'supabase', 'firebase': 'firebase',
    'docker': 'docker', 'git': 'git', 'github': 'github',
    'github actions': 'githubactions', 'linux': 'linux',
    'vercel': 'vercel', 'netlify': 'netlify', 'figma': 'figma', 'postman': 'postman',
    'aws': 'aws', 'amazon web services': 'aws', 'azure': 'microsoftazure',
    'google cloud': 'googlecloud',
};

const iconModuleCache: Record<string, IconType> = {};

const iconLoaders: Record<string, () => Promise<{ default: IconType }>> = {
    SiPython: () => import('react-icons/si').then(m => ({ default: m.SiPython })),
    SiJavascript: () => import('react-icons/si').then(m => ({ default: m.SiJavascript })),
    SiTypescript: () => import('react-icons/si').then(m => ({ default: m.SiTypescript })),
    DiJava: () => import('react-icons/di').then(m => ({ default: m.DiJava })),
    SiSharp: () => import('react-icons/si').then(m => ({ default: m.SiSharp })),
    SiC: () => import('react-icons/si').then(m => ({ default: m.SiC })),
    SiCplusplus: () => import('react-icons/si').then(m => ({ default: m.SiCplusplus })),
    SiRust: () => import('react-icons/si').then(m => ({ default: m.SiRust })),
    SiGo: () => import('react-icons/si').then(m => ({ default: m.SiGo })),
    SiDart: () => import('react-icons/si').then(m => ({ default: m.SiDart })),
    SiKotlin: () => import('react-icons/si').then(m => ({ default: m.SiKotlin })),
    SiSwift: () => import('react-icons/si').then(m => ({ default: m.SiSwift })),
    SiPhp: () => import('react-icons/si').then(m => ({ default: m.SiPhp })),
    SiHtml5: () => import('react-icons/si').then(m => ({ default: m.SiHtml5 })),
    SiCss: () => import('react-icons/si').then(m => ({ default: m.SiCss })),
    SiReact: () => import('react-icons/si').then(m => ({ default: m.SiReact })),
    SiNextdotjs: () => import('react-icons/si').then(m => ({ default: m.SiNextdotjs })),
    SiVuedotjs: () => import('react-icons/si').then(m => ({ default: m.SiVuedotjs })),
    SiAngular: () => import('react-icons/si').then(m => ({ default: m.SiAngular })),
    SiSvelte: () => import('react-icons/si').then(m => ({ default: m.SiSvelte })),
    SiAstro: () => import('react-icons/si').then(m => ({ default: m.SiAstro })),
    SiTailwindcss: () => import('react-icons/si').then(m => ({ default: m.SiTailwindcss })),
    SiFastapi: () => import('react-icons/si').then(m => ({ default: m.SiFastapi })),
    SiDjango: () => import('react-icons/si').then(m => ({ default: m.SiDjango })),
    SiFlask: () => import('react-icons/si').then(m => ({ default: m.SiFlask })),
    SiLaravel: () => import('react-icons/si').then(m => ({ default: m.SiLaravel })),
    SiNodedotjs: () => import('react-icons/si').then(m => ({ default: m.SiNodedotjs })),
    SiSqlite: () => import('react-icons/si').then(m => ({ default: m.SiSqlite })),
    SiMongodb: () => import('react-icons/si').then(m => ({ default: m.SiMongodb })),
    SiPostgresql: () => import('react-icons/si').then(m => ({ default: m.SiPostgresql })),
    SiMysql: () => import('react-icons/si').then(m => ({ default: m.SiMysql })),
    SiRedis: () => import('react-icons/si').then(m => ({ default: m.SiRedis })),
    SiFirebase: () => import('react-icons/si').then(m => ({ default: m.SiFirebase })),
    SiGit: () => import('react-icons/si').then(m => ({ default: m.SiGit })),
    SiDocker: () => import('react-icons/si').then(m => ({ default: m.SiDocker })),
    SiLinux: () => import('react-icons/si').then(m => ({ default: m.SiLinux })),
    SiNginx: () => import('react-icons/si').then(m => ({ default: m.SiNginx })),
    FaAws: () => import('react-icons/fa').then(m => ({ default: m.FaAws })),
    SiGooglecloud: () => import('react-icons/si').then(m => ({ default: m.SiGooglecloud })),
    SiVercel: () => import('react-icons/si').then(m => ({ default: m.SiVercel })),
    SiNetlify: () => import('react-icons/si').then(m => ({ default: m.SiNetlify })),
    SiFlutter: () => import('react-icons/si').then(m => ({ default: m.SiFlutter })),
    SiGraphql: () => import('react-icons/si').then(m => ({ default: m.SiGraphql })),
    SiFigma: () => import('react-icons/si').then(m => ({ default: m.SiFigma })),
    SiNuxt: () => import('react-icons/si').then(m => ({ default: m.SiNuxt })),
    FaBootstrap: () => import('react-icons/fa').then(m => ({ default: m.FaBootstrap })),
    SiVite: () => import('react-icons/si').then(m => ({ default: m.SiVite })),
    SiExpress: () => import('react-icons/si').then(m => ({ default: m.SiExpress })),
    SiNestjs: () => import('react-icons/si').then(m => ({ default: m.SiNestjs })),
    SiDotnet: () => import('react-icons/si').then(m => ({ default: m.SiDotnet })),
    FaReact: () => import('react-icons/fa').then(m => ({ default: m.FaReact })),
    SiSupabase: () => import('react-icons/si').then(m => ({ default: m.SiSupabase })),
    FaGithub: () => import('react-icons/fa').then(m => ({ default: m.FaGithub })),
    SiGithubactions: () => import('react-icons/si').then(m => ({ default: m.SiGithubactions })),
    SiPostman: () => import('react-icons/si').then(m => ({ default: m.SiPostman })),
    VscAzure: () => import('react-icons/vsc').then(m => ({ default: m.VscAzure })),
    SiSimpleicons: () => import('react-icons/si').then(m => ({ default: m.SiSimpleicons })),
};

export async function loadIcon(iconName: string): Promise<IconType> {
    if (iconModuleCache[iconName]) return iconModuleCache[iconName];
    const loader = iconLoaders[iconName];
    if (loader) {
        const mod = await loader();
        iconModuleCache[iconName] = mod.default;
        return mod.default;
    }
    // try si-icons as fallback for simple-icons names
    if (iconName.startsWith('Si')) {
        try {
            const mod = await import('react-icons/si');
            const icon = (mod as any)[iconName];
            if (icon) {
                iconModuleCache[iconName] = icon;
                return icon;
            }
        } catch {}
    }
    const fallback = await iconLoaders['SiSimpleicons']();
    iconModuleCache[iconName] = fallback.default;
    return fallback.default;
}

export function getSkillIconData(slug: string): SkillIconEntry {
    const key = slug.toLowerCase().trim();
    const resolved = nameToSlug[key] || key;
    return skillIconData[resolved] || skillIconData[key] || fallbackEntry;
}

export default skillIconData;
