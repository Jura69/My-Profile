import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import {
    DetailTitle,
    DetailProse,
    DetailMeta,
    DetailLink,
    DetailImage
} from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { ProjectSchema, BreadcrumbSchema } from '../../../components/json-ld'

const Work = () => (
    <>
        <SEO
            title="Flutter Ticket Booking App | Trương Tuấn Lộc"
            description="A modern mobile application for booking movie tickets, built with Flutter for cross-platform compatibility. Features seat selection, secure booking, and intuitive user interface."
            keywords="Flutter App, Ticket Booking App, Mobile App Development, Flutter Projects, Movie Ticket App, Cross-platform App"
            image="/images/works/Ticket1.jpeg"
        />
        <ProjectSchema
            project={{
                title: 'Flutter Ticket Booking App',
                description: 'A modern mobile application for booking movie tickets',
                year: '2024',
                github: 'https://github.com/Jura69/Flutter-TicketApp',
                image: 'https://my-profile-jura69.vercel.app/images/works/Ticket1.jpeg',
                stack: 'Flutter, Node.js, Express, MongoDB'
            }}
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Works', url: 'https://my-profile-jura69.vercel.app/works' },
                { name: 'Flutter Ticket App', url: 'https://my-profile-jura69.vercel.app/works/ticketapp' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/works" parentLabel="Works" year="2024">
                Flutter Ticket Booking App
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    A modern mobile application for booking movie tickets, built with Flutter for cross-platform compatibility. Features include browsing available movies, selecting seats, and secure ticket booking with a clean, intuitive user interface.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta
                    rows={[
                        {
                            label: 'Github',
                            value: (
                                <DetailLink href="https://github.com/Jura69/Flutter-TicketApp">
                                    https://github.com/Jura69/Flutter-TicketApp
                                </DetailLink>
                            )
                        },
                        { label: 'Platform', value: 'Android, iOS' },
                        { label: 'Stack', value: 'Flutter, Nodejs Express, MongoDB' }
                    ]}
                />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/works/Ticket2.webp" alt="Ticket" />
                <DetailImage src="/images/works/Ticket3.webp" alt="Ticket" />
            </Reveal>
        </Container>
    </>
)

export default Work
