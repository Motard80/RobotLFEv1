
//connextion et vérification du bot
const {Client}=require('discord.js');

module.exports ={
    name:"ready",
    once : true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(` ${client.user.tag}suis connecter!`);
    }
}