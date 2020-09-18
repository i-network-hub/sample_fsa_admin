import React from 'react'
import './Card.sass'

import { getClasses } from 'helpers'

const Card = ({ rounded, children, bordered, hover, medium, className, onClick }) => {

  const classes = {
    'dash-card': true,
    'dash-card--rounded': rounded,
    'dash-card--bordered': bordered,
    'dash-card__medium': medium,
    'dash-card--hover': hover
  }
  return (
    <div className={`${getClasses(classes)} ${className}`} onClick={onClick}>
      { children }
    </div>
  )
}

const CardIcon = ({ rounded, name }) => {
  return (
    <div className="dash-card__icon">
      <i className={name}></i>
    </div>
  )
}

const CardHeading = ({ children }) => {
  return (
    <div className="dash-card__heading">
      { children }
    </div>
  )
}

const CardText = ({ children }) => {
  return (
    <span className="dash-card__text">
      { children }
    </span>
  )
}

export {
  Card,
  CardIcon,
  CardHeading,
  CardText
}