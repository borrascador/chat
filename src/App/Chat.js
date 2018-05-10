import React from 'react';
import { connect } from 'react-redux';
import { postMessageAndGetMessages, getMessages } from '../actions';
import Messages from './Messages';
import Compose from './Compose';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.update = this.update.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  update() {
    this.props.store.dispatch(getMessages());
    this.timer = setTimeout(this.update, 2500);
  }

  handleInputChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  send() {
    const timestamp = + new Date();
    this.props.store.dispatch(postMessageAndGetMessages(this.state.text, timestamp));
    this.setState({
      text: ''
    });
  }

  render() {
    const {messages, loading} = this.props;

    return (
      <div style={Chat.styles.main}>
        <Messages messages={this.props.messages} />
        <div style={Chat.styles.compose}>
          <Compose value={this.state.text} handleInputChange={this.handleInputChange} send={this.send} />
        </div>
      </div>
    );
  }
}

Chat.styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  compose: {
    flex: "1 0",
    width: "100%",
    maxHeight: "40px",
  }
}

export default Chat;
