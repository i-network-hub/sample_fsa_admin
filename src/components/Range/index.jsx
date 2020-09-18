//TODO: Add support for converting input string to integer value and decimal value
import React from 'react'
import './Range.sass'

const Range = ({ fields, label, values, onChange, name }) => {

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
    <div className="dash-range">
      <div className="dash-range__from">
        <span>{ label.A }</span>
        <input type="text" name={fields.A} values={values[fields['A']]} onChange={handleChange}/>
      </div>
      <div className="dash-range__to">
        <span>{ label.B }</span>
        <input type="text" name={fields.B} values={values[fields['B']]} onChange={handleChange}/>
      </div>
    </div>
  )
}

export default Range