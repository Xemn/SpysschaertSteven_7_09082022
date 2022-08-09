// Import de notre module express : 
const express = require("express");
//Import de notre module dotenv : 
const dotenv = require("dotenv");
dotenv.config();
// Import de notre module mongoose : 
const moongoose = require("mongoose");

// Connexion de notre application à notre base de données mongoDB Atlas : 
moongoose
    .connect(process.env.HTTPS_PROXY, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then (() => console.log("Connexion à MongoDB réussié"))
    .catch(() => console.log("Connexion à MongoDB échouée"))

// Création de notre application express : 
const app = express();

/* Afin de récupérer et comprendre nos requête, nous
devons les transformer en objet JSON :  */
app.use(express.json());

// Export de notre application : 
module.exports = app;

