import {
  Container, Box, Heading, useColorModeValue, Button, List,
  ListItem, Link
} from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons'
import Image from "next/image";
import Layout from "../../components/layouts/article";
import Section from "../../components/section";
import Paragraph from "../../components/paragraph";
import { IoLogoInstagram, IoLogoGithub, IoLogoFacebook, IoLogoGoogle } from 'react-icons/io5'
import { WorkSection, WorkTimes } from "../../components/bio";
import NextLink from 'next/link'

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
            <p>Jura69 ( Developer / Audiophile / Designer )</p>
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
                src="/images/loc.jpeg"
                alt="Profile image"
                width="100"
                height="100"
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            About me ♥️
          </Heading>
          <Paragraph>
            A technology enthusiast on the path to becoming a programmer, with quick adaptability and flexibility. In addition to my programming experience, I also have a background in graphic design and video editing. I am always looking for opportunities to explore and learn new technologies, applying them to launch products—from planning and design to solving real-world problems with code.
          </Paragraph>
          <Box align="center" my={4}>
            <Button
              as={NextLink}
              href="/works"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="green"
            >
              My Persional Projects
            </Button>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Work Experience 💼
          </Heading>
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
              My Text CV
            </Button>
          </Box>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I ♥️
          </Heading>
          <Paragraph>
            Music, Photography, Machine Learning, Manga, Anime.
          </Paragraph>
          <br />
          <Heading as="h3" variant="section-title">
            On the web
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
              <Link href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJfrtHTLFVhThklSMBvJhvNJDkFfVzfZXghfRXlDMvWgzCKMZqZsBdBhxnRvPsjZdcdFjXB" target="_blank">
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
