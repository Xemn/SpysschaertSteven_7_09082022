/*--- Component Delete : permettant à l'utilisateur de supprimer un post ---*/

import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import './styles/DeletePost.css'

/* Nous avons besoin de l'id de la publication, de l'userId du créateur de la publication
et de mettre à jour isDeleted pour re-render notre component Posts.jsx : */
export default function Delete({id, userId, isDeleted}) {

    // URL de notre API : (à modifier en fonction de votre port )
    const url = `${process.env.REACT_APP_API_URL}publications/${id}`
    // Récupération token, userID et isAdmin :
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    const currentUserId = JSON.parse(localStorage.getItem("currentUser")).userId;
    const isAdmin = JSON.parse(localStorage.getItem("currentUser")).isAdmin;


    // Fonction qui va faire appel à notre API : 
    const handleClick = async () => {
        /*Si l'id de l'utilisateur connecté et similaire à celui du créateur
        de la publcation ou si il est admin :  */
        if (currentUserId === userId || isAdmin)
        {
            await fetch(url, 
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type" : 'application/json',
                        Authorization : "Bearer " + token
                },
                })
                .then((res) => {
                    // si le code de status est correct (200) : 
                    if(res.ok)
                    {   
                        // On met à jour notre state pour le re-render : 
                        isDeleted(true);
                        return res.json()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                isDeleted(false);
        }
        else{
            // Si l'utlisateur n'est pas admin et qu'il n'est pas le créateur de la publication :
            alert("Vous n'êtes pas autorisé à supprimer ce post")
        }
    }

  return (
        <ClearIcon className='deleteIcon' style={{ cursor: "pointer" }} onClick={handleClick}/>
  )
}
