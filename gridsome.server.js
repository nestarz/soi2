const fs = require("fs-extra");
const puppeteer = require("puppeteer");
const path = require("path");
const glob = require("globby");
const jsYaml = require("js-yaml");
const slugify = require("@sindresorhus/slugify");

const makeScreenshot = async (urls, paths) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    args: [ '--enable-features=NetworkService' ]
  });
  await Promise.all(
    urls.map(async (url, index) => {
      const savePath = paths[index];
      if (!url) {
        console.log("Url null. ", url, savePath);
        return true;
      }

      if (fs.existsSync(savePath)) {
        console.log("File exists. Aborting.", savePath);
        return true;
      } else {
        fs.mkdir(path.dirname(savePath), { recursive: true }, err => {});
      }
      
      try {
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: savePath });
      } catch (error) {
        console.log("Error.", error, url);
      }
      return true;
    })
  );
  await browser.close();
  return true;
};

module.exports = function(api) {
  const { imageType } = require("gridsome/lib/graphql/types/image");

  api.loadSource(async store => {
    const collection = store.addContentType({
      typeName: "Ressources",
      route: "/ressources/:slug"
    });
    const resources = (await glob("content/ressources/**/*.yml")).map(file => {
      const resource = jsYaml.load(fs.readFileSync(file, "utf8"));
      resource.slug = slugify(resource.name);
      return resource;
    });
    const screenshotFolder = path.join(__dirname, "static", "screenshots");
    await makeScreenshot(
      resources.map(r => r.url),
      resources.map(r => path.join(screenshotFolder, `${r.slug}.png`))
    );
    resources.forEach(resource =>
      collection.addNode({
        id: resource.slug,
        fields: resource
      })
    );
    collection.addSchemaField("screenshot", () => ({
      type: imageType.type,
      args: imageType.args,
      async resolve(node, args, context, info) {
        const value = path.join(screenshotFolder, `${node.slug}.png`);

        try {
          result = await context.queue.add(value, args);
        } catch (err) {
          return null;
        }

        if (result.isUrl) {
          return result.src;
        }

        return {
          type: result.type,
          mimeType: result.mimeType,
          src: result.src,
          size: result.size,
          sizes: result.sizes,
          srcset: result.srcset,
          dataUri: result.dataUri
        };
      }
    }));
  });
};
