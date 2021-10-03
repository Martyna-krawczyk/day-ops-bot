require('dotenv').config();
const { initTokens } = require ('./ssm-helper');
const {  getCurrentMemberOnCall, updateCurrentMemberOnCall } = require ('./s3-helper');
const { createBot } = require ('./slack-bolt.js');
const config = require ('./config');
var app = {};

async function initialiseBot(){
  try {
    await initTokens();
    return createBot();
  }
  catch (error) {
    console.error(error);
  }
}

var currentMemberOnCall = "";

async function prepareAndSendMessage(){
  try {
    currentMemberOnCall = await getCurrentMemberOnCall();
    await sendMessage() 
  }
  catch{
    console.error(error);
  }
}

async function sendMessage(){
  try{
    var users = await getUserIds();
    var newMember = await getNewMemberOnCall(users);
    await updateCurrentMemberOnCall(newMember);
    return await sendMessageWithUserGroupMention(newMember);
  }
  catch (error) {
    console.error(error);
  }
}

async function getNewMemberOnCall(users) {
  var index =  await getCurrentMemberIndex(users)
   return await rotateUsers(index, users, currentMemberOnCall);
}

async function sendMessageWithUserGroupMention(newMember){
  try {
    let res = await app.client.chat.postMessage({
      channel: config.testSlackBotChannelId,
      text: `<@${newMember}>, you are on DayOps support this week.`
    });
    return res;
  }
  catch (error) {
    console.error(error);
  }
};

async function getUserIds() {
  try {
    const result = await app.client.usergroups.users.list({
      channel: config.testSlackBotChannelId,
      usergroup: config.testUserGroupId
    });
    return result.users
  }
  catch (error) {
    console.error(error);
  }
};

async function getCurrentMemberIndex(members) {
  var index = await members.lastIndexOf(currentMemberOnCall);
  return index
}

var newMemberOnCall = ""
async function rotateUsers( index, members ){
  if ( index + 1  < members.length ) {
    newMemberOnCall = await members[ index + 1 ]
    return newMemberOnCall;
  } else {
    
    return newMemberOnCall = await members[0];
  }
}

async function run() {
try {
  app = await initialiseBot();
  await app.start();
  console.log('⚡️ Bolt app is running!');
  await prepareAndSendMessage();
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = {
  lambdaHandler: async function () {
    return run(); 
  }
}