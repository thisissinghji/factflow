import { Html, Head, Main, NextScript } from 'next/document'
import type { AppProps } from 'next/app';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Fact Flow</title>
      <link rel="icon" href="/favi.jpg" type="image/jpg" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
