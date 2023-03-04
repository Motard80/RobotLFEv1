const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { token, prefix } = require('./config.json');

const client= new Client({
    intents:[3276799
    ]
})
client.on('ready', () => {
    console.log(`Bot connecter ${client.user.tag}`);
  });
  


  client.on('messageCreate', message => {
    if (message.content.startsWith(prefix + 'bienvenue')) {
      const member = message.mentions.members.first();
      member.send(`La Section publique est ouvert à tous les membres du discord, LFE et teams extérieures.\n
      La Taverne LFE est la section multigaming de la communauté, trouvez des partenaires de jeu dans 
     autres-jeux.\n
     La Section Opérations est dédiée aux mission Arma 3 du samedi soir, les opérations du samedi sont annoncées chaque semaine dans 
     📆-opérations-internes\n
     , les preset de mods nécessaire et informations de connexion sont dans 
     📘-serveur-samedi\n
      ! Les opérations en collaboration avec d'autres équipes sont annoncées dans 
     🤝-interteams\n
     . En cas de problème technique au cours d'une opération venez dans le canal vocal Assistance technique ou un membre du staff pourra vous aider: https://discord.com/channels/814235304806056007/814803806536597515.\n
     La section Serveur Persistant contient toutes les informations liées au serveur d'entraînement ouvert en dehors du samedi soir. Les événements organisés chaque semaine sont postés dans le canal 
🚧-formations-events\n
 et sont résumés dans le canal 
📆-planning-events
 (Cliquer sur le nom de l'évènement dans la liste pour accéder à un évènement en particulier et s'inscrire). \n
 Durant les soirs de formations organisées en semaine le serveur est accessible au moyen des informations de connexion et preset de mods dans 
 📒-serveur-formation\n
  . En dehors des formations organisées en semaine  le serveur persistant est en mode "entraînement"  -> Informations et preset de mods dans 
 📘-serveur-entraînement
 .  Quand les joueurs partent jouer sur le serveur persistant en dehors des évenements annoncés ils peuvent poster un message dans 
 🚙-patrouille
  avec le tag @Pat' Patrol 🚙 afin d'inviter les joueurs motivés à les rejoindres\n

     , ${member}!`);
    }
  });
  

client.login(token);
