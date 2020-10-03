const checkCommand = require('../helpers/checkCommand');

const createObject = async (array) => {
  const channel = array[0];
  const command = array[1];
  const parameters = array[2];
  return {
    channel,
    command,
    parameters,
  };
};

const isModeration = async (command) => [
  'ban',
  'unban',
  'timeout',
  'emoteonly',
  'emoteonlyoff',
  'followersonly',
  'followersonlyoff',
  'r9kbeta',
  'r9kbetaoff',
  'slow',
  'slowoff',
  'subscribers',
  'subscribersoff',
  'mod',
  'unmod',
  'vip',
  'unvip',
  'clear',
  'host',
  'unhost',
  'commercial'].includes(command);

const tokenizer = async (channel, user, message) => {
  /*
  *  checks if the chat message start with one of the allowed
  *  characters for a command later it will be checked if it
  *  is the right character for the command.
  */
  const regex = /^[`!@#$%^&_+\-=;:.<>?~]/;
  if(!regex.test(message.charAt(0))) return;

  const token = [];
  // tmi sends the channel with a # at the start
  // e.g. #channel_name but we only need channel_name
  channel = channel.replace('#', '');
  token.push(channel, user, message);


  const moderationMessage =
    message.indexOf(' ') === -1
      ? message.substring(1)
      : message.substring(1, message.indexOf(' '));

  const isModerationCommand = await isModeration(moderationMessage);
  if(isModerationCommand) {
    const msgArr = message.split(' ');
    const modCommand = await createObject([channel, msgArr[0].substring(1), msgArr.slice(1)]);
    return ['mod', modCommand];
  }

  // Checks if the channel has the command
  const command = await checkCommand.isCommand(token[0], token[2]);
  if (!command) return;

  return command;
};

module.exports = {
  tokenizer,
};