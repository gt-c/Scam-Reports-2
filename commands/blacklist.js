const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let guild = bot.guilds.find("id", "443867131721941005");
	var mod = bot.channels.find("id", "444634075836448768");

	let member = await guild.fetchMember(message.author.id);
	if (!member) return;
	if (member && member.roles.get("443898332029517824")
		|| member.roles.get("443903247502147596")
		|| member.roles.get("443867603103121410")) {
		var channel = bot.channels.find("id", "444588561858035723");
		var pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		var userid = args[0];
		var messages = await channel.fetchMessages({ limit: 100 });
		var blacklistEmbed = new Discord.RichEmbed().setTitle("Blacklisted User").setColor("#FF0000");
		if (!pingeduser) {
			var auser = messages.find(m => m.content === userid);

			if (!auser) {
				var userob = await bot.fetchUser(userid);
				if (!userob) return message.reply("Couldn't find this user!").catch(function () { });
				channel.send(`${userid}`).catch(function () { });
				message.react("\u2705").catch(function () { });
				blacklistEmbed = blacklistEmbed
					.addField("Time Blacklisted", message.createdAt)
					.addField("Moderator", message.author)
					.addField("User Blacklisted", userob.tag);
				await mod.send({ embed: blacklistEmbed }).catch(function () { });
			} else return message.reply("This user is already blacklisted!").catch(function () { });
		} else {
			var buser = messages.find(m => m.content === pingeduser.id);
			if (!buser) {
				var pingeduserob = await bot.fetchUser(pingeduser.id);
				if (!pingeduserob) message.reply("Couldn't find this user!").catch(function () { });
				channel.send(`${pingeduser.id}`).catch(function () { });
				message.react("\u2705").catch(function () { });
				blacklistEmbed = blacklistEmbed
					.addField("Time Blacklisted", message.createdAt)
					.addField("Moderator", message.author)
					.addField("Blacklisted", pingeduserob.tag)
					.addField("Blacklisted ID", pingeduserob.id);
				await mod.send({ embed: blacklistEmbed }).catch(function () { });
			} else return message.reply("This user is already blacklisted!").catch(function () { });
		}
	}
};

module.exports.help = {
	name: "blacklist"
};
