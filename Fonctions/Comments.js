const fs = require("fs");
const path = require("path");
function CommentsByMember(serverName, authorName, comment) {
  const commentsDir = path.join(__dirname, '..', serverName);
  if (!fs.existsSync(commentsDir)) {
    fs.mkdirSync(commentsDir);
  }
  const commentsFile = path.join(commentsDir, `Comment_${serverName}.json`);
  let comments = [];
  if (fs.existsSync(commentsFile)) {
    comments = JSON.parse(fs.readFileSync(commentsFile, 'utf-8'));
  }
  comments.push({
    serverName,
    authorName,
    date: new Date().toLocaleDateString('fr-FR'),
    comment
  });
  fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
}

const filter = (reaction, user) => {
  return ['✅', '❌', '👍'].includes(reaction.emoji.name) && user.id !== client.user.id;
};

const addComment = async (message) => {
  const authorName = message.author.username;
  const serverName = message.guild.name;

  const confirmMsg = await message.channel.send('Voulez-vous ajouter un commentaire ?');
  console.log(confirmMsg);

  confirmMsg.react('✅')
  confirmMsg.react('❌');

  confirmMsg.awaitReactions(filter, { max:1, time: 30000, errors: ['time'] })
    .then(async collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === '❌') {
        console.log("Refus commentaire");
        await confirmMsg.delete();
        await message.delete();
      } else if (reaction.emoji.name === '✅') {
        await confirmMsg.delete();
        const inputMsg = await message.channel.send('Écrivez votre commentaire');
        consol.log("Oui pour le commentaire")
        const inputFilter = m => m.author.id === message.author.id && m.content.length <= 500 && m.channel.id === message.channel.id && !m.author.bot;
        const collector = message.channel.createMessageCollector(inputFilter, { max: 1, time: 60000 });

        collector.on('collect', async m => {
          const comment = m.content;
          await inputMsg.delete();
          const replyMsg = await message.channel.send(`Voici votre commentaire : ${comment}`);
          console.log(replyMsg);
          await replyMsg.react('👍');

          const thumbsUpFilter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id !== client.user.id;
          };
          replyMsg.awaitReactions(thumbsUpFilter, { max: 1, time: 30000, errors: ['time'] })
            .then(async collected => {
              const reaction = collected.first();
              if (reaction.emoji.name === '👍') {
                await replyMsg.delete();
                CommentsByMember(serverName, authorName, comment);
                await message.channel.send('Votre commentaire a été enregistré.');
                console.log("enregistrement du commentaire effectuer");
              }
            })
            .catch(async () => {
              await replyMsg.delete();
            });
        });

        collector.on('end', (collected, reason) => {
          if (reason === 'time') {
            inputMsg.delete();
            message.channel.send(`Délai d'attente écoulé, votre commentaire n'a pas été enregistré.`);
            console.log("Delai d'enregistrement du commentaire expirer");
          }
        });
      }
    })
    .catch(async () => {
      await confirmMsg.delete();
    });
};



module.exports = {
  CommentsByMember,
  
};
