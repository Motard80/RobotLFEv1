const { Message, Client } = require("discord.js")

module.exports = {
    name: "messageCreate",
    once: false, 
    /**
     * 
     * @param {Message} message 
     * @param {Client} Client 
     */
    execute(message, Client) {
        if(message.author.bot) return;
        
    message.channel.send("test")
    }
}