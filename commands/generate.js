var random = require("random-string");
module.exports.run = async (bot, message, args, prefix, permissionLevel) => {
	if(permissionLevel !== 3) return;
	if (!args[0]) return message.reply("You must include the number of codes to generate!").catch(() => {
		return message.author.send(`You attempted to use the \`generate\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	let number = Number(args[0]);
	if (!number) return message.reply("You must include the number of codes to generate!").catch(() => {
		return message.author.send(`You attempted to use the \`generate\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (number > 50) return message.reply("Number must be smaller than 51!").catch(() => {
		return message.author.send(`You attempted to use the \`generate\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	let codeschannel = bot.channels.find("id", "444588560859791381");
	let i = 0;
	while (i < number) {
		var a = random(10);
		await codeschannel.send(a).then((newmsg) => {
			bot.data.codes.push({ msg: newmsg, code: a });
		}).catch(() => {
			return message.author.send("Stopped because I couldn't add anything to the database").catch(function () { });
		});
		await message.author.send(`${a},`).catch(function () { });
		i++;
	}
	message.reply("All Done!").catch(() => {
		return message.author.send(`You attempted to use the \`generate\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
};
module.exports.help = {
	name: "generate",
	description: "Generates premium codes",
	type: "Developer"
};
