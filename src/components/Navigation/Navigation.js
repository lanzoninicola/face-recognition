import React from 'react'
import './Navigation.css'


const Navigation = ({ setRoute, isLogged }) => {

    return <nav className="navigation">
        <p id="nav-item"
            onClick={() => setRoute('signin')}
            hidden={(isLogged) ? true : false}>Sign In</p>
        <p id="nav-item"
            onClick={() => setRoute('register')}
            hidden={(isLogged) ? true : false}>Register</p>
        <p id="nav-item"
            onClick={() => setRoute('signin')}
            hidden={(isLogged) ? false : true}>Sign Out</p>
    </nav>
}


export default Navigation
