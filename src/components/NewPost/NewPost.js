import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './newpost.module.css'
import { Form, Button } from 'react-bootstrap';
import Logo from '../../layout/img/Logo.svg'
import * as PostForumActions from '../../actions/PostForumAction' 
import { Link,withRouter } from 'react-router-dom'

const mapStateToProps = state => {
    return state
}

class NewPost extends Component {

    constructor(props){
        super(props)
        this.state = { 
            title: '',
            content: '',
            tags: '',
            headhunt: '',
            checked: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({ [name]: value })
        console.log(this.state)
        if(this.state.checked === 'on') {
            this.setState({ headhunt: 'true' })
            this.setState({ checked: ' ' })
        } else {
            this.setState({ headhunt: 'false' })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const {title, content, tags, headhunt} = this.state
        const {postNewPostAction} = this.props
        const user = this.props.user
        console.log("HandleSubmit NewPost: title: " + title + " content: " + content + " tags: " + tags + " headhunt: " + headhunt + " author: " + user.username)
        postNewPostAction(title,content, tags, headhunt, user.username, user.token)
        this.props.history.push('/')
    }

    render() {
       
        return (
            <div className={styles.newPost}>
                <img src={Logo} className={styles.Logo} alt=""></img>
                <div className={styles.formCard}>
                    <h1 className={styles.postHeadline}>Let's create a new post!</h1>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Awesome new post" name='title' onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={5} name='content' onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>tags</Form.Label>
                            <Form.Control type="text" placeholder="python,java ..." name='tags' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Headhunt" name='checked' onChange={this.handleChange}/>
                        </Form.Group>
                        <Link to='/'>
                            <Button className={styles.postBtn} variant="primary"    type="submit" onClick={this.handleSubmit}>
                                Create post
                            </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    postNewPostAction: PostForumActions.registerPost
},dispatch)

const ConnectedNewPost = connect(mapStateToProps, mapDispatchToProps)(NewPost)

export default withRouter(ConnectedNewPost)