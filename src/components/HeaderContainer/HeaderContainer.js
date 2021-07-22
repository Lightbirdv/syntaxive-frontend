import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../layout/css/styles-monitor.css'
import '../../layout/css/styles-tablet.css'
import '../../layout/css/styles-phone.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MediaQuery from 'react-responsive'
import UserSessionWidget from '../UserSessionWidget/UserSessionWidget'
import RegistrationWidget from '../RegistrationWidget/RegistrationWidget'
import * as navigationActions from '../../actions/NavigationActions'
import styles from './headercontainer.module.css'
// Images
import logo from '../../layout/img/Logo.svg'
import headerimg from '../../layout/img/Headerimg.svg'

const mapStateToProps = state => {
    return state
}

class headerContainer extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.showNavigation = this.showNavigation.bind(this)
        this.hideNavigation = this.hideNavigation.bind(this)
    }

    showNavigation(e) {
        // this.setState({show: true})
        if(this.props.showNavigation === true) {
           this.hideNavigation()
        } else {
            const {showNavigationAction} = this.props
            showNavigationAction()
        }
    }

    hideNavigation(e) {
        const {hideNavigationAction} = this.props
        hideNavigationAction()
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({ [name]: value })
        console.log(this.state)
    }

    MobileTabletNavigation() {
        return <div className={styles.NavContainer}>
            <img src={logo} className={styles.Logo} alt="default" />
            <nav className={styles.NavHeader}>
                <ul className={styles.Nav}>
                    <li className={styles.NavItem}>
                        <a href="#header" id="selected">Home</a>
                    </li>
                    <li className={styles.NavItem}>
                        <a href="#header">About us</a>
                    </li>
                    <li className={styles.NavItem}>
                        <a href="#header">Contact</a>
                    </li>
                    <li className={styles.NavItem}>
                        <a href="#header" id="newsletter">Newsletter</a>
                    </li>
                </ul>
            </nav>
        </div>
    }

    render() {

        var showNavigation = this.props.showNavigation
        if(showNavigation === undefined){
            showNavigation = false
        }
        <MediaQuery minWidth={769}>
            showNavigation = false
        </MediaQuery>
        return (
            <div>
                <div class="header-container">
                    <a href="#navigation" class="nav-trigger" onClick={this.showNavigation}>
                        Menu <span></span>
                    </a>
                    <div class="page-wrapper">
                        <div class="nav-wrapper" id="nav-wrapper">
                            <div class="mobtabnav">
                                <img src={logo} id="logo" alt="default" />
                                <UserSessionWidget/>
                            </div>
                            {showNavigation ? this.MobileTabletNavigation() : null}
                            <div class="nav-container" id="nav-container">
                                <img src={logo} id="logo" alt="default" />
                                <nav class="nav-header" id="navigation">
                                    <ul class="nav">
                                        <li class="nav-item">
                                            <a href="#header" id="selected">Home</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#header">About us</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#header">Contact</a>
                                        </li>
                                        <li class="nav-item">
                                            <UserSessionWidget/>
                                        </li>
                                        <li class="nav-item">
                                            <RegistrationWidget/>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#header" id="newsletter">Newsletter</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="header">
                        <img src={headerimg} alt="header"/>
                    </div>
                    <div class="page-wrapper">
                        <div class="header-content">
                            <h1>Level up your coding now!</h1>
                            <p>syntaxive the website for Programmers, programming Freelancers and people 
                                who enjoy to participate in  discussions 
                                and compete on coding headhunts.</p>
                            <input type="text" id="emailbox" placeholder="Enter your E-mail" onChange={this.handleChange} name="email"/>
                            <div className={styles.headerRegBtn}>
                                <RegistrationWidget email={this.state.email}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showNavigationAction: navigationActions.getShowNavigationAction,
    hideNavigationAction: navigationActions.getHideNavigationAction,
},dispatch)

const ConnectedHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(headerContainer)

export default ConnectedHeaderContainer;