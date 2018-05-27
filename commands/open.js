const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
	let guild = bot.guilds.find("id", "443867131721941005");
	let member = await guild.fetchMember(message.author.id);
	if (!member) return;
	if (member && member.roles.get("443898332029517824")
		|| member.roles.get("443903247502147596")
		|| member.roles.get("443867603103121410")) {
		let pchannel = bot.channels.find("id", "444633860769185832");
		await pchannel.setTopic("open");
		message.react("✅");
		let mod = bot.channels.find("id", "444634075836448768");
		let thing = new Discord.RichEmbed()
			.setTitle("Reports Opened")
			.setColor("#FF0000")
			.addField("Time Set", message.createdAt)
			.addField("Moderator", message.author);
		await mod.send(thing);

	}
};

module.exports.help = {
	name: "open"
};
