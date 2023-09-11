import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-M3KTQVTXVG"
      />
      <Script strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-M3KTQVTXVG');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
