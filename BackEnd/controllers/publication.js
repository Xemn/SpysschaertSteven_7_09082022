// Import de notre modèle Publication : 
const Publication = require('../models/Publication');
// Import du module fs :
const fs = require("fs");

// Logique métier pour la création d'une publication : 
exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication);
    const publication = new Publication({
       userId : req.auth.userId,
        ...publicationObject,
        imageUrl : `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
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
// Logique métier pour la récupération d'une publication précise : 
exports.getOnePublication = (req, res, next) => {
    Publication.findOne({_id : req.params.id})
    .then((publication) => res.status(200).json(publication))
    .catch((error) => res.status(400).json({error}))
};
// Logique métier afin de modifier une publication précise : 
exports.updateOnePublication = (req, res, next) => {
     // On vérifie si notre requête possède un fichier dans son corps :
  const publicationObject = req.file
    ? {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

    Publication.findOne({_id : req.params.id})
    .then((publicaton) => {
        /* On vérifie que l'utilsateur qui fait la demande soit celle qui a 
        créé la publication, ou alors que l'utilisateur ait un rôle
        d'administrateur : */
        // Si c'est pas le cas :
        if (publicaton.userId != req.auth.userId && req.auth.isAdmin === false) {
            res.status(401).json({message : "Vous n'êtes pas autorisé à faire cette action !"});
        }
        // Si c'est le cas : 
        else{
            // On modifie la publication : 
            Publication.updateOne(
                {_id : req.params.id},
                {...publicationObject, _id: req.params.id}
            )
            .then(()=> res.status(200).json({ message : "Publication modifiée avec succès !" }))
            .catch((error) => res.status(400).json({error}))
        }
    })
    .catch((error) => res.status(500).json({error}))
}
// Logique métier pour supprimer une publication : 
exports.deletePublication = (req, res, next) => {
    Publication.findOne({_id : req.params.id})
    .then((publication) => {
        /* On vérifie que l'utilsateur qui fait la demande soit celle qui a 
        créé la publication, ou alors que l'utilisateur ait un rôle
        d'administrateur : */
        // Si c'est pas le cas : 
        if (publication.userId != req.auth.userId && req.auth.isAdmin === false)
        {
            res.status(401).json({message : "Vous n'êtes pas autorisé à faire cette action !"});
        }
        // Si c'est le cas : 
        else{
            const filename = publication.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Publication supprimée ! " }))
                .catch((error) => {
                res.status().json({ error });
            });
        });
        }
    }
    )
    .catch((error) => res.status(500).json({error}))
};