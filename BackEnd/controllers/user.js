// Import de notre modèle User : 
const User = require('../models/User');
// Import de notre module Bcrypt : 
const bcrypt = require('bcrypt');
// Import de notre module jsonwebtoken : 
const jwt = require('jsonwebtoken');
// Import de notre module dotenv : 
const dotenv = require("dotenv");
dotenv.config();

// Création de notre middleware express concernant la création d'un utilisateur : 
exports.signup = (req, res, next) => {
    // Nous allons d'abord voir si notre base de données est vide : 
    User.findAll()
    .then((result) => {
        // Si elle l'est notre premier utilisateur sera admin : 
        if (result.length == 0)
        {
            // On commence en premier lieu à haser notre mot de passe : 
            bcrypt
                .hash(req.body.password, 10)
                .then ((hash) => {
                    /* Après l'obtention on peut créer et sauvegarder notre utilisateur
                    en base de données : */
                    const user = new User ({
                    email : req.body.email,
                    password : hash,
                    isAdmin : true 
                    });
                    user
                        .save()
                        .then(() => res.status(201).json({message : "Utilisateur bien enregistré ! "}))
                        .catch((error) => res.status(400).json({error}))
            })
            .catch((error) => res.status(500).json({error}))
        }
        else 
        {
            // On commence en premier lieu à haser notre mot de passe : 
            bcrypt
                .hash(req.body.password, 10)
                .then ((hash) => {
                    /* Après l'obtention on peut créer et sauvegarder notre utilisateur
                    en base de données : */
                    const user = new User ({
                    email : req.body.email,
                    password : hash,
                    isAdmin : false
                    });
                    user
                        .save()
                        .then(() => res.status(201).json({message : "Utilisateur bien enregistré ! "}))
                        .catch((error) => res.status(400).json({error}))
            })
            .catch((error) => res.status(500).json({error}))
        }
    })
    .catch((error) => res.status(500).json({error}))
};

// Création de notre middleware express concernant la connexion d'un utilisateur : 
exports.login = (req, res, next) => {
    /* On vérifie dans un premier temps que l'adresse mail entrée est présente 
    dans notre base de données : */
    User.findOne({email : req.body.email })
        .then((user) => {
            // Si nous ne trouvons pas d'adresse mail correspondante dans notre base : 
            if (!user) {
                return res.status(401).json({error : "Utilsateur introuvable !"});
            }
            // Si il existe : 
            // Nous comparons le hash des deux mots de passe :
            bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
                // Si les deux hash ne correspondent pas : 
                if (!valid){
                    return res.status(401).json({error : "Mot de passe incorrect !"});
                }
                // Si les deux hash correspondent : 
                res.status(200).json({
                    // On crée un objet contentant l'userID et un token : 
                    userId : user._id,
                    token : jwt.sign(
                        // Payload : 
                        { userId : user._id,
                         isAdmin : user.isAdmin},
                    
                    // Chaîne secrète de développement temporaire (salt) :
                    process.env.TOKEN_KEYPHRASE,
                    
                    // Son délai d'expiration :
                    {
                        expiresIn : "24h",
                    }


                    ),
                });
            })
            .catch((error) => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
};