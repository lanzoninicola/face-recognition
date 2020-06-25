import React from 'react'
import brain from '../../images/brain.png'
import Tilt from 'react-tilt'
import './Logo.css'


const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt" options={{ max: 50 }} style={{ height: 150, width: 150 }} >
                <div className="pa2 ma4 w4 h4 shadow-2 bg-white"> <img src={brain} alt="brain"></img> </div>
            </Tilt>
        </div>
    )
}


export default Logo




