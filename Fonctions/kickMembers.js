module.exports = {
  name: "KickInactif",
  execute: async (message, inactiveMembers, args) => {
    // Vérifie que l'utilisateur a la permission de kicker des membres
    const StaffArma3Dev = 1069931698676039770;
    const StaffArma3Test = 1078995086936899614;
    const StaffArma3Prod = 878256076452155462;
    const StaffLFEDev = 1069937549746917376;
    const StaffLFEProd = 814236122711982100;
    if (
      !message.member.permissions.has("KICK_MEMBERS") &&
      !message.member.roles.cache.hasAny(
        StaffArma3Test,
        StaffArma3Dev,
        StaffArma3Prod,
        StaffLFEDev,
        StaffLFEProd
      )
    ) {
      return message.reply(
        "Vous n'avez pas la permission de kicker des membres."
      );
    }

    // Expulse chaque membre inactif
    inactiveMembers.forEach((member) => {
      member
        .kick()
        .then(() =>
          message.channel.send(
            `${member.displayName} a été expulsé pour inactivité.`
          )
        )
        .catch((error) =>
          message.reply(`Impossible d'expulser ${member.displayName}: ${error}`)
        );
      message.channel
        .send("Kick de " + member.displayName + " a été expulsé.")
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 120000); // 2 minutes en millisecondes
        });
    });
  },
};
