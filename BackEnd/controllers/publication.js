// Import de notre modèle Publication : 
const Publication = require('../models/Publication');

// Logique métier pour la création d'une publication : 
exports.createPublication = (req, res, next) => {
    const publication = new Publication({
        ...req.body
    });
    publication
        .save()
        .then(() => res.status(201).json({message : "Publication enregistrée ! "}))
        .catch((error) => res.status(400).json({error}))

};
// Logique métier pour la récupération de toute les publications : ``
exports.getAllPublications = (req, res, next) => {
    Publication.find()
    .sort({createdAt : -1})
    .then((publications) => res.status(200).json(publications))
    .catch((error) => res.status(400).json({error}))
};