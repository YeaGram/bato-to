const comicProps = {
  order: [
    "field_score",
    "field_follow",
    "field_review",
    "field_comment",
    "field_chapter",
    "field_upload",
    "field_public",
    "field_name",
    "views_d000",
  ],
};

export function isProp(prop, defaultValue, inputValue) {
  const isOrderFilter = comicProps[prop].find((oProp) => oProp === inputValue)
    ? inputValue
    : false;
  return isOrderFilter ? inputValue : defaultValue;
}
