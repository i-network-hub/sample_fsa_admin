import React from 'react'
import ReactSelect from 'react-select'
import './Select.sass'



const Select = ({ options, onChange, selections, isMulti, placeholder }) => {

  const styles = {
    container: (provided, state) => ({
      ...provided,
      backgroundColor: '#3D4144',
      borderRadius: '8px'
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#3D4144',
      padding: '8px',
      border: 'none',
      borderRadius: '8px'
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#939798' : '#3D4144',
    }),
    
    multiValue: (provided, state) => ({
      ...provided,
      fontSize: '12px',
      backgroundColor: '#118AF7',
      color: '#ffffff'
    }),

    placeholder: (provided, state) => ({
      ...provided,
      color: '#939798',
      fontWeight: '500'
    }),
  
    input: (provided, state) => ({
      ...provided,
      color: '#ffffff',
      fontWeight: '500'
    }),
  
    singleValue: (provided, state) => ({
      ...provided,
      color: '#ffffff'
    }),

    multiValueLabel: (provided, state) => ({
      ...provided,
      color: '#ffffff'
    }),
    
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#3D4144',
      borderRadius: '8px',
      fontSize: '14px',
      overflow: 'hidden'
    }),
  }

  return (
    <div className="dash-select">
      <ReactSelect
        placeholder={placeholder}
        styles={styles}
        isMulti={isMulti}
        value={selections}
        onChange={onChange}
        options={options}
      />
    </div>
  )
}

export default Select
