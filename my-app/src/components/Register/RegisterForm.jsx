/*--- Componant Register : permettant à un utilisateur de se créer un compte : ---*/

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const url = `${process.env.REACT_APP_API_URL}auth`

export default function RegisterForm() {

    const navigate = useNavigate();

    /* Notre état crédentials, qui va servir à stocker les différentes 
    données entrées par nos utilisateurs dans nos champs de formulaire : */

    const [credentials, setCredentials] = useState({
        email : "",
        username: "",
        password : "",
        confirmPassword : ""
    })

    const [error, setError] = useState(false)

    /* Fonction, qui va permettre de vérifier les divers changements dans nos inputs
    et mettre à jours ces changements dans notre useState credentials :  */

    const handleChange = ({currentTarget}) =>
    {
        console.log(currentTarget.value)
        const {value, name} = currentTarget
        setCredentials({
            ...credentials,
            [name] : value
        })
    }

    /* Fonction d'envoie du formulaire à notre API : */

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        /* On vérifié en premier lieu si les champs ne sont pas vide (Never trust user input) et si
        les deux mots de passes concordent :  */

        if (credentials.email && credentials.username && credentials.password && credentials.confirmPassword && credentials.password === credentials.confirmPassword)
        {
            fetch(url + '/signup',
            {
                method: 'POST',
                headers : {
                    "Content-Type" : 'application/json',
                },
                body: JSON.stringify(credentials), // Conversion de notre objet JS credentials en JSON
            })
            .then(function(res)
            {
                // Si la réponse à un code status correct : 
                if(res.ok){
                    
                    res.json()
                    .then( ()=> {
                        navigate('/') // Renvoie vers la page de connexion
                    })
                }
                else
                {
                    res.json()
                    .then((response) => {
                        setError(response.error)
                    })
                }
            })
            // Si l'appel API ne s'effectue pas de manière correcte :
            .catch(error => console.log(error))
        }
        // Si les champs sont vides, ou que les mots de passes ne sont pas similaires : 
        else{
            setError("Les champs ne sont pas renseignés ou les mots de passes ne sont pas similaires.")
        }
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1 className='form-title'>SE CONNECTER</h1>
            <label htmlFor="mail">ENTREZ VOTRE ADRESSE MAIL</label>
            <input type="email" id="email" name="email" placeholder="Entrez votre adresse mail" onChange={handleChange} required/>
            <label htmlFor='text'>ENTREZ UN USERNAME : </label>
            <input type="text" name="username" id="username" placeholder='Entrez un username' onChange={handleChange} required />
            <label htmlFor="password">ENTREZ VOTRE MOT DE PASSE</label>
            <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" onChange={handleChange} required/>
            <label htmlFor='password'>CONFIRMEZ VOTRE MOT DE PASSE</label>
            <input type="password" id="confirmPassword" name='confirmPassword' placeholder='Veuillez confirmer votre mot de passe' onChange={handleChange} required/>
            {error && <p className='error'>{error}</p>}
            <button>SIGN UP</button>
        </form>

        <div className="nonInscrit">
                <h2>DÉJÀ INSCRIT ?</h2>
                <Link to="/">
                <button className="nonInscritSignButton">LOG IN</button>
                </Link>
            </div>
    </div>

  )
}
