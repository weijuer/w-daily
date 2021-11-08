import cheerio from "cheerio";
import service from "./service.js";
import Crawler from "crawler";

const crawler = new Crawler();

export const scrape = ({ url: uri, target, property } = {}) => {
  crawler.queue({
    uri,
    callback: (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        console.log("inside callback");
        console.log(res);
        const $ = res.$;
        console.log("target.length", $(target).length);
        // const list = process(target, property);
      }

      done();
    }
  });
};

export const scrape2 = async ({ url, target, property } = {}) => {
  const html = await service.get(url);
  console.log(html);
  const $ = cheerio.load(html);

  return $(target).each((_, element) => {
    return Object.entries(property).map(([key, value]) =>
      key === "url"
        ? $(element).find(value).attr("href")
        : $(element).find(value).text()
    );
  });
};

/**
 * 分析数据
 * @param {*} target
 * @param {*} property
 * @returns
 */
const process = async (target, property) => {
  console.log("process start");
  console.log("process target", target);
  return Array.from(target).map((element) => {
    let item = {};
    for (let [key, value] of Object.entries(property)) {
      if (key === "url") {
        item[key] = element.querySelector(value).getAttribute("href");
      } else {
        item[key] = element.querySelector(value).textContent.trim();
      }
    }
    return item;
  });
};
