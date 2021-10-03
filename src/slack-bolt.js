const { App } = require ('@slack/bolt');
const config = require ('./config');

function createBot() {

  const app = new App({
    signingSecret: config.slackSigningToken,
    token: config.botUserToken,
  });

  return app;
}
  
module.exports.handler = async (event, context, callback) => {
  const handler = await app.start();
  console.log('⚡️ Bolt app is running!');
  return handler(event, context, callback);
}

module.exports = { createBot };