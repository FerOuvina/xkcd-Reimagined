import fs from "fs/promises";
import Head from "next/head";
import Image from "next/image";
import { Container, Link, Text } from "@nextui-org/react";
import { Layout } from "@/layout/Layout";
import { Footer } from "@/components/Footer";

export default function Home({ latestComics }) {
  return (
    <Layout>
      <Head>
        <title>xkcd - Reimagined || Comics for Devs</title>
      </Head>

      <section>
        <Text h2 size="$3xl">
          Latest Comics
        </Text>
        {latestComics.map((comic) => {
          return (
            <article key={comic.id}>
              <Link href={`/comic/${comic.id}`}>
                <Container
                  display="flex"
                  direction="column"
                  gap={1}
                  justify="center"
                  alignItems="center"
                >
                  <Text h3 size="$2xl">
                    {comic.title}
                  </Text>
                  <Image
                    src={comic.img}
                    alt={comic.alt}
                    width={comic.width}
                    height={comic.height}
                    id={comic.id}
                  />
                </Container>
              </Link>
            </article>
          );
        })}
      </section>
      <Footer />
    </Layout>
  );
}

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
