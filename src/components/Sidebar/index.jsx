import React from 'react'
import { logout } from 'api/firebase' 
import { getClasses } from 'helpers'
import { withRouter } from 'react-router'
import { AuthContextValue } from 'context/AuthContext'
import Logo from 'assets/icons/logo.png'
import './Sidebar.sass'

const Sidebar = ({ history }) => {
  
  const { pathname } = history.location
  const [state, dispatch] = AuthContextValue()
  const handleRoute = (route) => {
    history.replace(`/${route}`)
  }

  const handleLogout = () => {
    logout()
    dispatch({ type: 'SIGN_OUT' })
  }

  return (


    <div className="dash-sidebar">
      <div className="dash-sidebar__logo">
        <img src={Logo} alt="starcast"/>
      </div>
      <div className="dash-sidebar__menu">
        <div className={getClasses({ 'dash-sidebar__item': true, 'selected': pathname === '/' })} onClick={() => handleRoute('')}>
          <i className="icofont-layout"></i>
        </div>
        <div className={getClasses({ 'dash-sidebar__item': true, 'selected': pathname === '/documents' })} onClick={() => handleRoute('documents')}>
          <i className="icofont-ui-folder"></i>
        </div>
        <div className={getClasses({ 'dash-sidebar__item': true, 'selected': pathname === '/tags' })} onClick={() => handleRoute('tags')}>
          <i className="icofont-tag"></i>
        </div>

        <div className="dash-sidebar__item logout" onClick={handleLogout} >
          <i className="icofont-ui-power"></i>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Sidebar)