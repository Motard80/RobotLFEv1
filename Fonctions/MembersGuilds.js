const { Client } = require("discord.js");
const client = new Client({ intents: 3276799 });
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const Comments = require("./Comments.js");
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
async function ListOfMembersByRole(message, roleName) {
  // Récupération du serveur
  const server = message.guild;

  // Vérification que le message a été envoyé dans un serveur
  if (!server) {
    message.channel.send(
      "Cette commande ne peut être utilisée que dans un serveur."
    );
    return;
  }

  // Récupération du rôle sélectionné
  const role = server.roles.cache.find((r) => r.name === roleName);

  // Vérification que le rôle a été trouvé
  if (!role) {
    message.channel.send(`Le rôle "${roleName}" n'a pas été trouvé.`);
    return;
  }

  // Récupération des membres ayant le rôle sélectionné
  const members = role.members.filter((member) => !member.user.bot);

  // Vérification qu'au moins un membre a été trouvé
  if (members.size === 0) {
    message.channel.send(`Aucun membre n'a le rôle "${roleName}".`);
    return;
  }

  // Création des messages pour chaque membre
  members.forEach((member, index) => {
    // Récupération des informations du membre
    const username = member.user.username;
    const id = member.user.id;
    const avatar = member.user.avatarURL({ size: 256, dynamic: true });
    const joinDate = member.joinedAt.toLocaleDateString("fr-FR");
    const roles = member.roles.cache
      .filter((r) => r.name !== "@everyone" && r.name !== roleName)
      .map((r) => r.name)
      .join(", ");

    // Création du message
    const memberMessage = `Membre: **${username}** (ID: ${id})\nAvatar: ${avatar}\nDate d'arrivée sur le serveur: ${joinDate}\nAutres rôles: ${roles}`;

    // Envoi du message et ajout de la réaction pouce levée
    message.channel
      .send({ content: memberMessage, allowedMentions: { repliedUser: false } })
      .then((sentMessage) => {
        sentMessage.react("👍");

        // Filtre pour récupérer les réactions du membre non-bot
        const filter = (reaction, user) => !user.bot;

        // Création du collecteur de réactions
        const collector = sentMessage.createReactionCollector({
          filter,
          time: 300000,
        }); // 5 minutes

        // Réaction à une nouvelle réaction
        collector.on("collect", (reaction, user) => {
          // Vérification que la réaction est une pouce levée
          if (reaction.emoji.name === "👍") {
            // Récupération du membre correspondant à la réaction
            const selectedMember = members.find(
              (m) =>
                m.user.username ===
                reaction.message.content
                  .split("Membre: **")[1]
                  .split("** (ID:")[0]
            );
            const member = selectedMember.user.username;
            console.log(member + " Appel a la fonction ListOfMembersByRole");
            // Affichage du message de sélection
            message.channel.send(
              `Membre sélectionné: **${selectedMember.user.username}**`
            );
            console.log("Appel a la fonction Member ");
            const authorName = user.username;
            const serverName = server.name;
            const comment = "Votre commentaire ici";
            Comments.CommentsByMember(serverName, authorName, comment);
          }
        });

        // Réaction à la fin du temps imparti
        collector.on("end", (collected) => {
          // Suppression des messages
          message.delete();
          collected.forEach((reaction) => reaction.message.delete());
        });
      })
      .catch(console.error);
  });
}

// Fonction pour afficher un membre avec ses commentaires
// Exporter la fonction CreateMembers
module.exports = {
  CreateMembers,
  saveRoles,
  ListOfMembersByRole,
};
/*
 */
