const IG_API = require('instagram-private-api');
const fs = require('fs');
const http = require('https');
require('dotenv').config();

const ig = new IG_API.IgApiClient();

// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
console.log(process.env.IG_USERNAME);
ig.state.generateDevice(process.env.IG_USERNAME);

(async () => {
  // login
  await ig.account.login(
    process.env.IG_USERNAME,
    process.env.IG_PASSWORD,
  );

  // The same as preLoginFlow()
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  process.nextTick(async () => ig.simulate.postLoginFlow());

  // get saved posts
  const savedFeed = ig.feed.saved();

  const mySavedPosts = [];
  let count = 0;
  const MAX_ITER = 1000;
  while (savedFeed.moreAvailable !== false && count < MAX_ITER) {
    // eslint-disable-next-line no-await-in-loop
    const items = await savedFeed.items();
    mySavedPosts.push(...items);
    // eslint-disable-next-line no-console
    console.log(items.length, savedFeed.moreAvailable);
    count += count;
  }
  // grab all image urls from a batch of saved posts
  mySavedPosts
    // fetch images from image urls and save them to disk
    .map((savedPost) => {
      let imageUrl;

      if (savedPost.media.carousel_media) {
        imageUrl = savedPost.media.carousel_media[0].url;
      } else if (
        savedPost.media.image_versions2
        && savedPost.media.image_versions2.candidates
      ) {
        imageUrl = savedPost.media.image_versions2.candidates[0].url;
      }

      if (imageUrl) {
        const image = fs.createWriteStream(`content/instagram/images/${savedPost.media.pk}.png`);
        http.get(imageUrl, (response) => {
          response.pipe(image);
        });

        return savedPost;
      }

      return null;
    })
    .filter(savedPost => savedPost)
    .map(async (savedPost) => {
      const content = JSON.stringify({
        image_name: `${savedPost.media.pk}.png`,
        media: {
          taken_at: savedPost.media.taken_at,
          id: savedPost.media.id,
          pk: savedPost.media.pk,
          saved_collection_ids: savedPost.media.saved_collection_ids,
          media_type: savedPost.media.media_type,
          original_width: savedPost.media.original_width,
          original_height: savedPost.media.original_height,
          carousel_media: savedPost.media.carousel_media,
          image_versions2: {
            candidates:
              savedPost.media.image_versions2
              && savedPost.media.image_versions2.candidates.map(item => item.url),
          },
          user: {
            pk: savedPost.media.user.pk,
            username: savedPost.media.user.username,
            is_private: savedPost.media.user.is_private,
            profile_pic_url: savedPost.media.user.profile_pic_url,
            profile_pic_id: savedPost.media.user.profile_pic_id,
          },
          next_max_id: savedPost.media.next_max_id,
          comment_count: savedPost.media.comment_count,
          like_count: savedPost.media.like_count,
          has_liked: savedPost.media.has_liked,
          caption: savedPost.media.caption ? {
            pk: savedPost.media.caption.pk,
            user_id: savedPost.media.caption.user_id,
            media_id: savedPost.media.caption.media_id,
            text: savedPost.media.caption.text,
            created_at: savedPost.media.caption.created_at,
          } : null,
        },
      });
      fs.writeFile(`content/instagram/saved/${savedPost.media.pk}.json`, content, 'utf8', (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
      });
    });
})();
