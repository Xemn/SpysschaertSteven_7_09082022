import React from 'react'
import { useNavigate } from 'react-router-dom'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './WallHeader.css'

export default function WallHeader
() {
  const navigate = useNavigate();
    const logOut = () => {
      
        localStorage.removeItem("currentUser")
        navigate(-1)
    } 

  return (
    <div className='wallHeader'>
        <PowerSettingsNewIcon className='wallHeader__logoutButton' onClick={logOut}/>
    </div>
  )
}
