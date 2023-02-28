const{CommandeInteraction, Client} = require("discord.js");
module.exports ={
    name:"Emit",
    description: "Permet d'émetre une commande",
    permissions: "ADMINISTRATOR",
    option: [
        {
            name:"member",
            description: "Evenement en rapport à un membre",
            type: "STRING",
            required : true,
            choices : [{
                name:"guildMemberAdd", 
                value: "GuildMemberAdd"
            },
            {
                name:"guildMemberRemove", 
                value: "GuildMemberRemove"
            }
        ]
        }

    ],
    /**
     * 
     * @param {CommandeInteraction} interaction 
     * @param {Client} client 
     */
    execute(Interaction, client){
        const choises = interaction.option.getString("Member");

        switch(choises){
            case"guildMemberAdd": {
                client.emit("guildMemeberAdd", interaction.member);
                interaction.reply({content : "Emet l'evenement d'une arrivé", ephemeral: true})
            }break;
            case"guildMemeberRemove": {
                client.emit("guildMemeberRemove", interaction.member);
                interaction.reply({content : "Emet l'evenement d'un départ", ephemeral: true})
            }break; 
        }
    }
}