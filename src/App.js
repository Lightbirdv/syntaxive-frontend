import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import HeaderContainer from "./components/HeaderContainer/HeaderContainer"
import PublicPage from "./components/PublicPage/PublicPage"
import PrivatePage from "./components/PrivatePage/PrivatePage"
import SideBar from "./components/SideBar/SideBar"
import NewPost from "./components/NewPost/NewPost"
import PostDetails from "./components/PostDetails/PostDetails"
import ToBeImplemented from "./components/ToBeImplemented/ToBeImplemented"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import UserManagement from './components/UserManagement/UserManagement'
// import PrivateRoute from './services/PrivateRoute'

const mapStateToProps = state => {
  return state
}

class App extends Component {
  
  render() {

    const user = this.props.user
    
    let workspace, usermanagement, postcreation
    console.log("in app: " + user)
    
    if(user) {
      console.log("private")
      workspace = 
      <div>
        <SideBar/>
        <PrivatePage/>
      </div>
    } else {
      console.log("public")
      workspace = 
      <div>
        <HeaderContainer/> 
        <PublicPage/>
      </div>
    }
      usermanagement = 
      <div>
        <SideBar/> 
        <UserManagement />
      </div>

      postcreation = 
      <div>
        <SideBar/>
        <NewPost/>
      </div>

    return (
      <main>
        <Router>
          <Switch>
            <Route exact path="/">
              { workspace } 
            </Route>
            <Route exact path="/usermanagement"> 
              { user ? usermanagement : workspace }
            </Route>
            <Route exact path="/tobeimplemented" component={ToBeImplemented} /> 
            <Route exact path="/newPost">
              { user ? postcreation : workspace }
            </Route>
            <Route path="/post/:id" render={(props) => <PostDetails {...props}/>}>
            </Route>
          </Switch>
        </Router>
      </main>
    );
  }
}

export default connect(mapStateToProps)(App);
