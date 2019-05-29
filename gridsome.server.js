const fs = require('fs-extra');
const path = require('path');
const glob = require('globby');
const jsYaml = require('js-yaml');
const slugify = require('@sindresorhus/slugify');
const screenshot = require('./src/functions/screenshot');
const { imageType } = require('gridsome/lib/graphql/types/image');

function server(api) {
  api.loadSource(async (store) => {
    const collection = store.addContentType({
      typeName: 'Ressources',
      route: '/ressources/:slug',
    });
    const resources = (await glob('content/ressources/**/*.yml')).map((file) => {
      const resource = jsYaml.load(fs.readFileSync(file, 'utf8'));
      resource.slug = slugify(resource.name);
      return resource;
    });
    const screenshotFolder = path.join(__dirname, 'static', 'screenshots');
    await screenshot(
      resources.map(r => r.url),
      resources.map(r => path.join(screenshotFolder, `${r.slug}.png`)),
    );
    resources.forEach(resource => collection.addNode({
      id: resource.slug,
      fields: resource,
    }));
    collection.addSchemaField('screenshot', () => ({
      type: imageType.type,
      args: imageType.args,
      async resolve(node, args, context) {
        const value = path.join(screenshotFolder, `${node.slug}.png`);
        let result;
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
          dataUri: result.dataUri,
        };
      },
    }));
  });
}

module.exports = server;
