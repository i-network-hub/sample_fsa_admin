import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import './Appbar.sass'

const Appbar = ({ history }) => {
  return (
    <div className="dash-appbar">
      {
        history.location.pathname === '/documents' &&
        <div className="dash-appbar__menu">
          <div className="dash-appbar__item selected">Profiles</div>
          <div className="dash-appbar__item">Resources</div>
        </div>
      }
    </div>
  )
}

export default withRouter(Appbar)