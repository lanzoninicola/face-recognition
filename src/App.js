import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import InputImageForm from './components/InputImageForm/InputImageForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import RankingText from './components/RankingText/RankingText'
import 'tachyons';

import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


class App extends Component {
  constructor() {
    super()

    this.state = {
      imageUrl: null,
      bounding_boxes: [],
      route: 'signin',
      isLogged: false,
      userContext: {
        id: '',
        name: '',
        email: '',
        entries: 0
      }
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

    const url = 'http://localhost:4000/apifacerecognition';
    const requesBody = JSON.stringify({
      imageUrl: this.state.imageUrl
    });

    let response = await fetch(url, {
      'method': 'POST',
      'headers': { 'Content-type': 'application/json' },
      'body': requesBody
    });

    let responseData = await response.json();

    // console.log('app.js - handleFaceRecognition - ', responseData);

    if (responseData) {
      data = [...responseData.outputs[0].data.regions]

      for (let i = 0; i < data.length; i++) {
        boundingBoxesCoordinates.push(data[i].region_info.bounding_box)
      }

      this.setState({ bounding_boxes: boundingBoxesCoordinates })

      this.incrementRankOfUserId(this.state.userContext.id);
    }

  }

  incrementRankOfUserId = async (idUser) => {
    const url = 'http://localhost:4000/image';
    const requesBody = JSON.stringify({ idUser });

    let response = await fetch(url, {
      'method': 'POST',
      'headers': { 'Content-type': 'application/json' },
      'body': requesBody
    });

    let responseData = await response.json();

    const userToRank = { ...this.state.userContext };
    userToRank.entries = responseData.entries;
    console.log(userToRank, this.state.userContext);
    this.setState({ userContext: userToRank });

  }

  setRoute = (route) => {
    this.setState({ route: route })
  }

  setIsLogged = (isLogged) => {
    this.setState({ isLogged: isLogged })
  }

  setResUserData = (user) => {
    const userToRank = { ...this.state.userContext };
    userToRank.id = user.id;
    userToRank.name = user.name;
    userToRank.email = user.email;
    userToRank.entries = user.entries;
    this.setState({ userContext: userToRank });

  }

  render() {

    const { imageUrl, bounding_boxes, route, isLogged, userContext } = this.state

    return (
      <div>
        <Navigation
          setRoute={this.setRoute}
          isLogged={isLogged}
        />

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
            <div>
              <RankingText user={userContext} />
              <InputImageForm
                getImageUrl={this.handleImageUrl}
                disabledButton={imageUrl === null ? true : false}
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
