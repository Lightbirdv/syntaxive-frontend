import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userManagementActions from '../../actions/UserManagementAction'
import styles from './usermanagement.module.css'
import Logo from '../../layout/img/Logo.svg'

const mapStateToProps = state => {
    return state
}

let userItem = null

class UserManagement extends Component {

    constructor(props){
        super(props)
        this.handleLoad = this.handleLoad.bind(this)
        this.deleteUserFunction = this.deleteUserFunction.bind(this)
    }

    componentDidMount() {
        this.handleLoad()
    }
     
    handleLoad() {
        const {fetchUserAction} = this.props
        const user = this.props.user
        if (user) {
            fetchUserAction(user.token)
        } else {
            userItem = null
        }
        
    }

    deleteUserFunction(id) {
        console.log("in deleteUserFunction")
        const {deleteUserAction} = this.props
        const user = this.props.user
        if (user) {
            deleteUserAction(user.token, id)
        } else {
            console.log("UserManagement deleteUser func: What happened?")
        }
    }

    createUserItems() {
        var users = this.props.users
            userItem = users.map((user) => {
                let userid = user._id
                return <div className = {styles.userCardItem}>
                    <p>Username: {user.username}</p>
                    <p>User_id: {user._id}</p>
                    <p className={styles.administratorText}>isAdministrator: {user.isAdministrator ? <p className={styles.administratorText}>true</p> : <p className={styles.administratorText}>false</p>}</p>
                    <button className={styles.deleteUserButton} onClick={ () => this.deleteUserFunction(userid)}>Delete User</button>
                    </div>
            })
    }

    render() {

        if(typeof this.props.users === 'undefined') {
            userItem = null
        } else {
            this.createUserItems()
        }

        return (
            <div className={styles.userManagement}>
                <img src={Logo} className={styles.Logo} alt=""></img>
                {userItem}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUserAction: userManagementActions.getAllUsers,
    deleteUserAction: userManagementActions.deleteUserAction
},dispatch)

const ConnectedUserManagement = connect(mapStateToProps, mapDispatchToProps)(UserManagement)

export default ConnectedUserManagement