// Importer le module path
const path = require("path");
const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 3276799 });
const fs = require("fs");
const MsgCleaner = require("../Fonctions/MsgCleanup.js");
const { token, prefix } = require("../Config/config.json");
const Fonctions = require("../Fonctions/fonction.js");
const KickMember = require("../Fonctions/kickMembers.js");
const InactifListe = require("../Fonctions/InactifListe.js");
const ListAformer = require("../Fonctions/ListAFormer.js");
const Ressources = require("../Ressources/liste_fonctions.json");
const MembersGuild = require("../Fonctions/MembersGuilds.js");
const ListMembersRole = require("../Fonctions/ListAFormer");
const DemarerBot = require("../Fonctions/Launch");
const Roles = require("../Fonctions/Roles");

const Donner = require("../Log/FonctionLog.js");

//commande de test de fonctionnement des differentes fonctions
client.on("messageCreate", async (message) => {
  // Un message est posté
  if (message.author.bot) return; // Ignore si message bot
});

function getMembersInfo(message) {
  // Récupérer la liste des membres du serveur
  const guild = client.guilds.cache.get("1069915992848875590");
  // Id : 959380556582375464 ->Test Bot 7 LFE
  //Id: 1077880541161996390 ->TestBot
  //Id : 1069915992848875590 ->LFE-Dev
  //ID : 814235304806056007 -> 7éme LFE
  if (!guild) {
    console.log(
      `Le bot n'est pas connecté au serveur avec l'ID ${"1069915992848875590"}.`
    );
    return;
  }
  guild.members.fetch().then((members) => {
    // Récupérer les informations de chaque membre
    const membersData = members.map((member) => ({
      serveur: guild.name,
      id: member.user.id,
      tag: member.user.tag,
      avatar: member.user.displayAvatarURL({ dynamic: true }),
      bot: member.user.bot,
      username: member.user.username,
      idServeur: member.guild.id,
      joinedAt: member.joinedAt,
      commantaire: "",
      roles: member.roles.cache
        .filter((role) => role.name !== "@everyone")
        .map((role) => role.name),
    }));

    // Ecrire les données dans un fichier JSON
    const dataPath = path.join(__dirname, "../Members", "Members.json");
    fs.writeFileSync(dataPath, JSON.stringify(membersData, null, 2));
    message.channel.send("Le fichier Members.json a été mis à jour.");
  });
}
client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "Lance")) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "lance") {
      DemarerBot.launch(message);
    }
  }
});

//Commandes du bot
client.on(
  "messageCreate",
  async (message) => {
    // Un message est posté
    if (message.author.bot) return; // Ignore si message bot

    if (message.content.startsWith(prefix + "Staff")) {
      Fonctions.EnvoieMessagePredef(message, Ressources.Staff); // Message staff
    } else if (message.content.startsWith(prefix + "Bienvenue")) {
      Fonctions.EnvoieMessagePredef(message, Ressources.Bienvenue);
    } else if (message.content.startsWith(prefix + "Operateur")) {
      Fonctions.EnvoieMessagePredef(message, Ressources.Operateur); // message au nouveau opérateur
    } else if (message.content.startsWith(prefix + "Veteran")) {
      Fonctions.EnvoieMessagePredef(message, Ressources.Veteran); // Message Véterant
    } else if (message.content.startsWith(prefix + "Formateur")) {
      Fonctions.EnvoieMessagePredef(message, Ressources.Formateur); // Formateur
    } else if (message.content.startsWith(prefix + "Recruteur")) {
      Fonctions.EnvoieMessagePredef(message, Ressources.Recruteur); // Recruteur
    } else if (message.content.startsWith(prefix + "Recrue")) {
      Fonctions.EnvoieMessagePredef(message, Ressources.Recrue); // Recrue
    } else if (message.content.startsWith(prefix + "SOS")) {
      Fonctions.aide(message, Ressources); // Message d'aide
    } else if (message.content.startsWith(prefix + "TestFiles")) {
      ListMembersRole.saveRoles(message.guild);
    } else if (message.content.startsWith(prefix + "listeMembres")) {
      Fonctions.ListeMembres(message); // Liste des membres MY.listeMembres
    } else if (message.content.startsWith(prefix + "listeRoles")) {
      // Liste des roles listeRoles
      Fonctions.ListeRoles(message);
    } else if (message.content.includes("test")) {
      message.reply(message.mentions.roles);
    } else if (message.content.startsWith(prefix + "Modif")) {
      Fonctions.reply(message, "Effectuer");
    } else if (message.content.startsWith(prefix + "MsgClean")) {
      const channelId = message.channelId;
      console.log(channelId);
      const channel = client.channels.cache.get(channelId);
      MsgCleaner.clearChannel(channel);
      message.channel
        .send("Le channel " + channel.name + " a été supprimé avec succès.")
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 120000); // 5 minutes en millisecondes
        });
    } else if (message.content.startsWith(prefix + "InactifListe")) {
      // Séparation de la commande et des arguments
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      // Appel de la fonction InactifListe si la commande est "InactifListe"
      if (command === "inactifliste") {
        InactifListe.execute(message, args);
      }
    } else if (message.content.startsWith(prefix + "KickList")) {
      // Exécute la fonction InactifListe pour récupérer la liste des membres inactifs
      const roleId1 = "1083494292133261314";
      const roleId2 = "1083494292133261312";
      const roleId3 = "1083494292133261313";
      const args = [roleId1, roleId2, roleId3];
      const inactiveMembers = message.guild.members.cache
        .filter(
          (member) =>
            member.roles.cache.has(roleId1) ||
            member.roles.cache.has(roleId2) ||
            member.roles.cache.has(roleId3)
        )
        .filter((member) => {
          const twoMonthsAgo = new Date(
            Date.now() - 2 * 30 * 24 * 60 * 60 * 1000
          );
          return member.lastMessageAt < twoMonthsAgo;
        });

      // Exécute la fonction KickInactif pour expulser les membres inactifs
      await KickMember.execute(message, inactiveMembers);
    } else if (
      message.content.startsWith(prefix + "ManthysKitHelldrigeLoopingHades")
    ) {
      message
        .reply(
          "Es-tu sûr(e) de vouloir supprimer les fichiers JSON contenant les membres du serveur ?"
        )
        .then(async (confirmationMessage) => {
          await confirmationMessage.react("✅");
          await confirmationMessage.react("❌");

          const filter = (reaction, user) =>
            ["✅", "❌"].includes(reaction.emoji.name) &&
            user.id === message.author.id;
          const collector = confirmationMessage.createReactionCollector({
            filter,
            time: 15000,
          });

          const ListMembersGuild = require("../Fonctions/MembersGuilds.js");
          collector.on("collect", async (reaction) => {
            if (reaction.emoji.name === "✅") {
              try {
                await ListMembersGuild.deleteMembersTableau();
                message
                  .reply(
                    "Les fichiers JSON contenant les membres ont été supprimés."
                  )
                  .then((msg) => {
                    setTimeout(() => {
                      msg.delete();
                    }, 120000); // 5 minutes en millisecondes
                  });
              } catch (error) {
                console.error(error);
                message
                  .reply(
                    "Une erreur est survenue lors de la suppression des fichiers JSON contenant les membres."
                  )
                  .then((msg) => {
                    setTimeout(() => {
                      msg.delete();
                    }, 120000); // 5 minutes en millisecondes
                  });
              }
            } else {
              message.reply("Suppression annulée.").then((msg) => {
                setTimeout(() => {
                  msg.delete();
                }, 120000); // 5 minutes en millisecondes
              });
            }

            collector.stop();
          });

          collector.on("end", (collected, reason) => {
            if (reason === "time") {
              confirmationMessage
                .reply("Le temps imparti pour répondre a expiré.")
                .then((msg) => {
                  setTimeout(() => {
                    msg.delete();
                  }, 120000); // 5 minutes en millisecondes
                });
            }
          });
        });
    } else if (message.content.startsWith(prefix + "AddMembers")) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      const guild = message.guild;

      // Vérifier que saveRoles retourne bien une promesse
      if (MembersGuild.CreateMembers(guild)) {
        if (MembersGuild.saveRoles(message.guild)) {
          message.channel
            .send("Les membres ont été ajoutés avec succès !")
            .then((msg) => {
              setTimeout(() => {
                msg.delete();
              }, 120000);
            }); // 2 minutes en millisecondes;
        } else {
          console.log(
            " l'ajout des membres et la création du dossier et du fichier c'est bien passé."
          );
          message.channel
            .send(
              "l'ajout des membres et la création du dossier et du fichier c'est bien passé."
            )
            .then((msg) => {
              setTimeout(() => {
                msg.delete();
              }, 120000);
            });
        }
      } else {
        console.log(
          "Liste des roles Créer dans le dossier Roles ou mise a jour."
        );
        message.channel
          .send("Liste des roles Créer dans le dossier Roles ou mise a jour.")
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 120000);
          });
      }
    } else if (message.content.startsWith(prefix + 'ListMember')) {
      const ServeurName = message.guild.name;
      console.log(ServeurName +" index");
       MembersGuild.ListRoles( ServeurName, message);
    }else if (message.content.startsWith(prefix + 'RoleList')) {
      const ServeurName = message.guild.name;
      console.log(ServeurName +" index Fonction RoleList ");
      await Roles.ListRole( message);
    }else if (message.content.startsWith(prefix + 'showlogs')){
      const logs = fs.readFileSync('../log/console.log', 'utf8')
      .split('\n')
      .filter((line) => line !== '')
      .map((line) => {
        const log = {
          timestamp: new Date().toISOString(),
          message: line
        };
        return log;
      });
    fs.writeFileSync('../log/logs.json', JSON.stringify(logs));
    message.channel.send('Logs Sauvegarder!');
    }
  },
  "message",
  async (message) => {
    if (message.author.bot) return; // Ignore si message bot

    if (message.content.startsWith(prefix + "Modif")) {
      console.log("test");
      Fonctions.AjoutReaction(message, "Message effectué");
    }
  },

  "message",
  async (message) => {
    /// Modification ou ajout d'un message
    let rawdata = fs.readFileSync("message_bienvenue.json");
    let Toto = JSON.parse(rawdata);
    if (message.author.bot) return; // Ignorer les messages des bots
    if (!message.content.startsWith(prefix + "Mofification")) return; // Vérifier que la commande commence par !ajouter-modifier
    const args = message.content.slice(16).split(","); // Récupérer les arguments saisis par l'utilisateur
    const id = args[0]; // Récupérer le nom de la commande ex !Mofication
    const commande = args[1]; // Récupérer la commande qui permet à l'utilisateur de modifier ou ajouter un message
    const description = args[2]; //recuperer la description de la commande
    const Contenue = args[3]; //recuperer le contenu du message

    if (id && commande && description && Contenue) {
      // Vérifier que les arguments sont validesescription de la commande
      var objectExistant = false;

      for (var i = 0; i < Toto.length; i++) {
        // Rechercher si un objet avec le même nom existe déjà dans le tableau
        if (Toto[i].id === id) {
          Toto[i].commande = commande;
          Toto[i].description = description;
          Toto[i].Contenue = Contenue;
          objectExistant = true;
          break;
        }
      }

      if (!objetExistant) {
        // Si l'objet n'existe pas, ajouter un nouvel objet au tableau
        var nouvelObjet = {
          id: id,
          commande: commande,
          description: description,
          Contenue: Contenue,
        };
        Toto.push(nouvelObjet);
      }

      const embed = new MessageEmbed() // Afficher le tableau JSON mis à jour dans un embed
        .setColor("#0099ff")
        .setTitle("Tableau JSON")
        .setDescription(JSON.stringify(Toto));

      await message.channel.send({ embeds: [embed] });
    }
  },

  "guildMemberAdd",
  (member, client) => {
    /// Un nouveau membre se connecte
    Fonctions.NouveauMembre(member, client);
  }
);

//Connexion du bot
client.on("ready", () => {
  console.log(`Bot connecté ${client.user.tag}`);
  console.log(`Je suis membre de  ${client.guilds.cache.size} Serveurs`);
  
//log();
  //setInterval( log, 1 * 60 * 1000);
  // DemarerBot.launch();
});
//enregistrement systématic de tout console.logs 
// Rediriger console.log() vers un fichier de logs


client.login(token);
/* La fonction Trie nécessite deux arguments: le message de Discord et le nom du rôle à trier.
 Dans cet exemple, nous avons extrait le nom du rôle à partir de la commande en utilisant la méthode split
  pour diviser la chaîne de commande en un tableau d'arguments. Le nom du rôle est ensuite stocké dans une 
  variable appelée roleName.
 Ensuite, nous passons le message de Discord et le nom du rôle à la fonction Trie dans l'objet MembersGuild.*/
