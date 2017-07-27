import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  profile: {},
  isFetching: false,
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, { isFetching: true })
    case GET_USER_SUCCESS:
      if (!state.profile[action.response.login]) {
        const profile = Object.assign({}, state.profile, {
          [action.response.login]: action.response,
        })
        return Object.assign({}, state, { isFetching: false }, { profile })
      }
      return state
    case GET_USER_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    default:
      return state
  }
}
