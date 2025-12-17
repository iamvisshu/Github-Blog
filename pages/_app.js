import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>Vishal's Blog - Learn and Explore Java Programming</title>

        {/* SEO Meta Tags */}
        <meta name="description" content="A comprehensive blog about Java programming, software development, and coding best practices by Vishal Viswakarma." />
        <meta name="author" content="Vishal Viswakarma" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Vishal's Blog - Learn and Explore Java Programming" />
        <meta property="og:description" content="A comprehensive blog about Java programming, software development, and coding best practices." />
        <meta property="og:image" content="https://vishalsblog.vercel.app/images/header.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vishal's Blog - Learn and Explore Java Programming" />
        <meta name="twitter:description" content="A comprehensive blog about Java programming, software development, and coding best practices." />
        <meta name="twitter:image" content="https://vishalsblog.vercel.app/images/header.webp" />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </Layout>
    </ThemeProvider>
  );
}