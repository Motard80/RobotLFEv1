
//connextion et vérification du bot
const {Client}=require('discord.js');
const fs=require('fs');
const commandsFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

module.exports ={
    name:"ready",
    once : true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(` ${client.user.tag}suis connecter!`);
        //Bot LFE
        for(const file of commandsFiles){
            const command = require(`../Commands/${file}`);
            client.guilds.cache.get("959380556582375464").commands.create(command.data)
            console.log(` La commande ${commandsFiles} a été créé sur le serveur ${client.guilds.cache.get("959380556582375464")}`)
            
            
        } 
        //Bot TESTBOT
        for(const file of commandsFiles){
            const command = require(`../Commands/${file}`);
            client.guilds.cache.get("1077880541161996390").commands.create(command.data)
            console.log(` La commande ${commandsFiles} a été créé sur le serveur ${client.guilds.cache.get("1077880541161996390")}`)
            
            
        }
    }
}