const { SlashCommandBuilder } = require("discord.js");

module.exports= {
    data:new SlashCommandBuilder()
    .setName("ban")
    .setDescription('Pour bannir un utilisateur')

}