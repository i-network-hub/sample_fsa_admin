import React from 'react'
import Animate from 'components/Animations/Animate'

import './Sidereveal.sass'

const Sidereveal = ({ children, open, onClose }) => {
  return (
    <Animate show={open} animation={`${open ? 'fadeIn' : 'fadeOut'} 0.5s`} >
      <div className="dash-sidereveal" onClick={onClose}>
        <Animate show={open} animation={`${open ? 'slideInFromLeft' : 'slideOutToLeft'} 0.5s`}>
          <div className="dash-sidereveal__inner" onClick={(e) => e.stopPropagation() }>
            { children }
          </div>
        </Animate>
      </div>
    </Animate>
  )
}

export default Sidereveal