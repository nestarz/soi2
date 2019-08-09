const IG_API = require("instagram-private-api");
const fs = require("fs");
const axios = require("axios");
const sharp = require("sharp");
require("dotenv").config();

const connect = async ig => {
  ig.state.generateDevice(process.env.IG_USERNAME);

  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  process.nextTick(async () => ig.simulate.postLoginFlow());
};

const fetch = async ig => {
  const feed = ig.feed.saved();
  const saved = [];
  let count = 0;
  const MAX_ITER = 1;
  while (feed.moreAvailable !== false && count < MAX_ITER) {
    // eslint-disable-next-line no-await-in-loop
    const items = await feed.items();
    saved.push(...items);
    // eslint-disable-next-line no-console
    console.log(items.length, feed.moreAvailable);
    count += 1;
  }

  return saved;
};

const saveImage = post => {
  if (!post) {
    return null;
  }

  const imageUrl = post.media.carousel_media
    ? post.media.carousel_media[0].url
    : post.media.image_versions2 && post.media.image_versions2.candidates
    ? post.media.image_versions2.candidates[0].url
    : null;

  if (!imageUrl) {
    return null;
  }
  axios
    .get(imageUrl, {
      responseType: "arraybuffer"
    })
    .then(image =>
      sharp(Buffer.from(image.data))
        .resize(500)
        .jpeg({
          lossless: false,
          quality: 90,
          force: true,
          reductionEffort: 6
        })
        .toFile(`static/instagram/images/${post.media.pk}.jpg`, (err, info) => {
          if (err) {
            console.error(err);
          }
        })
    );
  return post;
};

const saveJson = post => {
  if (!post) {
    return null;
  }

  const content = JSON.stringify({
    media: {
      taken_at: post.media.taken_at,
      id: post.media.id,
      pk: post.media.pk,
      saved_collection_ids: post.media.saved_collection_ids,
      media_type: post.media.media_type,
      original_width: post.media.original_width,
      original_height: post.media.original_height,
      user: {
        pk: post.media.user.pk,
        username: post.media.user.username,
        is_private: post.media.user.is_private,
        profile_pic_url: post.media.user.profile_pic_url,
        profile_pic_id: post.media.user.profile_pic_id
      },
      next_max_id: post.media.next_max_id,
      comment_count: post.media.comment_count,
      like_count: post.media.like_count,
      has_liked: post.media.has_liked,
      caption: post.media.caption
        ? {
            pk: post.media.caption.pk,
            user_id: post.media.caption.user_id,
            media_id: post.media.caption.media_id,
            text: post.media.caption.text,
            created_at: post.media.caption.created_at
          }
        : null
    }
  });
  fs.writeFile(
    `content/instagram/saved/${post.media.pk}.json`,
    content,
    "utf8",
    err => {
      // eslint-disable-next-line no-console
      if (err) console.log(err);
    }
  );
};

const discardExist = post =>
  !fs.existsSync(`static/instagram/images/${post.media.pk}.jpg`) ||
  !fs.existsSync(`content/instagram/saved/${post.media.pk}.json`);

const uniformize = post =>
  typeof post.media === "object" ? post.media : { media: post };

(async () => {
  const ig = new IG_API.IgApiClient();

  await connect(ig);
  const mySavedPosts = await fetch(ig);
  
  const length = mySavedPosts
    .map(uniformize)
    .filter(discardExist)
    .map(saveImage)
    .map(saveJson)
    .length;
  
  console.log(length);
})();
