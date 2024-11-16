// Importation des modules nécessaires
const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Contrôleur pour créer un nouvel utilisateur
const createUserController = async (req, res) => {
    try {
        // Récupération des données de l'utilisateur depuis le corps de la requête
        const { nom, prenom, login, pwd, role } = req.body;

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(pwd, 10); // 10 est le nombre de tours pour le hachage

        // Création d'un nouvel utilisateur
        const user = await User.create({
            nom,
            prenom,
            login,
            pwd: hashedPassword, // Utilisation du mot de passe haché
            role,
        });

        res.json({
            status: "L'utilisateur a été créé avec succès",
            data: user,
        });

    } catch (error) {
        res.json({ status: "Erreur", message: error.message });
    }
};



// Contrôleur pour obtenir un utilisateur par son identifiant
const getUserByIdController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: "Erreur",
                message: "Utilisateur non trouvé",
            });
        }

        res.json({
            status: "Succès",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            status: "Erreur",
            message: error.message,
        });
    }
};

// Contrôleur pour obtenir tous les utilisateurs
const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({
                status: "Erreur",
                message: "Aucun utilisateur trouvé",
            });
        }

        res.status(200).json({
            status: "Succès",
            data: users,
        });

    } catch (error) {
        res.status(500).json({
            status: "Erreur",
            message: error.message,
        });
    }
};

// Contrôleur pour supprimer un utilisateur par son identifiant
const deleteUserByIdController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                status: "Erreur",
                message: "Utilisateur non trouvé",
            });
        }

        res.json({
            status: "Succès",
            message: "L'utilisateur a été supprimé avec succès",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ status: "Erreur", message: error.message });
    }
};

// Contrôleur pour mettre à jour un utilisateur par son identifiant
const updateUserByIdController = async (req, res) => {
    try {
        const userId = req.params.id;
        const { nom, prenom, login, pwd, role } = req.body;

        const user = await User.findByIdAndUpdate(
            userId, 
            { nom, prenom, login, pwd, role }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: "Erreur",
                message: "Utilisateur non trouvé",
            });
        }

        res.json({
            status: "Succès",
            message: "L'utilisateur a été mis à jour avec succès",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ status: "Erreur", message: error.message });
    }
};

// Contrôleur pour gérer la connexion
const loginUserController = async (req, res) => {
    try {
        // récupérer les informations d'authentification req.body 
        const { login, pwd } = req.body;

        // Recherche de l'utilisateur par son login
        const user = await User.findOne({ login });
        
        if (!user) {
            return res.status(404).json({ status: "Erreur", message: "Utilisateur non trouvé" });
        }

        // Comparaison du mot de passe haché avec le mot de passe fourni
        const isMatch = await bcrypt.compare(pwd, user.pwd);
        
        if (!isMatch) {
            return res.status(401).json({ status: "Erreur", message: "Mot de passe incorrect" });
        }

        // Création du token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload du token
            process.env.JWT_KEY, // Clé secrète
            { expiresIn: '1h' } // Durée de validité
        );

        res.json({
            status: "Succès",
            message: "Connexion réussie",
            token // Retourne le token au client
        });

    } catch (error) {
        res.status(500).json({ status: "Erreur", message: error.message });
    }
};



// Exportation des contrôleurs pour les utiliser dans les routes
module.exports = {
    getAllUsersController,
    getUserByIdController,
    createUserController,
    deleteUserByIdController,
    updateUserByIdController,
    loginUserController,
};
