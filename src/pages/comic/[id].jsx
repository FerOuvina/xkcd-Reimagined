import fs from "fs/promises";
import Head from "next/head";
import Image from "next/image";
import { basename } from "path";
import { Container, Text, Link, Button } from "@nextui-org/react";
import { Layout } from "@/layout/Layout";
import { Footer } from "@/components/Footer";
import { useI18N } from "@/context/i18n";
import { memo } from "react";

const Comic = memo(function Comic({
  img,
  title,
  alt,
  width,
  height,
  prevId,
  nextId,
  hasNextRes,
  hasPrevRes,
}) {
  const { t } = useI18N();

  return (
    <Layout>
      <Head>
        <title>{`xkcd - Reimagined || ${t("SEO_DEFAULT_TITLE")}`}</title>
        <meta name="description" content="Comics for developers" />
      </Head>
      <Text h1>{title}</Text>
      <Container
        as="section"
        display="flex"
        direction="column"
        alignItems="center"
      >
        <Container
          as="article"
          display="flex"
          justify="center"
          css={{
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
          <Image
            className="comic-img"
            showSkeleton
            width={width}
            height={height}
            src={img}
            alt={alt}
          ></Image>
          <Text size={20} color="warning" css={{ margin: "1rem" }}>
            {alt}
          </Text>
        </Container>

        <Container as="section" display="flex" justify="space-evenly">
          {hasPrevRes && (
            <Link href={`/comic/${prevId}`} css={{ margin: "0.5rem" }}>
              <Button shadow rounded bordered color="gradient">
                <Text color="default" size={20}>
                  Previous
                </Text>
              </Button>
            </Link>
          )}
          {hasNextRes && (
            <Link href={`/comic/${nextId}`}>
              <Button shadow rounded bordered color="gradient">
                <Text color="default" size={20}>
                  Next
                </Text>
              </Button>
            </Link>
          )}
        </Container>
        <Footer />
      </Container>
    </Layout>
  );
});

export default Comic;

export async function getStaticPaths({ locales }) {
  const files = await fs.readdir("./WebComicToLocal/comics");
  let paths = [];

  locales.forEach((locale) => {
    paths = paths.concat(
      files.map((file) => {
        const id = basename(file, ".json");
        return { params: { id }, locale };
      })
    );
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await fs.readFile(
    `./WebComicToLocal/comics/${id}.json`,
    "utf-8"
  );
  const comic = JSON.parse(content);

  const totalComics = await fs.readdir("./WebComicToLocal/comics");
  const totalComicsAmout = totalComics.length;

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevRes, nextRes] = await Promise.allSettled([
    fs.stat(`./WebComicToLocal/comics/${prevId}.json`),
    fs.stat(`./WebComicToLocal/comics/${nextId}.json`),
  ]);

  const hasPrevRes = prevRes.status === "fulfilled";
  const hasNextRes = nextRes.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevRes,
      hasNextRes,
      prevId,
      nextId,
      totalComicsAmout,
    },
  };
}
