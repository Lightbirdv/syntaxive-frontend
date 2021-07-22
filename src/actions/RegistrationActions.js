export const SHOW_REGISTRATION_DIALOG = 'SHOW_REGISTRATION_DIALOG'
export const HIDE_REGISTRATION_DIALOG = 'HIDE_REGISTRATION_DIALOG'
export const REGISTRATION_PENDING = 'REGISTRATION_PENDING'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR'

export function getShowRegistrationDialogAction() {
    return {
        type: SHOW_REGISTRATION_DIALOG
    }
}

export function getHideRegistrationDialogAction() {
    return {
        type: HIDE_REGISTRATION_DIALOG
    }
}

export function getRegistrationUserPendingAction() {
    return {
        type: REGISTRATION_PENDING
    }
}

export function getRegistrationSuccessAction() {
    return {
        type: REGISTRATION_SUCCESS,
    }
}

export function getRegistrationErrorAction(error) {
    return {
        type: REGISTRATION_ERROR,
        error: error
    }
}

export function registerUser(userID, email, password) {
    return dispatch => {
        dispatch(getRegistrationUserPendingAction())
        register(userID, email, password)
            .then(
                message => {
                    console.log(message)
                    const action = getRegistrationSuccessAction()
                    dispatch(action)
                },
                error => {
                    dispatch(getRegistrationErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getRegistrationErrorAction(error))
            })
    }
}

function register(userID, email, password) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            username: userID,
            email: email,
            password: password
        })
    }
    console.log(requestOptions)
    return fetch('https://localhost:8080/user/register', requestOptions)
        .then(handleResponse)
        .then(message => {
            console.log(message)
            return message
        })
}

function handleResponse(response) {
    
    return response.text().then(text => {

        const data = text && JSON.parse(text)

        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        else {
            let message = data
            return message
        }
    })
}
