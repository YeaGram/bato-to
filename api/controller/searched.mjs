import { comicProps } from "../utils/property.mjs";

export function getSearched(req, res) {
  const lengthHot = req.query.hot || 10;
  const lengtNew = req.query.new || 10;

  try {
    const query = {
      query:
        "\n    query get_content_searchWords($select: SearchWords_Select) {\n      get_content_searchWords(\n        select: $select\n      ) {\n        newWords\n        hotWords\n      }\n    }\n    ",
      variables: {
        select: { getHots: parseInt(lengthHot), getNews: parseInt(lengtNew) },
      },
      operationName: "get_content_searchWords",
    };
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(query),
    };

    fetch(`${comicProps.domain}/apo/`, config)
      .then((response) => response.json())
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    console.error(error);
  }
}
