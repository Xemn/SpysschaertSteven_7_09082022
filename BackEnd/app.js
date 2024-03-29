// Import de notre module express : 
const express = require("express");
// Import de notre module Path :
const path = require("path");
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

// Import de nos fichiers de routing : 
const userRoutes = require('./routes/user');
const publiRoutes = require('./routes/publication');

// Création de notre application express : 
const app = express();

/* Afin de récupérer et comprendre nos requête, nous
devons les transformer en objet JSON :  */
app.use(express.json());

/* Applications d'entête afin d'aplliquer nos propres règles de 
sécurité CORS : */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Indique à notre application Express de se servir du dossier static images :
app.use("/images", express.static(path.join(__dirname, "images")));

// Utilisation de nos différentes routes : 
app.use("/api/auth", userRoutes);
app.use("/api/publications", publiRoutes);

// Export de notre application : 
module.exports = app;

