import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { CategoryGridItem } from '../../components/grid-item'
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'

const Audiophile = () => (
    <Layout title="Audiophile">
        <SEO
            title="Audio Gear & Reviews | Trương Tuấn Lộc Portfolio"
            description="Explore my audiophile collection featuring in-depth reviews of IEMs and DAC/AMPs including Simgot EA1000, Moondrop SSP, Shanling Onix XI1, and FiiO KA11."
            keywords="Audiophile, IEM Reviews, DAC AMP, Simgot EA1000, Moondrop SSP, Shanling Onix XI1, FiiO KA11, Hi-Fi Audio, Headphone Reviews"
        />
        <BreadcrumbSchema
            items={[
                { name: 'Home', url: 'https://my-profile-jura69.vercel.app/' },
                { name: 'Audiophile', url: 'https://my-profile-jura69.vercel.app/audiophile' }
            ]}
        />
        <Container>
            <Section delay={0.1}>
                <Heading as="h3" variant="section-title">
                    My Audio Devices 🎧
                </Heading>
            </Section>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section delay={0.2}>
                    <CategoryGridItem category="audiophile" id="ea1000" title="Simgot EA1000 Fermat" thumbnail="/images/audiophile/ea1000.webp">
                    </CategoryGridItem>
                </Section>
                <Section delay={0.3}>
                    <CategoryGridItem category="audiophile" id="moondropSSP" title="Moondrop SSP" thumbnail="/images/audiophile/ssp.jpg">
                    </CategoryGridItem>
                </Section>
                <Section delay={0.4}>
                    <CategoryGridItem category="audiophile" id="onix" title="Onix Alpha XI1" thumbnail="/images/audiophile/onix.jpg">
                    </CategoryGridItem>
                </Section>
                <Section delay={0.5}>
                    <CategoryGridItem category="audiophile" id="fiioka11" title="Fiio Ka11" thumbnail="/images/audiophile/ka11.jpg">
                    </CategoryGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
)

export default Audiophile
