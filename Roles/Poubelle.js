const { Client } = require("discord.js");
const client = new Client({ intents: 3276799 });
const Discord = require('discord.js');
const fs = require("fs");
const path = require("path");
// Définir la fonction saveRoles
function saveRoles(guild) {
  const rolesData = [];
  guild.roles.cache.forEach((role) => {
    rolesData.push({
      Id: rolesData.length + 1,
      NameRole: role.name,
      IdRole: role.id,
    });
  });
  const serverName = guild.name;
  const serverId = guild.id;
  const jsonData = JSON.stringify(
    { ServerName: serverName, serverId: serverId, RolesData: rolesData },
    null,
    2
  );
  const fileName = `./Roles/Roles_${serverName}.json`;
  fs.writeFileSync(fileName, jsonData);
}
// Définir la fonction CreateMembers
async function CreateMembers(guild) {
  // Récupérer les membres du serveur
  const members = guild.members.cache;

  // Récupérer les informations des membres
  const membersData = members.map((member) => ({
    Pseudo: member.user.username,
    Tag: member.user.tag,
    Id: member.user.id,
    DateArrivee: member.joinedAt.toLocaleDateString(),
    Commentaire: "",
    Role: member.roles.cache.map((role) => role.name),
    RolesId: [],
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
  membersData.forEach((member) => {
    member.RolesId = member.Role.map((roleName) => {
      const roleData = rolesData.find((role) => role.NameRole === roleName);
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
    const jsonData = JSON.stringify(
      { ServerName: guild.name, MembersData: membersData },
      null,
      2
    );
    fs.writeFileSync(membersFileName, jsonData);
  } else {
    // Mettre à jour les données des membres dans le fichier
    const data = fs.readFileSync(membersFileName);
    const jsonData = JSON.parse(data);
    jsonData.MembersData = membersData;
    fs.writeFileSync(membersFileName, JSON.stringify(jsonData, null, 2));
  }
}
// Déclaration de la fonction ListRole
function ListRole(message ) {
  // Récupération du serveur
  const guild = message.guild;

  // Récupération de la liste des rôles en excluant le rôle @everyone
  const roles = guild.roles.cache.filter(role => role.name !== '@everyone');

  // Envoi d'un message pour chaque rôle avec une réaction pouce levé
  roles.each(role => {
    // Création du message
    const roleMessage = `Rôle : ${role.name}`;

    // Envoi du message
    message.channel.send(roleMessage).then(sentMessage => {
      // Ajout de la réaction de pouce levé
      sentMessage.react('👍');

      // Création du filtre pour la réaction de l'utilisateur
      const filter = (reaction, user) => {
        return ['👍'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      // Création du collecteur de réactions
      const collector = sentMessage.createReactionCollector(filter, { time: 15000 });

      // Événement de collecte d'une réaction
      collector.on('collect', (reaction, user) => {
        // Vérification que l'utilisateur est bien celui qui a initié la commande
        if (user.id === message.author.id) {
          // Envoi d'un message de confirmation si l'utilisateur a réagi avec la bonne réaction
          if (reaction.emoji.name === '👍') {
            message.channel.send('Role sélectionné.'+ `${role.name}`);

            // Appel de la fonction SelectMembers pour afficher la liste des membres avec le rôle sélectionné
            const roleName = role.name;
            SelectMembers(message, roleName);
            Trie(message, roleName);
            Commentaire(message, roleName); // Ajout de l'appel de la fonction Commentaire après Trie
          }
        }
      });
    });
  });

  const role = message.guild.roles.cache.find(r => r.name === roleName);
  if (!role) {
    message.channel.send(`Le rôle ${roleName} n'existe pas sur ce serveur.`);
    return;
  }
  const ServeurName = message.guild.name;
  message.channel.send(`Membres avec le rôle ${roleName} sur le serveur ${ServeurName} : \n${members}`);



  
  const now = Date.now();
  const members = role.members.map(member => {
    const memberDate = new Date(member.joinedTimestamp);
    const joinDate = `${memberDate.getDate().toString().padStart(2, '0')}/${(memberDate.getMonth()+1).toString().padStart(2, '0')}/${memberDate.getFullYear().toString().substring(2, 4)}`;
    const diffInDays = (now - member.joinedTimestamp) / (1000 * 60 * 60 * 24);
    const memberName = member.user.username;
    const memberAvatar = member.user.avatarURL();
    const memberTag = member.user.tag;

    return {
      name: memberName,
      tag: memberTag,
      avatar: memberAvatar,
      joinDate: joinDate,
      diffInDays: diffInDays,
    };
  });

  const serverFolderPath = `./${serverName}`;
  let membersData = {};
  try {
    const membersDataPath = `${serverFolderPath}/Members_${serverName}.json`;
    const membersDataFile = fs.readFileSync(membersDataPath);
    membersData = JSON.parse(membersDataFile);
  } catch (error) {
    console.log(`Erreur lors de la récupération des données des membres pour le serveur ${serverName}`);
    console.log(error);
  }

  for (const member of members) {
    let comment = '';
    if (member.name in membersData) {
      comment = membersData[member.name];
    }
    const memberMessage = `Membre : ${member.name}\nTag : ${member.tag}\nAvatar : ${member.avatar}\nArrivé(e) le ${member.joinDate} (${Math.floor(member.diffInDays)} jours sur le serveur)\nCommentaire : ${comment}`;
    const sentMessage =  message.channel.send(memberMessage);
     sentMessage.react('👍');

    const filter = (reaction, user) => {
      return ['👍'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    const collector = sentMessage.createReactionCollector({ filter, time: 15000 });

    collector.on('collect', async (reaction) => {
      if (reaction.emoji.name === '👍') {
        Commentaire(message, roleName);
      }
    });
  }


  const serverName = message.guild.name;
  

  for (const member of members) {
    let comment = '';
    if (member.name in membersData) {
      comment = membersData[member.name];
    }
    const memberMessage = `Membre : ${member.name}\nTag : ${member.tag}\nAvatar : ${member.avatar}\nArrivé(e) le ${member.joinDate} (${Math.floor(member.diffInDays)} jours sur le serveur)\nCommentaire : ${comment}`;
    const sentMessage =  message.channel.send(memberMessage);
     sentMessage.react('👍');

    const filter = (reaction, user) => {
      return ['👍'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    const collector = sentMessage.createReactionCollector({ filter, time: 15000 });

    collector.on('collect', async (reaction) => {
      if (reaction.emoji.name === '👍') {
        const filter2 = (m) => m.author.id === message.author.id;
        const sentMessage2 = await message.channel.send(`Entrez le commentaire pour ${member.name}`);
        const collectedMessage = await message.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time'] });
        const commentContent = collectedMessage.first().content;
        membersData[member.name] = commentContent;
        fs.writeFileSync(`${serverFolderPath}/Members_${serverName}.json`, JSON.stringify(membersData, null, 2));
        await message.channel.send(`Le commentaire pour ${member.name} a été enregistré.`);
      }
    });
  
  }}


  // Fonction pour afficher un membre avec ses commentaires
// Exporter la fonction CreateMembers
module.exports = {
  CreateMembers,
  saveRoles,
  CreateMembers,
  ListRole,
};
/*Ce code parcourt la liste des rôles et envoie un message pour chaque rôle avec une réaction pouce levé.
 Le filtre est utilisé pour s'assurer que seule la réaction de l'utilisateur qui a initié la commande est prise
  en compte. 
  Le collecteur de réactions est utilisé pour détecter la réaction de l'utilisateur et 
  envoyer un message de confirmation.

  La fonction Trie utilise la fonction SelectMembers pour récupérer la liste des membres ayant un certain rôle.
   Ensuite, pour chaque membre, on calcule la différence en jours entre la date actuelle et
    la date d'arrivée sur le serveur (utilisant la propriété joinedTimestamp). 
    En fonction de cette différence, on ajoute le nom du membre à la liste correspondante 
    (moins de 2 semaines, entre 2 semaines et 1 mois, plus d'un mois). Finalement, 
    on envoie la liste complète dans le canal de texte.

Notez que cette fonction utilise la méthode joinedTimestamp qui renvoie la date d'arrivée du membre 
sur le serveur en tant que timestamp en millisecondes. La différence entre deux timestamps peut être
 utilisée pour calculer la différence en jours.

*/
