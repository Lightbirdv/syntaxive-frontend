import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PostForumActions from '../../actions/PostForumAction'
import { bindActionCreators } from 'redux'
import { Form, Button } from 'react-bootstrap'
import SideBar from "../SideBar/SideBar"
import styles from './postdetails.module.css'
import Logo from '../../layout/img/Logo.svg'

const mapStateToProps = state => {
    return state
}

let post = null
let user = null
let postFormCard = null
let commentFormCard = null
let commentslist = null
let tags = null
let newCommentButton = null
let deletePostButton = null
let newCommentForm = null

class PostDetails extends Component {

    constructor(props){
        super(props)
        this.state = { 
            newComment: '',
            showForm: false
        }
        this.handleLoad = this.handleLoad.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    componentDidMount() {
        this.handleLoad()
    }
     
    handleLoad() {
        const {refreshPostAction} = this.props
        const id = this.props.match.params.id
        refreshPostAction(id);
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault()
        const {newComment} = this.state
        const {postNewCommentAction} = this.props
        if(newComment === '') {

        } else {
            postNewCommentAction(post._id, newComment, user.token)
            window.location.reload(false)
        }
    }

    createformCard(post) {
        let diff = "posted on: " + new Date(post.postDate).toString().substring(0,24)
        tags = post.tag.split(",").map(function(tag) {
            return <p className = {styles.tag}>{tag}</p>
        })
        postFormCard = 
        <div className={styles.postFormCard}>
            <div className={styles.postFormCardContent}>
                <h1 className={styles.hTitle}>{post.titel}</h1>
                <p className={styles.pDate}>{diff}</p>
                <p className={styles.pContent}>{post.content}</p>
                {tags}
                <p className={styles.pAuthor}>Asked from: {post.author}</p>
            </div>
        </div>
    }

    createCommentCard(post) {
        commentslist = post.comments.map(function(comment) {
            let date = "posted on: " + new Date(comment.date).toString().substring(0,24)
            return <div className={styles.comment}> 
                <p className={styles.pCommentContent}>{comment.content}</p>
                <p className={styles.pCommentAuthor}>by: {comment.author}</p>
                <p className={styles.pCommentDate}>{date}</p>
            </div>
        })

        commentFormCard = 
        <div className={styles.commentField}>
            <div className={styles.commentFieldContent}>
                <p className={styles.pCommentHeader}>Comments: </p>
                {commentslist}
            </div>
        </div>
    }

    deletePost() {
        const {deletePostAction} = this.props
        console.log('deleting Post: ')
        deletePostAction(post._id, user.token)
        this.props.history.push('/')
    }

    createDeletePostButton(post) {
        if(user.username === post.author) {
            deletePostButton = <Button className={styles.deletePostBtn} onClick={this.deletePost}>Delete Post</Button>
        }
    }

    createNewCommentButton() {
        newCommentButton = <Button className={styles.newCommentBtn} onClick={this._onButtonClick}>Create Comment</Button>
    }

    _onButtonClick() {
        if(this.state.showForm === false) {
            this.setState({
                showForm: true,
            });
        } else {
            this.setState({
                showForm: false,
            });
        }
    }

    render() {
        post = this.props.post
        user = this.props.user
        if(post) {
            this.createformCard(post)
            if(post.comments.length > 0) {
                this.createCommentCard(post)
            } else {
                commentFormCard = 
                <div className={styles.commentField}>
                    <div className={styles.commentFieldContent}>
                        <p className={styles.pNoComment}> Wow there are no comments yet</p>
                    </div>
                </div>
            }
            if(user) {
                this.createNewCommentButton()
                this.createDeletePostButton(post)
            }    
        }

        newCommentForm = 
        <div className={styles.newCommentForm}>
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} name='newComment' onChange={this.handleChange}/>
                </Form.Group>
                <Button className={styles.postCommentBtn} variant="primary"    type="submit" onClick={this.handleSubmit}>
                    Post Comment
                </Button>
            </Form>
            <Button className={styles.cnclBtn} onClick={this._onButtonClick}>Cancel</Button>
        </div>

        return (
            <div>
                <SideBar/>
                <div className={styles.postDetails}>
                    <img src={Logo} className={styles.Logo} alt=""></img>
                    {postFormCard}
                    {newCommentButton}
                    {deletePostButton}
                    <div className={styles.clearfix}></div>
                    {this.state.showForm ? newCommentForm : null}
                    {commentFormCard}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshPostAction: PostForumActions.refreshPost,
    deletePostAction: PostForumActions.deletePost,
    postNewCommentAction: PostForumActions.newComment
},dispatch)

const ConnectedPostDetails = connect(mapStateToProps, mapDispatchToProps)(PostDetails)

export default ConnectedPostDetails