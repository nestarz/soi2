const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

const makeScreenshot = async (urls, paths) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    args: ['--enable-features=NetworkService'],
  });
  await Promise.all(
    urls.map(async (url, index) => {
      const savePath = paths[index];
      if (!url) {
        console.log('Url null. ', url, savePath);
        return true;
      }

      if (fs.existsSync(savePath)) {
        console.log('File exists. Aborting.', savePath);
        return true;
      }
      fs.mkdir(path.dirname(savePath), { recursive: true }, (err) => {
        console.log(err);
      });

      try {
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: savePath });
      } catch (error) {
        console.log('Error.', error, url);
      }
      return true;
    }),
  );
  await browser.close();
  return true;
};

module.exports = makeScreenshot;
