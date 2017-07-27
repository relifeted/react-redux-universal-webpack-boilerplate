import { CALL_API } from '../middleware/api'
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../constants/ActionTypes'

function user(name) {
  return {
    [CALL_API]: {
      types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE],
      method: 'GET',
      endpoint: '/users/' + name,
    },
  }
}

export function getUser(name) {
  return (dispatch, getState) => {
    const { users } = getState()
    if (!users.profile[name]) {
      return dispatch(user(name))
    }
  }
}
