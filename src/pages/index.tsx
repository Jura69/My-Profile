import {
    Container, Box, Heading, useColorModeValue, List, UnorderedList,
    ListItem, Link, SimpleGrid, Badge
} from "@chakra-ui/react"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router'
import { motion } from 'framer-motion'
import Layout from "../../components/layouts/article"
import Section from "../../components/section"
import Paragraph from "../../components/paragraph"
import { IoLogoInstagram, IoLogoGithub, IoLogoFacebook, IoLogoGoogle, IoLogoLinkedin } from 'react-icons/io5'
import { WorkSection, WorkTimes } from "../../components/bio"
import SEO from "../../components/seo"
import { PersonSchema, WebsiteSchema, ProfilePageSchema } from "../../components/json-ld"
import AnimatedBadge from "../../components/animated-badge"
import AnimatedWorkCard from "../../components/animated-work-card"
import AnimatedButton from "../../components/animated-button"

const MotionBox = motion(Box)

export default function Home() {
    const downloadFile = () => {
        const link = document.createElement('a')
        link.href = '/files/CV.pdf'
        link.setAttribute('download', 'TuanLoc_CV.pdf')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
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
                <MotionBox
                    borderRadius="lg"
                    mb={6}
                    mt={2}
                    p={3}
                    textAlign="center"
                    bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                    css={{ backdropFilter: 'blur(10px)' }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Hello, I&apos;m a web developer based in Việt Nam
                </MotionBox>
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
                        <MotionBox
                            borderColor="teal.400"
                            borderWidth={2}
                            borderStyle="solid"
                            w="100px"
                            h="100px"
                            display="inline-block"
                            borderRadius="full"
                            overflow="hidden"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            animate={{
                                boxShadow: [
                                    '0 0 0 0 rgba(56, 178, 172, 0.4)',
                                    '0 0 0 10px rgba(56, 178, 172, 0)',
                                    '0 0 0 0 rgba(56, 178, 172, 0)'
                                ]
                            }}
                            transition={{
                                boxShadow: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <img
                                src="/images/loc.jpeg"
                                alt="Profile image of Trương Tuấn Lộc"
                                width={100}
                                height={100}
                                style={{ objectFit: 'cover', width: '100px', height: '100px' }}
                            />
                        </MotionBox>
                    </Box>
                </Box>

                <Section delay={0.1}>
                    <Heading as="h3" variant="section-title">
                        About Me ♥️
                    </Heading>
                    <Paragraph>
                        Full-stack developer with expertise in building scalable web applications and backend services. Currently working as a React and C# developer at CREASIA, with over 1+ year of experience in Node.js backend development. Passionate about creating efficient, user-friendly solutions and continuously learning new technologies. Skilled in both frontend and backend development, with additional experience in graphic design and video editing.
                    </Paragraph>
                    <Box textAlign="center" my={6}>
                        <AnimatedButton
                            as={RouterLink}
                            to="/works"
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="green"
                        >
                            My Personal Projects
                        </AnimatedButton>
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
                            <AnimatedBadge colorScheme="green" delay={0.1}>React.js</AnimatedBadge>
                            <AnimatedBadge colorScheme="green" delay={0.15}>Next.js</AnimatedBadge>
                            <AnimatedBadge colorScheme="green" delay={0.2}>Flutter</AnimatedBadge>
                            <AnimatedBadge colorScheme="green" delay={0.25}>Chakra UI</AnimatedBadge>
                            <AnimatedBadge colorScheme="green" delay={0.3}>HTML/CSS</AnimatedBadge>
                            <AnimatedBadge colorScheme="green" delay={0.35}>JavaScript</AnimatedBadge>
                        </SimpleGrid>

                        <Heading as="h4" fontSize={16} mb={2} mt={4}>
                            Backend
                        </Heading>
                        <SimpleGrid columns={[2, 3, 4]} gap={3}>
                            <AnimatedBadge colorScheme="blue" delay={0.4}>Node.js</AnimatedBadge>
                            <AnimatedBadge colorScheme="blue" delay={0.45}>C#</AnimatedBadge>
                            <AnimatedBadge colorScheme="blue" delay={0.5}>Express.js</AnimatedBadge>
                            <AnimatedBadge colorScheme="blue" delay={0.55}>MongoDB</AnimatedBadge>
                            <AnimatedBadge colorScheme="blue" delay={0.6}>SQL</AnimatedBadge>
                            <AnimatedBadge colorScheme="blue" delay={0.65}>REST API</AnimatedBadge>
                        </SimpleGrid>

                        <Heading as="h4" fontSize={16} mb={2} mt={4}>
                            Tools & Others
                        </Heading>
                        <SimpleGrid columns={[2, 3, 4]} gap={3}>
                            <AnimatedBadge colorScheme="purple" delay={0.7}>Git</AnimatedBadge>
                            <AnimatedBadge colorScheme="purple" delay={0.75}>Docker</AnimatedBadge>
                            <AnimatedBadge colorScheme="purple" delay={0.8}>TensorFlow</AnimatedBadge>
                            <AnimatedBadge colorScheme="purple" delay={0.85}>Machine Learning</AnimatedBadge>
                            <AnimatedBadge colorScheme="purple" delay={0.9}>Photoshop</AnimatedBadge>
                            <AnimatedBadge colorScheme="purple" delay={0.95}>Video Editing</AnimatedBadge>
                        </SimpleGrid>
                    </Box>
                </Section>

                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        Work Experience 💼
                    </Heading>

                    <AnimatedWorkCard delay={0.1}>
                        <WorkTimes>🏢 CREASIA | Full-stack Developer</WorkTimes>
                        <Box fontSize="sm" color="gray.500" mb={2}>
                            June 2025 - Present · Full-time
                        </Box>
                        <WorkSection>
                            Building scalable web applications using React and C# with focus on clean architecture and user experience.
                        </WorkSection>
                        <Box pl="1.5em" mt={2}>
                            <UnorderedList pl={4} spacing={1}>
                                <li>Develop and maintain full-stack applications with React frontend and C# backend</li>
                                <li>Collaborate with cross-functional teams to deliver high-quality features</li>
                                <li>Implement responsive UI/UX designs and optimize application performance</li>
                            </UnorderedList>
                        </Box>
                        <Box pl="1.5em" mt={2}>
                            <SimpleGrid columns={[2, 3, 4]} gap={2}>
                                <Badge colorScheme="cyan" fontSize="xs">React</Badge>
                                <Badge colorScheme="cyan" fontSize="xs">C#</Badge>
                                <Badge colorScheme="cyan" fontSize="xs">.NET</Badge>
                                <Badge colorScheme="cyan" fontSize="xs">SQL Server</Badge>
                            </SimpleGrid>
                        </Box>
                    </AnimatedWorkCard>

                    <AnimatedWorkCard delay={0.2}>
                        <WorkTimes>🚀 Infordation Vietnam | Junior Backend Developer</WorkTimes>
                        <Box fontSize="sm" color="gray.500" mb={2}>
                            December 2023 - February 2025 · 1 year 3 months
                        </Box>
                        <WorkSection>
                            Specialized in Node.js backend development, building RESTful APIs and microservices for enterprise applications.
                        </WorkSection>
                        <Box pl="1.5em" mt={2}>
                            <UnorderedList pl={4} spacing={1}>
                                <li>Designed and implemented RESTful APIs serving 10,000+ daily active users</li>
                                <li>Optimized database queries reducing response time by 40%</li>
                                <li>Integrated third-party services and payment gateways</li>
                                <li>Collaborated with frontend team to ensure seamless API integration</li>
                            </UnorderedList>
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
                    </AnimatedWorkCard>

                    <AnimatedWorkCard delay={0.3}>
                        <WorkTimes>📚 VNPT Khánh Hoà | Software Developer Intern</WorkTimes>
                        <Box fontSize="sm" color="gray.500" mb={2}>
                            May 2023 - July 2023 · 3 months
                        </Box>
                        <WorkSection>
                            Internship focused on full-stack development with React and C#, working on internal management systems.
                        </WorkSection>
                        <Box pl="1.5em" mt={2}>
                            <UnorderedList pl={4} spacing={1}>
                                <li>Developed internal web applications using React and C#</li>
                                <li>Learned enterprise software development practices</li>
                                <li>Participated in code reviews and agile development processes</li>
                            </UnorderedList>
                        </Box>
                        <Box pl="1.5em" mt={2}>
                            <SimpleGrid columns={[2, 3, 4]} gap={2}>
                                <Badge colorScheme="blue" fontSize="xs">React</Badge>
                                <Badge colorScheme="blue" fontSize="xs">C#</Badge>
                                <Badge colorScheme="blue" fontSize="xs">.NET</Badge>
                                <Badge colorScheme="blue" fontSize="xs">SQL</Badge>
                            </SimpleGrid>
                        </Box>
                    </AnimatedWorkCard>

                    <AnimatedWorkCard delay={0.4}>
                        <WorkTimes>🎓 Nha Trang University</WorkTimes>
                        <Box fontSize="sm" color="gray.500" mb={2}>
                            Graduated 2024
                        </Box>
                        <WorkSection>
                            Bachelor&apos;s Degree in Information Technology
                        </WorkSection>
                        <Box pl="1.5em" mt={2}>
                            <UnorderedList pl={4} spacing={1}>
                                <li>Focus on Software Engineering and Web Development</li>
                                <li>Completed projects in Machine Learning and Full-stack Development</li>
                            </UnorderedList>
                        </Box>
                    </AnimatedWorkCard>

                    <Box textAlign="center" my={6}>
                        <AnimatedButton
                            onClick={downloadFile}
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="green"
                            size="lg"
                        >
                            Download Full CV
                        </AnimatedButton>
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
                                <AnimatedButton variant="ghost" colorScheme="teal" leftIcon={<IoLogoGithub />}>
                                    @Jura69
                                </AnimatedButton>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://www.linkedin.com/in/tu%E1%BA%A5n-l%E1%BB%99c-b24b391ab/" target="_blank">
                                <AnimatedButton variant="ghost" colorScheme="teal" leftIcon={<IoLogoLinkedin />}>
                                    Trương Tuấn Lộc
                                </AnimatedButton>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://www.facebook.com/loc.truongtuanMT" target="_blank">
                                <AnimatedButton variant="ghost" colorScheme="teal" leftIcon={<IoLogoFacebook />}>
                                    @Trương Tuấn Lộc
                                </AnimatedButton>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="https://www.instagram.com/_midori_neko_/" target="_blank">
                                <AnimatedButton variant="ghost" colorScheme="teal" leftIcon={<IoLogoInstagram />}>
                                    @_midori_neko_
                                </AnimatedButton>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="mailto:Loctruongtuan@gmail.com">
                                <AnimatedButton variant="ghost" colorScheme="teal" leftIcon={<IoLogoGoogle />}>
                                    Loctruongtuan@gmail.com
                                </AnimatedButton>
                            </Link>
                        </ListItem>
                    </List>
                </Section>
            </Container>
        </Layout>
    )
}
