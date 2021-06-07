import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'

import Head from 'next/head'
import Sidebar from '../components/sidebar'

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
