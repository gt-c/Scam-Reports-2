module.exports.run = async (bot, message, args, prefix, permissionLevel) => {
	if(permissionLevel === 3) {
		let update = message.content.substr(12);
		let channel = bot.channels.find("id", "444588564328742926");
		let editor = await channel.fetchMessage("444593973756166155").catch(function () { });
		await editor.edit(update).then(() => {
			message.react("\u2705").catch(function () { });
		}).catch(() => {
			message.reply("Couldn't change the update message!").catch(() => {
				return message.author.send(`You attempted to use the \`setstatus\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	}
};
module.exports.help = {
	name: "setupdates"
};
