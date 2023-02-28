const {MessageEmbed, webhookClient, GuildMember, Message} = require("discord.js");
module.export={
    name: "guildMemberAdd", 
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const {user, guild} =member;
        member.roles.add("1080152056129650781");
        const Welcomer = webhookClient({
            id: "1080153084484931714",
            token: "MgQsi0p-eN5Mq_506HPHv3Qy6pcMQBbWjs4TIactI2Utu0bFtHMD3Fj5ItKYGoMbsktr",
        });
        const welcom =new MessageEmbed()
        .setColor("Aqua")
        .setAutor(user.tag.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`Bienvenue **${member}**sur le serveur ${guild.name}**\n 
        Compte créer le : <t:${persint(user.createdTimestamp/1000)}: R>\n
        Nous sommes maintenant **${guild.memberCount}** membres `)
        .setFooter(`ID: ${user.id}`)
        Welcomer.send({embeds : [Welcome]})
    }
}