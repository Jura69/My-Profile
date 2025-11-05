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

          {/* CREASIA */}
          <Box mb={6}>
            <WorkTimes>🏢 CREASIA | Full-stack Developer</WorkTimes>
            <Box fontSize="sm" color="gray.500" mb={2}>
              June 2025 - Present · Full-time
            </Box>
            <WorkSection>
              Building scalable web applications using React and C# with focus on clean architecture and user experience.
            </WorkSection>
            <Box pl="1.5em" mt={2}>
              <Box as="ul" styleType="disc" pl={4} spacing={1}>
                <li>Develop and maintain full-stack applications with React frontend and C# backend</li>
                <li>Collaborate with cross-functional teams to deliver high-quality features</li>
                <li>Implement responsive UI/UX designs and optimize application performance</li>
              </Box>
            </Box>
            <Box pl="1.5em" mt={2}>
              <SimpleGrid columns={[2, 3, 4]} gap={2}>
                <Badge colorScheme="cyan" fontSize="xs">React</Badge>
                <Badge colorScheme="cyan" fontSize="xs">C#</Badge>
                <Badge colorScheme="cyan" fontSize="xs">.NET</Badge>
                <Badge colorScheme="cyan" fontSize="xs">SQL Server</Badge>
              </SimpleGrid>
            </Box>
          </Box>

          {/* Infordation Vietnam */}
          <Box mb={6}>
            <WorkTimes>🚀 Infordation Vietnam | Junior Backend Developer</WorkTimes>
            <Box fontSize="sm" color="gray.500" mb={2}>
              December 2023 - February 2025 · 1 year 3 months
            </Box>
            <WorkSection>
              Specialized in Node.js backend development, building RESTful APIs and microservices for enterprise applications.
            </WorkSection>
            <Box pl="1.5em" mt={2}>
              <Box as="ul" styleType="disc" pl={4} spacing={1}>
                <li>Designed and implemented RESTful APIs serving 10,000+ daily active users</li>
                <li>Optimized database queries reducing response time by 40%</li>
                <li>Integrated third-party services and payment gateways</li>
                <li>Collaborated with frontend team to ensure seamless API integration</li>
              </Box>
            </Box>
            <Box pl="1.5em" mt={2}>
              <SimpleGrid columns={[2, 3, 4]} gap={2}>
                <Badge colorScheme="green" fontSize="xs">Node.js</Badge>
                <Badge colorScheme="green" fontSize="xs">Express</Badge>
                <Badge colorScheme="green" fontSize="xs">MongoDB</Badge>
                <Badge colorScheme="green" fontSize="xs">Redis</Badge>
                <Badge colorScheme="green" fontSize="xs">Docker</Badge>
                <Badge colorScheme="green" fontSize="xs">AWS</Badge>
              </SimpleGrid>
            </Box>
          </Box>

          {/* VNPT Khánh Hoà */}
          <Box mb={6}>
            <WorkTimes>📚 VNPT Khánh Hoà | Software Developer Intern</WorkTimes>
            <Box fontSize="sm" color="gray.500" mb={2}>
              May 2023 - July 2023 · 3 months
            </Box>
            <WorkSection>
              Internship focused on full-stack development with React and C#, working on internal management systems.
            </WorkSection>
            <Box pl="1.5em" mt={2}>
              <Box as="ul" styleType="disc" pl={4} spacing={1}>
                <li>Developed internal web applications using React and C#</li>
                <li>Learned enterprise software development practices</li>
                <li>Participated in code reviews and agile development processes</li>
              </Box>
            </Box>
            <Box pl="1.5em" mt={2}>
              <SimpleGrid columns={[2, 3, 4]} gap={2}>
                <Badge colorScheme="blue" fontSize="xs">React</Badge>
                <Badge colorScheme="blue" fontSize="xs">C#</Badge>
                <Badge colorScheme="blue" fontSize="xs">.NET</Badge>
                <Badge colorScheme="blue" fontSize="xs">SQL</Badge>
              </SimpleGrid>
            </Box>
          </Box>

          {/* Education */}
          <Box mb={6}>
            <WorkTimes>🎓 Nha Trang University</WorkTimes>
            <Box fontSize="sm" color="gray.500" mb={2}>
              Graduated 2024
            </Box>
            <WorkSection>
              Bachelor&apos;s Degree in Information Technology
            </WorkSection>
            <Box pl="1.5em" mt={2}>
              <Box as="ul" styleType="disc" pl={4} spacing={1}>
                <li>Focus on Software Engineering and Web Development</li>
                <li>Completed projects in Machine Learning and Full-stack Development</li>
              </Box>
            </Box>
          </Box>

          <Box align="center" my={6}>
            <Button
              onClick={downloadFile}
              rightIcon={<ChevronRightIcon />}
              colorScheme="green"
              size="lg"
            >
              Download Full CV
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
