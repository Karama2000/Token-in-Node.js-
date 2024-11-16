// Importation de mongoose
const mongoose = require('mongoose');

// Définition du schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
    // Champ nom de l'utilisateur
    nom: {
        type: String,
        required: [true, "Le nom de l'utilisateur est requis"],
    },

    // Champ prénom de l'utilisateur
    prenom: {
        type: String,
        required: [true, "Le prénom de l'utilisateur est requis"],
    },

    // Champ login de l'utilisateur
    login: {
        type: String,
        unique: true,
        required: [true, "Le login de l'utilisateur est requis"],
    },

    // Champ mot de passe de l'utilisateur
    pwd: {
        type: String,
        required: [true, "Le mot de passe de l'utilisateur est requis"],
    },

    // Champ rôle de l'utilisateur
    role: {
        type: String,
        enum: ['admin', 'user', 'fournisseur', 'client'],
        required: [true, "Le rôle de l'utilisateur est requis"],
    }

}, {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
});

// Compilation du modèle User à partir du schéma défini
const User = mongoose.model("User", userSchema);

// Exportation du modèle User pour l'utiliser dans d'autres parties de l'application
module.exports = User;
