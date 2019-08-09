const axios = require('axios');
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');
const fs = require('fs');

const saveImage = (post) => {
  if (!post) {
    return null;
  }

  // eslint-disable-next-line no-nested-ternary
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
      responseType: 'arraybuffer',
    })
    .then(image => sharp(Buffer.from(image.data))
      .resize(500)
      .jpeg({
        lossless: false,
        quality: 90,
        force: true,
        reductionEffort: 6,
      })
      .toFile(`static/instagram/images/${post.media.pk}.jpg`, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }));
  return post;
};

const saveJson = (post) => {
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
        profile_pic_id: post.media.user.profile_pic_id,
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
          created_at: post.media.caption.created_at,
        }
        : null,
    },
  });
  fs.writeFile(
    `content/instagram/saved/${post.media.pk}.json`,
    content,
    'utf8',
    (err) => {
      // eslint-disable-next-line no-console
      if (err) console.log(err);
    },
  );

  return post;
};

module.exports = { saveImage, saveJson };
