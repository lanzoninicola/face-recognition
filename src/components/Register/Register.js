import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userState: {
        registrationUserData: {
          name: '',
          email: '',
          password: ''
        }
      }
    };

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const newRegistrationUserData = { ...this.state.registrationUserData };
    newRegistrationUserData[name] = value;
    this.setState({ registrationUserData: newRegistrationUserData });
  }

  createNewUser = async () => {

    const { route, isLogged, resUserData } = this.props;

    const url = 'http://localhost:4000/register';
    const bodyRequest = JSON.stringify(this.state.registrationUserData);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: bodyRequest
    });

    let responseData = await response.json();

    const { result, user } = responseData;

    console.log(responseData)

    if (result === 'success') {
      route('home');
      isLogged(true);
      resUserData(user);
    }

  }

  render() {

    return (
      <main className="black-80">
        <div className="pa3 ma6 measure center">

          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
              />

            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email-address"
                onChange={this.handleChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>

          </fieldset>
          <div className="">
            <button className="b ph3 pv2 input-reset ba b--black grow pointer f6 dib"
              type="text"
              onClick={this.createNewUser}
            >Register
                </button>
          </div>

        </div>
      </main>
    );
  }

}

export default Register;

