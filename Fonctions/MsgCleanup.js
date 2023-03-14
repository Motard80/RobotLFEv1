const {Client}=require('discord.js');

const client = new Client({ intents: 3276799 });

// Fonction qui efface tous les messages d'un channel spécifique en test
async function clearChannel(channel) {
    const fetched = await channel.messages.fetch({ 100: 99 });
    channel.bulkDelete(100, true);
  }
async function Clear (message) {
  try {
    await message.channel.bulkDelete(100, true); // Le deuxième paramètre "true" indique de supprimer les messages de plus de 14 jours
    message.channel.send('Tous les messages du channel ont été supprimés!');
  } catch (error) {
    console.error(error);
    message.channel.send('Une erreur s\'est produite lors de la suppression des messages!');
  }
}

  module.exports={
    clearChannel,
    Clear
  }