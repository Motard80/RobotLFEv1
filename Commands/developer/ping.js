const {Client, CommandeInteraction }= require("discord.jsi");

module.exports={
    name:"ping",
    description: "Donne le temps de réaction du Bot",
    permission : "ADMINISTRATOR",
    /**
     * 
     * @param {CommandeInteraction} ineteraction 
     * @param {Client} client 
     */
    execute(ineteraction, client){
        ineteraction.reply({content: `Pong ! J'ai\`$(client.ws.ping) de ping\``})
    }
}