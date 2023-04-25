import Head from "next/head";
import fs from "fs/promises";
import Image from "next/image";
import { Link } from "@nextui-org/react";

export default function Home({ latestComics }) {
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h2>Latest Comics</h2>
        {latestComics.map((comic) => (
          <Link href="/comic/[id]" key={comic.id}>
            <article>
              <h3>{comic.title}</h3>
              <Image
                src={comic.img}
                alt={comic.title}
                width={200}
                height={200}
              />
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir(`./WebComicToLocal/comics`);
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
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
