import { Container, Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Layout from "../../components/layouts/article";
import Section from "../../components/section";
import Paragraph from "../../components/paragraph";
import { WorkSection, WorkTimes } from "../../components/work";

export default function Home() {
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          mb={6}
          mt={2}
          p={3}
          textAlign="center"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          css={{ backdropFilter: 'blur(10px)' }}
        >
          Hello, I&apos;m an web developer based in Việt Nam 🇻🇳
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Trương Tuấn Lộc
            </Heading>
            <p>Jura69 ( Audiophile / Developer / Designer )</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="100px"
              h="100px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                src="/images/pic4.jpg"
                alt="Profile image"
                width="100"
                height="100"
              />
            </Box>
          </Box>
        </Box>
        
        <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About me 🤍
        </Heading>
        <Paragraph>
        A technology enthusiast on the path to becoming a programmer, with quick adaptability and flexibility. In addition to my programming experience, I also have a background in graphic design and video editing. I am always looking for opportunities to explore and learn new technologies, applying them to launch products—from planning and design to solving real-world problems with code.
        </Paragraph>
        </Section>

        <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Work Experience 💼
        </Heading>

        <WorkTimes>✎ 2 months (05/2023 - 06/2023)</WorkTimes>
        <WorkSection>
        Low code internship at FPT Software Nha Trang.
        </WorkSection>
        <br/>
        <WorkTimes>✎ 3 months (10/2023 - 12/2023)</WorkTimes>
        <WorkSection>
          React and PHP internship at Infordation Vietnam.
        </WorkSection>
        <br/>
        <WorkTimes>✎ 6 months (05/2024 - 10/2024)</WorkTimes>
        <WorkSection>
          React and Dotnet internship, up to fresher at VNPT software Nha Trang. 
        </WorkSection>
        <br/>
        <WorkTimes>✎ In 2024</WorkTimes>
        <WorkSection>
          Graduated from Nha Trang University with a degree in Information Technology.
        </WorkSection>
        <br/>
        </Section>
      </Container>
    </Layout>
  );
}
