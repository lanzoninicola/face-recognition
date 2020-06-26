import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userState: {
        name: '',
      }
    };
    //in questo caso ho preferito NON usare lo state
    this.user = {
      name: '',
      email: '',
      password: ''
    }
  }

  setName = (event) => {
    // this.setState({user: { name: event.target.value }});
    this.user.name = event.target.value;
    //console.log(this.name);
  }

  setEmail = (event) => {
    //this.setState({user: { email: event.target.value }});
    this.user.email = event.target.value;
  }

  setPassword = (event) => {
    //this.setState({user: { password: event.target.value }});
    this.user.password = event.target.value;
  }

  createNewUser = () => {
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(this.user)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (this.user.email === data.email) {
          this.props.route('home');
          this.props.isLogged(true);
          this.props.resUserData(data);
        }
      })

  }

  render() {
    return (
      <main className="pa4 black-80">
        <div className="measure center">

          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.setName}
              />
              <h1 className="m3">{this.user.name}</h1>
            </div>
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

