const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, permissionLevel) => {
	var publiccommands = bot.commands.filter(command => command.help.type === "Public").map(command => `\`${prefix}${command.help.name}\` - ${command.help.description}`);
	var premiumcommands = bot.commands.filter(command => command.help.type === "Premium").map(command => `\`${prefix}${command.help.name}\` - ${command.help.description}`);
	var supportcommands = bot.commands.filter(command => command.help.type === "Support").map(command => `\`${prefix}${command.help.name}\` - ${command.help.description}`);
	var developercommands = bot.commands.filter(command => command.help.type === "Developer").map(command => `\`${prefix}${command.help.name}\` - ${command.help.description}`);
	var commandsEmbed = new Discord.RichEmbed()
		.setTitle("Commands")
		.addField("Public", publiccommands)
		.addField("Premium", premiumcommands)
		.setColor("#0000FF");
	if(permissionLevel >= 2) commandsEmbed = commandsEmbed.addField("Support +", supportcommands);
	if(permissionLevel === 3) commandsEmbed = commandsEmbed.addField("Developer", developercommands);
	message.author.send(commandsEmbed).then(() => {
		message.react("\u2705").catch(function () { });
	}).catch(() => {
		return message.reply("I could not DM you the list of commands! Please check your privacy commands and try again!").catch(function () { });
	});
};
module.exports.help = {
	name: "help",
	description: "Sends you a list of commands",
	type: "Public"
};
