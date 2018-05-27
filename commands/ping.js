module.exports.run = async (bot, message) => {
	message.reply(`pong! \`${Math.floor(bot.pings[0])}ms\``);
};
module.exports.help = {
	name: "ping"
};
