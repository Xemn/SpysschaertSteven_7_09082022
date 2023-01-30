/*--- Component like: permettant à un utilisateur de like ou de dislike une publication : ---*/

import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import './styles/Like.css'

/* Pour cela on a besoin de l'id de la publication, de son nombre likes/dislikes
et des useState modifyLikes/Dislikes afin de re-render notre component Posts.jsx :*/
export default function Like 
({id, likes, dislikes, modifyLikes, modifyDislikes}) {

    // récupération de notre token : 
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    // l'URL de notre API : 
    const url = `${process.env.REACT_APP_API_URL}publications/${id}/like`
    // Valeur de liked par défaut :
    const liked = 1;

    // Fonction permettant de like : 
    const handleLike = () => {
        fetch(url,
        {
            method: 'POST',
            headers: {
                "Content-Type" : 'application/json',
                Authorization : "Bearer " + token
            },
            body : JSON.stringify({like : liked})
        })
        .then((res) => {
            if(res.ok)
            {   
                return res.json()
            }
        })
        .then(()=>{
            // mise à jour de nos états afin de re-render notre component Posts.jsx : 
            modifyLikes(true);
            modifyDislikes(false);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // Fonction permettant de dislike : 
    const handleDislike = () => {
        fetch(url,
        {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + token
            },
            body: JSON.stringify({like : liked - 2})
        })
        .then((res) => {
            if(res.ok)
            { 
                return res.json()
            }
        })
        .then(()=> {
            // mise à jour de nos états afin de re-render notre component Posts.jsx : 
            modifyDislikes(true);
            modifyLikes(false);
        })
        .catch((err) => {
            console.log(err)
        })
    }
        
  return (
    <div className='likePanel'>
        <span onClick={handleLike} style={{ cursor: "pointer" }}>
            <ThumbUpIcon className='likePanel__thumbUp'/>
            <p className='likePanel__count'>{likes}</p>
        </span>
        
        <span onClick={handleDislike} style={{ cursor: "pointer" }}>
            <ThumbDownIcon className='likePanel__thumbDown'/>
            <p className='likePanel__count'>{dislikes}</p>
        </span>
    </div>
  )
}