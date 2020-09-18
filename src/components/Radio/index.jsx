import React from 'react'
import './Radio.sass'

const Radio = ({ options, name, onChange, selection }) => {

  const handleChange = (value) => {
    onChange({
      target: { name, value  }
    })
  }
  return (
    <div className="dash-radio">
      {
        options.map((option, index) => {
          return <div key={index} className="dash-radio__option">
            <input 
              type="radio"
              name={name}
              id={option.value}
              value={option.value}
              checked={ selection && option.value === selection.value }
              onChange={() => handleChange(option)}
            />
            <label
              htmlFor={option.value}
            >
              { option.label }
            </label>
          </div>
        })
      }
    </div>
  )
}

export default Radio