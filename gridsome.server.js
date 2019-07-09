const fs = require('fs-extra');
const path = require('path');
const glob = require('globby');
const jsYaml = require('js-yaml');
const slugify = require('@sindresorhus/slugify');
const { imageType } = require('gridsome/lib/graphql/types/image');
const screenshot = require('./src/functions/screenshot');
const twitter = require('./src/functions/twitter');

function server(api) {
  api.loadSource(async (store) => {
    const resumeCollection = store.addContentType('Resume');
    (await glob('content/resumes/**/*.yml')).map((file) => {
      const resource = jsYaml.load(fs.readFileSync(file, 'utf8'));
      resource.slug = slugify(`${resource.date}`);
      return resource;
    }).forEach(resource => resumeCollection.addNode({
      id: resource.slug,
      fields: resource,
      path: `resume/${resource.slug}`,
    }));

    const tweetCollection = store.addContentType('Tweets');
    const tweets = await twitter(2000, './content/twitter/statuses/user_timeline.json');
    tweets.forEach((parentTweet) => {
      const tweet = parentTweet.retweeted_status
        ? parentTweet.retweeted_status
        : parentTweet;

      tweetCollection.addNode({
        id: tweet.id,
        path: `tweet/${tweet.id}`,
        fields: {
          parent_id: parentTweet.id,
          parent_created_at: parentTweet.created_at,
          id: tweet.id,
          text: tweet.text,
          full_text: tweet.full_text,
          created_at: tweet.created_at,
          user: tweet.user,
          entities: tweet.entities,
          extended_entities: tweet.extended_entities,
        },
      });
    });

    const collection = store.addContentType({
      typeName: 'Ressources',
      route: '/ressource/:slug',
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
