// Import de notre module express : 
const express = require('express');
// Utilisation de la méthode express Router : 
const router = express.Router();
// Import de notre controller publication : 
const publiCtrl = require("../controllers/publication");

// Route POST (Endpoint) pour la création d'une publication : 
router.post("/", publiCtrl.createPublication);
// Route GET (Endpoint) pour la récupération de toutes les publications :
router.get("/", publiCtrl.getAllPublications);

// Export de nos routes : 
module.exports = router;