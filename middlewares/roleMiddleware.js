const jwt = require('jsonwebtoken');

// Middleware pour vérifier les rôles
const verifyRole = (requiredRoles) => {
    return (req, res, next) => {
        try {
            // Récupérer le token depuis l'en-tête Authorization
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(403).json({ status: "Erreur", message: "Accès interdit : token manquant" });
            }

            // Vérifier et décoder le token JWT
            const decoded = jwt.verify(token, process.env.JWT_KEY);

            // Vérifier si l'utilisateur a le rôle requis
            if (!requiredRoles.includes(decoded.role)) {
                return res.status(403).json({ status: "Erreur", message: "Accès interdit : rôle insuffisant" });
            }

            // Attacher les informations de l'utilisateur décodé à req.user
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ status: "Erreur", message: "Token invalide ou expiré" });
        }
    };
};

module.exports = verifyRole;
