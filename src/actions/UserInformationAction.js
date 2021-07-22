export const USERINFO_PENDING = 'USERINFO_PENDING'
export const USERINFO_SUCCESS = 'USERINFO_SUCCESS'
export const USERINFO_ERROR = 'USERINFO_ERROR'

export function getUserInfoPendingAction() {
    return {
        type: USERINFO_PENDING
    }
}

export function getUserInfoSuccessAction(userInfo) {
    return {
        type: USERINFO_SUCCESS,
        user_id: userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
        isAdministrator: userInfo.isAdministrator,
        preference: userInfo.preference
    }
}

export function getUserInfoErrorAction(error) {
    return {
        type: USERINFO_ERROR,
        error: error
    }
}

export function getUserInfo(userID, token) {
    return dispatch => {
        dispatch(getUserInfoPendingAction())
        fetchUserInfo(userID, token)
            .then(
                userInfo => {
                    console.log(userInfo)
                    const action = getUserInfoSuccessAction(userInfo)
                    dispatch(action)
                },
                error => {
                    dispatch(getUserInfoErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getUserInfoErrorAction(error))
            })
    }
}

function fetchUserInfo(userID, token) {

    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token},
    }
    console.log('fetchUserInfo requestoptions: ' + requestOptions)
    return fetch('https://localhost:8080/user/find/' + userID, requestOptions)
        .then(handleResponse)
        .then(userInfo => {
            console.log(userInfo)
            return userInfo
        })
}

function handleResponse(response) {
    console.log(response)
    return response.text().then(text => {

        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        else {
            let userInfo = {
                _id: data._id,
                username: data.username,
                email: data.email,
                isAdministrator: data.isAdministrator,
                preference: data.preference
            }
            return userInfo
        }
    })
}
