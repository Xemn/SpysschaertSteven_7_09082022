/*--- Component Post : permettant à l'utilisateur de créer un post ---*/

import React from 'react'
import { useState, useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './Post.css'

const url = `${process.env.REACT_APP_API_URL}publications/`



export default function SharePost({setShouldUpdate}) {
    
    // Récupération de notre token : 
    const token = JSON.parse(localStorage.getItem("currentUser")).token;

    /* Nos useState (ou états) :  */

    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")
    const imageRef = useRef();

    /* Nos différentes fonctions :  */

    /* Fonction qui va récupérer et stocker la valeur de l'input 
    message dans le state correspondant : */
    const handleChange = (event) => {
        //console.log(event.target.value)
        setMessage(event.target.value)
    }

    /* Fonction qui va récupérer et stocker le nom du fichier sélectionner par
    l'utilisateur : */
    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0])
        {
            let img = event.target.files[0];
            //console.log(img)
            setImage(img)
        }
    }


   /* Fonction qui va faire appel à notre API :  */ 
   const handleSubmit = (event) => {
        event.preventDefault();
        // useState du parent Wall.jsx, qui permettra de mettre à jour le composant Posts.jsx
        setShouldUpdate(true);
        
        // Si le champs message et ou image ne sont pas vide :
        if(image || message)
        {
            // on créer un objet FormData dans le cas où la requête possède une image :
            const data = new FormData();
            data.append("message",message)
            data.append("imageUrl", image)
        
            // On appelle notre API : 
            fetch(url,
            {
                method: "POST",
                headers : {
                    Accept: "application/json",
                    //"Content-Type" : "application/json",
                    Authorization : "Bearer " + token
                },
                body: data,
            })
            .then(function(res)
            {   
                // Si le code status renvoyé est correct (200) : 
                if(res.ok){
                    // On vide nos states : 
                    setMessage("")
                    setImage("")
                    return res.json()
                    
                    
                }
                /* Si ce n'est pas le cas on stocke le message d'erreur dans notre 
                state Error : */ 
                else
                {
                    res.json()
                    .then(response => {
                        setError(response.error);
                    })
                }
            })
            // Si notre appel API s'est mal déroulé : 
            .catch(error => {
                console.log(error)
            })
        }
        else {
            console.log("Something goes wrong !")
        }
    }

  return (
    <form className='sharingForm'onSubmit={handleSubmit}>
            <input className='sharingForm__textfield' maxLength={140} type="text" placeholder='Quoi de neuf ?' value={message} name="message" required onChange={handleChange}/>
            <label htmlFor='attachement'>
                <input style={{display: "none"}} name="attachement" type="file" ref={imageRef} onChange={onImageChange} />
                <AttachFileIcon className='sharingForm__fileIcon' style={{color: '#4E5166'}} onClick={() => imageRef.current.click()} />
            </label>
            <SendIcon  className='sharingForm__sendIcon'style={{color : "#FD2D01"}} onClick={handleSubmit} />
            {error && <p>Votre publication doit obligatoirement possèder un message !</p>}
    </form>
  )
}
