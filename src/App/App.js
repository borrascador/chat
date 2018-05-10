import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';
import Chat from './Chat';
import SignIn from './SignIn';

class App extends React.Component {
  render() {
    const {store, messages, user} = this.props;

    return (
      <div style={App.styles.main}>
        {user
          ? <Chat store={store} messages={messages} />
          : <SignIn store={store} />
        }
      </div>
    );
  }
}

App.styles = {
  main: {
    margin: "0 auto",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.user,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(App);
