import React from 'react';
import { setUser } from '../actions';
import Compose from './Compose';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  send() {
    this.props.store.dispatch(setUser(this.state.text));
    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <div style={SignIn.styles.main}>
        <div>
          <h1 style={SignIn.styles.text}>Chat</h1>
          <h3 style={SignIn.styles.text}>Please enter username</h3>
          <Compose value={this.state.text} handleInputChange={this.handleInputChange} send={this.send} />
        </div>
      </div>
    );
  }
}

SignIn.styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  text: {
    textAlign: "center",
    paddingBottom: "15px",
  }
}

export default SignIn;
