// Import de notre modèle Publication : 
const Publication = require('../models/Publication');

// Logique métier pour la création d'une sauce : 
exports.createPublication = (req, res, next) => {
    const publication = new Publication({
        ...req.body
    });
    publication
        .save()
        .then(() => res.status(201).json({message : "Publication enregistrée ! "}))
        .catch((error) => res.status(400).json({error}))

};