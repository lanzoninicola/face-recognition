import React from 'react'
import './FaceRecognition.css'
import BoundingBox from '../BoundingBox/BoundingBox'

const FaceRecognition = ({ imageUrl, bounding_boxes }) => {

    const boxes = bounding_boxes.map((bounding_box, index) => {
        return <BoundingBox key={index} boxStyle={{
            box_top: `${(bounding_box.top_row * 100)}%`,
            box_right: `${(100 - (bounding_box.right_col * 100))}%`,
            box_bottom: `${(100 - (bounding_box.bottom_row * 100))}%`,
            box_left: `${(bounding_box.left_col * 100)}%`
        }} />
    })


    return (
        <div className="faceRecognition">
            <img id="imageFaceRecognition" alt="faceRecognition" src={imageUrl} width="500px" height="500px"></img>
            {bounding_boxes.length > 0 && boxes}
        </div>
    )
}


export default FaceRecognition

