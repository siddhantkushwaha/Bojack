import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'

import Head from 'next/head'
import Sidebar from '../components/sidebar'

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Siddhant Kushwaha</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
                        crossOrigin="anonymous"/>
            </Head>
            <Sidebar>
                <Component {...pageProps} />
            </Sidebar>
        </>
    )
}

export default MyApp
