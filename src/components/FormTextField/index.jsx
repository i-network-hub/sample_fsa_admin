import React, { useEffect } from 'react'
import './FormTextField.sass'

const FormTextField = ({ name, value, onChange, maxlength, fluid, label, type, placeholder}) => {

  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  return (
    <div className="dash-form-text-field">
      <label>{ label }</label>
      {
        type === 'textarea' ?
        <textarea 
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxlength || 500}
        /> :
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      }
    </div>
  )
}

export default FormTextField