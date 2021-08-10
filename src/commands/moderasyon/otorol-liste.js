const { MessageEmbed } = require("discord.js");
const { owner } = require("../../../config.json");
const GuildConfig = require("../../database/GuildConfig");
exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(":x: Bu komudu kullanmak için `Yönetici` yetkisine sahip olmalısın!");
    const config = await GuildConfig.findOne({guildId: message.guild.id});
    const autoRoles = config.get("autoRoles");
    let roles = `${autoRoles.map(a => `${message.guild.roles.cache.get(a)}`)}`;
    const embed = new MessageEmbed()
    .setTitle("Otorol Roller")
    .setDescription(`Otorol sistemindeki roller: ${roles}`);
    message.reply({embeds: [embed]})
}

exports.help = {
    name: "otorol-liste",
    aliases: [],
    usage: `otorol-liste`,
    guildOnly: true,
    category: "moderasyon",
    description: "Otorolde olan rolleri görüntülersiniz"
}