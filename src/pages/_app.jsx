import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { NavigationBar } from "../components/Navbar";

const darkTheme = createTheme({
  type: "dark",
});

const lightTheme = createTheme({
  type: "light",
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <NavigationBar />
        <Component {...pageProps} />
      </NextUIProvider>
    </ThemeProvider>
  );
}
