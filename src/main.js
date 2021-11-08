import browser from "./utils/browser.js";
import { saveLocalData } from "./utils/file.js";

const scrapeArticles = async () => {
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

  // 爬取日志
  const articles = await browser.scrape(options);

  // 存储本地
  await saveLocalData(articles);
};

// init
scrapeArticles();
