const { Client,  Intents, Collection} = require("discord.js");
const allIntents = new Intents();
const mongoose = require("mongoose");
const client = new Client({
     shards: "auto",
     intents: ['GUILDS',
      'GUILD_MEMBERS',
      'GUILD_BANS',
      'GUILD_EMOJIS_AND_STICKERS',
      'GUILD_INTEGRATIONS',
      'GUILD_WEBHOOKS',
      'GUILD_INVITES',
      'GUILD_VOICE_STATES',
      'GUILD_PRESENCES',
      'GUILD_MESSAGES',
      'GUILD_MESSAGE_REACTIONS',
      'GUILD_MESSAGE_TYPING',
      'DIRECT_MESSAGES',
      'DIRECT_MESSAGE_REACTIONS',
      'DIRECT_MESSAGE_TYPING']
    });
const { token } = require("../config.json");
const fs = require("fs");
client.commands = new Collection();

fs.readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = event.help.name;
      client.on(eventName, event.bind(null, client));
    });
  });
  
  fs.readdir("./src/commands/", (err, folders) => {
    if (err) return console.error(err);
    folders.forEach(folder => {
        fs.readdir(`./src/commands/${folder}/`, (e, files) => {
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let props = require(`./commands/${folder}/${file}`);
                let commandName = props.help.name;
                let commandAliases = props.help.aliases;
                if(commandAliases && commandAliases.length !== 0){
                    commandAliases.forEach(alias => {
                        client.commands.set(alias, props);
                    })
                }
                console.log(`Yüklenen komut ${commandName}`);
                client.commands.set(commandName, props);
              });
        })
    })
  });

  mongoose.connect('mongodb://localhost/redonya', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

client.login(token);
