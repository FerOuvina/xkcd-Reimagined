import { Layout } from "@/layout/Layout";
import { Container, Text } from "@nextui-org/react";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useI18N } from "@/context/i18n";

export default function About() {
  const { t } = useI18N();

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
          {t("ABOUT_TITLE")}
        </Text>
        <Text blockquote size={25} css={{ textAlign: "center" }}>
          {t("ABOUT_DESCRIPTION_AUTHOR")}{" "}
          <Link
            href="https://github.com/FerOuvina"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fernando Ouvi&#241;a
          </Link>{" "}
          <br />
          {t("ABOUT_DESCRIPTION")}
          <br />
          <br />
          {t("ABOUT_REPOSITORY")}{" "}
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
          {t("ABOUT_ORIGINAL_AUTHOR")} <br />
          {t("ABOUT_ORIGINAL_AUTHOR_WEBSITE")}:{" "}
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
