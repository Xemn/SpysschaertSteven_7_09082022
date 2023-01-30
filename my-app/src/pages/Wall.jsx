import React from 'react'
import { useState } from 'react'
import Post from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import WallHeader from '../components/WallHeader/WallHeader'

export default function CommonWall() {
  
  // useState qui sera partagé aux composant enfants Post.jsx et Posts.jsx : 
  const [shouldUpdate, setShouldUpdate] = useState(false);

  return (
    <React.Fragment>
      <WallHeader />
      <Post shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate}/>
      <Posts shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate} />
    </React.Fragment>
    
  )
}