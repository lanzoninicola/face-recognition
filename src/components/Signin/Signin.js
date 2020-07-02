import React, { Component } from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInData: {
        signInEmail: '',
        signInPassword: ''
      }
    }

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const newSignInData = { ...this.state.signInData };
    newSignInData[name] = value;
    this.setState({ signInData: newSignInData });
  }

  loginAttempt = async () => {

    const { signInEmail, signInPassword } = this.state.signInData;
    const { route, isLogged, resUserData } = this.props;

    const url = 'http://localhost:4000/signin';
    const requesBody = JSON.stringify({ signInEmail, signInPassword });

    let response = await fetch(url, {
      'method': 'POST',
      'headers': { 'Origin': 'http://localhost:4000', 'Content-type': 'application/json' },
      'body': requesBody
    });

    let responseData = await response.json();

    const { result, userLogged } = responseData;

    if (result === 'success') {
      route('home');
      isLogged(true);
      resUserData(userLogged);
    }

  }

  render() {

    return (
      <main className="black-80">
        <div className="pa3 ma6 measure center">

          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba hover-bg-black hover-white w-100"
                type="email"
                name="signInEmail"
                id="email-address"
                onChange={this.handleChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba hover-bg-black hover-white w-100"
                type="password"
                name="signInPassword"
                id="password"
                onChange={this.handleChange}
              />
            </div>

          </fieldset>
          <div className="">
            <button className="b ph3 pv2 input-reset ba b--black grow pointer f6 dib"
              type="text"
              onClick={this.loginAttempt}>
              Sign in
            </button>
          </div>

        </div>
      </main>
    );
  }

}

export default Signin;

