var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});
const config = require ('./config');

const setSsm = async () => {
  let ssm = new AWS.SSM();
  success = true;
  let param = {
    Name: '/day-ops-bot/slack-bot-config',
    WithDecryption: true
  };
  try {
    let res = await ssm.getParameter(param).promise()
    let resJson = JSON.parse(res.Parameter.Value)
    config.setTokens(resJson)
  } catch (error) {
    console.log(`Couldn't get ${param.Name} ${error}`);
    success = false
  }
  return success
}

var tokens;
async function initTokens(){
    tokens = await setSsm()
    return tokens;
}

module.exports = { initTokens };