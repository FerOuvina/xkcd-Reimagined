import { Layout } from "@/layout/Layout";
import { Container, Grid, Text } from "@nextui-org/react";
import { search } from "../../services/search.js";
import { Footer } from "@/components/Footer.jsx";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Search({ query, results }) {
  return (
    <Layout>
      <Head>
        <title>{`Results for ${query} || xkcd - Reimagined`}</title>
        <meta
          name="description"
          content={`Search results for ${query} on xkcd`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container display="flex" justify="center">
        <Text h1>
          Search results for{" "}
          <Text span color="warning">
            {query}
          </Text>
        </Text>

        <Grid.Container justify="center" gap={2} as="section">
          {results.map((result) => {
            return (
              <Grid
                xs={6}
                sm={4}
                md={3}
                xl={2}
                key={result.id}
                justify="center"
                as="article"
                css={{
                  padding: "1rem",
                  margin: "0.4rem",
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
                <Link href={`/comic/${result.id}`}>
                  <Image
                    className="img-result"
                    src={result.img}
                    alt={result.title}
                    width={250}
                    height={250}
                  ></Image>
                  <Text className="text-result" color="warning" size={20}>
                    {result.title}
                  </Text>
                </Link>
              </Grid>
            );
          })}
        </Grid.Container>
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
