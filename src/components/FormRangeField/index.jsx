import React from 'react'
import './FormRangeField.sass'

const FormRangeField = ({ title, fields, label, values, onChange, name }) => {
  const handleChange = (event) => {
    onChange({
      target: {
        name,
        value: {
          ...values,
          [event.target.name]: event.target.value
        }
      }
    })
  }

  return (
    <div className="dash-form-range-field">
      <label>{ title }</label>
      <div className="dash-form-range-field__inner">
        <div className="dash-form-range-field__from">
          <span>{label.A}</span>
          <input type="text" name={fields.A} value={values[fields['A']]} onChange={handleChange} />
        </div>
        <div className="dash-form-range-field__to">
          <span>{label.B}</span>
          <input type="text" name={fields.B} value={values[fields['B']]} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

export default FormRangeField