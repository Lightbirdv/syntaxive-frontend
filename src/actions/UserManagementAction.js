export const USERMANAGEMENT_PENDING = 'USERMANAGEMENT_PENDING'
export const USERMANAGEMENT_ERROR = 'USERMANAGEMENT_ERROR'
export const GETALLUSER_SUCCESS = 'GETALLUSER_SUCCESS'
export const DELETEUSER_SUCCESS = 'DELETEUSER_SUCCESS'

export function getUserManagementPendingAction() {
    return {
        type: USERMANAGEMENT_PENDING
    }
}

export function getUserManagementErrorAction(error) {
    return {
        type: USERMANAGEMENT_ERROR,
        error: error
    }
}

export function getAllUserSuccessAction(users) {
    return {
        type: GETALLUSER_SUCCESS,
        users: users
    }
}

export function getDeleteUserSuccessAction() {
    return {
        type: DELETEUSER_SUCCESS
    }
}

export function deleteUserAction(token, userid) {
    return dispatch => {
        dispatch(getUserManagementPendingAction())
        deleteUser(token, userid)
            .then(
                message => {
                    console.log(message)
                    const action = getDeleteUserSuccessAction()
                    dispatch(action)
                },
                error => {
                    dispatch(getUserManagementErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getUserManagementErrorAction(error))
            })
    }
}

function deleteUser(token, userid) {

    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + token},
    }
    console.log('deleteAllUser requestoptions: ' + requestOptions)
    return fetch('https://localhost:8080/user/' + userid, requestOptions)
        .then(handleResponseDelete)
        .then(message => {
            console.log(message)
            return message
        })
}

function handleResponseDelete(response) {
    console.log(response)
    return response.text().then(text => {

        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        else {
            let message = data
            console.log(JSON.stringify(data))
            return message
        }
    })
}

export function getAllUsers(token) {
    return dispatch => {
        dispatch(getUserManagementPendingAction())
        fetchAllUsers(token)
            .then(
                users => {
                    console.log(users)
                    const action = getAllUserSuccessAction(users)
                    dispatch(action)
                },
                error => {
                    dispatch(getUserManagementErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getUserManagementErrorAction(error))
            })
    }
}

function fetchAllUsers(token) {

    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token},
    }
    console.log('fetchAllUsers requestoptions: ' + requestOptions)
    return fetch('https://localhost:8080/user/all', requestOptions)
        .then(handleResponseFetch)
        .then(users => {
            console.log(users)
            return users
        })
}

function handleResponseFetch(response) {
    console.log(response)
    return response.text().then(text => {

        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        else {
            let users = data
            console.log(JSON.stringify(data))
            return users
        }
    })
}
