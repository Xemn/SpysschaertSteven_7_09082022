/*--- Componant Login : composant permettant à un utilisateur de se connecter ---*/

import './Login.css' // IMPORT DE NOTRE CSS
import { Link, } from 'react-router-dom'
import {useState} from "react"
const url = `${process.env.REACT_APP_API_URL}auth` // URL de notre API

function Login ()
{
    //const navigate = useNavigate();

    /* Nos useState (ou états) :  */
    
    /* useState nous permettant le contrôle de notre formulaire de
    connexion, et nous permettant de stocker les données émises par
    l'utilisateur : */
    
    const [credentials, setCredentials] = useState({
        email: "",
        password : ""
    }) 
    
    // useState nous permettant de générer les erreurs : 

    const [error, setError] = useState(false)

    /* REGEX, et conditions d'erreurs : */

    const mailRegex = new RegExp(
   '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const emailError = !mailRegex.test(credentials.email) || credentials.email.length === 0;
    const passwordError = credentials.password.length === 0;

    
    /* Nos fonctions de contrôle :  */

    /* Fonction qui va permettre de tracker le/les changements 
    fait par l'utilisateur dans les champs de saisies, et les enregistrer
    dans notre state : */

    const handleChange = ({currentTarget}) => {
        console.log(currentTarget.value);
        const {value, name} = currentTarget
        setCredentials({
            ...credentials,
            [name] : value
        })
    }

    // Fonction pour l'envoie du formulaire à notre API : 

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérification de la concordance des données saisies : 
        if(!emailError && !passwordError)
        {
            // Appel à notre API : 
            fetch (url + '/login', {
                method: "POST",
                headers: {
                    "Content-Type" : 'application/json',
                },
                body: JSON.stringify(credentials), // Conversion objet JS credential en JSON
            })
            .then(function(res){
                // Si la réponse à un code de status correct : 
                if(res.ok)
                {
                    // On récupère et transforme notre réponse en JSON : 
                    res.json()
                    // Promesse renvoyée : 
                    .then((user) => {
                        // On stocke notre user dans le localStorage : 
                        localStorage.setItem("currentUser", JSON.stringify(user))
                        document.location.href='http://localhost:3000/wall'
                    
                    })
                  /*.then( ()=> {
                        navigate('wall')
                    })*/
                  
                }
                else
                {   
                    // Si le code de status n'est pas correct : 
                    res.json().then(response => {
                        // On met le message d'erreur renvoyé dans notre état error
                        setError(response.error);

                    })
                    
                }
                
            })
            // Si l'appel API ne s'éffectue pas de manière correcte : 
            .catch(error => {
                console.log(error)
            })
        }
        
    }

    return(
       <div>
            <form onSubmit={handleSubmit}>
                <h1>SE CONNECTER</h1>
                <label htmlFor="mail">ADRESSE MAIL</label>
                <input type="email" id="email" name="email" placeholder="Entrez votre adresse mail" required onChange={handleChange}/>
                {error && <p className='error'>{error}</p>}
                <label htmlFor="password">MOT DE PASSE</label>
                <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required onChange={handleChange}/>
                <button className="logInButton">LOG IN</button>
            </form>
        
            <div className="nonInscrit">
                <h2>INSCRIVEZ-VOUS EN UN CLIC !</h2>
                <Link to="/register">
                <button className="nonInscritSignButton">SIGN UP</button>
                </Link>
            </div>
        </div>
    )
}

export default Login