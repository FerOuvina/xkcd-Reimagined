import { useState, useRef } from "react";
import { Text, Navbar, Input, Dropdown } from "@nextui-org/react";
import { SearchIcon } from "../layout/SearchIcon";
import { useRouter } from "next/router";
import Link from "next/link";
import { useI18N } from "@/context/i18n";

function NavigationBar() {
  const { t } = useI18N();
  const { locale, locales } = useRouter();

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

  const restOfLocales = locales.filter((l) => l !== locale);

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
        <Link aria-label="Brand" href={`/${locale}/`}>
          <Text
            b
            color="default"
            aria-label="Brand"
            className="nav-link"
            css={{
              transition: "all 1s ease",
              padding: "0.5rem",
              "&:hover": {
                color: "#fcc5d8",
              },
            }}
          >
            {t("NAVBAR_BRAND")}
          </Text>
        </Link>
      </Navbar.Brand>

      <Navbar.Content
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
        <Navbar.Link href={`/${locale}/`} aria-label="Home">
          <Text
            b
            color="default"
            className="nav-link"
            css={{
              transition: "all 1s ease",
              "&:hover": {
                color: "#fcc5d8",
              },
            }}
          >
            {t("NAVBAR_HOME")}
          </Text>
        </Navbar.Link>

        <Navbar.Link href={`/${locale}/about/${locale}`} aria-label="About">
          <Text
            b
            color="inherit"
            className="nav-link"
            css={{
              transition: "all 1s ease",
              "&:hover": {
                color: "#fcc5d8",
              },
            }}
          >
            {t("NAVBAR_ABOUT")}
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
              color="error"
              contentLeftStyling={false}
              placeholder={t("NAVBAR_SEARCH_PLACEHOLDER")}
              aria-label="Search"
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents9)" size={16} />
              }
            />
          </form>
        </Navbar.Item>
        <Dropdown>
          <Navbar.Item>
            <Dropdown.Button color={"error"} />
          </Navbar.Item>

          <Dropdown.Menu aria-label="Locale">
            <Dropdown.Item>
              <Link href="/" locale={restOfLocales[0]}>
                <Text color="primary">Locale: {restOfLocales}</Text>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    </Navbar>
  );
}

export { NavigationBar };
