#!/usr/bin/env node

var program = require('commander');
var Client = require('node-rest-client').Client;

program
  .version('1.0.0')
  .option('-h, --host <host>', 'Hubot Host Domain', null)
  .option('-t, --token <token>', 'Webhook Token', null)
  .option('-r, --room <room>', 'Message Room', null)
  .option('-m, --message <message>', 'Message', null)
  .parse(process.argv);

if (program.host === null) {
  console.error('Host Domain must be specified');
  process.exit(1);
}

if (program.token === null) {
  console.error('Token must be specified');
  process.exit(1);
}

if (program.room === null) {
  console.log('Message Room must be specified');
  process.exit(1);
}

if (program.message === null) {
  console.log('Message must be specified');
}

var client = new Client();

var url = program.host + '/incoming/' + program.token;

var args = {
  data: {
    room: program.room,
    message: program.message
  },
  headers: {
    "Content-Type": "application/json"
  }
}

try {
  client.post(url, args, function(data, response) {
    console.log('Message Sent');
    process.exit();
  }, function(error) {
    console.error('Error sending message');
    process.exit(1);
  });
} catch (err) {
  console.error('Error sending message');
  process.exit(1);
}



