import { Text, Navbar, Input } from "@nextui-org/react";
import { SearchIcon } from "../layout/SearchIcon";
import { Layout } from "../layout/Layout";
import Link from "next/link";

function NavigationBar() {
  return (
    <Layout>
      <Navbar isCompact aria-label="Navbar">
        <Navbar.Brand aria-label="Brand">
          <Link aria-label="Brand" href="/">
            <Text b color="default" aria-label="Brand" className="nav-link">
              XKCD - Reimagined
            </Text>
          </Link>
        </Navbar.Brand>

        <Navbar.Content
          enableCursorHighlight
          color="primary"
          variant="underline"
          className="nav-content"
          aria-label="Content"
        >
          <Navbar.Link href="/" aria-label="Home">
            <Text b color="inherit" className="nav-link">
              Home
            </Text>
          </Navbar.Link>

          <Navbar.Link href="/about" aria-label="About">
            <Text b color="inherit" className="nav-link">
              About
            </Text>
          </Navbar.Link>

          <Navbar.Link href="/contact" aria-label="Contact">
            <Text b color="inherit" className="nav-link">
              Contact
            </Text>
          </Navbar.Link>

          <Navbar.Item aria-label="Search">
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              placeholder="Search..."
              aria-label="Search"
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}

export { NavigationBar };
