module.exports.run = async (bot, message, args, prefix, permissionLevel) => {
	if (permissionLevel !== 3) return;
	let mentioneduser = message.mentions.users.first();
	if (!mentioneduser) return message.reply("Please mention a user!").catch(() => {
		return message.author.send(`You attempted to use the \`puser\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	let userschannel = bot.channels.find("id", "444588564056113162");
	let pusers = await userschannel.fetchMessages({limit: 100});
	let usercheck = pusers.find(m => m.content === mentioneduser.id);
	if (usercheck) {
		await usercheck.delete();
		return message.reply("Removed this user's premium.");
	}
	await userschannel.send(mentioneduser.id);
	await message.reply("Successfully given this user premium!");

};
module.exports.help = {
	name: "puser"
};
