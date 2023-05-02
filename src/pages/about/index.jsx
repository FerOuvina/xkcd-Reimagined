import { Layout } from "@/layout/Layout";
import { Container, Text } from "@nextui-org/react";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <Layout>
      <Container
        as="section"
        display="flex"
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
        css={{
          margin: "1rem",
          width: "100vw",
          height: "100%",
        }}
      >
        <Text h1 size={45}>
          About this project
        </Text>
        <Text blockquote size={25} css={{ textAlign: "center" }}>
          This is a reimagined version of the original page made by{" "}
          <Link
            href="https://github.com/FerOuvina"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fernando Ouvi&#241;a
          </Link>{" "}
          <br />
          This was made only for the porpouse of learning Next.js and NextUI.org
          <br />
          <br />
          The source code is available on{" "}
          <Link
            content="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/FerOuvina/xkcd-Reimagined"
          >
            GitHub
          </Link>
        </Text>
        <Text blockquote size={25} css={{ textAlign: "center" }}>
          All the resources used in this project belong to its original autor{" "}
          <br />
          The original page is available on:{" "}
          <Link
            href="https://xkcd.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            xkcd.com
          </Link>
        </Text>
      </Container>

      <Footer />
    </Layout>
  );
}
