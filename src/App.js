import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import InputImageForm from './components/InputImageForm/InputImageForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import RankingText from './components/RankingText/RankingText'
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const FACE_DETECT_MODEL = 'e15d0f873e66047e579f90cf82c9882z'

const app = new Clarifai.App({
  apiKey: '4c89d78be6c74b88aaad378b09466151'
});


class App extends Component {
  constructor() {
    super()

    this.state = {
      imageUrl: null,
      bounding_boxes: [],
      route: 'home',
      isLogged: false
    }
  }

  handleImageUrl = (event) => {
    this.setState({
      imageUrl: event.target.value
    })
  }

  handleFaceRecognition = async () => {

    let data = [];
    let boundingBoxesCoordinates = []

    const response = await app.models.predict(FACE_DETECT_MODEL, this.state.imageUrl);
    data = [...response.outputs[0].data.regions]

    for (let i = 0; i < data.length; i++) {
      boundingBoxesCoordinates.push(data[i].region_info.bounding_box)
    }

    this.setState({ bounding_boxes: boundingBoxesCoordinates })

  }

  setRoute = (route) => {
    this.setState({ route: route })
  }

  setIsLogged = () => {

  }

  render() {

    const { imageUrl, bounding_boxes, route, isLogged } = this.state

    return (
      <div className="App">
        <Navigation setRoute={this.setRoute} isLogged={isLogged} />

        {(route === 'signin') &&
          <Signin
            route={this.setRoute}
            isLogged={this.setIsLogged}
            resUserData={this.setResUserData}
          />}

        {(route === 'register') &&
          <Register
            route={this.setRoute}
            isLogged={this.setIsLogged}
            resUserData={this.setResUserData}
          />}

        {(route === 'home') &&
          <div>
            <Logo />
            <div className="container">
              <RankingText />
              <InputImageForm
                getImageUrl={this.handleImageUrl}
                callFaceRecognitionAPI={this.handleFaceRecognition}
              />
              <FaceRecognition
                imageUrl={imageUrl}
                bounding_boxes={bounding_boxes}
              />
            </div>
          </div>}

      </div>


    )
  }
}

export default App;


// 4c89d78be6c74b88aaad378b09466151
// https://clarifai.com/cms-assets/20180320221615/face-001.jpg
