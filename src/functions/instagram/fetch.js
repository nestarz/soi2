const MAX_ITER = 1000;

const fetch = async (ig) => {
  const feed = ig.feed.saved();

  let count = 0;
  const saved = [];
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

module.exports = fetch;
