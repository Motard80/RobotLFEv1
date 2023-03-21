
const { Client } = require("discord.js");
const client = new Client({ intents: 3276799 });const fs = require('fs');

// Définir la fonction saveRoles
function saveRoles(guild) {
  const rolesData = [];
  guild.roles.cache.forEach(role => {
    rolesData.push({
      Id: rolesData.length + 1,
      NameRole: role.name,
      IdRole: role.id
    });
  });
  const serverName = guild.name;
  const serverId = guild.id;
  const jsonData = JSON.stringify({ ServerName: serverName, serverId: serverId, RolesData: rolesData }, null, 2);
  const fileName = `./Roles/Roles_${serverName}.json`;
  fs.writeFileSync(fileName, jsonData);
}

// Définir la fonction CreateMembers
async function CreateMembers(guild) {
    // Récupérer les membres du serveur
    const members = guild.members.cache;
  
    // Récupérer les informations des membres
    const membersData = members.map(member => ({
      Pseudo: member.user.username,
      Tag: member.user.tag,
      Id: member.user.id,
      DateArrivee: member.joinedAt.toLocaleDateString(),
      Commentaire: "",
      Role: member.roles.cache.map(role => role.name),
      RolesId: []
    }));
  
    // Récupérer les données des rôles sauvegardées
    const rolesFileName = `./Roles/Roles_${guild.name}.json`;
    let rolesData = [];
    try {
      const data = fs.readFileSync(rolesFileName);
      if (data.length > 0) {
        rolesData = JSON.parse(data).RolesData;
      }
    } catch (err) {
      console.error(err);
    }
  
    // Mettre à jour les ID des rôles pour chaque membre
    membersData.forEach(member => {
      member.RolesId = member.Role.map(roleName => {
        const roleData = rolesData.find(role => role.NameRole === roleName);
        return roleData ? roleData.Id : "";
      });
    });
  
    // Convertir les données des membres et des rôles en JSON
    const membersJson = JSON.stringify(membersData, null, 2);
    const rolesJson = JSON.stringify(rolesData, null, 2);
  
    // Vérifier si le dossier pour le serveur existe
    const serverFolder = `./${guild.name}`;
    if (!fs.existsSync(serverFolder)) {
      fs.mkdirSync(serverFolder);
    }
  
    // Vérifier si le fichier pour les membres existe
    const membersFileName = `${serverFolder}/Members_${guild.name}.json`;
    if (!fs.existsSync(membersFileName)) {
      // Créer le fichier pour les membres
      const jsonData = JSON.stringify({ ServerName: guild.name, MembersData: membersData }, null, 2);
      fs.writeFileSync(membersFileName, jsonData);
    } else {
      // Mettre à jour les données des membres dans le fichier
      const data = fs.readFileSync(membersFileName);
      const jsonData = JSON.parse(data);
      jsonData.MembersData = membersData;
      fs.writeFileSync(membersFileName, JSON.stringify(jsonData, null, 2));
    }
  }
  

// Exporter la fonction CreateMembers
module.exports = { CreateMembers,
     saveRoles};
/*
Notez que ce script suppose que le dossier "Roles" existe et contient les fichiers JSON contenant 
les informations sur les rôles de chaque serveur. Si le dossier ou les fichiers n'existent pas, 
le script échouera. Il est donc important de s'assurer que le dossier "Roles" est créé avant d'utiliser ce script.


En outre, ce script ne prend pas en compte les changements de rôles ou de commentaires des membres après 
l'exécution de la fonction. Si des modifications sont apportées aux rôles ou aux commentaires des membres,
 il sera nécessaire d'exécuter à nouveau la fonction "CreateMembers" pour mettre à jour les données dans le fichier
  JSON correspondant.

Enfin, ce script ne prend pas en compte les interactions utilisateur via les commandes slash, 
les messages embeds ou les interactions. Si vous avez besoin de gérer ces interactions,
 vous devrez ajouter du code supplémentaire pour gérer ces cas spécifiques.*/
