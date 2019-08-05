const fs = require('fs-extra');
const path = require('path');
const glob = require('globby');
const jsYaml = require('js-yaml');
const slugify = require('@sindresorhus/slugify');
const screenshot = require('./src/functions/screenshot');
const twitter = require('./src/functions/twitter');

function server(api) {
  api.loadSource(async (store) => {
    store.addMetaData('phone', {
      code: 33,
      number: 620406267,
    });
    store.addMetaData('network', [
      {
        url: 'https://instagram.com/eliaspourquoi',
        title: 'Instagram',
      },
      {
        url: 'https://github.com/nestarz',
        title: 'GitHub',
      },
      {
        url: 'https://linkedin.com/in/elias-rhouzlane-56070197/',
        title: 'Linkedin',
      },
    ]);

    const InstagramSavedCollection = store.addContentType('InstagramSaved');
    (await glob('content/instagram/saved/*.json'))
      .map(file => JSON.parse(fs.readFileSync(file, 'utf8')))
      .forEach(instagramSaved => InstagramSavedCollection.addNode({
        id: instagramSaved.media.id,
        fields: {
          ...instagramSaved,
          // imagePath: path.join(__dirname, 'static', 'instagram', 'images', instagramSaved.image_name),
          imagePath: path.join('/', 'instagram', 'images', instagramSaved.media.pk),
        },
      }));

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
      fields: {
        ...resource,
        screenshot: path.join(screenshotFolder, `${resource.slug}.png`),
      },
    }));
  });
}

module.exports = server;
