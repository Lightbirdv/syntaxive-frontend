import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './registrationwidget.module.css'
import { Form, Button, Modal } from 'react-bootstrap';
import Logo from '../../layout/img/Logo.svg'
import Brand from '../../layout/img/Brand.svg'
import * as registrationActions from '../../actions/RegistrationActions'

const mapStateToProps = state => {
    return state
}

let defaultEmail = null

class RegistrationWidget extends Component {

    constructor(props, email){
        super(props)
        this.email = email
        this.state = { 
            id: '',
            email: '',
            password: ''
        }
        this.showRegistrationModal = this.showRegistrationModal.bind(this)
        this.hideRegistrationModal = this.hideRegistrationModal.bind(this)
        this.handleRegistrationChange = this.handleRegistrationChange.bind(this)
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this)
    }

    showRegistrationModal(e) {
        if(this.props.email !== 'undefined') {
            this.setState({ email: this.props.email })
            defaultEmail = this.state.email
        }
        const {showRegistrationDialogAction} = this.props
        showRegistrationDialogAction()
    }

    hideRegistrationModal(e) {
        // this.setState({show: false})
        console.log("hide modal")
        const {hideRegistrationDialogAction} = this.props
        hideRegistrationDialogAction()
    }

    handleRegistrationChange(e) {
        const {name, value} = e.target
        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleRegistrationSubmit(e) {
        e.preventDefault()
        const {id, email, password} = this.state
        const {registrationUserAction} = this.props
        console.log(" In Submit: id: " + id + " email: " + email + " password: " + password)
        registrationUserAction(id, email, password)
    }

    render() {

        var showDialog = this.props.showRegistrationDialog
        if(showDialog === undefined){
            showDialog = false
        }

        return (
            <div>
                <button className={styles.regButton} onClick={this.showRegistrationModal}>Sign Up</button>
                <Modal dialogClassName={styles.myModal} show={showDialog} onHide={this.hideRegistrationModal} >
                    <Modal.Body>
                        <button className={styles.xModalButton} onClick={this.hideRegistrationModal}><span aria-hidden="true">×</span></button>
                        <img src={Brand} className={styles.brandModal} alt="brandlogin"/>
                        <div className={styles.modalFormWrapper}>
                            <img src={Logo} className={styles.Logo} alt=""></img>
                            <h1>Join the Syntaxive Community</h1>
                            <Form>
                                <Form.Group controlId="formIdentification">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="id" placeholder="Enter User ID" name='id' onChange={this.handleRegistrationChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    {defaultEmail ? <Form.Control type="email" value={defaultEmail} name='email' onChange={this.handleRegistrationChange}/> : <Form.Control type="email" placeholder="Enter email" name='email' onChange={this.handleRegistrationChange}/>}
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleRegistrationChange}/>
                                </Form.Group>
                                <Button className={styles.signButton} variant="primary" type="submit" onClick={this.handleRegistrationSubmit}>
                                    Sign up
                                </Button>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showRegistrationDialogAction: registrationActions.getShowRegistrationDialogAction,
    hideRegistrationDialogAction: registrationActions.getHideRegistrationDialogAction,
    registrationUserAction: registrationActions.registerUser
},dispatch)

const ConnectedRegistrationWidget = connect(mapStateToProps, mapDispatchToProps)(RegistrationWidget)

export default ConnectedRegistrationWidget