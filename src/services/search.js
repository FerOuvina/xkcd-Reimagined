import algoliasearch from "algoliasearch/lite";

const client = algoliasearch("Z51W8B5MTT", "ec2af93ed756b7d6de96f5f016ae1ca8");
const index = client.initIndex("xkcd - Reimagined Index");

const CACHE = {};
export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };

  const { hits } = await index.search(query, {
    attributesToRetrieve: ["title", "num", "img", "id"],
    hitsPerPage: 10,
  });

  CACHE[query] = hits;

  return { results: hits };
};
