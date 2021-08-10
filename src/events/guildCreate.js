const GuildConfig = require("../database/GuildConfig");

module.exports = async (client, guild) => {
    const create = await GuildConfig.create({
        guildId: guild.id
    });
    console.log(`${guild.name} sunucusuna başarıyla katıldım. Veritabanına kaydeildi`)
}

module.exports.help = {
    name: "guildCreate"
}