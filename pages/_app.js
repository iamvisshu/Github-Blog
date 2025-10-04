import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
