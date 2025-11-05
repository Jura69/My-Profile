import {
  Container, Box, Heading, useColorModeValue, Button, List,
  ListItem, Link, Badge, SimpleGrid
} from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons'
import Image from "next/image";
import Layout from "../../components/layouts/article";
import Section from "../../components/section";
import Paragraph from "../../components/paragraph";
import { IoLogoInstagram, IoLogoGithub, IoLogoFacebook, IoLogoGoogle, IoLogoLinkedin } from 'react-icons/io5'
import { WorkSection, WorkTimes } from "../../components/bio";
import NextLink from 'next/link'
import SEO from "../../components/seo";
import { PersonSchema, WebsiteSchema, ProfilePageSchema } from "../../components/json-ld";

export default function Home() {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = '/files/CV.pdf'; 
    link.setAttribute('download', 'TuanLoc_CV.pdf'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Layout>
      <SEO
        title="Trương Tuấn Lộc - Full-stack Developer | React, Node.js, C# Expert"
        description="Full-stack developer with expertise in React, Node.js, and C#. Currently working at CREASIA. Building scalable web applications, backend services, and mobile apps with Flutter. View my portfolio and projects."
        keywords="Trương Tuấn Lộc, Jura69, Full-stack Developer, React Developer, Node.js Developer, C# Developer, Web Development, Backend Developer, Frontend Developer, Portfolio, CREASIA, Nha Trang University, Vietnam Developer"
        type="profile"
      />
      <PersonSchema />
      <WebsiteSchema />
      <ProfilePageSchema />
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
          Hello, I&apos;m a web developer based in Việt Nam
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Trương Tuấn Lộc
            </Heading>
            <p>Jura69 ( Developer / Audiophile / Designer )</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="teal.400"
              borderWidth={2}
              borderStyle="solid"
              w="100px"
              h="100px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                src="/images/loc.jpeg"
                alt="Profile image"
                width="100"
                height="100"
                priority
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            About Me ♥️
          </Heading>
          <Paragraph textAlign="justify" lineHeight="tall">
            Full-stack developer with expertise in building scalable web applications and backend services. Currently working as a React and C# developer at CREASIA, with over 1+ year of experience in Node.js backend development. Passionate about creating efficient, user-friendly solutions and continuously learning new technologies. Skilled in both frontend and backend development, with additional experience in graphic design and video editing.
          </Paragraph>
          <Box align="center" my={6}>
            <Button
              as={NextLink}
              href="/works"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="green"
            >
              My Personal Projects
            </Button>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Skills & Technologies 💻
          </Heading>
          <Box mt={4}>
            <Heading as="h4" fontSize={16} mb={2} mt={3}>
              Frontend
            </Heading>
            <SimpleGrid columns={[2, 3, 4]} gap={3}>
              <Badge colorScheme="green" p={2} borderRadius="md" textAlign="center">React.js</Badge>
              <Badge colorScheme="green" p={2} borderRadius="md" textAlign="center">Next.js</Badge>
              <Badge colorScheme="green" p={2} borderRadius="md" textAlign="center">Flutter</Badge>
              <Badge colorScheme="green" p={2} borderRadius="md" textAlign="center">Chakra UI</Badge>
              <Badge colorScheme="green" p={2} borderRadius="md" textAlign="center">HTML/CSS</Badge>
              <Badge colorScheme="green" p={2} borderRadius="md" textAlign="center">JavaScript</Badge>
            </SimpleGrid>

            <Heading as="h4" fontSize={16} mb={2} mt={4}>
              Backend
            </Heading>
            <SimpleGrid columns={[2, 3, 4]} gap={3}>
              <Badge colorScheme="blue" p={2} borderRadius="md" textAlign="center">Node.js</Badge>
              <Badge colorScheme="blue" p={2} borderRadius="md" textAlign="center">C#</Badge>
              <Badge colorScheme="blue" p={2} borderRadius="md" textAlign="center">Express.js</Badge>
              <Badge colorScheme="blue" p={2} borderRadius="md" textAlign="center">MongoDB</Badge>
              <Badge colorScheme="blue" p={2} borderRadius="md" textAlign="center">SQL</Badge>
              <Badge colorScheme="blue" p={2} borderRadius="md" textAlign="center">REST API</Badge>
            </SimpleGrid>

            <Heading as="h4" fontSize={16} mb={2} mt={4}>
              Tools & Others
            </Heading>
            <SimpleGrid columns={[2, 3, 4]} gap={3}>
              <Badge colorScheme="purple" p={2} borderRadius="md" textAlign="center">Git</Badge>
              <Badge colorScheme="purple" p={2} borderRadius="md" textAlign="center">Docker</Badge>
              <Badge colorScheme="purple" p={2} borderRadius="md" textAlign="center">TensorFlow</Badge>
              <Badge colorScheme="purple" p={2} borderRadius="md" textAlign="center">Machine Learning</Badge>
              <Badge colorScheme="purple" p={2} borderRadius="md" textAlign="center">Photoshop</Badge>
              <Badge colorScheme="purple" p={2} borderRadius="md" textAlign="center">Video Editing</Badge>
            </SimpleGrid>
          </Box>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Work Experience 💼
          </Heading>
          <WorkTimes>✎ CREASIA | Current (06/2025 - Present)</WorkTimes>
          <WorkSection>
            React and C# fullstack developer at CREASIA.
          </WorkSection>
          <br />
          <WorkTimes>✎ Infordation Vietnam | 1+ years (12/2023 - 2/2025)</WorkTimes>
          <WorkSection>
            Junior NodeJS Backend Developer at Infordation Vietnam.
          </WorkSection>
          <br />
          <WorkTimes>✎ VNPT Khánh Hoà | 2 months (05/2023 - 07/2023)</WorkTimes>
          <WorkSection>
            React and C# internship at VNPT Khánh Hoà.
          </WorkSection>
          <br />
          <WorkTimes>✎ In 2024</WorkTimes>
          <WorkSection>
            Graduated from Nha Trang University with a degree in Information Technology.
          </WorkSection>
          <br />
          <Box align="center" my={4}>

            <Button
              onClick={downloadFile} // Gọi hàm tải xuống khi nhấp
              rightIcon={<ChevronRightIcon />}
              colorScheme="green"
            >
              Download CV
            </Button>
          </Box>
        </Section>
        <Section delay={0.4}>
          <Heading as="h3" variant="section-title">
            I ♥️
          </Heading>
          <Paragraph>
            Music, Photography, Machine Learning, Manga, Anime.
          </Paragraph>
          <br />
          <Heading as="h3" variant="section-title">
            Contact & Social 📧
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/Jura69" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoLogoGithub />}
                >
                  @Jura69
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.linkedin.com/in/tu%E1%BA%A5n-l%E1%BB%99c-b24b391ab/" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoLogoLinkedin />}
                >
                  Trương Tuấn Lộc
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.facebook.com/loc.truongtuanMT" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoLogoFacebook />}
                >
                  @Trương Tuấn Lộc
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.instagram.com/_midori_neko_/" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoLogoInstagram />}
                >
                  @_midori_neko_
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="mailto:Loctruongtuan@gmail.com">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoLogoGoogle />}
                >
                  Loctruongtuan@gmail.com
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>
      </Container>
    </Layout>
  );
}
