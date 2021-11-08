import puppeteer from "puppeteer";
import { log } from "./utils.js";
import { randomUA } from "./user-agent.js";

class Browser {
  constructor(options = {}) {
    this.options = {
      // 关闭headless模式, 不会打开浏览器
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        `--user-agent=${randomUA()}`
      ],
      // 如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
      // 默认视口
      defaultViewport: { width: 1280, height: 1080 },
      // 减缓效果
      slowMo: 300,
      ...options
    };
    // 浏览器对象
    this.browser = null;
    // 页面对象
    this.page = null;
  }

  /**
   * 启动
   */
  async start() {
    if (!this.browser) {
      this.browser = await puppeteer.launch(this.options);
      log("浏览器已启动...");
      this.browser.once("disconnected", () => {
        this.browser = null;
      });
    }
    return this.browser;
  }

  /**
   * 停止
   */
  async exit() {
    if (!this.browser) {
      return;
    }
    await this.browser.close();
    log("浏览器已关闭！");
  }

  /**
   * 打开浏览器
   * @param {*} url
   */
  async open(url) {
    // 启动浏览器
    await this.start();
    // 创建一个page对象
    this.page = await this.browser.newPage();
    // 缓存状态下多页面可能不正常
    await this.page.setCacheEnabled(false);
    // 设置页面视窗大小
    await this.page.setViewport({ width: 1280, height: 1080 });
    // 允许执行js脚本
    await this.page.setJavaScriptEnabled(true);
    // 跳转到目标地址
    await this.page.goto(url, {
      timeout: 7000,
      waitUntil: "networkidle2"
    });

    // 监听页面日志
    this.page.on("console", (msg) => console.log("[page]:", msg.text()));
  }

  /**
   * 打印PDF
   */
  async printPDF(url) {
    // 打开浏览器
    await this.open(url);
    log("开始打印PDF中...");
    await this.page.pdf({ path: "page.pdf" });
    log("打印PDF完毕...");
    // 关闭浏览器
    this.exit();
  }

  /**
   * 截屏
   */
  async screenshot(url) {
    // 打开浏览器
    await this.open(url);
    log("开始截图中...");
    await this.page.screenshot({
      path: "screenshot.png",
      type: "png",
      fullPage: true
    });
    log("截图完毕...");
    // 关闭浏览器
    this.exit();
  }

  /**
   * 爬虫主函数
   * @param url 待处理url
   * @param options 数据处理对象
   */
  async scrape({ url, target, properties } = {}) {
    log("主程序加载中...");
    // 打开浏览器
    await this.open(url);
    log("页面初次加载完毕, 等待目标元素... target:===>", target);
    // 等待被选的元素
    await this.page.waitForSelector(target);
    log("目标元素已加载...");

    // 分析数据
    log(`开始分析数据...`);
    const result = await this.evaluate(target, properties);
    log("分析数据完成... result:===>", JSON.stringify(result, null, 4));

    // 关闭浏览器
    await this.exit();

    return result;
  }

  /**
   * 分析页面：A.在浏览器中执行一段JavaScript代码
   * @param options
   */
  async evaluate(target, properties) {
    return await this.page.evaluate(this.processByFunction, target, properties);
  }

  /**
   * 分析页面：B.获取某一个节点的某个属性
   * @param selector CSS选择器
   * @param attr 属性名称
   */
  async getNodeData(selector, attr) {
    if (attr) {
      return await this.page.$eval(selector, (el) => el.getAttribute(attr));
    } else {
      return await this.page.$eval(selector, (el) => el.textContent);
    }
  }

  /**
   * 分析页面：C.获取某一类节点的某个属性集合
   * @param options
   */
  async getNodesData(selector, options) {
    return await this.page.$$eval(selector, this.process, options);
  }

  /**
   * 分析数据
   * @param {*} options
   */
  async process(elements, options) {
    console.log("process start");
    console.log("process elements", elements);
    // 解析数据
    return Array.from(elements).map((element) => {
      let item = {};
      for (let [key, value] of Object.entries(options.item)) {
        if (key === "url") {
          item[key] = element.querySelector(value).getAttribute("href");
        } else {
          item[key] = element.querySelector(value).textContent.trim();
        }
      }
      return item;
    });
  }

  /**
   * 执行JS分析数据
   * @param {*} options
   */
  processByFunction(target, properties) {
    // 获取待爬取节点集合，并转为数组
    const targets = Array.from(document.querySelectorAll(target));
    console.log(`targets size:===>${targets.length}`);
    // 解析数据
    return targets.map((element) => {
      return Object.entries(properties).reduce((total, [key, value]) => {
        total[key] =
          key === "url"
            ? element.querySelector(value)?.getAttribute("href")
            : element.querySelector(value)?.textContent.trim();

        return total;
      }, {});
    });
  }
}

// 初始化
const browser = new Browser();

// 退出时结束浏览器，防止内存泄漏
process.on("exit", () => {
  browser.exit();
});

export default browser;
