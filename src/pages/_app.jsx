import { NextUIProvider, createTheme } from "@nextui-org/react";
import { NavigationBar } from "../components/Navbar";
import Head from "next/head";

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
      <NavigationBar />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
