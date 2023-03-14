const { exec } = require('child_process');

function launch(message) {
    exec('nodemon ./Main/index.js', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        message.reply('Une erreur est survenue lors du lancement du bot.');
        return;
      }
      console.log(stdout);
      console.error(stderr);
      message.reply('Le bot a été lancé avec succès !');
    });
  }
  

module.exports = {launch};
