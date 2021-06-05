import Head from 'next/head'

import '../styles/globals.css'
import Sidebar from '../components/Sidebar'

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Bojack</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <Sidebar>
                <Component {...pageProps} />
            </Sidebar>
        </>
    )
}

export default MyApp
