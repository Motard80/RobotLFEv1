const fs = require('fs');

//...

// Fonction de log
function log(message) {
  // Récupérer la date et l'heure actuelles
  const date = new Date();
  const timestamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  // Ajouter le message au fichier logs.json
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile('logs.json', logMessage, (err) => {
    if (err) {
      console.error(err);
    }
  });

  // Afficher le message dans la console
  console.log(logMessage);
}

// Exemple d'utilisation
log('Le bot a été lancé !');
