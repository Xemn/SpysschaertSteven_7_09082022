/*--- Component Modify : permettant à l'utilisateur de modifier sa publication : ---*/

import React from 'react'
import { useState, useRef } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UndoIcon from '@mui/icons-material/Undo';
import SendIcon from '@mui/icons-material/Send';
import './styles/ModifyPost.css'

/* Pour cela on a besoin de l'id de la publication, de l'userId de la personne ayant créer cette
publication, du message/image de la publication et enfin d'un état nous permettant de re-render notre
component Posts.jsx :  */
export default function ModifyPost({id, userId, message, imageUrl, modifyPublication}) {
    
    // URL de notre API : 
    const url = `${process.env.REACT_APP_API_URL}publications/${id}`
    // Récupération du token/ de notre ID et de notre rôle : 
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    const currentUserId = JSON.parse(localStorage.getItem("currentUser")).userId;
    const isAdmin = JSON.parse(localStorage.getItem("currentUser")).isAdmin;

    /* Nos states (états) :  */

    const [update, setUpdate] = useState(false);
    const [newText, setNewText] = useState(message);
    const [newImage, setNewImage] = useState(imageUrl);
    const imageRef = useRef();

    /* Nos fonctions : */

    // Fonction permettant de modifier un état au clique de la souris : 
    const handleClick = () => {
        setUpdate(true);
    }

    // Fonction permettant de modifier un état au clique de la souris : 
    const handleCancel = () => {
        setUpdate(false)
    }

    // Fonction qui va faire appelle à notre API :
    const modifyPost = async (e) => {
        e.preventDefault();

        /* Si notre id équivaut à celui du créateur de la publication
        ou si nous sommes administrateurs : */
        if (currentUserId === userId || isAdmin)
        {
            const modifyPost = new FormData();

            if (newImage || newText)
            {
                
                modifyPost.append("message", newText);
                modifyPost.append("imageUrl", newImage);
                console.log(imageRef)
            }
            

                await fetch(url, 
                    {
                        method: "PUT",
                        headers : {
                            Accept: "application/json",
                            //"Content-Type" : "application/json",
                            Authorization : "Bearer " + token
                    },
                        body: modifyPost
                    })
                    .then((res) => {
                        // modification de notre état pour le re-render :
                        modifyPublication(true)
                        return res.json()
                    })
                    .then(() =>
                    {   
                        // on réinitialise notre état afin d'éviter le re-render infini :
                        modifyPublication(false)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    // on réinitialise notre état afin de fermer la fenêtre de modification :
                    setUpdate(false)
        }
    }

  return (
    <div>
        <EditIcon className='editButton' onClick={handleClick} />
        {update && (
            <div>
                <form className="updatingForm" onSubmit={modifyPost}>
                    <div className='updatingForm__inputs'>
                        <input className='updatingForm__textInput' type="text" placeholder='Quoi de neuf ?' name="message" required defaultValue={message} onChange={(e) => setNewText(e.target.value)}/>
                        <label htmlFor='attachement'>
                            <input style={{display: "none"}} name="attachement" type="file" ref={imageRef} onChange={(e) => setNewImage (e.target.files[0], e.target.files[0].name)} />
                            <AttachFileIcon style={{color: '#4E5166'}} onClick={() => imageRef.current.click()} />
                        </label>
                    </div>
                    <div className='updatingForm__buttons'>
                        <UndoIcon className='updatingForm__undoIcon' onClick={handleCancel} />
                        <SendIcon className='updatingForm__sendIcon' onClick={modifyPost}/>
                    </div>
                </form>
            </div>



        )}
    </div>
  )
}
