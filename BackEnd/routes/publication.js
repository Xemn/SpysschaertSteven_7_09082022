// Import de notre module express : 
const express = require('express');
// Utilisation de la méthode express Router : 
const router = express.Router();
// Import de notre controller publication : 
const publiCtrl = require("../controllers/publication");
// Import de notre middlware d'authentification :
const auth = require("../middleware/auth");

// Route POST (Endpoint) pour la création d'une publication : 
router.post("/", auth, publiCtrl.createPublication);
// Route GET (Endpoint) pour la récupération de toutes les publications :
router.get("/", auth, publiCtrl.getAllPublications);
// Route GET (Endpoint) pour la récupération d'une publication précise : 
router.get("/:id", auth, publiCtrl.getOnePublication);
// Route PUT (Endpoint) pour la modification d'une publication précise :
router.put("/:id", auth, publiCtrl.updateOnePublication);
// Route DELETE (Endpoint) pour la supression d'une publication précise : 
router.delete("/:id", auth, publiCtrl.deletePublication);

// Export de nos routes : 
module.exports = router;