
const {Events }= require("../Validation/EventNames");
const { Pemrs }=  require("../Validation/permissions");
const { Client} = require("discord.js");
const {promisify} = require("util");
const { glob} = require("glob");
const PG = promisify(glob);
const {Ascii} = require("ascii-table");
function loadEvents(client){
        const ascii= require("ascii-table");
    const fs =require("fs");
    const table = new ascii().setHeading("Events", "Status");

    const folders =fs.readdirSync(`./Events`);
    for (const folder of folders ){
        const files = fs
        .readdirSync(`./Events/${folder}`)
        .filter((file)=>file.endsWith(".js"));
        for(const file of files){
            const event =require(`../Events/${folder}/${file}`);
            if(event.rest){
                if(event.once)
                    client.rest.once(event.name, (...args)=>
                    event.execute(...args, client)
                    );
                else
                client.rest.on(event.name, (...args)=>
                event.execute(...args, client)
                );
            }else{
                if(event.once)
                client.once(event.name, (...args)=>event.execute(...args, client));
                else
                client.on(event.name, (...args)=>event.execute(...args, client));
            }
            table.addRow(file, "✅");
            continue;
        }
    }
    return  console.log(table.toString(), "\n Event chargé.")
}
module.exports = {loadEvents}

module.exports =async(client)=>{
    const Table = new Ascii("Evenement Chargé");
    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async(file)=>{
        const event = require(file);
        if(!Events.includes(event.name) || !event.name){
            const L = file.split("/");
            await Table.addRow(`${event.name || "MANQUANT"}`, `⛔ - Le nom de l'évenement est invalide ou manquant : ${L[6]+`/`+ L[7] }` );
            return;

        }
        if(event.once){
            client.once(event.name, (...args)=>event.execute(...args, client));
        }else{
            client.on(event.name, (...args)=>event.execute(...args, client));
        }
        await Table.addRow(event.name, "✅ SUCCES")
    });
    console.log(Table.toString());
} 