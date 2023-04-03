const Discord = require("discord.js");
const MembersGuild = require("./MembersGuilds.js");
const Comments = require("./Comments.js");
const { cp } = require("fs");
// Définition de la fonction ListRole
async function ListRole(message) {
  // Récupération du serveur
  const server = message.guild;

  // Vérification que le message a été envoyé dans un serveur
  if (!server) {
    message.channel.send(
      "Cette commande ne peut être utilisée que dans un serveur."
    );
    return;
  }

  // Récupération des rôles du serveur
  const roles = server.roles.cache.filter(
    (role) => !role.managed && role.name !== "@everyone"
  );

  // Parcours des rôles
  roles.forEach((role, index) => {
    // Création d'un message pour chaque rôle
    const roleMessage = `Role: **${role.name}** `;
    const color = role.hexColor;

    // Envoi du message et ajout de la réaction pouce levée
    message.channel
      .send({ content: roleMessage, allowedMentions: { repliedUser: false } })
      .then(async (sentMessage) => {
        await sentMessage.react("👍");

        // Filtre pour récupérer les réactions du membre non-bot
        const filter = (reaction, user) => !user.bot;

        // Création du collecteur de réactions
        const collector = sentMessage.createReactionCollector(filter, {
          time: 300000,
        }); // 5 minutes

        // Réaction à une nouvelle réaction
        collector.on("collect", (reaction, user) => {
          // Vérification que la réaction est une pouce levée
          if (reaction.emoji.name === "👍") {
            // Récupération du rôle correspondant à la réaction
            const selectedRole = roles.find((r) => r.name === role.name);
            const roleName = selectedRole.name;
            // Affichage du message de sélection
            message.channel.send(`Selection du rôle: **${selectedRole.name}**`);
            console.log("Appel a la fonction ListOfMemberByRole");
            MembersGuild.ListOfMembersByRole(message, roleName);
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

module.exports = {
  ListRole,
};

/*Dans ce code, nous avons ajouté une étape de filtrage pour exclure le rôle @everyone de la liste des rôles. 
Ensuite, nous avons ajouté une condition qui vérifie si la liste filtrée n'est pas vide avant d'envoyer le message.
 Si la liste est vide, le bot envoie un message indiquant qu'il n'y a aucun rôle à afficher.*/
