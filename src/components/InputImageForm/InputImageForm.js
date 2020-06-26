import React from 'react'
import './InputImageForm.css'

const InputImageForm = ({ getImageUrl, callFaceRecognitionAPI }) => {
    return (
        <div className="inputImageForm">
            <div className="form-element">
                <p>Paste the image URL below here and press <span style={{ fontStyle: 'italic' }}>Detect</span> button</p>
                <input type="text" name="inputURL" id="inputURL" onChange={getImageUrl} />
                <button onClick={callFaceRecognitionAPI}>Detect</button>
            </div>
        </div>
    )
}


export default InputImageForm
