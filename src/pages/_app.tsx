import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Loading />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
