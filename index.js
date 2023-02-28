 const {Client, Collection}= require ("discord.js");
 const client = new Client({intents: 1});
 //const {loadEvents}= require ("./Handlers/Events.js");
const { Token}= require("./config.json");

Client.commands = new Collection();
require("./Handlers/Commands")(client);
require("./Handlers/Events")(client);

 client.login(Token);