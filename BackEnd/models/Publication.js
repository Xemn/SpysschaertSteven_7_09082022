// Import de notre module mongoose : 
const mongoose = require('mongoose');

// Crétion de notre Schéma Publication : 
const publicationSchema = mongoose.Schema({
    userId : { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, default: ""},
    createdAt : { type : Date, default: Date.now},
    likes : { type: Number, default : 0 },
    dislikes : { type: Number, default : 0 },
    usersLiked : { type: [String], default : [] },
    usersDisliked : { type: [String], default : []}
    }
);

// Export de notre Schéma publication en tant que modèle : 
module.exports = mongoose.model("Publication", publicationSchema);