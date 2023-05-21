import { comicProps } from "./property.mjs";

export const isHadProp = (property, defaultValue, inputValue) => {
  const isOrderFilter = comicProps[property].find((x) => x === inputValue)
    ? inputValue
    : false;
  return isOrderFilter ? inputValue : defaultValue;
};

export const replaceDataHk = (string, idx, val) => {
  const splited = string.split("-");
  splited.splice(idx - 1, 1, val);
  splited.push("0");
  return splited.join("-");
};

export const GenreValidator = (genres) => {
  const excludeGenres = [];
  const includeGenres = [];
  let hasExcludeGenre = false;

  genres.split(",").forEach((gen) => {
    if (!gen.indexOf("|")) {
      hasExcludeGenre = true;
      gen = gen.replace("|", "");
      gen = isHadProp("genres", "", gen);
      excludeGenres.push(gen);
    } else {
      gen = isHadProp("genres", "", gen);
      includeGenres.push(gen);
    }
  });

  let temp = [includeGenres, excludeGenres];
  temp = temp.map((type) => {
    return type.filter((str) => str !== "");
  });

  if (temp[0].length === 0 && temp[1].length === 0) {
    return "";
  }
  if (temp[1].length === 0) {
    return includeGenres.join(",");
  }
  return temp.join("|");
};

export const createObjectFromNestedArray = (nestedArray) =>
  nestedArray.reduce(
    (result, [key, value]) => ({ ...result, [key]: value }),
    {}
  );
