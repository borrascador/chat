import React from 'react';
import moment from 'moment';

class Messages extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      var element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    }
  }

  formatMessageInfo(message) {
    const user = message.user
    const time = moment(message.timestamp).format('ddd HH:mm:ss')
    return `${user} @ ${time}: `;
  }

  getUserColor(user) {
    // Sum of charcodes for user string, *10 adds variety
    const colorValue = [...user].reduce( (i,s) => s.charCodeAt(0)*10 + i, 0);
    // 4095 === 0xFFF
    const color = (colorValue % 4095).toString(16);
    return {
      color: '#' + color
    };
  }

  render() {
    const {messages} = this.props;

    return (
      <div id="messages" style={Messages.styles.main}>
        <div style={Messages.styles.content}>
          {messages && messages.map((message) =>
            <div style={Messages.styles.message} key={message.timestamp}>
              <span style={this.getUserColor(message.user)}>
                {this.formatMessageInfo(message)}
              </span>
              <span>
                {message.text}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Messages.styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    flexShrink: "1",
    width: "100%",
    maxWidth: "400px",
    maxHeight: "560px",
    backgroundColor: "#fff",
    overflowY: "auto"
  },
  content: {
    marginTop: "auto"
  },
  message: {
    padding: "5px",
  }
}

export default Messages;
