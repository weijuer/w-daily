import cheerio from "cheerio";
import service from "./utils/service.js";
import Crawler from "crawler";

const crawler = new Crawler();

// 目标
const options = {
  url: "https://www.infoq.cn/topic/Front-end",
  target: ".article-list>.list>.article-item",
  properties: {
    title: ".info .com-article-title",
    url: ".info .com-article-title",
    description: ".info .summary",
    author: ".info .editor a.com-author-name",
    lastModified: ".info .author-date-wrap .date"
  }
};

const scrape = ({ url: uri, target, properties } = {}) => {
  crawler.queue({
    uri,
    callback: (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        console.log("inside callback");
        const $ = res.$;
        console.log("target.length", $(target).length);
        // const list = process(target, properties);
      }

      done();
    }
  });
};

async function run() {
  const html = await service.get("https://www.infoq.cn/topic/Front-end");
  console.log("html", html);
  const $ = cheerio.load(html);
  console.log("run...", $);
}

scrape(options);
