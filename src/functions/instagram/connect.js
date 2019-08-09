require('dotenv').config();

const connect = async (ig) => {
  ig.state.generateDevice(process.env.IG_USERNAME);

  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  process.nextTick(async () => ig.simulate.postLoginFlow());
};

module.exports = connect;
