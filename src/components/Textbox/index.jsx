import React from 'react'
import { getClasses } from 'helpers'
import './Textbox.sass'

const Textbox = ({ placeholder, error, type, fluid, className, name, value, onChange }) => {

  const classes = {
    'dash-textbox': true,
    'dash-textbox--fluid': fluid,
    'dash-textbox--error': error
  }

  return (
    <input 
      className={`${className} ${getClasses(classes)}`}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default Textbox