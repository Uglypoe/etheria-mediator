var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client();

function getTime(){
	return new Date().getTime() / 1000;
}

// Variables
var DeletedMsgChannel = null;
var lastTime = getTime();

bot.on('ready', () => {
	if (DeletedMsgChannel == null) {
		DeletedMsgChannel = bot.channels.get('493545769190555648');
	}
	console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
	var message = msg.content;
    if (message.substring(0, 1) == '!') {
		var newTime = getTime();
		if (newTime - lastTime >= 5) {
			lastTime = newTime;
			var args = message.substring(1).split(' ');
			var cmd = args[0];
		   
			args = args.splice(1);
			switch(cmd) {
				case 'cmd':
					msg.reply('Commands: game, group, wiki');
					break;
				case 'cmds':
					msg.reply('Commands: game, group, wiki');
					break;
				case 'game':
					msg.reply('www.roblox.com/games/70523152/Etheria');
					break;
				case 'group':
					msg.reply('www.roblox.com/My/Groups.aspx?gid=539558');
					break;
				case 'wiki':
					msg.reply('Not released yet');
					break;
				case 'disconnect':
					if (msg.author.id == '169985078854680577') {
						msg.reply('Bot disconnected');
						bot.destroy();
					};
					break;
				default:
					msg.reply('Invalid command');
					break;
				break;
			 }
		}
     }
});

bot.on('disconnect', () => {
	console.log('Bot disconnected');
});

bot.on('messageDelete', (message) => {
	var Channel = message.channel;
	var DeletedMsg = message.content;
	var User = bot.users.get(message.author.id);
    DeletedMsgChannel.send('['+Channel.name+'] '+(message.member.nickname || User.username)+' deleted message: '+DeletedMsg);
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
	var Channel = oldMessage.channel;
	var OldMsg = oldMessage.content;
	var NewMsg = newMessage.content;
	if (OldMsg != NewMsg) {
		var User = bot.users.get(oldMessage.author.id);
		DeletedMsgChannel.send('['+Channel.name+'] '+(oldMessage.member.nickname || User.username)+' edited message: '+OldMsg+' -> '+NewMsg);
	}
});

bot.login(auth.token)