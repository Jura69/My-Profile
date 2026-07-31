import Container from '../../../components/ui/container'
import Reveal from '../../../components/ui/reveal'
import { DetailTitle, DetailProse, DetailMeta, DetailImage } from '../../../components/layout/detail-page'
import SEO from '../../../components/seo'
import { BreadcrumbSchema } from '../../../components/json-ld'

const Activities = () => (
    <>
        <SEO
            title="YTC Nha Trang University | Trương Tuấn Lộc"
            description="My experience at YTC (Youth Technology Club) at Nha Trang University. Designed media publications, event promotional materials, and captured event photography."
            keywords="YTC NTU, Nha Trang University, Activities, Design Club, Event Management, Media Design, Photography"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Activities', url: 'https://my-profile-jura69.vercel.app/activities' },
                { name: 'YTC NTU', url: 'https://my-profile-jura69.vercel.app/activities/ytc' }
            ]}
        />
        <Container>
            <DetailTitle parentPath="/activities" parentLabel="Activities">
                YTC Nha Trang University
            </DetailTitle>

            <Reveal>
                <DetailProse>
                    Designed media publications and event promotional materials. Captured event photography to document
                    and promote activities.
                </DetailProse>
            </Reveal>

            <Reveal delay={0.05}>
                <DetailMeta title="Details" rows={[{ label: 'Period', value: '2021 – 2023' }]} />
            </Reveal>

            <Reveal delay={0.1}>
                <DetailImage src="/images/activities/Ytc2.webp" alt="YTC" />
            </Reveal>
            <Reveal delay={0.15}>
                <DetailImage src="/images/activities/Ytc3.webp" alt="YTC" />
            </Reveal>
            <Reveal delay={0.2}>
                <DetailImage src="/images/activities/Ytc4.webp" alt="YTC" />
            </Reveal>
        </Container>
    </>
)

export default Activities
