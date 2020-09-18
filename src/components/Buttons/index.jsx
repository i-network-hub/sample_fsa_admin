import React from 'react'
import { getClasses } from 'helpers'
import './Buttons.sass'
import { ReactComponent as Spinner } from 'assets/icons/spinner.svg'

const Buttons = ({ children, fluid, primary, danger, success, secondary, className, type, loading, onClick, small, medium, large }) => {

  const classes = {
    'dash-buttons': true,
    'dash-buttons--fluid': fluid,
    'dash-buttons--loading': loading,
    'dash-buttons--small': small,
    'dash-buttons--medium': medium,
    'dash-buttons--large': large,
    'dash-buttons--primary': primary,
    'dash-buttons--secondary': secondary,
    'dash-buttons--danger': danger,
    'dash-buttons--success': success,
    'dash-buttons--default': !small && !medium && !large,
  }

  return (
    <div className={`${className} ${getClasses(classes)}`} onClick={onClick}>
      <div className="dash-buttons__spinner flex-row items-center justify-center">
        <Spinner />
      </div>
      <button type={type}>{children}</button>
    </div>
  )
}

export default Buttons