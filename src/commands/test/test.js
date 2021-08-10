const { owner } = require("../../../config.json");
exports.run = (client, message, args) => {
    if(message.author.id !== owner) return message.reply("Bu komut sahibime özel!")
    console.log(message.mentions.roles.first())
}

exports.help = {
    name: "test",
    aliases: [],
    usage: `test`,
    guildOnly: true,
    category: "test",
    description: "Bir test komudu"
}