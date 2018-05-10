import fetch from 'cross-fetch';

const URL = 'https://www.jsonstore.io/ba10fd3ca8c7599bd734181b7bad2fe534c90c5fbe1938838a8d92fb43fab94b';

export const SET_USER = 'SET_USER';
export const setUser = (user) => ({
  type: SET_USER,
  payload: { user: user }
});

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const sendMessageRequest = () => ({
  type: SEND_MESSAGE_REQUEST
});

export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS
})

export const LOAD_MESSAGES_REQUEST = 'LOAD_MESSAGES_REQUEST';
const loadMessagesRequest = () => ({
  type: LOAD_MESSAGES_REQUEST
});

export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
const loadMessagesSuccess = messages => ({
  type: LOAD_MESSAGES_SUCCESS,
  payload: { messages }
});

export const DELETE_MESSAGES_REQUEST = 'DELETE_MESSAGES_REQUEST';
const deleteMessagesRequest = () => ({
  type: DELETE_MESSAGES_REQUEST
});

export const DELETE_MESSAGES_SUCCESS = 'DELETE_MESSAGES_SUCCESS';
const deleteMessagesSuccess = () => ({
  type: DELETE_MESSAGES_SUCCESS
});

// export const LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE';
// export const loadMessagesError = error => ({
//   type: LOAD_MESSAGES_FAILURE,
//   payload: { error }
// });

function postMessage(text, user) {
  return (dispatch, getState) => {
    dispatch(sendMessageRequest())
    const message = {
      text: text,
      timestamp: Date.now(),
      user: user || getState().user,
    };
    return fetch(URL + '/messages/' + message.timestamp, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(message),
    })
      .then(
        response => dispatch(sendMessageSuccess()),
        error => console.log('An error occured.', error)
      )
  }
}

function deleteMessages() {
  return (dispatch) => {
    dispatch(deleteMessagesRequest())
    return fetch(URL, {
      method: 'DELETE',
    })
      .then(
        response => dispatch(deleteMessagesSuccess()),
        error => console.log('An error occured.', error)
      )
  }
}

export function getMessages() {
  return (dispatch) => {
    dispatch(loadMessagesRequest())
    return fetch(URL + '/messages/')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(loadMessagesSuccess(json))
      )
  }
}

export function postMessageAndGetMessages(text, user) {
  return (dispatch, getState) => {
    return dispatch(postMessage(text, user))
      .then(() => {
        return dispatch(getMessages())
      })
  }
}

export function deleteMessagesAndGetMessages() {
  return (dispatch, getState) => {
    return dispatch(deleteMessages())
      .then(() => {
        return dispatch(postMessageAndGetMessages("welcome to my chat app", "jan"))
      })
      .then(() => {
        return dispatch(postMessageAndGetMessages("all messages are public", "jan"))
      })
      .then(() => {
        return dispatch(postMessageAndGetMessages("type /delete to delete all messages", "jan"))
      })
  }
}
