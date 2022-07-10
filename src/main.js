import browser from "./utils/browser.js";
import { saveLocalData } from "./utils/file.js";
import { getDayTime } from "./utils/dayUtil.js";

const scrapeDaily = async () => {
  // A.目标
  const infoq = {
    url: "https://www.infoq.cn/topic/Front-end",
    target: "public/v1/article/getList"
  };

  // 爬取日志
  // const articles = await browser.scrape(options);
  let articles = await browser.scrapeResponse(infoq);
  articles = processData(articles);


  // 存储本地
  await saveLocalData(articles);
};

function processData(articles) {
  if (Array.isArray(articles)) {
    const startTime = getDayTime(-7);
    const endTime = getDayTime(0);

    return articles.filter(({ utime }) => utime > startTime && utime <= endTime);
  } else {
    return [];
  }
}

// init
scrapeDaily();
