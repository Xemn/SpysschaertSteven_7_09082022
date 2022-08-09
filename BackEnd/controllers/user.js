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
    // On commence en premier lieu à haser notre mot de passe : 
    bcrypt
        .hash(req.body.password, 10)
        .then ((hash) => {
            /* Après l'obtention on peut créer et sauvegarder notre utilisateur
            en base de données : */
            const user = new User ({
                email : req.body.email,
                password : hash,
            });
            user
                .save()
                .then(() => res.status(201).json({message : "Utilisateur bien enregistré ! "}))
                .catch((error) => res.status(400).json({error}))
        })
        .catch((error) => res.status(500).json({error}))
};