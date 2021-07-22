import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from'../../layout/img/Logo.svg'
import chatIcon from'../../layout/img/icons/Chat.svg'
import dashboardIcon from'../../layout/img/icons/Dashboard.svg'
import discussionsIcon from'../../layout/img/icons/Discussions.svg'
import emailIcon from'../../layout/img/icons/Email.svg'
import headhuntsIcon from'../../layout/img/icons/Headhunts.svg'
import profileIcon from'../../layout/img/icons/Profile.svg'
import settingsIcon from'../../layout/img/icons/Settings.svg'
import PlaceholderPic from'../../layout/img/PlaceholderProfile.svg' 
import MediaQuery from 'react-responsive'
import styles from './sidebar.module.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import * as authenticationActions from '../../actions/AuthenticationActions'
import * as sidebarActions from '../../actions/SidebarActions'
import * as userInfoActions from '../../actions/UserInformationAction'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return state
}

let SidebarWrapper = null
let logoutBtn = null

class SideBar extends Component {

    constructor(props){
        super(props)
        this.showSidebar = this.showSidebar.bind(this)
        this.hideSidebar = this.hideSidebar.bind(this)
        this.userInfo = this.props.userInfo
        this.logout = this.logout.bind(this)
    }

    showSidebar(e) {
        // this.setState({show: true})
        if(this.props.showSidebar === true) {
           this.hideSidebar()
        } else {
            const {showSidebarAction} = this.props
            showSidebarAction()
        }
    }

    hideSidebar(e) {
        const {hideSidebarAction} = this.props
        hideSidebarAction()
    }

    logout() {
        console.log('start logout')
        const {logoutAction} = this.props
        logoutAction()
    }

    createLogoutBtn() {
        logoutBtn = <Button className={styles.logoutBtn} onClick={this.logout}>Logout</Button>
    }

    sideBarWrapper (userInfo) { 
        console.log('check for SidebarWrapper ' + JSON.stringify(userInfo))
        SidebarWrapper = 
            <div className={styles.sidenavWrapper}>
            <div className={styles.sideNav}>
                <img src={logo} className={styles.sidebarLogo} alt="logo"></img>
                <div className={styles.flexUserNav}>
                    {userInfo.user_profilepic ? <img src={userInfo.profilepic} className={styles.profilePic} alt="" ></img> : <img src={PlaceholderPic} className={styles.profilePic} alt="" ></img>}
                    <div className={styles.userData}>
                        <p className={styles.profileUsername}>{userInfo.user_username}</p>
                        <p className={styles.profileEmail}>{userInfo.user_email}</p>
                    </div>
                </div>
                <div className={styles.clearfix}></div>
                <ul className={styles.nav}>
                        <li className={styles.navItem}>
                            <Link to='/' className={styles.a} onClick={this.hideSidebar}>
                                <img src={dashboardIcon} alt="dashboardIcon"/>
                                Dashboard
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to='/tobeimplemented' className={styles.a} onClick={this.hideSidebar}>
                                <img src={discussionsIcon} alt="discussionIcon"/>
                                Discussions
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to='/tobeimplemented' className={styles.a} onClick={this.hideSidebar}>
                                <img src={emailIcon} alt="emailIcon"/>
                                Email
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to='/tobeimplemented' className={styles.a} onClick={this.hideSidebar}>
                                <img src={profileIcon} alt="profileIcon"/>
                                Profile
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to='/tobeimplemented' className={styles.a} onClick={this.hideSidebar}>
                                <img src={chatIcon} alt="chatIcon"/>
                                Chat
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to='/tobeimplemented' className={styles.a} onClick={this.hideSidebar}>
                                <img src={headhuntsIcon} alt="headhuntsIcon"/>
                                Headhunts
                            </Link>
                        </li>
                        {userInfo.user_isAdministrator ? 
                        <li className={styles.navItem}>
                            <Link to='/usermanagement' className={styles.a} onClick={this.hideSidebar}>
                                <img src={headhuntsIcon} alt="UserManagementIcon"/>
                                Usermanagement
                            </Link>
                        </li> : null}
                        <li className={styles.navItem}>
                            <a href="#logo" className={styles.a}>
                                <img src={settingsIcon} alt="settingsIcon"/>    
                                Settings
                            </a>
                        </li>
                        
                </ul>
            </div>
        </div>
    }
    
    render() {

        const user = this.props.user
        const userInfo = this.props.userInfo

        var showSidebar = this.props.showSidebar
        if(showSidebar === undefined){
            showSidebar = false
        }

        if(userInfo) {
            this.sideBarWrapper(userInfo)
        } else {
            this.SidebarWrapper = null
        }

        if(user) {
            this.createLogoutBtn()
        }

        return (
            <div>
                {logoutBtn}
                <div className={styles.sideBartrggr} onClick={this.showSidebar}>
                    <div className={styles.bar1}></div>
                    <div className={styles.bar2}></div>
                    <div className={styles.bar3}></div>
                </div>

                {showSidebar ? SidebarWrapper : null}
                <MediaQuery minWidth={769}>
                    {SidebarWrapper}
                </MediaQuery>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showSidebarAction: sidebarActions.getShowSidebarAction,
    hideSidebarAction: sidebarActions.getHideSidebarAction,
    userInfoAction: userInfoActions.getUserInfo,
    logoutAction: authenticationActions.logout
},dispatch)

const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(SideBar)

export default ConnectedSidebar