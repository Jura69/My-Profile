import Container from '../ui/container'
import Reveal from '../ui/reveal'
import SectionHeading from '../ui/section-heading'

/**
 * Scene 3 — noon. Circular profile photo beside justified bio prose (65ch, auto-hyphenated so
 * justification stays even). The photo top-aligns with the first bio line on desktop and stacks
 * above the text on mobile. Entrance reveals fire once.
 */
export default function AboutMorning() {
    return (
        <section data-section="about" className="w-full py-16 md:py-24">
            <Container size="page">
                <Reveal>
                    <SectionHeading as="h2" eyebrow="02 · Noon">
                        About me
                    </SectionHeading>
                </Reveal>

                <div className="mt-10 flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
                    <Reveal delay={0.05} className="relative shrink-0 md:mt-1">
                        <img
                            src="/images/loc.webp"
                            alt="Profile photo of Trương Tuấn Lộc"
                            width={160}
                            height={160}
                            loading="lazy"
                            className="block h-36 w-36 rounded-full border-2 border-line object-cover shadow-sm md:h-40 md:w-40"
                        />
                        {/* Gouache wreath: its leaf band spans 48–75% of the tile, so -30% insets
                            let the leaves overlap the photo's edge instead of covering the face. */}
                        <img
                            src="/images/ui/avatar-wreath.webp"
                            alt=""
                            aria-hidden="true"
                            width={420}
                            height={420}
                            loading="lazy"
                            className="pointer-events-none absolute inset-[-30%] h-[160%] w-[160%] max-w-none"
                        />
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="max-w-[65ch] font-rounded text-base leading-relaxed text-ink-muted hyphens-auto text-justify">
                            Full-stack developer building enterprise AI agent platforms at CREASIA — multi-channel
                            assistants with agent orchestration, custom skills and tools, and deep LLM integration.
                            Over two years of experience across Node.js backend services and React/C# full-stack
                            development, shipping applied-AI products such as computer-vision shelf compliance and
                            Vietnamese ID-card OCR. Hands-on with prompt and context engineering, LLM evaluation, and
                            machine learning with TensorFlow — passionate about turning modern AI capabilities into
                            efficient, user-friendly solutions.
                        </p>
                    </Reveal>
                </div>
            </Container>
        </section>
    )
}
