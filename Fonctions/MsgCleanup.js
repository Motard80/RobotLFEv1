const {Client}=require('discord.js');

const client = new Client({ intents: 3276799 });

// Fonction qui efface tous les messages d'un channel spécifique
async function clearChannel(channel) {
    const fetched = await channel.messages.fetch({ limit: 99 });
    channel.bulkDelete(fetched);
  }

  module.exports={
    clearChannel
  }