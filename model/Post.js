// Importation de mongoose
const mongoose = require('mongoose');

// Définition du schéma pour les posts
const postSchema = new mongoose.Schema({

    // Champ titre du post
    title: {
        type: String,
        required: [true, "Le titre du post est requis"],
    },

    // Champ description du post
    description: {
        type: String,
        required: [true, "La description du post est requise"],
    },

    // Champ photo du post
    photo: {
        type: String,
        required: [true, "L'image du post est requise"],
    }

}, {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
});

// Compilation du modèle Post à partir du schéma défini
const Post = mongoose.model("Post", postSchema);

// Exportation du modèle Post pour l'utiliser dans d'autres parties de l'application
module.exports = Post;
