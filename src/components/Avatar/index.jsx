import React from 'react'
import { getClasses } from 'helpers'

import './Avatar.sass'

const Avatar = ({ src, rounded }) => {

  const classes = {
    'dash-avatar': true,
    'dash-avatar--rounded': rounded
  }

  return (
    <div className={getClasses(classes)}>
      <img src={src} alt="avatar"/>
    </div>
  )
}

export default Avatar