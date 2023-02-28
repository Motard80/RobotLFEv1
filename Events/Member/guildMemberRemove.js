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
            id: "1080162950796542042",
            token: "GVdCvLsY6JGdG9otlYqgEmH7hy5iso3xB85j6Im_n_MIOfuQ-XDIxK6BlIQW9-0YlBZL",
        });
        const Depart =new MessageEmbed()
        .setColor("Aqua")
        .setAutor(user.tag.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(` **${member}*est Partie du serveur ${guild.name}**\n 
       Il avait rejoint : <t:${persint(member.joinedTimestamp/1000)}: R>\n
        Nous sommes maintenant **${guild.memberCount}** membres `)
        .setFooter(`ID: ${user.id}`)
        Welcomer.send({embeds : [Depart]})
    }
}