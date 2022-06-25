import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: 'Work Sans'
    }
}, withDefaultColorScheme({
    colorScheme: "green",
}));

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/> 
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp
