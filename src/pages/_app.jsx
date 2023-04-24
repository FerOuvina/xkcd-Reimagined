import { NextUIProvider} from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import NavigationBar from "./components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <NextUIProvider>
        <NavigationBar />
        <Component {...pageProps} />
      </NextUIProvider>
    </ThemeProvider>
  );
}
