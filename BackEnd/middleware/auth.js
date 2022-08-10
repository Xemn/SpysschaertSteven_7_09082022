// Import de notre module jsonwebtoken : 
const jwt = require("jsonwebtoken");
// Import de notre module dotenv : 
const dotenv = require("dotenv");
dotenv.config();

// Export de notre middleware, qui vérifiera l'intégrité de notre token : 
module.exports = (req, res, next) => {
    /* Plusieurs erreurs pouvant se produire, nous mettons donc nos instructions
    dans un bloc try...catch :  */
    try {
        // On commence par récupérer notre token :
        const token = req.headers.authorization.split(" ")[1];
        // On décode et on vérifie la conformité de notre token : 
        const decodedtoken = jwt.verify(token, process.env.TOKEN_KEYPHRASE);
        // On récupère notre userId du payload du token : 
        const userId = decodedtoken.userId;
        // On récupère aussi notre clé isAdmin du payload du token : 
        const isAdmin = decodedtoken.isAdmin;
        /* On ajoute à notre requête un objet auth afin qu'il contienne l'userID,
        et la clé isAdmin de note token : */
        req.auth = { userId, isAdmin };
        next();
    } catch (error) {
         res.status(401).json({
        error: new Error("Invalid request!"),
         });
    }
};
