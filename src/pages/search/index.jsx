import Head from "next/head";
import { Layout } from "@/layout/Layout";
import { Container, Text } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { search } from "../../services/search.js";
import { Footer } from "@/components/Footer.jsx";

export default function Search({ query, results }) {
  return (
    <Layout>
      <Head>
        <title>Results for {query} || xkcd - Reimagined</title>
        <meta
          name="description"
          content={`Search results for ${query} on xkcd`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container as="section">
        <h1>Search results for {query}</h1>
        {results.map((result) => {
          return (
            <Link key={result.id} href={`/comic/${result.id}`}>
              <Image
                src={result.img}
                alt={result.title}
                width={200}
                height={200}
              ></Image>
              <Text h2>{result.title}</Text>
            </Link>
          );
        })}
      </Container>
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}
