import type {NextPage} from 'next'
import Script from 'next/script'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Button, Divider, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

const Index: NextPage = () => {
    const router = useRouter();
    const [url, setUrl] = useState('');
    const [showError, setShowError] = useState(false);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

    const openHighlighter = () => {
        if (url.match(/https?:\/\/.*/)) {
            setShowError(false);
            router.push(`/${url}`);
        } else {
            setShowError(true);
        }
    };

    const openExample = () => {
        router.push(`/https://fs.blog/reading/`);
    };

    const openLibrary = () => {
        router.push(`/library`);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Highlight It!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Flex minH={"100vh"} align={"center"} justify={"center"}>
                <VStack maxWidth={400} spacing={5} textAlign={"center"}>
                    <Heading size={"2xl"}>Highlight It!</Heading>
                    <Text>Take note and highlight anywhere, anytime!</Text>
                    <Input
                        width={"full"}
                        placeholder='Enter an URL here...'
                        value={url}
                        onChange={handleInputChange}
                    ></Input>
                    {showError && (<Text color={"red"}>Please enter a valid URL!</Text>)}
                    <Button width={"full"} onClick={openHighlighter}>Try Instant Annotate</Button>
                    <Button width={"full"} variant={"link"} onClick={openExample}>See some examples</Button>
                    <Divider></Divider>
                    <Text>You can also create an account to manage your links online and access them from any device!</Text>
                    <Button onClick={openLibrary} width={"full"} variant={"outline"}>Create an account</Button>
                </VStack>
            </Flex>

            <Script data-domain="highl.it" src="https://analytics.huy.rocks/js/plausible.js"></Script>
        </div>
    )
}

export default Index
