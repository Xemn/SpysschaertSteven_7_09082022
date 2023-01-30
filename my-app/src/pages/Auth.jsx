import React from 'react'
import LogIn from '../components/Login/LogIn'
import Banner from '../components/Banner/Banner'

export default function Auth
() {
  return (
    <React.Fragment>
        <Banner />
        <LogIn />
    </React.Fragment>
  )
}