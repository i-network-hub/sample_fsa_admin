import React, { Component } from 'react';
import { Route, withRouter } from 'react-router'
import { auth } from 'api/firebase'
import { AuthContext } from 'context/AuthContext'
import 'assets/sass/main.sass'


import Sidebar from './components/Sidebar'
import Appbar from './components/Appbar'

import Login from './views/Login/Login'
import Dashboard from './views/Dashboard'
import Documents from './views/Documents'
import Tags from './views/Tags'
import Form from './views/Form'
import Profile from './views/Profile'
import Test from './views/Test'

class App extends Component {
  static contextType = AuthContext
  
  state = { isSIgnedIn: false }

  componentDidMount() {
    const [authState, authDispatch ] = this.context
    const { history } = this.props
    const { pathname } = this.props.location

    auth.onAuthStateChanged(user => {
      if(user) {
        authDispatch({ type: 'SIGN_IN' })
        if(!pathname.includes('/profile/')) {
          history.push('/documents')
        }
      } else {
        history.push('/login')
      }
    })
  }

  render() {
    const [{isSignedIn}, authDispatch] = this.context
    return isSignedIn ? 
      (
        <div className="dash-app">
          <Appbar />
          <Sidebar />
          <div className="dash-content" >
            <Route exact path="/" component={Dashboard}/> 
            <Route exact path="/form/:type"component={Form}/> 
            <Route exact path="/documents" component={Documents}/>
            <Route exact path="/profile/:username" component={Profile} /> 
            <Route exact path="/tags" component={Tags}/>
            <Route exact path="/test" component={Test}/> 
          </div>
        </div>
      ) :
      ( <Route exact path="/login" component={Login} /> )
  }
  
}

export default withRouter(App)
