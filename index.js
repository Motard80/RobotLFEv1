const {Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionType} = require('discord.js');
const { Token}= require("./Config.json");
const fs = require('fs');
// appel au dossier commads et au fichier se trouvant de dans.
const CommandsFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
//apel au dossier Events et les fichiers qui seront utilisées
const eventsiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));
const client= new Client({
    intents:[3276799
    ]
})
  for(const file of eventsiles){
  const event = require(`./Events/${file}`);
    if(event.once ==true){
    client.once(event.name, (...args) => event.execute(...args, client))
    console.log("L'event "+event.name+" a été ajouté à la liste des évenments")
    }else{
    client.on(event.name, (...args) => event.execute(...args, client))
    
    console.log("L'event "+event.name+" a été ajouté à la liste des évenments")
    }
}
 client.login(Token);
          console.log(`Test`);  
