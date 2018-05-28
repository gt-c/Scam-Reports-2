const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, permissionLevel) => {
	var publiccommands = [
		"report - Starts a prompt to report a scammer and send that prompt to the Support server",
		"invite - Sends you my invite",
		"server - Sends you the invite to the support server",
		"updates - Gives you our latest updates to the bot",
		"count - Gives you our bot's server count",
		"scamcheck - Tells you whether the username you provided is in our scam database or not",
		"setprefix - Changes my prefix in your server",
		"cancelreport - Removes your unread scam report",
		"verify - Verifies your roblox account to your discord account",
		"getinfo - Gets a user's roblox information",
		"buypremium - Gives you a link to buy premium",
		"redeem - Redeems a premium code to get you premium"
	];
	var premiumcommands = [
		"request - Requests something to be developed for you",
		"banscammers - Bans all scammmers from your server",
	];
	var supportcommands = [
		"accept - Accepts a user's scam report",
		"decline - Declines a user's scam report",
		"addscammer - Adds a scammer to the scammers database",
		"removescammer - Removes a scammer from the scammers database",
		"blacklist - Blacklists a user from using the report command",
		"unblacklist - Unblacklists a user from using the report command",
		"guildblacklist - Blacklists a server from using the report command",
		"guildunblacklist - Unblacklists a server from using the report command",
		"open - Opens up the report command",
		"close - Closes the report command",
	];
	var developercommands = [
		"setstatus - Sets the bot's status",
		"setactivity - Sets the bot's activity",
		"countstatus - Sets the bot's status to the server count",
		"setupdates - Sets the update command response",
		"generate - Generates premium codes",
		"puser - Toggles a user's premium status",
		"resetcase - Resets case numbers for the report command"
	];
	publiccommands = publiccommands.map(v => `\`${prefix}` + v.split("-")[0].trim() + "` - " + v.split("-")[1].trim()).join("\n");
	premiumcommands = premiumcommands.map(v => `\`${prefix}` + v.split("-")[0].trim() + "` - " + v.split("-")[1].trim()).join("\n");
	supportcommands = supportcommands.map(v => `\`${prefix}` + v.split("-")[0].trim() + "` - " + v.split("-")[1].trim()).join("\n");
	developercommands = developercommands.map(v => `\`${prefix}` + v.split("-")[0].trim() + "` - " + v.split("-")[1].trim()).join("\n");
	var commandsEmbed = new Discord.RichEmbed()
		.setTitle("Commands")
		.addField("Public", publiccommands)
		.addField("Premium", premiumcommands);
	if(permissionLevel >= 2) commandsEmbed = commandsEmbed.addField("Support +", supportcommands);
	if(permissionLevel === 3) commandsEmbed = commandsEmbed.addField("Developer", developercommands);
	message.author.send(commandsEmbed).then(() => {
		message.react("\u2705").catch(function () { });
	}).catch(() => {
		return message.reply("I could not DM you the list of commands! Please check your privacy commands and try again!").catch(function () { });
	});
};
module.exports.help = {
	name: "help"
};
