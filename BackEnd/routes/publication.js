// Import de notre module express : 
const express = require('express');
// Utilisation de la méthode express Router : 
const router = express.Router();
// Import de notre controller publication : 
const publiCtrl = require("../controllers/publication");
// Import de notre middlware d'authentification :
const auth = require("../middleware/auth");
// Import de notre middlware multer : 
const multer = require("../middleware/multer-config");

// Route POST (Endpoint) pour la création d'une publication : 
router.post("/", auth, multer, publiCtrl.createPublication);
// Route GET (Endpoint) pour la récupération de toutes les publications :
router.get("/", auth, publiCtrl.getAllPublications);
// Route GET (Endpoint) pour la récupération d'une publication précise : 
router.get("/:id", auth, publiCtrl.getOnePublication);
// Route PUT (Endpoint) pour la modification d'une publication précise :
router.put("/:id", auth, multer, publiCtrl.updateOnePublication);
// Route DELETE (Endpoint) pour la supression d'une publication précise : 
router.delete("/:id", auth, publiCtrl.deletePublication);
// Route POSY (Endpoint) pour liker ou disliker une publication précise : 
router.post("/:id/like", auth, publiCtrl.likeDislikePost);

// Export de nos routes : 
module.exports = router;