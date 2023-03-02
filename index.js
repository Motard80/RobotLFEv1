const {Client, Collection} = require('discord.js');
const { Token}= require("./Config.json");
const fs = require('fs');
// appel au dossier commads et au fichier se trouvant de dans.
const CommandsFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
//apel au dossier Events et les fichiers qui seront utilisées
const eventsiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));
//console.log(CommandsFiles);

const client= new Client({
    intents:[3276799
    ]
})
client.commands = new Collection();
//Verification du dossier events
//Par une boucle for et excution des events une ou plusieurs fois.
  for(const file of eventsiles){
    const event = require(`./Events/${file}`);
    if('name' in event && 'once' in event && 'execute' in event){
        if(event.once== true)
        {
            client.once(event.name, (...args) => event.execute(...args, client))
    }}
    else{
        console.log("Erreur lors de l'exécution de l'évènement dans le fichier Events/"+file+".js");


    }};

//Verification du dossier Commands
//Par une boucle for et excution des Commandes une ou plusieurs fois.
for(const file of CommandsFiles){
    const command = require(`./Commands/${file}`);
    if('data' in command && 'execute' in command){
        console.log(`La commande ${command.data.name} a été chargée`);
       // client.once(command.name, (...args) => command.execute(...args, client))
      //  console.log("Le commande "+command.name+" a été ajouté à la liste des commandes")
    }else{
     //   client.on(command.name, (...args) => command.execute(...args, client))
     //   console.log("Le commande "+command.name+" a été ajouté à la liste des commandes")
    }
}
client.on("interactionCreate", interaction => {
    const client = client.Commands.get(interaction.commandName);

    if(interaction.isChatInputCommand()&& interaction.commandName== command.data.name){
       try {
        command.execute(interaction, client);
       } catch (error) {
        console.log(error);
        
       }

    }})
//console.log(client.commands);
 client.login(Token);
          console.log(`Test`);  
