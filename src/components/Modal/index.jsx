import React from 'react'
import Buttons from 'components/Buttons'

import './Modal.sass'

const Modal = ({ children, onDone, onCancel }) => {
  return (
    <div className="dash-modal flex flex-row items-center justify-center">
      <div className="dash-modal__inner">
        <div className="dash-modal__content">
          { children }
        </div>
        <div className="dash-modal__controls flex flex-row items-center justify-center">
          <button className="secondary" onClick={onCancel}>Cancel</button>
          <button className="primary" onClick={onDone}>Done</button>
        </div>
      </div>
    </div>
  )
}

export default Modal