const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let guild = bot.guilds.find("id", "443867131721941005");
	var mod = bot.channels.find("id", "444634075836448768");
	let member = await guild.fetchMember(message.author.id);
	if (!member) return;
	if (member && member.roles.get("443898332029517824")
		|| member.roles.get("443903247502147596")
		|| member.roles.get("443867603103121410")) {
		var pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		var userid = args[0];
		if (pingeduser) {
			if (bot.data.blacklistedUsers.find(value => value.id === pingeduser.id)) {
				var pingeduserob = await bot.fetchUser(pingeduser.id);
				if (!pingeduserob) message.reply("Couldn't find this user!").catch(function () { });
				bot.data.blacklistedUsers.find(value => value.id === pingeduser.id).msg.delete();
				bot.data.blacklistedUsers.splice(bot.data.blacklistedUsers.indexOf(bot.data.blacklistedUsers.find(value => value.id === pingeduser.id)), 1);
				message.react("\u2705").catch(function () { });
				let thing = new Discord.RichEmbed()
					.setTitle("Unblacklisted User")
					.setColor("#FF0000")
					.addField("Time Unblacklisted", message.createdAt)
					.addField("Moderator", message.author)
					.addField("Unblacklisted", pingeduserob.tag)
					.addField("Unblacklisted ID", pingeduserob.id);
				await mod.send(thing);
			} else return message.reply("This user isn't blacklisted!").catch(function () { });
		} else {
			if (bot.data.blacklistedUsers.find(value => value.id === userid)) {
				var userob = await bot.fetchUser(userid);
				if (!userob) return message.reply("Couldn't find this user!").catch(function () { });
				bot.data.blacklistedUsers.find(value => value.id === userid).msg.delete();
				bot.data.blacklistedUsers.splice(bot.data.blacklistedUsers.indexOf(bot.data.blacklistedUsers.find(value => value.id === userid)), 1);
				message.react("\u2705").catch(function () { });
				let thing = new Discord.RichEmbed()
					.setTitle("Unblacklisted User")
					.setColor("#FF0000")
					.addField("Time Unblacklisted", message.createdAt)
					.addField("Moderator", message.author)
					.addField("User Unblacklisted", userid);
				await mod.send(thing);
			} else return message.reply("This user isn't blacklisted!").catch(function () { });
		}
	}
};

module.exports.help = {
	name: "unblacklist"
};
