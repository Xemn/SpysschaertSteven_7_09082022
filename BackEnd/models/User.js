// Import de notre module mongoose : 
const mongoose = require("mongoose");
// Import d'un module permettant de mieux gérer le côté unique : 
const uniqueValidator = require("mongoose-unique-validator");

// Crétation de notre schéma User : 
const userSchema = mongoose.Schema({
    email : {type : String, required : true, unique : true },
    username : {type : String, required: true}, 
    password : {type: String, required : true},
    isAdmin : {type : Boolean, default : false}
});

// utilisation de notre module mongoose-unique-validator : 
userSchema.plugin(uniqueValidator);

// Export de notre Schéma en tant que modèle : 
module.exports = mongoose.model("User", userSchema);