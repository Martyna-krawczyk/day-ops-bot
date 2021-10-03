var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});
const config = require ('./config');

const getCurrentMemberOnCall = async () => {
  const s3 = new AWS.S3();
  success = true;
  let param = {
    Bucket: 'betelgeuse-day-ops-bot', 
    Key: 'current-member-on-call-id.txt'
  };
  try {
    let res = await s3.getObject(param).promise()
    var id =  res.Body.toString('ascii')
    return id;
  } catch (error) {
    console.log(`Couldn't get ${param.Name} ${error}`);
    success = false
  }
  return success
}

const updateCurrentMemberOnCall = async (currentMemberOnCall) => {
  const s3 = new AWS.S3();
  success = true;
  let param = {
    Bucket: 'betelgeuse-day-ops-bot', 
    Key: 'current-member-on-call-id.txt',
    Body: currentMemberOnCall
  };
  try {
    await s3.putObject(param).promise()
  } catch (error) {
    console.log(`Couldn't get ${param.Name} ${error}`);
    success = false
  }
  return success
}

module.exports = { getCurrentMemberOnCall, updateCurrentMemberOnCall }