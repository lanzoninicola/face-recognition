import React, {Component} from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

  }
  setEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  }

  loginAttempt = (event) => {  
    
    //sending a request to verify the user
    fetch('http://localhost:3001/signin', {
      'method': 'POST',
      'headers': {'Content-type': 'application/json'},
      'body': JSON.stringify(
        {
          email: this.state.email,
          password: this.state.password
        }
      )
    })
    // parses response to JSON
      .then(response => response.json())
    //handling the server response
      .then(data => {
        
        if (data.result === 'success') {
          this.props.route('home');
          this.props.isLogged(true);
          this.props.resUserData(data.user);
        }
      })

    this.props.route('signin');
  }

  render() {

    return (
      <main className="pa4 black-80">
        <div className="measure center">

          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.setEmail}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.setPassword}
              />
            </div>

          </fieldset>
          <div className="">
            <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
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

