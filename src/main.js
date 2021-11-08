import { scrape } from "./utils/spider.js";
import { saveLocalData } from "./utils/file.js";

const scrapeArticles = async () => {
  // 目标
  const options = {
    url: "https://www.infoq.cn/topic/Front-end",
    target: ".article-list>.list>.article-item",
    property: {
      title: ".info .com-article-title",
      url: ".info .com-article-title",
      description: ".info .summary",
      author: ".info .editor a.com-author-name",
      lastModified: ".info .author-date-wrap .date"
    }
  };

  // 爬取日志
  const articles = await scrape(options);

  // await saveLocalData(articles);
};

// init
scrapeArticles();
