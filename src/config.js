module.exports = {
  slackBaseURL: 'https://slack.com/api/',
  slackSigningToken: "",
  botUserToken: "",
  testSlackBotChannelId: "",
  testUserGroupId: "",

  setTokens: function (storeParameters) {
    this.slackSigningToken = storeParameters.slackSigningToken;
    this.botUserToken = storeParameters.botUserToken;
    this.testSlackBotChannelId = storeParameters.testSlackBotChannelId;
    this.testUserGroupId = storeParameters.testUserGroupId;
  }
}

