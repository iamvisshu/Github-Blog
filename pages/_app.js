import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"   // <-- set Light as default
      enableSystem={false}   // <-- don't auto-follow system; optional but keeps default stable
    >
      <Head>
        {/* Keep viewport and title here; favicon is added in _document.js for SSR */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Vishal's Blog</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}