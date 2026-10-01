import type { IconType } from 'react-icons'
import {
    SiReact,
    SiNextdotjs,
    SiFlutter,
    SiTailwindcss,
    SiThreedotjs,
    SiHtml5,
    SiJavascript,
    SiNodedotjs,
    SiSharp,
    SiExpress,
    SiMongodb,
    SiDotnet,
    SiTensorflow,
    SiOpenai,
    SiClaude,
    SiPython,
    SiDocker,
    SiTraefikproxy,
    SiNginx,
    SiLinux,
    SiNvidia,
    SiLetsencrypt,
    SiTypescript,
    SiRedis,
    SiAmazonwebservices
} from 'react-icons/si'
import { DiMsqlServer, DiDatabase } from 'react-icons/di'
import {
    Building,
    Terminal,
    SignalTower,
    GraduationCap,
    ServerStack,
    ChartCheck,
    AgentNetwork,
    ChatSpark
} from '../icons/kit-icons-topics'
import type { IconComponent } from '../icons/kit-icon-base'
import type { BadgeTone } from '../ui/badge'

/**
 * Homepage content data — ported verbatim from the legacy `src/pages/index.tsx`.
 * Pure data (icon component refs + strings); no JSX so this stays a `.ts` file.
 */

export interface Skill {
    icon: IconComponent
    label: string
    /** Brand color for the icon glyph — preserved from the legacy skill cards. */
    color: string
}

export interface SkillGroup {
    title: string
    /** Badge/accent tone key from the design tokens. */
    tone: BadgeTone
    /** Bento column span at the lg breakpoint — co-located so the grid is
     *  fully data-driven (no title-string lookup that could silently drop a card). */
    span: string
    skills: Skill[]
}

// Order IS the bento layout: row 1 leads with AI (3) beside Frontend (3) —
// the AI card comes first so operating-AI experience opens the section;
// row 2 pairs Backend (3) with DevOps (3), filling a 6-col grid.
export const skillGroups: SkillGroup[] = [
    {
        title: 'AI & Agent Engineering',
        tone: 'ai',
        span: 'lg:col-span-3',
        skills: [
            // Core six only — mirrors the bio verbatim: operating AI leads,
            // agent-building follows, classic ML anchor last.
            { icon: ServerStack, label: 'AI Operations (LLMOps)', color: '#5a9dab' },
            { icon: ChartCheck, label: 'LLM Evaluation & Monitoring', color: '#6db86b' },
            { icon: AgentNetwork, label: 'Agent Orchestration', color: '#6db86b' },
            { icon: SiClaude, label: 'Agent Skill Building', color: '#D97757' },
            { icon: ChatSpark, label: 'Prompt & Context Engineering', color: '#d4a853' },
            { icon: SiTensorflow, label: 'TensorFlow', color: '#FF6F00' }
        ]
    },
    {
        title: 'Frontend',
        tone: 'frontend',
        span: 'lg:col-span-3',
        skills: [
            { icon: SiReact, label: 'React.js', color: '#61DAFB' },
            { icon: SiNextdotjs, label: 'Next.js', color: '#808080' },
            { icon: SiFlutter, label: 'Flutter', color: '#02569B' },
            { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
            { icon: SiTailwindcss, label: 'Tailwind CSS', color: '#38B2AC' },
            { icon: SiThreedotjs, label: 'Three.js', color: '#808080' },
            { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' },
            { icon: SiHtml5, label: 'HTML/CSS', color: '#E34F26' }
        ]
    },
    {
        title: 'Backend',
        tone: 'backend',
        span: 'lg:col-span-3',
        skills: [
            { icon: SiNodedotjs, label: 'Node.js', color: '#339933' },
            { icon: SiSharp, label: 'C#', color: '#512BD4' },
            { icon: SiDotnet, label: '.NET', color: '#512BD4' },
            { icon: SiPython, label: 'Python', color: '#3776AB' },
            { icon: SiExpress, label: 'Express.js', color: '#808080' },
            { icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
            { icon: DiMsqlServer, label: 'SQL Server', color: '#CC2927' },
            { icon: SiRedis, label: 'Redis', color: '#DC382D' }
        ]
    },
    {
        title: 'DevOps',
        tone: 'tools',
        span: 'lg:col-span-3',
        skills: [
            // Server stack actually run in production (GPU-server + AI-platform deploy runbooks).
            { icon: SiDocker, label: 'Docker & Compose', color: '#2496ED' },
            { icon: SiTraefikproxy, label: 'Traefik Reverse Proxy', color: '#24A1C1' },
            { icon: SiNginx, label: 'Nginx', color: '#009639' },
            { icon: SiLinux, label: 'Linux Server & SSH', color: '#FCC624' },
            { icon: SiNvidia, label: 'GPU Serving (CUDA)', color: '#76B900' },
            { icon: SiLetsencrypt, label: 'TLS & DNS (Let’s Encrypt)', color: '#808080' }
        ]
    }
]

export interface ExperienceEntry {
    icon: IconComponent
    company: string
    role: string
    period: string
    /** Rail dot + badge accent color (timeline palette). */
    color: string
    tone: BadgeTone
    summary?: string
    bullets: string[]
    badges: string[]
}

export const experiences: ExperienceEntry[] = [
    {
        icon: Building,
        company: 'CREASIA',
        role: 'Full-stack Developer',
        period: 'June 2025 - Present · Full-time',
        color: '#5a9dab',
        tone: 'frontend',
        summary:
            'Building enterprise AI agent platforms and full-stack web applications — agent engineering with LLM integration on a React/C# foundation.',
        bullets: [
            'Build and operate an enterprise AI agent platform (Creasia AI Center) — multi-channel assistants with agent orchestration, custom skills and tools',
            'Ship applied-AI products: computer-vision shelf compliance (Planogram AI) and Vietnamese ID-card OCR',
            'Develop and maintain full-stack applications with React frontend and C# backend',
            'Implement responsive UI/UX designs and optimize application performance'
        ],
        badges: ['AI Agents', 'LLM Integration', 'React', 'C#', '.NET', 'SQL Server']
    },
    {
        icon: Terminal,
        company: 'Infodation Vietnam',
        role: 'Junior Backend Developer',
        period: 'Dec 2023 - Feb 2025 · 1 year 3 months',
        color: '#6db86b',
        tone: 'frontend',
        summary:
            'Specialized in Node.js backend development, building RESTful APIs and microservices for enterprise applications.',
        bullets: [
            'Designed and implemented RESTful APIs serving 10,000+ daily active users',
            'Optimized database queries reducing response time by 40%',
            'Integrated third-party services and payment gateways',
            'Collaborated with frontend team to ensure seamless API integration'
        ],
        badges: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'AWS']
    },
    {
        icon: SignalTower,
        company: 'VNPT Khánh Hoà',
        role: 'Software Developer Intern',
        period: 'May 2023 - Jul 2023 · 3 months',
        color: '#5a9bd5',
        tone: 'backend',
        summary:
            'Internship focused on full-stack development with React and C#, working on internal management systems.',
        bullets: [
            'Developed internal web applications using React and C#',
            'Learned enterprise software development practices',
            'Participated in code reviews and agile development processes'
        ],
        badges: ['React', 'C#', '.NET', 'SQL']
    },
    {
        icon: GraduationCap,
        company: 'Nha Trang University',
        role: "Bachelor's Degree in Information Technology",
        period: 'Graduated 2024',
        color: '#b08fd8',
        tone: 'tools',
        bullets: [
            'Focus on Software Engineering and Web Development',
            'Completed projects in Machine Learning and Full-stack Development'
        ],
        badges: []
    }
]

export interface Hobby {
    emoji: string
    label: string
    color: string
}

export const hobbies: Hobby[] = [
    { emoji: '🎵', label: 'Music', color: '#E8A87C' },
    { emoji: '📷', label: 'Photography', color: '#95B8D1' },
    { emoji: '🤖', label: 'Machine Learning', color: '#B8E0D2' },
    { emoji: '📖', label: 'Manga', color: '#D4A5A5' },
    { emoji: '🌸', label: 'Anime', color: '#C3AED6' }
]

export interface SocialLink {
    label: string
    href: string
    /** Brand logo key; the consuming component resolves it to the matching react-icons/io5 logo. */
    icon: 'github' | 'linkedin' | 'facebook' | 'instagram' | 'google'
}

export const socialLinks: SocialLink[] = [
    { label: '@Jura69', href: 'https://github.com/Jura69', icon: 'github' },
    {
        label: 'Trương Tuấn Lộc',
        href: 'https://www.linkedin.com/in/tu%E1%BA%A5n-l%E1%BB%99c-b24b391ab/',
        icon: 'linkedin'
    },
    { label: '@Trương Tuấn Lộc', href: 'https://www.facebook.com/loc.truongtuanMT', icon: 'facebook' },
    { label: '@_midori_neko_', href: 'https://www.instagram.com/_midori_neko_/', icon: 'instagram' },
    { label: 'Loctruongtuan@gmail.com', href: 'mailto:Loctruongtuan@gmail.com', icon: 'google' }
]

export const techIconMap: Record<string, { icon: IconType; color: string }> = {
    'AI Agents': { icon: SiClaude, color: '#D97757' },
    'LLM Integration': { icon: SiOpenai, color: '#808080' },
    React: { icon: SiReact, color: '#61DAFB' },
    'C#': { icon: SiSharp, color: '#512BD4' },
    '.NET': { icon: SiDotnet, color: '#512BD4' },
    'SQL Server': { icon: DiMsqlServer, color: '#CC2927' },
    'Node.js': { icon: SiNodedotjs, color: '#339933' },
    Express: { icon: SiExpress, color: '#808080' },
    MongoDB: { icon: SiMongodb, color: '#47A248' },
    Redis: { icon: SiRedis, color: '#DC382D' },
    Docker: { icon: SiDocker, color: '#2496ED' },
    AWS: { icon: SiAmazonwebservices, color: '#FF9900' },
    SQL: { icon: DiDatabase, color: '#00758F' }
}
