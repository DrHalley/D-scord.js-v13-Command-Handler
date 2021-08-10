const GuildConfig = require("../../database/GuildConfig");
exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply(":x: Bu komudu kullanmak için `Yönetici` yetkisine sahip olmalısın!");
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role) return message.reply(":x: Otorol özelliğini ayarlamak için bir rol etiketlemen veya ID'sini girmen lazım!");
    const config = await GuildConfig.findOne({guildId: message.guild.id});
    let autoRoles = config.get("autoRoles");
    if(autoRoles.some(a => a === role.id)) return message.reply(":x: Bu rol zaten otorol sisteminde varmış!");
    if(message.guild.me.roles.highest.rawPosition <= role.rawPosition) return message.reply(":x: Bu rolün yetkisi benden daha fazla. Lütfen rol sırasını kontrol edin!");
    if(message.member.roles.highest.rawPosition <= role.rawPosition) return message.reply(":x: Bu rolün yetkisi senden fazla olduğu için otorole ekleyemezsin!");
    autoRoles.push(role.id);
    config.markModified("autoRoles");
    await config.save();
    message.channel.send(`:white_check_mark: Otorol sistemine başarıyla \`@${role.name}\` rolü eklendi`);
   
}

exports.help = {
    name: "otorol-ekle",
    aliases: [],
    usage: `otorol @rol`,
    guildOnly: true,
    category: "moderasyon",
    description: "Sunucuya giren kişiler için verilecek rolleri ayarlarsınız"
}