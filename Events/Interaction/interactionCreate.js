const { CommandInteraction, Client } = require("discord.js");

const {Client, CommandInteraction, MessageEmbred}= ("discord.js");
module.exports={
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        if(interaction.isCommand() || interaction.isContextMenu()){
            const command = client.command.get(interaction.commandName);
            if(!command)return interaction.reply({embeds: [
                new MessageEmbred( )
                    .setColor("BLUE")
                    .setDescription("⛔- Une erreur est survenu lors de l'éxécution de la commande.")
               
            ]}) && Client.commands.delete(interaction.commandName);
            
            command.execute(interaction, client)
        }
     
    }
}