const membersData = require("../Members/Members.json");
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');
const rolesFilePath = path.join(__dirname, '../Members/Roles.json');

const { Client, MessageActionRow, MessageButton } = require("discord.js");
const client = new Client({ intents: 3276799 });

function ListeRole(roles) {
 
}

function testfiles(message)  {
  const filePath = path.join(__dirname, '..', 'Members', 'Members.json');
  const data = fs.readFileSync(filePath);
  console.log(data);
  message.channel.send(data);
}
let roleId = 0;
//Fonction qui permet de sauvegarder les roles dans le fichier Roles.json
function saveRoles(guild, message) {
  const roles = guild.roles.cache.map(role => ({
    Id: roleId++,
    NameRole: role.name,
    IdRole: role.id
  }));
  const rolesJSON = JSON.stringify(roles, null, 2);
  const filePath =  path.join(__dirname, '..', 'Members', 'Roles.json');
  fs.writeFileSync(filePath, rolesJSON);
  //message.channel.send(`Les rôles ont été enregistrés dans le fichier ${filePath}`);
}
  module.exports = {
    saveRoles,
  //  ListeRole,
    testfiles
  };