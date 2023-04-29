import { useState, useRef } from "react";
import { Text, Navbar, Input } from "@nextui-org/react";
import { SearchIcon } from "../layout/SearchIcon";
import { useRouter } from "next/router";
import Link from "next/link";

function NavigationBar() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchRef.current.value;
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
      searchRef.current.value = "";
    } else {
      router.push("/");
    }
  };

  const handleChange = (e) => {
    fetch(`/api/search?q=${e.target.value}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      })
      .catch((err) => console.log(err));

    return e.target.value;
  };

  return (
    <Navbar
      isBordered
      variant="floating"
      aria-label="Navbar"
      css={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar.Brand aria-label="Brand">
        <Link aria-label="Brand" href="/">
          <Text b color="default" aria-label="Brand" className="nav-link">
            XKCD - Reimagined
          </Text>
        </Link>
      </Navbar.Brand>

      <Navbar.Content
        enableCursorHighlight
        color="default"
        activeColor="error"
        variant="underline"
        className="nav-content"
        aria-label="Content"
        css={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar.Link href="/" aria-label="Home">
          <Text b color="default" className="nav-link">
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
          <form onSubmit={handleSubmit}>
            <Input
              type="search"
              onChange={handleChange}
              ref={searchRef}
              clearable
              underlined
              bordered
              color="error"
              contentLeftStyling={false}
              placeholder="Search..."
              aria-label="Search"
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents9)" size={16} />
              }
            />
          </form>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export { NavigationBar };
