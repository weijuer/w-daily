import browser from "./utils/browser.js";
import { saveLocalData } from "./utils/file.js";

const scrapeDaily = async () => {
  // 目标
  const infoq = {
    url: "https://www.infoq.cn/topic/Front-end",
    target: "public/v1/article/getList"
  };

  // 爬取日志
  // const articles = await browser.scrape(options);
  const articles = await browser.scrapeResponse(infoq);

  // 存储本地
  await saveLocalData(articles);
};

// init
scrapeDaily();
