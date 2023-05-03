import fs from "fs/promises";
import Head from "next/head";
import Image from "next/image";
import { Container, Link, Text } from "@nextui-org/react";
import { Layout } from "@/layout/Layout";
import { Footer } from "@/components/Footer";
import { useI18N } from "@/context/i18n.js";
import { useRouter } from "next/router";
import { memo } from "react";

const Home = memo(function Home({ latestComics }) {
  let comicsToRender = [];

  // Get the last comic id
  let maxId = 0;
  latestComics.forEach((comic) => {
    if (comic.id > maxId) {
      maxId = comic.id;
    }
  });

  // Getting the last 10 comics to render
  for (let i = maxId; i > maxId - 10; i--) {
    const comic = latestComics.find((comic) => comic.id === i);
    if (comic) {
      comicsToRender.push(comic);
    }
  }

  const { t } = useI18N();
  const { locale } = useRouter();

  return (
    <Layout>
      <Head>
        <title>{`xkcd - Reimagined || ${t("SEO_DEFAULT_TITLE")}`}</title>
      </Head>

      <Text h1 color="default">
        {t("LATEST_COMICS")}
      </Text>

      <Container as="section">
        {comicsToRender.map((comic) => {
          return (
            <Container
              as="article"
              key={comic.id}
              display="flex"
              justify="center"
              css={{}}
            >
              <Link
                href={`/${locale}/comic/${comic.id}`}
                css={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  margin: "0.6rem",
                  backgroundColor: "#16181A",
                  border: "1px solid #2C2F33",
                  borderRadius: "0.5rem",
                  boxShadow: "2px 2px 2px 1px #2C2F33",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "2px 2px 2px 1px #fcc5d8",
                  },
                }}
              >
                <Text
                  size={25}
                  color="warning"
                  css={{
                    paddingBottom: "0.5rem",
                  }}
                >
                  {comic.title}
                </Text>
                <Image
                  src={comic.img}
                  alt={comic.alt}
                  width={comic.width}
                  height={comic.height}
                  id={comic.id}
                />
              </Link>
            </Container>
          );
        })}
      </Container>
      <Footer />
    </Layout>
  );
});

export default Home;

export async function getStaticProps() {
  const files = await fs.readdir(`./WebComicToLocal/comics`);

  const promisesReadFiles = files.map(async (file) => {
    const content = await fs.readFile(
      `./WebComicToLocal/comics/${file}`,
      "utf-8"
    );
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
