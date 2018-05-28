module.exports.run = async (bot, message, args, prefix, permissionLevel) => {
	if (permissionLevel !== 3) return;
	let mentioneduser = message.mentions.users.first();
	if (!mentioneduser) return message.reply("Please mention a user!").catch(() => {
		return message.author.send(`You attempted to use the \`puser\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	let userschannel = bot.channels.find("id", "444588564056113162");
	let usercheck = bot.data.pusers.find(value => value.id === mentioneduser.id);
	if (usercheck) {
		await usercheck.msg.delete().then(() => {
			bot.data.pusers.splice(bot.data.pusers.indexOf(bot.data.pusers.find(value => value.id === mentioneduser.id)), 1);
			return message.reply("Removed this user's premium.").catch(() => {
				return message.author.send(`You attempted to use the \`puser\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		}).catch(() => {
			message.reply("Couldn't access the database to remove this user's premium. Please try again.").catch(() => {
				return message.author.send(`You attempted to use the \`puser\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	} else {
		await userschannel.send(mentioneduser.id).then((newmsg) => {
			bot.data.pusers.push({ msg: newmsg, id: mentioneduser.id });
			message.reply("Successfully given this user premium!").catch(() => {
				return message.author.send(`You attempted to use the \`puser\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		}).catch(() => {
			message.reply("Couldn't access the database to give this user premium. Please try again.").catch(() => {
				return message.author.send(`You attempted to use the \`puser\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	}

};
module.exports.help = {
	name: "puser"
};
