/*--- Component Posts : permettant d'afficher les différents posts à l'utilisateur : ---*/

import React from 'react'
import DayJS from 'react-dayjs'
import {useState, useEffect} from "react"
import Like from './Like'
import Delete from './DeletePost'
import ModifyPost from './ModifyPost'
import './styles/Posts.css'
const url = `${process.env.REACT_APP_API_URL}publications/`

/* On aura besoin de modifier l'état de notre parent : Wall.jsx afin 
de re-render en cas de post/modification de post : */
export default function Posts({shouldUpdate, setShouldUpdate}) {

    const tokenUserId = JSON.parse(localStorage.getItem("currentUser")).userId;
    const isAdmin = JSON.parse(localStorage.getItem("currentUser")).isAdmin;
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likes, setLikes] = useState(false);
    const [dislikes, setDislikes] = useState(false)
    const [modifyPost, setModifyPost] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    const fetchData = async () => {
    try {
      const res = await fetch(url, 
        {headers: 
            {Authorization : 'Bearer ' + token}});
      if (!res.ok) {
        throw new Error(`This is an HTTP error : The status is ${res.status}`);
      }
      const actualData = await res.json();
      setData(actualData);
      setLoading(false);
      setShouldUpdate(false)
    } catch (err) {
      setError(err);
    }
  }
  fetchData()
  }, [likes, dislikes, modifyPost, shouldUpdate, setShouldUpdate, isDeleted]);

    return (
        <div className='posts'>
            {loading && <div>Veuillez patienter...</div>}
            {error && (<div className='error' >
                {`Il y'a un problème lors de la récupération des données -${error}`}</div>)}
            <ul className='posts__list'>
            {data.length !==0 && data.map(({_id, message, imageUrl, createdAt, likes, dislikes, userId}) => {
                    return(
                        <li key={_id}>
                            {tokenUserId === userId || isAdmin  ? <div className='posts__adminPanel'><Delete id={_id} userId={userId} isDeleted={setIsDeleted} /><ModifyPost message={message} imageUrl={imageUrl} id={_id} userId={userId} modifyPublication={setModifyPost}/></div>: null}
                            <div className='posts__message'>
                                <p>{message}</p>
                                {imageUrl && <img src={imageUrl} alt={`Photo du post n° ${_id}`} />}
                                <DayJS date={createdAt} element="p" format="DD-MM-YYYY / HH:mm:ss " />
                            </div>
                            <Like id={_id} likes={likes} dislikes={dislikes} modifyLikes={setLikes} modifyDislikes={setDislikes}/>
                        </li>
                        
                    )
                })}
                </ul>
            {data.length === 0 && <p>Aucune publication à afficher pour le moment</p>}
        </div>
    )
}
    