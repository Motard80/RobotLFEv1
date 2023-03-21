const fs = require('fs');

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
  const jsonData = JSON.stringify({ ServerName: serverName,serverId:serverId, RolesData: rolesData }, null, 2);
  const fileName = `./Roles/${serverName}.json`;
  fs.writeFileSync(fileName, jsonData);
}

module.exports = { saveRoles };
