import { Container, Text } from "@nextui-org/react";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <Container
        as="footer"
        display="flex"
        justify="space-evenly"
        css={{
          marginTop: "2rem",
        }}
      >
        <Text h6>
          Comics by{" "}
          <Link href="https://xkcd.com/" target="_blank" rel="noreferrer">
            xkcd
          </Link>
        </Text>

        <Text h6>
          Website by{" "}
          <Link
            href="https://github.com/FerOuvina"
            target="_blank"
            rel="noreferrer"
          >
            Fernando Ouvi&#241;a
          </Link>
        </Text>
      </Container>
    </>
  );
}
