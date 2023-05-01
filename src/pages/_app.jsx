import Head from "next/head";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { NavigationBar } from "../components/Navbar";
import { I18NProvider } from "../context/i18n.js";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    type: "dark",
    theme: {
      colors: {
        primary: "#4ADE7B",
        secondary: "#F9CB80",
        error: "#FCC5D8",
      },
    },
  });

  return (
    <NextUIProvider theme={theme}>
      <Head>
        <meta name="description" content="Comics for developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <I18NProvider>
        <NavigationBar />
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  );
}
