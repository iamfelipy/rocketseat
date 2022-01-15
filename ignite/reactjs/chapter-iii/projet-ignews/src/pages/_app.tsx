import { AppProps } from 'next/app';

import { Header } from '../components/Header';
import { SessionProvider } from "next-auth/react"

import "../styles/global.scss";
import { client } from '../services/prismic';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
