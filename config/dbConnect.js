// Importation du module mongoose
const mongoose = require('mongoose');

// Fonction pour se connecter à la base de données
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connexion à la base de données réussie');
    
    } catch (error) {
        console.log("Erreur de connexion à la base de données :", error.message);
        process.exit(1); // Quitter l'application en cas d'échec de connexion
    }
};

// Exportation de la fonction de connexion
module.exports = { dbConnect };
