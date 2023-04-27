const prefix = "[WebComicToLocal]";

export const log = (...args) => console.log(prefix, ...args);

export const time = (string = "") => {
  console.time(`${prefix} ${string}`);
  return () => console.timeEnd(`${prefix} ${string}`);
};
