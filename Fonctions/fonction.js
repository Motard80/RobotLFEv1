const IdSalonGeneral = 1077880684686880768;
// Fonctions basic 
const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 3276799 });
 function AjoutReaction(message, emoji) {
  //const message = await message.channel.messages.fetch('<message_id>');
  const greenTickEmoji = message.guild.emojis.cache.find(emoji => emoji.name === emoji);
  message.react(greenTickEmoji);
  //message.react(emoji);
}


function ListeFonctions(message) {
  message.channel.send(`Les commandes sont :\n${listeStrings}`).then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 120000); // 5 minutes en millisecondes
  }); //en mili secondes 1 minutes= 120000 ms;;
}


function ListeMembres(message) {
  const guild = message.guild;
  const members = guild.members.cache.map(member => member.user.tag).join('\n');
  message.channel.send(`Liste des membres du serveur :${members}`).then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 120000); // 5 minutes en millisecondes
  }); //en mili secondes 1 minutes= 120000 ms
}

function ListeRoles(message) {
  const guild = message.guild;
  const roles = guild.roles.cache.map(role => role.name).join('\n');
  message.channel.send(`Liste des rôles du serveur :\n${roles}`).then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 120000); // 5 minutes en millisecondes
  }); //en mili secondes 1 minutes= 120000 ms;

  guild.roles.cache.forEach(role => {
    if (role.name !== "Bot") {
      const membersWithRole = guild.members.cache.filter(member => member.roles.cache.find(r => r.name === role.name)).map(member => member.user.tag).join('\n');
      message.channel.send(`Membres ayant le rôle ${role.name} :\n${membersWithRole}`).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 120000); // 5 minutes en millisecondes
      }); //en mili secondes 1 minutes= 120000 ms;;
    }
  });
}

function NouveauMembre(member, client) {
  const channel = client.channels.cache.get(IdSalonGeneral);
  channel.send("Bienvenue sur le serveur: ${member.user.tag}");
  member.send('Voici toutes les infos qui te seront nécessaire') //en mili secondes 1 minutes= 120000 ms;; // Envoyer un message privé au nouveau membre
}

function EnvoieMessagePredef(message, selection) {
  var fs = require("fs");
  const member = message.mentions.members.first();
  const message_string = selection.Contenue.replace("###", member);
  member.send(message_string);
  message.reply(selection.Reponse, member.user.tag).then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 120000); // 5 minutes en millisecondes
  }); //en mili secondes 1 minutes= 120000 ms;; // Envoyer un message privé au nouveau membre;
  console.log(member.user.tag, selection.Reponse);
}

function aide(message, data) {
  var fs = require("fs");
  let message_string = "Voici la liste : \n";
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      message_string +="-  " +  data[key].Commande + " : " + data[key].Description + "\n \n";
    }
  }
  message.channel.send(message_string).then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 120000); // 5 minutes en millisecondes
  });
  console.log("Message d'aide envoyer");
}


// Commande !cleanup@role

module.exports = {
  EnvoieMessagePredef,
  aide,
  ListeFonctions,
  ListeMembres,
  ListeRoles,
  NouveauMembre,
  AjoutReaction,
};
