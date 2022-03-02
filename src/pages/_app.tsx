import "../App.css"
import "../index.css"
import "../normalize.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import "../style.css"

import { AppProps } from "next/app"

import Head from "next/head"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
