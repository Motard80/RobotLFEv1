const { Pemrs }=  require("../Validation/permissions");
const { Client} = require("discord.js");
const {promisify} = require("util");
const { glob} = require("glob");
const PG = promisify(glob);
const { Ascii } = require("ascii-table");

/**
 * 
 * @param {Client} client 
 */

module.exports =async (client) => {
    const Ascii= require('ascii-table');
   const Table = new Ascii("Commande Chargées");

    CommandsArray =[];
    (await PG (`${process.cwd()}/Commands/*/*.js`)).map(async (flie) =>{
        const command = require(file);

        if(!comand.name)
        return Table.addRow(file.split("/")[7], "⛔ - ERREUR", "Nom manquant")
        
        if(!command.context && !comand.description)
        return Table.addRow(command.name, "⛔ - ERREUR", "Description Manquante")

        if(command.permission){
           if(Perms.includes(command.permission)) 
           command.defaultPermission =false;
           else
           return Table.addRow(command.name, "⛔ - ERREUR", "Permission Invalide")
        }

        client.commands.set(command.name, command);
        CommandsArray.puch(command);

        await Table.addRow(command.name, "✅ - succes");

    });

console.log(Table.toString());
// Permet de vérifier les permission // 
client.on("ready", async()=>{
    const MainGuild =await client.guilds.cache.get("1077880541161996390");
    MainGuild.commands.set(CommandArray).then(async(command)=>{
        const Roles=(CommandeName)=>{
            const cmdPerms = CommandsArray.find((c)=>c.name === commandName).permission;
            if(!cmdPerms)return null;
            return MainGuild.roles.cache.filter((r)=>r.permissions.has(cmdPerms))
        }
    
    const fulPërmission =command.reduce((accumulator, r)=>{
        const role= Roles(r.name);
        if(!roles)return accumulator;
        const permissions = roles.reduce((a, r)=>{
            return [...a, {id: r.id, type: "ROLE", permission: true}]
        }, []);
        return [...accumulator, {id:r.id, permissions}];
    }, []);
    await MainGuild.commands.permissions.set({fulPermission});
        })
    });
}