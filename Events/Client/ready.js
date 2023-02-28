const { Client } = require("discord.js");



module.exports= {
    name:"ready",
    once: true, 
    /**
     * 
     * @param {Client} client 
     */
    execute(client){
        console.log(
            `Le client est c'est connecter en tant que ${client.user.username}`
        );
    client.user.setActivity(`je suis sur ${client.guilds.cache.size} seuveur`);
    },
};