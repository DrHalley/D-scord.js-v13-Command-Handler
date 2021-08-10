const { owner } = require("../../../config.json");
const GuildConfig = require("../../database/GuildConfig");
exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(":x: Bu komudu kullanmak için `Yönetici` yetkisine sahip olmalısın!");
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role) return message.reply(":x: Otorol özelliğini ayarlamak için bir rol etiketlemen veya ID'sini girmen lazım!");
    const config = await GuildConfig.findOne({guildId: message.guild.id});
    let autoRoles = config.get("autoRoles");
    if(!autoRoles.some(a => a === role.id)) return message.reply(`:x: Bu rolü otorol sisteminde bulamadım!`);
    autoRoles.pull(role.id);
    config.markModified("autoRoles");
    await config.save();
    message.channel.send(`:white_check_mark: Otorol sisteminden başarıyla \`@${role.name}\` rolü çıkartıldı.`);

}

exports.help = {
    name: "otorol-çıkar",
    aliases: [],
    usage: `otorol-çıkar @rol`,
    guildOnly: true,
    category: "moderasyon",
    description: "Otorol sisteminden bir rol çıkartırsınız"
}