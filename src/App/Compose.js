import React from 'react';

class Compose extends React.Component {
  render() {
    const {value, handleInputChange, send} = this.props;

    return (
      <div style={Compose.styles.main}>
        <input style={Compose.styles.input} type='text'
          value={value} onChange={handleInputChange}
        />
        <button style={Compose.styles.button} onClick={send}>
          >
        </button>
      </div>
    );
  }
}

Compose.styles = {
  main: {
    height: "100%",
    maxHeight: "40px",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    flex: "5",
    minWidth: "0",
    padding: "10px",
    border: "1px solid black",
  },
  button: {
    flex: "1",
    padding: "10px",
    border: "1px solid black",
  }
};

export default Compose;
