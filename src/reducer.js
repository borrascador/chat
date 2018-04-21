import {
  SET_USER,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  LOAD_MESSAGES_REQUEST,
  LOAD_MESSAGES_SUCCESS,
} from './actions';

const initialState = {
  user: null,
  messages: [],
  sending: false,
  loading: false,
  error: null
};

export default function reducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.payload.user
      });

    case SEND_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        sending: true,
        error: null
      });

    case SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        sending: false
      });

    case LOAD_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case LOAD_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        messages: Object.values(action.payload.messages.result)
      });

    // case SOME_ERROR:
    //   // The request failed, but it did stop, so set loading to "false".
    //   // Save the error, and we can display it somewhere
    //   // Since it failed, we don't have items to display anymore, so set it empty.
    //   // This is up to you and your app though: maybe you want to keep the items
    //   // around! Do whatever seems right.
    //   return Object.assign({}, state, {
    //     loading: false,
    //     error: action.payload.error,
    //     messages: []
    //   });

    default:
      return state;
  }
}
