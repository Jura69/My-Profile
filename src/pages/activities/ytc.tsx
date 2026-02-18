import {
    Container,
    ListItem,
    List,
    Heading,
    Box,
} from '@chakra-ui/react'
import { DetailTitle, Meta, DetailImage } from '../../../components/detail-components'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'
import Section from '../../../components/section'
import SEO from '../../../components/seo'
import { BreadcrumbSchema } from '../../../components/json-ld'

const Activities = () => (
    <Layout title="YTC NTU">
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

            <Section delay={0.1}>
                <P>
                    Designed media publications and event promotional materials. Captured event photography to document and promote activities.
                </P>
            </Section>

            <Section delay={0.2}>
                <Heading as="h4" fontSize={16} mb={3}>
                    Details
                </Heading>
                <Box
                    borderRadius="lg"
                    p={4}
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                >
                    <List spacing={2}>
                        <ListItem>
                            <Meta>Period</Meta>
                            <span>2021 – 2023</span>
                        </ListItem>
                    </List>
                </Box>
            </Section>

            <Section delay={0.3}>
                <DetailImage src="/images/activities/Ytc2.webp" alt="YTC" />
            </Section>
            <Section delay={0.4}>
                <DetailImage src="/images/activities/Ytc3.jpg" alt="YTC" />
            </Section>
            <Section delay={0.5}>
                <DetailImage src="/images/activities/Ytc4.jpg" alt="YTC" />
            </Section>
        </Container>
    </Layout>
)

export default Activities
