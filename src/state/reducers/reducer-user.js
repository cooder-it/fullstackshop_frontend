import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAIL, USER_LOGOUT } from '../actions/action-types'

const initialState = {
    loading: false,
    userData: {},
    error: ''
}

function reducerUser(state = initialState, action) {
    switch(action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userData: action.payload
            }
        case FETCH_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                userData: {},
                error: ''
            }
        default:
            return state
    }
}

export default reducerUser