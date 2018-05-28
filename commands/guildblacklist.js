const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let guild = bot.guilds.find("id", "443867131721941005");
	var mod = bot.channels.find("id", "444634075836448768");
	let member = await guild.fetchMember(message.author.id);
	if (!member) return;
	if (member && member.roles.get("443898332029517824")
		|| member.roles.get("443903247502147596")
		|| member.roles.get("443867603103121410")) {
		var channel = bot.channels.find("id", "444588563032440833");
		var guildid = args[0];
		if (!bot.data.blacklistedGuilds.find(value => value.id === guildid)) {
			channel.send(`${guildid}`).then((newMessage) => {
				bot.data.blacklistedGuilds.push({ msg: newMessage, id: guildid });
			});
			message.react("\u2705").catch(function () { });
			let thing = new Discord.RichEmbed()
				.setTitle("Guild Blacklisted")
				.setColor("#FF0000")
				.addField("Time Blacklisted", message.createdAt)
				.addField("Moderator", message.author)
				.addField("Guild Blacklisted", guild.name)
				.addField("Guild ID", guild.id);
			await mod.send(thing);
		} else return message.reply("This guild is already blacklisted!").catch(function () { });
	}
};

module.exports.help = {
	name: "guildblacklist"
};
