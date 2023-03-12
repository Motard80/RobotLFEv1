const path = require('path');
const fs = require('fs');
//Ajout des membres dans le fichier json
function ListMember(message, idServeur) {
    const dataPath = path.join(__dirname, '../Members', 'Members.json');
    const membersData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const filteredMembersData = membersData.filter(memberData => memberData.joinedAt && memberData.joinedAt.length > 0 && message.guild.id === idServeur);

    if (filteredMembersData.length > 0) {
        const membersDataString = filteredMembersData.map(memberData => {
            const rolesString = memberData.roles.join(', ');
            return `${memberData.username} (${memberData.joinedAt}) (${memberData.roles}) - ${rolesString}`;
        }).join('\n');

        const MAX_LENGTH = 1900;
        if (membersDataString.length > MAX_LENGTH) {
            const chunks = membersDataString.match(new RegExp(`(.|[\r\n]){1,${MAX_LENGTH}}`, 'g'));
            for (const chunk of chunks) {
                message.channel.send(`**Liste des membres de ce serveur:**\n${chunk}`);
            }
        } else {
            message.channel.send(`**Liste des membres de ce serveur:**\n${membersDataString}`);
        }
    } else {
        message.channel.send('Aucun membre trouvé pour ce serveur.');
    }
}
//Mise à jours du tableau des membres
function MajMember(member) {
    if (!member || !member.user) {
      console.error('Invalid member object:', member);
      return;
    }
  
    const dataPath = path.join(__dirname, '../Members', 'Members.json');
    const membersData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
    const index = membersData.findIndex(m => m.id === member.user.id);
    if (index !== -1) {
      membersData[index] = {
        serveur: member.guild.name,
        id: member.user.id,
        tag: member.user.tag,
        avatar: member.user.displayAvatarURL({ dynamic: true }),
        bot: member.user.bot,
        username: member.user.username,
        idServeur: member.guild.id,
        joinedAt: member.joinedAt,
        roles: member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.name),
      };
    } else {
      membersData.push({
        serveur: member.guild.name,
        id: member.user.id,
        tag: member.user.tag,
        avatar: member.user.displayAvatarURL({ dynamic: true }),
        bot: member.user.bot,
        username: member.user.username,
        idServeur: member.guild.id,
        joinedAt: member.joinedAt,
        roles: member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.name),
      });
    }
  
    fs.writeFileSync(dataPath, JSON.stringify(membersData, null, 2));
  }
  function deleteMembersTableau() {
    const dataPath = path.join(__dirname, '../Members', 'Members.json');
    fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
  }

  module.exports={
    ListMember, 
    MajMember,
    deleteMembersTableau
};
