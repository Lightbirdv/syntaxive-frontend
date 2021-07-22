import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as postForumActions from '../../actions/PostForumAction'
import * as userInfoActions from '../../actions/UserInformationAction'
import { bindActionCreators } from 'redux';
import styles from './privatepage.module.css'
import Logo from '../../layout/img/Logo.svg'
import PlaceholderPic from'../../layout/img/PlaceholderProfile.svg' 
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
    return state
}

let postItem = null

class PrivatePage extends Component {

    constructor(props){
        super(props)
        this.state = { 
            posts: ''
        }
        this.handleLoad = this.handleLoad.bind(this)
    }

    componentDidMount() {
        this.handleLoad()
    }
     
    handleLoad() {
        const {fetchPostAction,userInfoAction} = this.props
        const user = this.props.user
        fetchPostAction();

        if(user) {
            userInfoAction(user.username,user.token)
        }
    }

    createPostItems() {
        var posts = this.props.posts
            console.log(posts[0].tag.split(","))
            postItem = posts.slice().reverse().map(function(post) {
                let tags
                let postlink = '/post/' + post._id
                const newTo = {
                    pathname: postlink,
                    post: post
                }
                tags = post.tag.split(",").map(function(tag) {
                    return <p className = {styles.tag}>{tag}</p>
                })
                return <div className = {styles.blogItem}>
                        <div className = {styles.blogItemContent}>
                            <Link to={newTo}>
                                <h1>{post.titel}</h1>
                            </Link>
                            <p>{post.content}</p>
                            {tags}
                        </div>
                    </div>
            })
    }

    render() {
        
        if(typeof this.props.posts === 'undefined') {
            postItem = null
        } else {
            this.createPostItems()
        }
        if(typeof this.props.userInfo === 'undefined') {
            
        } else {
            console.log('PrivatePage userInfo check: ' + JSON.stringify(this.props.userInfo))
        }
        return (
            <div className={styles.privatePage}>
                <img src={Logo} className={styles.privateLogo} alt=""></img>
                <div className={styles.picSearchBar}>
                    <MediaQuery maxWidth={768}>
                        <img src={PlaceholderPic} className={styles.privateProfilePic} alt="" ></img>
                    </MediaQuery>
                    <input type="text" className={styles.searchBar} placeholder="Search for topic"></input>
                </div>
                <h1 className={styles.tq}>Top Questions</h1>
                <Link to='/newPost'>
                    <button className={styles.newPostBtn}>Ask Question</button>
                </Link>
                <div className={styles.clearfix}></div>
                {postItem}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPostAction: postForumActions.getAllPosts,
    userInfoAction: userInfoActions.getUserInfo
},dispatch)

const ConnectedPrivatePage = connect(mapStateToProps, mapDispatchToProps)(PrivatePage)

export default ConnectedPrivatePage