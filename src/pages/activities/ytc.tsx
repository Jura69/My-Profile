import Reveal from '../../../components/ui/reveal'
import { DetailHeading, DetailProse, DetailImage } from '../../../components/layout/detail-page'
import { DetailBody } from '../../../components/layout/detail-layout'
import DetailPager from '../../../components/layout/detail-pager'
import PageHeader from '../../../components/ui/page-header'
import { activities } from '../../../components/works/works-data'
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
                { name: 'Home', url: 'https://jura69.vercel.app/' },
                { name: 'Activities', url: 'https://jura69.vercel.app/activities' },
                { name: 'YTC NTU', url: 'https://jura69.vercel.app/activities/ytc' }
            ]}
        />
        <PageHeader
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Activities', to: '/activities' },
                { label: 'YTC Nha Trang University' }
            ]}
            eyebrow="Activities"
            title="YTC Nha Trang University"
        />
        <DetailBody factsTitle="Details" facts={[{ label: 'Period', value: '2021 – 2023' }]}>
            <DetailHeading>Overview</DetailHeading>
            <Reveal>
                <DetailProse>
                    Designed media publications and event promotional materials. Captured event photography to document
                    and promote activities.
                </DetailProse>
            </Reveal>

            <DetailHeading>Photos</DetailHeading>
            <Reveal>
                <DetailImage src="/images/activities/Ytc2.webp" alt="YTC" />
                <DetailImage src="/images/activities/Ytc3.webp" alt="YTC" />
                <DetailImage src="/images/activities/Ytc4.webp" alt="YTC" />
            </Reveal>
        </DetailBody>
        <DetailPager
            items={activities}
            currentId="ytc"
            basePath="/activities"
            allLabel="All activities"
            label="More activities"
        />
    </>
)

export default Activities
