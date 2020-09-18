import React from 'react'
import './Tag.sass'

const Tag = ({ name, color }) => {
  return (
    <div className="dash-tag" style={{ color, backgroundColor: `${color}26`}}>
      <i className="dash-tag__dot" style={{backgroundColor: color }}></i>
      { name }
    </div>
  )
}

export default Tag