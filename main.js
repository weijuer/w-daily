import browser from "./utils/browser.js";
import { saveLocalData } from "./utils/utils.js";

const scrapeArticles = async (options = {}) => {
  // 测试
  const _options = {
    url: "https://www.infoq.cn/topic/Front-end",
    target: ".article-list>.list>.article-item",
    item: {
      title: ".info .com-article-title",
      url: ".info .com-article-title",
      description: ".info .summary",
      author: ".info .editor a.com-author-name",
      lastModified: ".info .author-date-wrap .date"
    }
  };

  // 爬取日志
  const articles = await browser.scrape(_options);

  await saveLocalData(articles);
};

/**
 * 获取pdf
 *
 * @param {string} url
 * @memberof ArticleController
 */
async function getPDF(url) {
  // 生成PDF
  const pdf = await browser.printPDF(url);

  return { code: 1000, message: "success", data: pdf };
}

/**
 * 获取截图
 * @param {string} url
 * @memberof ArticleController
 */
async function screenshot(url) {
  // 生成截图
  const screenshot = await browser.screenshot(url);

  return { code: 1000, message: "success", data: screenshot };
}

// init
scrapeArticles();
