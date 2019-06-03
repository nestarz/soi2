const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const glob = require('globby');
const OAuth = require('oauth');
const jsYaml = require('js-yaml');
const slugify = require('@sindresorhus/slugify');
const screenshot = require('./src/functions/screenshot');
const { imageType } = require('gridsome/lib/graphql/types/image');

function server(api) {
  api.loadSource(async (store) => {
    const tweetCollection = store.addContentType({
      typeName: 'Tweets',
      route: '/tweets/:slug',
    });
    const twitterApi = axios.create({
      baseURL: 'https://api.twitter.com/1.1',
      headers: {
        cookie: [
          'personalization_id=%22v1_fbc4vEbAwuEqv56i0dd0Jg%3D%3D%22',
          'guest_id=v1%253A155959907123925616',
          'lang=fr',
        ].join('; '),
        Authorization: [
          'OAuth oauth_consumer_key="FTCFIsV4mJ5GFcg1MzQfCIk9E"',
          'oauth_nonce="bb8w9qP2SVurPQo2mBix3yEnBOx6kAgE"',
          'oauth_signature="xy4Wfs%2FJUv6Y%2BjPcYIhiqBx%2Fjlk%3D"',
          'oauth_signature_method="HMAC-SHA1"',
          'oauth_timestamp="1559603218"',
          'oauth_token="351144411-tb1eRT0lGaawC0GlpaMHNbmwQkK7ni0qK9oFvy4E"',
          'oauth_version="1.0"',
        ].join(', '),
      },
      withCredentials: true,
    });
    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'FTCFIsV4mJ5GFcg1MzQfCIk9E',
      'xVXpu0WXNjttc8zskRWbSBgLFsP5jrjoFlJ6pypIsyTPjLvOsm',
      '1.0A',
      null,
      'HMAC-SHA1',
    );
    oauth.get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json?count=200',
      '351144411-tb1eRT0lGaawC0GlpaMHNbmwQkK7ni0qK9oFvy4E', // test user token
      'lfxgXaOG3n07VrLI07bWc9MtMgCNsJkod7amYiGk4ntne', // test user secret
      (e, data, res) => {
        if (e) console.error(e);
        const tweets = JSON.parse(data);
        console.log(tweets[0]);
        tweets.forEach((parentTweet) => {
          const tweet = parentTweet.retweeted_status
            ? parentTweet.retweeted_status
            : parentTweet;
          tweetCollection.addNode({
            id: tweet.id,
            fields: {
              parentId: parentTweet.id,
              parentCreatedAt: parentTweet.created_at,
              id: tweet.id,
              text: tweet.text,
              created_at: tweet.created_at,
              user: tweet.user,
              entities: tweet.entities,
              extended_entities: tweet.extended_entities,
            },
          });
        });
      },
    );

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
