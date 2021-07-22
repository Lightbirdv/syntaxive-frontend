import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import '../../layout/css/modal.css'
import {connect} from 'react-redux';

// images
import brand from '../../layout/img/Brand.svg'
import logo from '../../layout/img/Logo.svg'
import facebookModal from '../../layout/img/Facebook-modal.svg'
import googleModal from '../../layout/img/Google-modal.svg'

import * as authenticationActions from '../../actions/AuthenticationActions'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    return state
}

class UserSessionWidget extends Component {
    
    constructor(props){
        super(props)
        this.state = { 
            username: '',
            password: ''
        }
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    showModal(e) {
        // this.setState({show: true})
        const {showLoginDialogAction} = this.props
        showLoginDialogAction()
    }

    hideModal(e) {
        // this.setState({show: false})
        const {hideLoginDialogAction} = this.props
        hideLoginDialogAction()
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()
        const {username, password} = this.state
        const {authenticateUserAction} = this.props
        authenticateUserAction(username, password)
    }

    render() {

        var showDialog = this.props.showLoginDialog
        if(showDialog === undefined){
            showDialog = false
        }

        return (
            <div>
                <button id="loginButton" onClick={this.showModal}>Log In</button>
                <Modal dialogClassName="my-modal" show={showDialog} onHide={this.hideModal} >
                    <Modal.Body>
                        <button id="xModalButton" onClick={this.hideModal}><span aria-hidden="true">×</span></button>
                        <img src={brand} id="brand-modal" alt="brandlogin"/>
                        <div class="modal-form-wrapper">
                            <img src={logo} id="logo-modal" alt="logologin"/>
                            <form>
                                <input type="text" id="emailbox-modal" placeholder="Email address" name='username' onChange={this.handleChange} />
                                <input type="password" id="password-modal" placeholder="Password" name='password' onChange={this.handleChange}/>
                                <button id="modalloginbtn" onClick={this.handleSubmit}>LOG IN</button>
                            </form>
                            <a href="#header" id="forgot-modal">Forgot Password?</a>
                            <button id="continue-facebook"><img src={facebookModal} alt=""/>CONTINUE WITH FACEBOOK</button>
                            <button id="continue-google"><img src={googleModal} alt=""/>CONTINUE WITH GOOGLE</button>
                            <p id="no-account-modal">DON'T HAVE AN ACCOUNT? <a href="#header">SIGN UP</a></p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
      )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser
},dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget;