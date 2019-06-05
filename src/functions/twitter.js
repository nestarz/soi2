const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');

const oauth = OAuth({
  consumer: {
    key: process.env.CONSUMER_API_KEY,
    secret: process.env.CONSUMER_API_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(baseString, key) {
    return crypto
      .createHmac('sha1', key)
      .update(baseString)
      .digest('base64');
  },
});
const token = {
  key: process.env.ACCESS_TOKEN,
  secret: process.env.ACCESS_SECRET,
};

const singleFetch = async (params) => {
  const requestData = {
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    method: 'GET',
    data: {
      count: 200,
      include_rts: true,
      tweet_mode: 'extended',
      ...(params || {}),
    },
  };
  console.log(requestData);
  const { data } = await axios.get(requestData.url, {
    params: requestData.data,
    headers: oauth.toHeader(oauth.authorize(requestData, token)),
    withCredentials: true,
  });
  return data;
};

const fetch = async (count, savePath) => {
  fs.mkdir(path.dirname(savePath), { recursive: true }, (err) => {
    console.log(err);
  });

  if (fs.existsSync(savePath)) {
    console.log('Fetch only new posts');
    const prevTweets = JSON.parse(fs.readFileSync(savePath));
    const sinceId = prevTweets[0].id_str;
    let tweets = [];
    try {
      tweets = await singleFetch({ since_id: sinceId });
    } catch (error) {
      console.log('Error:', error);
    }
    const allTweets = [...tweets, ...prevTweets].sort((a, b) => b.id - a.id);
    fs.writeFileSync(savePath, JSON.stringify(allTweets));
    return allTweets;
  }

  let allTweets = [];
  let i = 0;
  while (i < count / 200 && allTweets.length < count) {
    const maxId = allTweets.length
      ? allTweets[allTweets.length - 1].id_str
      : null;
    // eslint-disable-next-line no-await-in-loop
    const tweets = await singleFetch(maxId ? { max_id: maxId } : {}); // lastId
    allTweets = [...allTweets, ...tweets];
    i += 1;
    if (tweets.length === 0) {
      break;
    }
  }

  allTweets = allTweets.sort((a, b) => b.id - a.id);
  fs.writeFileSync(savePath, JSON.stringify(allTweets));
  return allTweets;
};

module.exports = fetch;
