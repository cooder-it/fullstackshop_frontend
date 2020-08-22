import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAIL, USER_LOGOUT } from './action-types'

export function fetchUserRequest() {
    return {
        type: FETCH_USER_REQUEST,
    }
}
export function fetchUserSuccess(userData) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: userData
    }
}
export function fetchUserFail(error) {
    return {
        type: FETCH_USER_FAIL,
        payload: error
    }
}

// LOGIN/ ZDOBYCIE INFO O UZYTKOWNIKU
export function fetchUser(username, password) {
    const data = {
        "username": username,
        "password": password
    }
    return async function(dispatch) {
        dispatch(fetchUserRequest());
        fetch(`http://127.0.0.1:8000/auth_user/login/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('token', data.token) //przechowywujemy token
            dispatch(fetchUserSuccess(data))
        })
        .catch(error => {
            dispatch(fetchUserFail(error))
        })
    }
}

export function logout() {
    localStorage.removeItem('token')
    return {
        type: USER_LOGOUT,
    }
}