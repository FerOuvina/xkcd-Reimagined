import algoliasearch from "algoliasearch/lite";

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

const client = algoliasearch(APP_ID, API_KEY);
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
