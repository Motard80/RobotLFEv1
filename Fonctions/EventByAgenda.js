const fs = require("fs");
const { Client,  MessageEmbed, MessageActionRow, MessageButton , interaction, options } = require("discord.js");
const client = new Client({ intents:3276799 });

const { prefix } = require("../Config/config.json");
    function createEvent(message, client, interaction)  {  
        if (interaction.isCommand()) {
            const options = interaction.options;
        const author = require("../Main/index")
        const type = interaction.options.getString('type');
        const date = interaction.options.getString('date');
        const heure = interaction.options.getString('heure');
        const titre = interaction.options.getString('titre');
        const description = interaction.options.getString('description');
        const formateur = interaction.options.getString('formateur') || "N/A";
        const zeus = interaction.options.getString('zeus') || "N/A";
   
        const event = {
          author: author,
          type: type,
          date: date,
          heure: heure,
          titre: titre,
          description: description,
          formateur: formateur,
          zeus: zeus
        };
    
        // Vérification des champs obligatoires
        if (!type || !date || !heure || !titre || !description) {
          interaction.reply({ content: "Veuillez remplir tous les champs obligatoires.", ephemeral: true });
          return;
        }
      
        // Ajout de l'événement dans le fichier JSON
        const eventsList = require("../Data/List_Event.json");
        eventsList.push(event);
        fs.writeFileSync("./Data/List_Event.json", JSON.stringify(eventsList, null, 2));
      
        interaction.reply({ content: "L'événement a été créé avec succès !", ephemeral: true });
      }
    }
module.exports = {
    createEvent
};