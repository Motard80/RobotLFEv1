const {Client, ActionRowBuilder, InteractionType} = require('discord.js');
const { Token}= require("./Config.json");
const client= new Client({
    intents:[3276799
    ]
})
var prefix = "!";
client.on('ready', () => {
    console.log(` ${client.user.tag}suis connecter!`);
});
 client.on('messageCreate', async message => {
if(message.content==  prefix +'Help') {
    message.reply('Les commandes disponibles sont: ping, Help, Id, Name, ');

}if(message.content==  prefix +'Play') {
    message.reply('Le systeme de musique non disponible');
}
if(message.content==  prefix +'Id') {
    message.reply(message.author.id, message.author.username)
}
if(message.content==  prefix +'Name') {
    message.reply(message.author.username)
}
    /*
if(message.content==  prefix +'Avatar') {

message.reply(message.user.displayAvatarURL)

}*/


 })      
 client.on('interactionCreate',  interaction => {
    if(interaction.type== InteractionType.ApplicationCommand){
        if(interaction.commandName == "pdp"){
            interaction.channel.send(interaction.member.displayAvatarURL())
        }
    }
 })     
 client.login(Token);
          console.log(`Test`);  
