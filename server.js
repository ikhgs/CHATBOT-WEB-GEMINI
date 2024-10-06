const express = require('express');
const path = require('path');
const app = express();

// Configurer le port pour Render ou en local
const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rediriger toutes les routes vers index.html pour une SPA (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
