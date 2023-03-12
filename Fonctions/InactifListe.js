module.exports = {
  name: "InactifListe",
  execute: async (message, args) => {
    // Récupération des IDs de rôle donnés en paramètre
    const roleId1 = args[1083494292133261314];
    const roleId2 = args[1083494292133261312];
    const roleId3 = args[1083494292133261313];

    // Récupération de la liste des membres ayant l'un des rôles donnés en paramètre
    const membersWithRole = message.guild.members.cache.filter(
      (member) =>
        member.roles.cache.has(roleId1) ||
        member.roles.cache.has(roleId2) ||
        member.roles.cache.has(roleId3)
    );

    // Récupération de la liste des membres inactifs depuis plus de deux mois
    const inactiveMembers = membersWithRole.filter((member) => {
      const twoMonthsAgo = new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000);
      return member.lastMessageAt < twoMonthsAgo;
    });

    // Construction de la liste des membres inactifs
    let inactiveList = "Liste des membres inactifs :\n\n";
    inactiveMembers.forEach((member) => {
      inactiveList += `- ${member.displayName}\n`;
    });

    // Envoi de la liste des membres inactifs dans le canal où la commande a été envoyée
    message.channel.send(inactiveList).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 120000); // 5 minutes en millisecondes
    });
  },
};
