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
import { IoLogoGithub, IoLogoLinkedin, IoLogoFacebook, IoLogoInstagram, IoLogoGoogle } from 'react-icons/io5'
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
import { Camera, MusicNotes, OpenBook, Sakura } from '../icons/kit-icons-hobbies'
import type { IconComponent } from '../icons/kit-icon-base'
import type { BadgeTone } from '../ui/badge'
import type { ProjectId } from '../works/works-data'

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
    skills: Skill[]
}

// Order is the reading order of the 2-column grid: AI comes first so operating-AI experience
// opens the section, beside Frontend; Backend and DevOps follow.
export const skillGroups: SkillGroup[] = [
    {
        title: 'AI & Agent Engineering',
        tone: 'ai',
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

/** "June 2025 - Present · Full-time" → { when: "June 2025 – Present", note: "Full-time" } */
export function splitPeriod(period: string) {
    const [when, note] = period.split('·').map(s => s.trim())
    return { when: when.replace(' - ', ' – '), note }
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
    icon: IconComponent
    label: string
    /** Pill border + icon tint (the icon mixes it toward --ink so it reads in both themes). */
    color: string
}

export const hobbies: Hobby[] = [
    { icon: MusicNotes, label: 'Music', color: '#E8A87C' },
    { icon: Camera, label: 'Photography', color: '#95B8D1' },
    { icon: AgentNetwork, label: 'Machine Learning', color: '#7fc4ad' },
    { icon: OpenBook, label: 'Manga', color: '#D4A5A5' },
    { icon: Sakura, label: 'Anime', color: '#e8a0b4' }
]

export interface SocialLink {
    /** Network name, shown as the row label (contact card, footer). */
    name: 'GitHub' | 'LinkedIn' | 'Facebook' | 'Instagram' | 'Email'
    /** Handle or address, shown as the row value. */
    label: string
    href: string
    /** Brand logo key, resolved through `socialIcon`. */
    icon: 'github' | 'linkedin' | 'facebook' | 'instagram' | 'google'
}

/** Brand logo for each social link (react-icons/io5). */
export const socialIcon: Record<SocialLink['icon'], IconType> = {
    github: IoLogoGithub,
    linkedin: IoLogoLinkedin,
    facebook: IoLogoFacebook,
    instagram: IoLogoInstagram,
    google: IoLogoGoogle
}

export const socialLinks: SocialLink[] = [
    { name: 'GitHub', label: '@Jura69', href: 'https://github.com/Jura69', icon: 'github' },
    {
        name: 'LinkedIn',
        label: 'Trương Tuấn Lộc',
        href: 'https://www.linkedin.com/in/tu%E1%BA%A5n-l%E1%BB%99c-b24b391ab/',
        icon: 'linkedin'
    },
    { name: 'Facebook', label: '@Trương Tuấn Lộc', href: 'https://www.facebook.com/loc.truongtuanMT', icon: 'facebook' },
    { name: 'Instagram', label: '@_midori_neko_', href: 'https://www.instagram.com/_midori_neko_/', icon: 'instagram' },
    { name: 'Email', label: 'Loctruongtuan@gmail.com', href: 'mailto:Loctruongtuan@gmail.com', icon: 'google' }
]

/** Profile URL for the navbar GitHub links — derived so it never drifts from socialLinks. */
export const GITHUB_URL = socialLinks.find(link => link.name === 'GitHub')!.href

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

/** Home "Selected work": the flagship first, then the two compact cards (ids typed against works-data). */
export const selectedWork: [ProjectId, ProjectId, ProjectId] = ['ai-center', 'planogram', 'ocr-cccd']

/** Client brands named under Selected work (owner-approved: client names may appear publicly). */
export const featuredBrands = ['BAT', 'Castrol', 'Mondelez']
