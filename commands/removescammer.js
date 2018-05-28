const Discord = require("discord.js");
const rbx = require("roblox-js");

module.exports.run = async (bot, message, args) => {
	let guild = bot.guilds.find("id", "443867131721941005");
	let member = await guild.fetchMember(message.author.id);
	if (!member) return;
	if (member && member.roles.get("443898332029517824")
		|| member.roles.get("443903247502147596")
		|| member.roles.get("443867603103121410")) {
		let userid = args[0];
		let post = bot.channels.find("id", "443959210817093642");
		let msgs = await post.fetchMessages({ limit: 100 });

		if (userid) {
			var errortf;
			let user = await rbx.getIdFromUsername(args[0]).catch((err) => {
				errortf = true;
				return message.reply(`${err}. If error persists, contact support by doing !server.`);
			});
			if (errortf == true) return;

			if (bot.data.scammers.find(value => value.id === user)) {
				bot.data.scammers.find(value => value.id === user).msg.delete();
				bot.data.scammers.splice(bot.data.scammers.indexOf(bot.data.scammers.find(value => value.id === user)), 1);
				var inchannel = msgs.find(m => RegExp(user, "gi").test(m.content));
				if(inchannel) inchannel.delete();
				message.react("\u2705");
				let mod = bot.channels.find("id", "444634075836448768");
				let thing = new Discord.RichEmbed()
					.setTitle("Removed Scammer")
					.setColor("#FF0000")
					.addField("Time Removed", message.createdAt)
					.addField("Moderator", message.author)
					.addField("User Removed", userid);
				await mod.send(thing);
			} else return message.reply("This user is not in the scammers database!");

		}
	}


};

module.exports.help = {
	name: "removescammer"
};
