import fs from "fs/promises";
import Head from "next/head";
import Image from "next/image";
import { basename } from "path";
import { Container, Text, Link } from "@nextui-org/react";
import { Layout } from "@/layout/Layout";
import { Footer } from "@/components/Footer";

export default function Comic({
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
  return (
    <>
      <Layout>
        <Head>
          <title>xkcd - Reimagined || Comics for Devs</title>
          <meta name="description" content="Comics for developers" />
        </Head>

        <Container as="section">
          <Text h1>{title}</Text>
          <Image width={width} height={height} src={img} alt={alt}></Image>
          <Text>{alt}</Text>
        </Container>

        <Container as="section" display="flex" justify="space-evenly">
          {hasPrevRes && (
            <Link href={`/comic/${prevId}`}>
              <Text>Previous</Text>
            </Link>
          )}
          {hasNextRes && (
            <Link href={`/comic/${nextId}`}>
              <Text>Next</Text>
            </Link>
          )}
        </Container>
        <Footer />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const files = await fs.readdir("./WebComicToLocal/comics");

  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
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

  // return total amount of comics
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
