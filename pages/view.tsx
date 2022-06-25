import type {InferGetServerSidePropsType, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'
import Script from "next/script";
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const url = context.query['url'] as string;
    const reader = context.query['reader'] as string ?? 'false';
    const bypass = context.query['bypass'] as string ?? 'false';
    return {
        props: {
            url,
            reader,
            bypass
        }
    }
}

const Viewer: NextPage = ({ url, reader, bypass }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Highlighter Anywhere</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <iframe className={styles.content} src={`/api/hello?url=${url}&reader=${reader}&bypass=${bypass}`}/>
            <div className={styles.toolbox}>
                <Link href={url}>← Back to original page</Link>
                <div className={styles.flexSeparator}/>
                <Link href={'/library'}>Go to library →</Link>
            </div>

            <Script data-domain="highl.it" src="https://analytics.huy.rocks/js/plausible.js"></Script>
        </div>
    )
}

export default Viewer
