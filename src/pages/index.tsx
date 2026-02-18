import {
    Container, Box, Heading, useColorModeValue, List, UnorderedList,
    ListItem, Link, SimpleGrid, Badge, Text, Flex
} from "@chakra-ui/react"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router'
import { motion } from 'framer-motion'
import Layout from "../../components/layouts/article"
import Section from "../../components/section"
import Paragraph from "../../components/paragraph"
import { IoLogoInstagram, IoLogoGithub, IoLogoFacebook, IoLogoGoogle, IoLogoLinkedin } from 'react-icons/io5'
import {
    SiReact, SiNextdotjs, SiFlutter, SiChakraui, SiHtml5, SiJavascript,
    SiNodedotjs, SiSharp, SiExpress, SiMongodb, SiDotnet,
    SiTensorflow, SiPytorch, SiOpenai, SiPython,
    SiGit, SiDocker, SiAdobephotoshop, SiAdobepremierepro, SiTypescript, SiRedis
} from 'react-icons/si'
import { DiMsqlServer } from 'react-icons/di'
import { WorkSection, WorkTimes } from "../../components/bio"
import SEO from "../../components/seo"
import { PersonSchema, WebsiteSchema, ProfilePageSchema } from "../../components/json-ld"
import SkillCard from "../../components/skill-card"
import SkillCategory from "../../components/skill-category"
import TimelineCard from "../../components/timeline-card"
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
                        Full-stack developer with expertise in building scalable web applications and backend services. Currently working as a React and C# developer at CREASIA, with over 1+ year of experience in Node.js backend development. Passionate about AI/ML technologies and creating efficient, user-friendly solutions. Skilled in both frontend and backend development, with hands-on experience in Machine Learning, TensorFlow, and prompt engineering.
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
                        <SkillCategory title="Frontend" color="#48BB78" delay={0.1}>
                            <SkillCard icon={SiReact} label="React.js" color="#61DAFB" delay={0.1} />
                            <SkillCard icon={SiNextdotjs} label="Next.js" color="#808080" delay={0.15} />
                            <SkillCard icon={SiFlutter} label="Flutter" color="#02569B" delay={0.2} />
                            <SkillCard icon={SiTypescript} label="TypeScript" color="#3178C6" delay={0.25} />
                            <SkillCard icon={SiChakraui} label="Chakra UI" color="#319795" delay={0.3} />
                            <SkillCard icon={SiJavascript} label="JavaScript" color="#F7DF1E" delay={0.35} />
                            <SkillCard icon={SiHtml5} label="HTML/CSS" color="#E34F26" delay={0.4} />
                        </SkillCategory>

                        <SkillCategory title="Backend" color="#4299E1" delay={0.2}>
                            <SkillCard icon={SiNodedotjs} label="Node.js" color="#339933" delay={0.15} />
                            <SkillCard icon={SiSharp} label="C#" color="#512BD4" delay={0.2} />
                            <SkillCard icon={SiDotnet} label=".NET" color="#512BD4" delay={0.25} />
                            <SkillCard icon={SiPython} label="Python" color="#3776AB" delay={0.3} />
                            <SkillCard icon={SiExpress} label="Express.js" color="#808080" delay={0.35} />
                            <SkillCard icon={SiMongodb} label="MongoDB" color="#47A248" delay={0.4} />
                            <SkillCard icon={DiMsqlServer} label="SQL Server" color="#CC2927" delay={0.45} />
                            <SkillCard icon={SiRedis} label="Redis" color="#DC382D" delay={0.5} />
                        </SkillCategory>

                        <SkillCategory title="AI & Machine Learning" color="#ED8936" delay={0.3}>
                            <SkillCard icon={SiTensorflow} label="TensorFlow" color="#FF6F00" delay={0.2} />
                            <SkillCard icon={SiPytorch} label="PyTorch" color="#EE4C2C" delay={0.25} />
                            <SkillCard icon={SiOpenai} label="OpenAI API" color="#808080" delay={0.3} />
                        </SkillCategory>

                        <SkillCategory title="Tools & Others" color="#9F7AEA" delay={0.4}>
                            <SkillCard icon={SiGit} label="Git" color="#F05032" delay={0.25} />
                            <SkillCard icon={SiDocker} label="Docker" color="#2496ED" delay={0.3} />
                            <SkillCard icon={SiAdobephotoshop} label="Photoshop" color="#31A8FF" delay={0.35} />
                            <SkillCard icon={SiAdobepremierepro} label="Premiere Pro" color="#9999FF" delay={0.4} />
                        </SkillCategory>
                    </Box>
                </Section>

                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        Work Experience 💼
                    </Heading>

                    <Box mt={6}>
                        <TimelineCard color="#319795" delay={0.1}>
                            <Heading as="h4" fontSize={16} fontWeight="bold">
                                🏢 CREASIA
                            </Heading>
                            <Text fontSize="sm" fontWeight="semibold" color="teal.400">
                                Full-stack Developer
                            </Text>
                            <Badge colorScheme="teal" fontSize="xs" mt={1} borderRadius="full" px={2}>
                                June 2025 - Present · Full-time
                            </Badge>
                            <Text fontSize="sm" mt={3} lineHeight="tall">
                                Building scalable web applications using React and C# with focus on clean architecture and user experience.
                            </Text>
                            <UnorderedList pl={4} spacing={1} mt={2} fontSize="sm">
                                <ListItem>Develop and maintain full-stack applications with React frontend and C# backend</ListItem>
                                <ListItem>Collaborate with cross-functional teams to deliver high-quality features</ListItem>
                                <ListItem>Implement responsive UI/UX designs and optimize application performance</ListItem>
                            </UnorderedList>
                            <Flex gap={2} mt={3} flexWrap="wrap">
                                <Badge colorScheme="cyan" fontSize="xs" borderRadius="full">React</Badge>
                                <Badge colorScheme="cyan" fontSize="xs" borderRadius="full">C#</Badge>
                                <Badge colorScheme="cyan" fontSize="xs" borderRadius="full">.NET</Badge>
                                <Badge colorScheme="cyan" fontSize="xs" borderRadius="full">SQL Server</Badge>
                            </Flex>
                        </TimelineCard>

                        <TimelineCard color="#48BB78" delay={0.2}>
                            <Heading as="h4" fontSize={16} fontWeight="bold">
                                🚀 Infordation Vietnam
                            </Heading>
                            <Text fontSize="sm" fontWeight="semibold" color="green.400">
                                Junior Backend Developer
                            </Text>
                            <Badge colorScheme="green" fontSize="xs" mt={1} borderRadius="full" px={2}>
                                Dec 2023 - Feb 2025 · 1 year 3 months
                            </Badge>
                            <Text fontSize="sm" mt={3} lineHeight="tall">
                                Specialized in Node.js backend development, building RESTful APIs and microservices for enterprise applications.
                            </Text>
                            <UnorderedList pl={4} spacing={1} mt={2} fontSize="sm">
                                <ListItem>Designed and implemented RESTful APIs serving 10,000+ daily active users</ListItem>
                                <ListItem>Optimized database queries reducing response time by 40%</ListItem>
                                <ListItem>Integrated third-party services and payment gateways</ListItem>
                                <ListItem>Collaborated with frontend team to ensure seamless API integration</ListItem>
                            </UnorderedList>
                            <Flex gap={2} mt={3} flexWrap="wrap">
                                <Badge colorScheme="green" fontSize="xs" borderRadius="full">Node.js</Badge>
                                <Badge colorScheme="green" fontSize="xs" borderRadius="full">Express</Badge>
                                <Badge colorScheme="green" fontSize="xs" borderRadius="full">MongoDB</Badge>
                                <Badge colorScheme="green" fontSize="xs" borderRadius="full">Redis</Badge>
                                <Badge colorScheme="green" fontSize="xs" borderRadius="full">Docker</Badge>
                                <Badge colorScheme="green" fontSize="xs" borderRadius="full">AWS</Badge>
                            </Flex>
                        </TimelineCard>

                        <TimelineCard color="#4299E1" delay={0.3}>
                            <Heading as="h4" fontSize={16} fontWeight="bold">
                                📚 VNPT Khánh Hoà
                            </Heading>
                            <Text fontSize="sm" fontWeight="semibold" color="blue.400">
                                Software Developer Intern
                            </Text>
                            <Badge colorScheme="blue" fontSize="xs" mt={1} borderRadius="full" px={2}>
                                May 2023 - Jul 2023 · 3 months
                            </Badge>
                            <Text fontSize="sm" mt={3} lineHeight="tall">
                                Internship focused on full-stack development with React and C#, working on internal management systems.
                            </Text>
                            <UnorderedList pl={4} spacing={1} mt={2} fontSize="sm">
                                <ListItem>Developed internal web applications using React and C#</ListItem>
                                <ListItem>Learned enterprise software development practices</ListItem>
                                <ListItem>Participated in code reviews and agile development processes</ListItem>
                            </UnorderedList>
                            <Flex gap={2} mt={3} flexWrap="wrap">
                                <Badge colorScheme="blue" fontSize="xs" borderRadius="full">React</Badge>
                                <Badge colorScheme="blue" fontSize="xs" borderRadius="full">C#</Badge>
                                <Badge colorScheme="blue" fontSize="xs" borderRadius="full">.NET</Badge>
                                <Badge colorScheme="blue" fontSize="xs" borderRadius="full">SQL</Badge>
                            </Flex>
                        </TimelineCard>

                        <TimelineCard color="#9F7AEA" delay={0.4} isLast>
                            <Heading as="h4" fontSize={16} fontWeight="bold">
                                🎓 Nha Trang University
                            </Heading>
                            <Text fontSize="sm" fontWeight="semibold" color="purple.400">
                                Bachelor&apos;s Degree in Information Technology
                            </Text>
                            <Badge colorScheme="purple" fontSize="xs" mt={1} borderRadius="full" px={2}>
                                Graduated 2024
                            </Badge>
                            <UnorderedList pl={4} spacing={1} mt={3} fontSize="sm">
                                <ListItem>Focus on Software Engineering and Web Development</ListItem>
                                <ListItem>Completed projects in Machine Learning and Full-stack Development</ListItem>
                            </UnorderedList>
                        </TimelineCard>
                    </Box>

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
