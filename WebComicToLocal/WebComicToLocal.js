import fs from "fs-extra";
import axios from "axios";

const initialID = 2700;
const maxId = 2710;

for (let i = initialID; i < maxId; i++) {
  const url = `https://xkcd.com/${i}/info.0.json`;
  const { data } = await axios.get(url);
  const { num: id, news, transcript, ...restOfComic } = data;

  const comic = {
    id,
    news,
    transcript,
    ...restOfComic,
  };

  const filePath = `./WebComicToLocal/comics/${id}.json`;
  await fs.outputJSON(filePath, comic);
  console.log(data);
}
