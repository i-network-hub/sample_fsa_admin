import React from 'react'
import { generateId } from 'helpers'
import './Checkbox.sass'

const Checkbox = ({ checked, onChange, name, label }) => {
  const ID = generateId()

  const handleChange = () => {
    onChange({
      target: {
        name,
        value: !checked
      }
    })
  }

  return (
    <div className="dash-checkbox">
      <input id={ID} type="checkbox" checked={checked} onChange={handleChange}/>
      <label htmlFor={ID}>{ label }</label>
    </div>
  ) 
}

export default Checkbox