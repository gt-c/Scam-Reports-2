module.exports.run = async (bot, message, args) => {
	console.log(bot.data.prefixes);
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!");
	if (!args[0]) return message.reply("Please provide the new prefix!");
	let prefix = args[0];
	if (prefix.length > 5) return message.reply("The prefix cannot be more than 5 characters!");
	bot.data.prefixes.splice(bot.data.prefixes.indexOf(bot.data.prefixes.find(value => value.guildid === message.guild.id)), 1);
	var dbguild = bot.guilds.find("id", "443929284411654144");
	let prefixchannels = dbguild.channels.filter(m => RegExp("prefix-database", "gi").test(m.name));
	prefixchannels.forEach(chl => {
		chl.fetchMessages({ limit: 100 }).then(msgs => {
			msgs.forEach(msg => {
				if (msg.content.startsWith(`${message.guild.id}`)) {
					msg.delete();
				}
			});
		});
	});
	var prefixdatabase = bot.channels.find("name", "prefix-database");
	var messages = await prefixdatabase.fetchMessages({ limit: 100 });
	if (messages.size === 100) {
		await prefixdatabase.setName("o-prefix-database");
		await dbguild.createChannel("prefix-database");
		let newc = dbguild.channels.find("name", "prefix-database");
		await newc.overwritePermissions(prefixdatabase.guild.id, {
			READ_MESSAGES: false
		});
		await newc.setParent("444587981874135051");
		await newc.send(`${message.guild.id} ${prefix}`).then(() => {
			bot.data.prefixes.push({ guildid: message.guild.id, prefix: prefix });
			message.react("\u2705");
		});
	} else {
		prefixdatabase.send(`${message.guild.id} ${prefix}`).then(() => {
			bot.data.prefixes.push({ guildid: message.guild.id, prefix: prefix });
			message.react("\u2705");
		});
	}
};

module.exports.help = {
	name: "setprefix"
};
