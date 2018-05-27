module.exports.run = async (bot, message) => {
	message.reply(`${bot.guilds.size} servers!`);
};
module.exports.help = {
	name: "count"
};
