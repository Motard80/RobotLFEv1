 const {Client, Collection}= require ("discord.js");
 const client = new Client({intents: ["Guilds"]});
 const {loadEvents}= require ("./Handlers/enventHandler.js")
client.config= require("./config.json")
Client.command = new Collection();
 client.login(client.config.token).then(()=>{
    loadEvents(client)
 }).catch((err)=>console.log(err))