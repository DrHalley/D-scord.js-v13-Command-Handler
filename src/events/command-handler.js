const GuildConfig = require("../database/GuildConfig");
module.exports = async (client, message) => {
    let config = await GuildConfig.findOne({guildId: message.guild.id});
    if(!config){
        const create = await GuildConfig.create({guildId: message.guild.id}).then(a => config = a);
    }
    let prefix = config.get("prefix");
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if(!command) return;
    if(command.help.guildOnly){
        if(!message.guild) return message.reply("Bu komut sadece sunucularda kullanılabiir");
    }
    command.run(client, message, args);
}

module.exports.help = {
    name: "messageCreate"
}