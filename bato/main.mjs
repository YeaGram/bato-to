import * as cheerio from "cheerio";
export default class ComicMapper extends cheerio {
  constructor(container, data) {
    this.container = container;
    this.data = data;
  }

  replaceDataHk(string, idx, val) {
    const splited = string.split("-");
    splited.splice(idx - 1, 1, val);
    splited.push("0");
    return splited.join("-");
  }
  map() {
    return this.container.map((i, el) => {
      const $current = this.data(el).attr("data-hk");

      const $cover = this.getCover($current, el);
      const $title = this.getTitle($current, el);
      return $title;
    });
  }

  getCover(current, el) {
    return this.data(el)
      .children(`[data-hk="${this.replaceDataHk(current, 5, "1")}"]`)
      .children()
      .children(
        `[data-hk="${this.replaceDataHk(
          this.replaceDataHk(current, 5, "1"),
          6,
          "1"
        )}"]`
      )
      .attr();
  }
  getTitle(current, el) {
    const title = this.data(el)
      .children(":nth-child(2)")
      .children(`[data-hk="${this.replaceDataHk(current, 5, "2")}"]`);
    return title;
    console.log(title);
  }
}
