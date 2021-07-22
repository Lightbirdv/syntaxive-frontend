export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG'
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG'
export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING'
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
export const LOGOUT = 'LOGOUT'

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticateUserPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticationErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password) {
    return dispatch => {
        dispatch(getAuthenticateUserPendingAction())
        login(userID, password)
            .then(
                userSession => {
                    console.log(userSession)
                    const action = getAuthenticationSuccessAction(userSession)
                    dispatch(action)
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error))
            })
    }
}

function login(userID, password) {

    const decodedString = userID + ':' + password
    const encodedString = Buffer.from(decodedString).toString('base64')
    const BearerToken = 'Basic ' + encodedString

    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': BearerToken},
    }
    console.log(requestOptions)
    return fetch('https://localhost:8080/authenticate/loginBasic', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            console.log(userSession)
            return userSession
        })
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get('Authorization')
    console.log(response)
    return response.text().then(text => {

        console.log('Receive result: ' + authorizationHeader)

        const data = text && JSON.parse(text)
        // var token
        // if(authorizationHeader) {
        //     token = authorizationHeader.split(" ")[1]
        // }

        if (!response.ok) {
            if(response.status === 401) {
                logout();
            }
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        else {
            let userSession = {
                user: data,
                accessToken: data.token
            }
            return userSession
        }
    })
}

export function logout() {
    return dispatch => {
        const action = {
            type: LOGOUT
        }
        dispatch(action)
    }
}