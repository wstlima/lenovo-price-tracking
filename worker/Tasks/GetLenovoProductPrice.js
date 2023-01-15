const puppeteer = require("puppeteer");

const SELECTORS = {
  pageLoadSelector: ".page-header",
  productCard: ".caption",
  productTitle: ".title",
  productPrice_1: ".price",
  productPrice_2: ".price"
};

module.exports = async function task(productUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    sandbox: false,
    args: [
      "--remote-debugging-port=9222",
      "--disable-setuid-sandbox",
      "--no-sandbox"
    ],
    defaultViewport: {
      width: 1100,
      height: 840
    }
  });
  const page = await browser.newPage();
  await page.goto(productUrl);

  // wait page load
  await page.waitForSelector(SELECTORS.pageLoadSelector, { visible: true });

  const listHandle = await page.$('div.container.test-site > div > div > div.row');
  const prodPrices = await listHandle.$$eval('div > div.thumbnail > div.caption > h4.price', (nodes) => nodes.map((n) => n.innerText))
  const prodTitles = await listHandle.$$eval('div > div.thumbnail > div.caption > h4 > a.title', (nodes) => nodes.map((n) => n.innerText))
  const prodDesc = await listHandle.$$eval('div > div.thumbnail > div.caption > p.description', (nodes) => nodes.map((n) => n.innerText))
  const prodRating = await listHandle.$$eval('div > div.thumbnail > div.ratings', (nodes) => nodes.map((n) => n.innerText))
  const prodLinks = await listHandle.$$eval('div > div.thumbnail > div.caption > h4 > a.title', (nodes) => nodes.map((n) => n.href))

  let list = []
  const v = 'lenovo';

  prodTitles.forEach((item, index) => {
    if (item.toLowerCase().includes(v)) {
      list.push(
        {
          title: prodTitles[index],
          price: prodPrices[index].replace('$', ''),
          description: prodDesc[index],
          rating: prodRating[index],
          links: prodLinks[index],
        }
      );
    }
  });

  await browser.close();
  return list;
}
