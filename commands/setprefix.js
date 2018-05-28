module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!");
	if (!args[0]) return message.reply("Please provide the new prefix!");
	let prefix = args[0];
	if (prefix.length > 5) return message.reply("The prefix cannot be more than 5 characters!");
	bot.data.prefixes.splice(bot.data.prefixes.indexOf(bot.data.prefixes.find(value => value.guild === message.guild.id)), 1);
	if(bot.data.prefixes.find(value => value.guild === message.guild.id)) bot.data.prefixes.find(value => value.guild === message.guild.id).msg.delete();
	var prefixdatabase = bot.channels.find("name", "prefix-database");
	var messages = await prefixdatabase.fetchMessages({ limit: 100 });
	let dbguild = bot.guilds.get("443929284411654144");
	if (messages.size === 100) {
		await prefixdatabase.setName("o-prefix-database");
		await dbguild.createChannel("prefix-database");
		let newc = dbguild.channels.find("name", "prefix-database");
		await newc.overwritePermissions(prefixdatabase.guild.id, {
			READ_MESSAGES: false
		});
		await newc.setParent("444587981874135051");
		await newc.send(`${message.guild.id} ${prefix}`).then((newMessage) => {
			bot.data.prefixes.push({ msg: newMessage, guild: message.guild.id, prefix: prefix });
			message.react("\u2705");
		});
	} else {
		prefixdatabase.send(`${message.guild.id} ${prefix}`).then((newMessageTwo) => {
			bot.data.prefixes.push({ msg: newMessageTwo, guild: message.guild.id, prefix: prefix });
			message.react("\u2705");
		});
	}
};

module.exports.help = {
	name: "setprefix"
};
