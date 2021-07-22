export const POSTFETCH_PENDING = 'POSTFETCH_PENDING'
export const POSTFETCH_ERROR = 'POSTFETCH_ERROR'
export const POSTFETCH_SUCCESS = 'POSTFETCH_SUCCESS'
export const POSTPOST_SUCCESS = 'POSTPOST_SUCCESS'
export const REFRESHPOST_SUCCESS = 'REFRESHPOST_SUCCESS'
export const DELETEPOST_SUCCESS = 'DELETEPOST_SUCCESS'
export const NEWCOMMENT_SUCCESS = 'NEWCOMMENT_SUCCESS'


export function getPostFetchPendingAction() {
    return {
        type: POSTFETCH_PENDING
    }
}


export function getPostFetchErrorAction(error) {
    return {
        type: POSTFETCH_ERROR,
        error: error
    }
}

export function getPostFetchSuccessAction(posts) {
    return {
        type: POSTFETCH_SUCCESS,
        posts: posts
    }
}

export function getPostPostSuccessAction(message) {
    return {
        type: POSTPOST_SUCCESS,
        message: message
    }
}

export function getPostRefreshSuccessAction(post) {
    return {
        type: REFRESHPOST_SUCCESS,
        post: post
    }
}

export function getPostDeleteSuccessAction(message) {
    return {
        type: DELETEPOST_SUCCESS,
        message: message
    }
}

export function getNewCommentSuccessAction(message) {
    return {
        type: NEWCOMMENT_SUCCESS,
        message: message
    }
}

export function newComment(id, content, token) {
    return dispatch => {
        dispatch(getPostFetchPendingAction())
        newC(id, content, token)
            .then(
                message => {
                    const action = getNewCommentSuccessAction(message)
                    console.log("getNewCommentSuccess: " + JSON.stringify(action))
                    dispatch(action)
                },
                error => {
                    dispatch(getPostFetchErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getPostFetchErrorAction(error))
            })
    }
}

function newC(id, content, token) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            content: content
        })
    }
    console.log("PostForumAction RequestOptions: " + JSON.stringify(requestOptions))
    return fetch('https://localhost:8080/post/' + id + '/comments', requestOptions)
        .then(handlePostResponse)
        .then(message => {
            console.log("PostForumAction: " + JSON.stringify(message))
            return message
        })
}

export function deletePost(id, token) {
    return dispatch => {
        dispatch(getPostFetchPendingAction())
        deleteP(id, token)
            .then(
                message => {
                    const action = getPostDeleteSuccessAction(message)
                    console.log("getPostDeleteSuccess: " + JSON.stringify(action))
                    dispatch(action)
                },
                error => {
                    dispatch(getPostFetchErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getPostFetchErrorAction(error))
            })
    }
}

function deleteP(id, token) {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }
    console.log("PostForumAction RequestOptions: " + JSON.stringify(requestOptions))
    return fetch('https://localhost:8080/post/' + id, requestOptions)
        .then(handlePostResponse)
        .then(message => {
            console.log("PostForumAction: " + JSON.stringify(message))
            return message
        })
}

export function refreshPost(id) {
    return dispatch => {
        dispatch(getPostFetchPendingAction())
        refresh(id)
            .then(
                post => {
                    const action = getPostRefreshSuccessAction(post)
                    console.log("getPostRefreshSuccess: " + JSON.stringify(action))
                    dispatch(action)
                },
                error => {
                    dispatch(getPostFetchErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getPostFetchErrorAction(error))
            })
    }
}

function refresh(id) {

    const requestOptions = {
        method: 'GET',
    }
    console.log("PostForumAction RequestOptions: " + JSON.stringify(requestOptions))
    return fetch('https://localhost:8080/post/' + id, requestOptions)
        .then(handleRefreshResponse)
        .then(post => {
            console.log("PostForumAction: " + JSON.stringify(post))
            return post
        })
}

function handleRefreshResponse(response) {
    console.log(response)
    return response.text().then(text => {

        const data = text && JSON.parse(text)
  
        if (!response.ok) {
            if(response.status === 401) {
                console.log("Response not okay")
            }
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        else {
            let post = data
            console.log(JSON.stringify(post))
            return post
        }
    })
}

export function registerPost(title, content, tags, headhunt, author, token) {
    return dispatch => {
        dispatch(getPostFetchPendingAction())
        newPost(title, content, tags, headhunt, author, token)
            .then(
                message => {
                    const action = getPostPostSuccessAction(message)
                    console.log("getPostPostSuccess: " + JSON.stringify(action))
                    dispatch(action)
                },
                error => {
                    dispatch(getPostFetchErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getPostFetchErrorAction(error))
            })
    }
}

function newPost(title, content, tags, headhunt, author, token) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            titel: title,
            content: content,
            tag: tags,
            headhunt: headhunt,
            author: author
        })
    }
    console.log("PostForumAction RequestOptions: " + JSON.stringify(requestOptions))
    return fetch('https://localhost:8080/post/register', requestOptions)
        .then(handlePostResponse)
        .then(message => {
            console.log("PostForumAction: " + JSON.stringify(message))
            return message
        })
}

function handlePostResponse(response) {
    console.log(response)
    return response.text().then(text => {

        const data = text && JSON.parse(text)
  
        if (!response.ok) {
            if(response.status === 401) {
                console.log("Response not okay")
            }
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


export function getAllPosts() {
    return dispatch => {
        dispatch(getPostFetchPendingAction())
        fetchAllPosts()
            .then(
                posts => {
                    const action = getPostFetchSuccessAction(posts)
                    console.log("getPostFetchSuccess: " + JSON.stringify(action))
                    dispatch(action)
                },
                error => {
                    dispatch(getPostFetchErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getPostFetchErrorAction(error))
            })
    }
}

function fetchAllPosts() {

    const requestOptions = {
        method: 'GET',
    }
    console.log("PostForumAction RequestOptions: " + requestOptions)
    return fetch('https://localhost:8080/post/all', requestOptions)
        .then(handleFetchResponse)
        .then(posts => {
            console.log("PostForumAction: " + JSON.stringify(posts))
            return posts
        })
}

function handleFetchResponse(response) {
    console.log(response)
    return response.text().then(text => {

        const data = text && JSON.parse(text)
  
        if (!response.ok) {
            if(response.status === 401) {
                console.log("Response not okay")
            }
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        else {
            let posts = data
            console.log(JSON.stringify(data))
            return posts
        }
    })
}
