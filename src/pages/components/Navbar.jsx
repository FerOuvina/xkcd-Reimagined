import { Text, Navbar, Input } from "@nextui-org/react";
import { SearchIcon } from "../layout/SearchIcon";
import { Layout } from "../layout/Layout";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <Layout>
      <Navbar>
        <Navbar.Brand>
          <Link href="/">
            <Text b color="inherit" className="nav-link">
              PokeNext
            </Text>
          </Link>
        </Navbar.Brand>

        <Navbar.Content
          enableCursorHighlight
          color="primary"
          variant="default"
          className="nav-content"
        >
          <Link href="/About">
            <Text b color="inherit" className="nav-link">
              About
            </Text>
          </Link>

          <Link href="Contact">
            <Text b color="inherit" className="nav-link">
              Contact
            </Text>
          </Link>

          <Navbar.Item>
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              placeholder="Search..."
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
