import type {NextPage} from 'next'
import Script from 'next/script'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Box, Button, Container, Divider, Flex, FormControl, FormLabel, Heading, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, List, ListItem, Spacer, Switch, Tag, Text, UnorderedList, VStack } from '@chakra-ui/react';
import Link from 'next/link'
import { FiHome, FiArchive, FiFolder, FiSearch, FiTag, FiUser } from 'react-icons/fi';
import dayjs from 'dayjs'

const LibraryData = [
    {
        "id": "https://nesslabs.com/speed-reading",
        "title": "The speed reading fallacy: the case for slow reading",
        "link": "https://nesslabs.com/speed-reading",
        "description": "About 2 million books get published every year in the world. The indexed web contains at least 5.75 billion pages. So much to read, so little time. In a world…",
        "pubDate": "Fri, 24 Jun 2022 16:28:13 GMT",
        "notes": 3,
        "tags": ["reading", "on-learning"]
    },
    {
        "id": "https://nesslabs.com/note-taking",
        "title": "The science of note-taking",
        "link": "https://nesslabs.com/note-taking",
        "description": "While note-taking feels natural to students, this is something many people stop doing once they start working, either as an employee or for themselves. We may…",
        "pubDate": "Fri, 24 Jun 2022 16:28:13 GMT",
        "notes": 16,
        "tags": ["done", "note-taking"]
    },
    {
        "id": "https://statmodeling.stat.columbia.edu/2019/09/13/deterministic-thinking-dichotomania/",
        "title": "Deterministic thinking (“dichotomania”): a problem in how we think, not just in how we act « Statistical Modeling, Causal Inference, and Social Science",
        "link": "https://statmodeling.stat.columbia.edu/2019/09/13/deterministic-thinking-dichotomania/",
        "description": "This has come up before: And it came up again recently. Epidemiologist Sander Greenland has written about “dichotomania: the compulsion to replace quantities…",
        "pubDate": "Fri, 24 Jun 2022 16:28:13 GMT",
        "notes": 2,
        "tags": ["on-learning"]
    },
    {
        "id": "https://www.lesswrong.com/posts/NfdHG6oHBJ8Qxc26s/the-zettelkasten-method-1",
        "title": "The Zettelkasten Method - LessWrong",
        "link": "https://www.lesswrong.com/posts/NfdHG6oHBJ8Qxc26s/the-zettelkasten-method-1",
        "description": "[Epistemic Status: Scroll to the bottom for my follow-up thoughts on this from months/years later.] Early this year, Conor White-Sullivan introduced me to the…",
        "pubDate": "Mon, 06 Sep 2021 07:46:00 GMT",
        "tags": ["note-taking"]
    }
];

const SideBarLinks = [
    {
        name: 'Inbox',
        icon: FiHome,
        url: ''
    },
    {
        name: 'Archived',
        icon: FiArchive,
        url: '/archived'
    },
    {
        name: 'Tags',
        icon: FiTag,
        url: '/tags'
    },
    {
        name: 'Folders',
        icon: FiFolder,
        url: '/folders'
    },
];

const Library: NextPage = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Head>
                <title>Highlight It! - Your Library</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Header */}
            <Box maxW={"full"} borderBottom={"1px"} borderColor={"gray.100"}>
                <Container maxW={"container.xl"} padding={6}>
                    <HStack spacing={3} alignItems={"center"}>
                        <Heading paddingLeft={6} paddingRight={6} width={"250px"} size="md">My Library</Heading>
                        <InputGroup flex={1}>
                            <InputLeftElement
                                pointerEvents='none'>
                                <Icon as={FiSearch} />
                            </InputLeftElement>
                            <Input placeholder='Search anything...' />
                        </InputGroup>
                        <HStack width={"300px"} justifyContent={"end"}>
                            <Link href={"/account"}>
                                <HStack>
                                    <Icon as={FiUser} />
                                    <Text>Huy</Text>
                                </HStack>
                            </Link>
                        </HStack>
                    </HStack>
                </Container>
            </Box>
            {/* Content */}
            <Container maxW="container.xl" padding={6}>
                <HStack spacing={3} alignItems={"start"}>
                    <VStack width={"250px"} padding={6} spacing={4} alignItems="start">
                        {SideBarLinks.map((item, idx: number) => (
                            <Link key={idx} href={`/library/${item.url}`}>
                                <Flex cursor={"pointer"} alignItems={"center"} _hover={{ color: "green.600" }}>
                                    <Icon as={item.icon} marginRight={2}></Icon>
                                    <Text>{item.name}</Text>
                                </Flex>
                            </Link>
                        ))}
                    </VStack>
                    <Box flex={1}>
                        <UnorderedList listStyleType={"none"} margin={0} padding={0}>
                            {LibraryData.map((item, idx: number) => (
                                <ListItem
                                    key={idx}
                                    cursor={"pointer"}
                                    borderBottom={"1px"}
                                    borderColor={"gray.50"}
                                    padding={4}
                                    borderRadius={"md"}
                                    marginBottom={4}
                                    _hover={{
                                        bg: "gray.50",
                                    }}>
                                    <Link href={`/${item.link}`}>
                                        <VStack spacing={1} alignItems="start">
                                            <Heading size={"md"}>{item.title}</Heading>
                                            <Text fontSize={"sm"} color={"gray.500"}>{item.link}</Text>
                                            <Text>{item.description}</Text>
                                            <HStack spacing={2}>
                                                <Text fontSize={"sm"} color={"gray.500"}>Saved on {dayjs(item.pubDate).format("DD/MM/YYYY")} · {item.notes || 0} notes</Text>
                                                {item.tags.map((tag, idx) => (
                                                    <Tag colorScheme={"gray"} key={idx}>{tag}</Tag>
                                                ))}
                                            </HStack>
                                        </VStack>
                                    </Link>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Box>
                    <Box width={"300px"} />
                </HStack>
            </Container>

            <Script data-domain="highl.it" src="https://analytics.huy.rocks/js/plausible.js"></Script>
        </div>
    )
}

export default Library
