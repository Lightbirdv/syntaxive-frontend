import * as authenticationActions from '../actions/AuthenticationActions'
import * as sidebarActions from '../actions/SidebarActions'
import * as postForumActions from '../actions/PostForumAction'
import * as userInfoActions from '../actions/UserInformationAction'
import * as navigationActions from '../actions/NavigationActions'
import * as managementActions from '../actions/UserManagementAction'
import * as registrationActions from '../actions/RegistrationActions'

const initialState = {
    user: null,
    posts: null,
    users: null,
    userInfo: null,
    loginPending: false,
    showLoginDialog: false,
    showRegistrationDialog: false,
    showSidebar: false,
    showNavigation: false,
    message: null,
    error: null,
    post: null
}

function rootReducer(state = initialState, action) {
    
    console.log(action.type)

    switch (action.type){
        //SIDEBAR
        case sidebarActions.SHOW_SIDEBAR:
            return {
                ...state,
                showSidebar: true,
                error: null
            }
        case sidebarActions.HIDE_SIDEBAR:
            return {
                ...state,
                showSidebar: false,
                error: null
        }    
        //NAVIGATION
        case navigationActions.SHOW_NAVIGATION:
            return {
                ...state,
                showNavigation: true,
                error: null
            }
        case navigationActions.HIDE_NAVIGATION:
            return {
                ...state,
                showNavigation: false,
                error: null
        }    
        //AUTHENTICATION
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case authenticationActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false,
                user: action.user,
                accessToken: action.accessToken
            }
        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                pending: false,
                error: 'Authentication failed'
            }
        case authenticationActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        //REGISTRATION
        case registrationActions.SHOW_REGISTRATION_DIALOG:
            return {
                ...state,
                showRegistrationDialog: true,
                error: null
            }
        case registrationActions.HIDE_REGISTRATION_DIALOG:
            return {
                ...state,
                showRegistrationDialog: false,
                error: null
            }
        case registrationActions.REGISTRATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case registrationActions.REGISTRATION_SUCCESS:
            return {
                ...state,
                showRegistrationDialog: false,
                pending: false,
                message: action
            }
        case registrationActions.REGISTRATION_ERROR:
            return {
                ...state,
                pending: false,
                error: 'Registration failed'
            }
        //POSTFORUM
        case postForumActions.POSTFETCH_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case postForumActions.POSTFETCH_SUCCESS:
            return {
                ...state,
                pending: false,
                posts: action.posts
            }
        case postForumActions.POSTFETCH_ERROR:
            return {
                ...state,
                pending: false,
                error: 'Fetching Posts failed'
            }
        case postForumActions.REFRESHPOST_SUCCESS:
            return {
                ...state,
                pending: false,
                post: action.post
            }
        case postForumActions.DELETEPOST_SUCCESS:
            return {
                ...state,
                pending: false,
                message: action.message
            }
        case postForumActions.NEWCOMMENT_SUCCESS:
            return {
                ...state,
                pending: false,
                message: action.message
            }
        //USERMANAGEMENT
        case managementActions.USERMANAGEMENT_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case managementActions.USERMANAGEMENT_ERROR:
            return {
                ...state,
                pending: false,
                error: 'Usermanagement failed'
            }
        case managementActions.GETALLUSER_SUCCESS:
            return {
                ...state,
                pending: false,
                users: action.users
            }
        case managementActions.DELETEUSER_SUCCESS:
            return {
                ...state,
                pending: false,
                message: action
            }
        //USERINFO
        case userInfoActions.USERINFO_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case userInfoActions.USERINFO_SUCCESS:
            return {
                ...state,
                pending: false,
                userInfo: {
                    user_id: action.user_id,
                    user_username: action.username,
                    user_email: action.email,
                    user_isAdministrator: action.isAdministrator,
                    user_preference: action.preference
                }
            }
        case userInfoActions.USERINFO_ERROR:
            return {
                ...state,
                pending: false,
                error: 'Fetching User Data failed'    
            }

        default:
            return state
    }
}

export default rootReducer