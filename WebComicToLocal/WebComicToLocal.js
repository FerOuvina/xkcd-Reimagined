import fs from "fs-extra";
import axios from "axios";
import { getImageSize } from "./getImageSize.js";
import { log, time } from "./log.js";

const initialID = 2700;
const maxId = 2768;
const endTime = time(`Ended in`);

for (let i = initialID; i < maxId; i++) {
  const url = `https://xkcd.com/${i}/info.0.json`;
  log(`Getting ${url}...`);
  const { data } = await axios.get(url);
  const { num: id, news, transcript, img, ...restOfComic } = data;
  log(`Writing comic #${id}...`);
  const { width, height } = await getImageSize({ url: img });
  log(`Getting img dimension`);
  log(`Got img dimension: ${width}x${height}px`);
  const comic = {
    id,
    img,
    width,
    height,
    ...restOfComic,
  };

  const filePath = `./WebComicToLocal/comics/${id}.json`;
  await fs.outputJSON(filePath, comic);
  log(`Wrote comic #${id} to ${filePath}`);
}

endTime();
