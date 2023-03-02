const {SlashCommandBuilder, CommandInteraction} = require('discord.js');
module.exports = {
 data: new SlashCommandBuilder()
 .setName('ping')
.setDescription("renvoie le ping du bot"),
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
async execute(client, interaction) {
    interaction.reply("Pong!")

}
}