var random = require("random-string");
module.exports.run = async (bot, message, args) => {
	if (message.author.id !== "245877990938902529" && message.author.id !== "291367352476631040") return;
	let num = args[0];
	let number = Number(num);
	if (!number) return message.reply("Please include the number of codes to generate!");
	if (number > 50) return message.reply("Number must be smaller than 51!");
	let codeschannel = bot.channels.find("id", "444588560859791381");
	let i = 0;
	while (i < num) {
		var a = random(10);
		await codeschannel.send(a);
		await message.author.send(`${a},`);
		i++;
	}
	message.reply("All Done!");



};
module.exports.help = {
	name: "generate"
};
