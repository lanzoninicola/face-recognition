import React from 'react'
import './BoundingBox.css'


const BoundingBox = ({ boxStyle }) => {

    const style = {
        top: boxStyle.box_top,
        right: boxStyle.box_right,
        bottom: boxStyle.box_bottom,
        left: boxStyle.box_left
    }

    return <div className="bounding-box" style={style}></div>

}


export default BoundingBox