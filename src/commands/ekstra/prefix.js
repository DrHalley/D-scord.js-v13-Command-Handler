const GuildConfig = require("../../database/GuildConfig");
exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply(":x: Bu komudu kullanmak için `Üyeleri At` yetkisine sahip olmalısın!");
    let prefix = args.slice(0).join(" ");
    if(!prefix) return message.reply(":x: Prefixi ayarlamak için bir prefix girmen gerek. Örnek: `//prefix <prefix>`");
    try{
        const create = await GuildConfig.findOneAndUpdate({guildId: message.guild.id}, {prefix}, {new: true});
        message.reply(`:white_check_mark: Bu sunucunun prefixini başarıyla ${prefix} olarak ayarladım.`)
    }catch(err){
        console.log(err)
    }
}

exports.help = {
    name: "prefix",
    aliases: [],
    usage: `prefix <prefix>`,
    guildOnly: true,
    category: "ekstra",
    description: "Prefixinizi değiştirirsiniz."
}