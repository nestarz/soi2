const fs = require('fs');
const IG_API = require('instagram-private-api');

const { saveImage, saveJson } = require('./save');
const connect = require('./connect');
const fetch = require('./fetch');

const discardExist = post => !fs.existsSync(`static/instagram/images/${post.media.pk}.jpg`)
  || !fs.existsSync(`content/instagram/saved/${post.media.pk}.json`);

const uniformize = post => (typeof post.media === 'object' ? post.media : { media: post });

(async () => {
  const ig = new IG_API.IgApiClient();

  await connect(ig);
  const mySavedPosts = await fetch(ig);

  const { length } = mySavedPosts
    .map(uniformize)
    .filter(discardExist)
    .map(saveImage)
    .map(saveJson);

  // eslint-disable-next-line no-console
  console.log(length);
})();
