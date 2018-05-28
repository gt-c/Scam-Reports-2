const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
//const DBL = require("dblapi.js");
//const request = require("request-promise-native");
const bot = new Discord.Client({ disableEveryone: true });
bot.data = { prefixes: [], inPrompt: [], blacklistedUsers: [], blacklistedGuilds: [] };


bot.counter = false;

process.on("unhandledRejection", console.error);
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}
	jsfile.forEach((f) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});
/*function postServerCount() {
	return request.post({
		uri: `https://discordbots.org/api/bots/${bot.user.id}/stats`,
		headers: {
			Authorization: process.env.dbl,
		},
		json: true,
		body: {
			server_count: bot.guilds.size,
		},
	});
}*/
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	//postServerCount()
	let upvotesholdingchannel = bot.channels.find("id", "448615839533498388");
	let upvotessend = bot.channels.find("id", "448951130081460245");
	var upvoter;
	upvotesholdingchannel.fetchMessages({ limit: 100 }).then((msgs) => {
		msgs.forEach(async (msg) => {
			upvoter = await bot.fetchUser(msg.content);
			upvotessend.send(`Many thanks to ${upvoter.tag} for upvoting our bot!`).then(() => {
				msg.delete();
			});
		});
	});
	//---------------------------------------------------------------------------------------------------------------------------------- load data
	let dbguild = bot.guilds.get("443929284411654144");
	let channels = dbguild.channels.filter(m => RegExp("prefix-database", "gi").test(m.name));
	async function getPrefixes() {
		const nestedMessages = await Promise.all(channels.map(ch => ch.fetchMessages({ limit: 100 })));
		const flatMessages = nestedMessages.reduce((a, b) => a.concat(b));
		return flatMessages;
	}
	bot.channels.find("id", "444588561858035723").fetchMessages({ limit: 100 }).then((blacklistedusers) => {
		blacklistedusers.forEach((blacklisteduser) => {
			var userid = blacklisteduser.content;
			bot.data.blacklistedUsers.push({ msg: blacklisteduser, id: userid });
		});
	});
	bot.channels.find("id", "444588561858035723").fetchMessages({ limit: 100 }).then((blacklistedguilds) => {
		blacklistedguilds.forEach((blacklistedguild) => {
			var guild = blacklistedguild.content;
			bot.data.blacklistedGuilds.push({ msg: blacklistedguild, id: guild });
		});
	});
	var prefixMessages = await getPrefixes();
	prefixMessages.forEach((prefixMessage) => {
		var guild = prefixMessage.content.split(" ")[0];
		var prefix = prefixMessage.content.split(" ")[1];
		bot.data.prefixes.push({ msg: prefixMessage, guild: guild, prefix: prefix });
	});
	//---------------------------------------------------------------------------------------------------------------------------------- end data load

	bot.fetchUser("291367352476631040").then(user => {
		if (!user.presence.game) return bot.user.setActivity("for !help", { type: "WATCHING" });
		if (!user.presence.game.streaming) return bot.user.setActivity("for !help", { type: "WATCHING" });
		bot.user.setActivity(user.presence.game.name, {
			type: "STREAMING",
			url: user.presence.game.url
		});
	});
	await bot.user.setActivity("for !help", { type: "WATCHING" });
});
bot.on("presenceUpdate", function (oldMember, newMember) {
	if (oldMember.user.id === "291367352476631040") {
		if (newMember.presence.game !== null) {
			if (newMember.presence.game.streaming) {
				bot.user.setActivity(newMember.presence.game.name, {
					type: "STREAMING",
					url: newMember.presence.game.url
				});
			} else bot.user.setActivity("for !help", { type: "WATCHING" });
		} else bot.user.setActivity("for !help", { type: "WATCHING" });
	}
});
bot.on("guildCreate", async guild => {
	//postServerCount()
	let welcomeMessage = new Discord.RichEmbed().setTitle("Thanks For Adding Me To Your Server!").setColor("#0000ff").setDescription("Thanks for inviting Scam reports bot to your server!\nScam reports bot is owned by Scooby and ethan and was made by the Co-Owner, @ethanlaj#8805. For a list of commands, just say `!help`\nIf you need any help what so ever, feel free to join our support server!\nInvite link: https://discord.gg/53Jgcu5");
	let hichannel = guild.channels.filter(c => c.type === "text" && c.permissionsFor(bot.user).has("READ_MESSAGES") && c.permissionsFor(bot.user).has("SEND_MESSAGES")).first();
	if (hichannel) hichannel.send(welcomeMessage);
	if (bot.counter) await bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
});
bot.on("guildDelete", async () => {
	//postServerCount()
	if (bot.counter) await bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
});
bot.on("message", async message => {
	let upvotesholdingchannel = bot.channels.find("id", "448615839533498388");
	let upvotessend = bot.channels.find("id", "448951130081460245");
	var upvoter;
	if (message.channel === upvotesholdingchannel) {
		upvoter = await bot.fetchUser(message.content);
		upvotessend.send(`Many thanks to ${upvoter.tag} for upvoting our bot!`).then(() => {
			message.delete();
		});
	}
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);
	var rawPrefix = bot.data.prefixes.find(value => value.guild === message.guild.id);
	var prefix;
	if (!rawPrefix) prefix = botconfig.prefix;
	if (rawPrefix) prefix = rawPrefix.prefix;
	if ((message.isMemberMentioned(bot.user)) && (message.content.endsWith("prefix"))) {
		return message.reply(`My prefix is \`${prefix}\``);
	}
	if ((message.author === bot.user) && (message.channel.id === "434152264135868418") && (message.content.endsWith("request timeout"))) {
		message.delete(180000);
	}
	if ((message.isMemberMentioned(bot.user)) && (message.content.endsWith("prefix reset")) && (message.member.hasPermission("MANAGE_GUILD"))) {
		if (prefix !== botconfig.prefix) {
			bot.data.prefixes.splice(bot.data.prefixes.indexOf(bot.data.prefixes.find(value => value.guild === message.guild.id)), 1);
			if(rawPrefix) rawPrefix.msg.delete();
			message.react("\u2705");
		} else {
			message.react("\u2705");
		}
	}
	if (!message.content.startsWith(prefix)) return;
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if (!commandfile) return;
	return commandfile.run(bot, message, args, prefix);
});
bot.login(botconfig.token);
