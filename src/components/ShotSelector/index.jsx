import React, { useState, useEffect } from 'react'
import Cropper from 'react-image-crop'
import { cropImage } from 'helpers'
import 'react-image-crop/dist/ReactCrop.css'

import Modal from 'components/Modal'

import './ShotSelector.sass'

const initialCrop = {
  width: 100,
  height: 100,
  x: 50,
  y: 50,
  aspect: 1
}


const ShotSelector = ({ onChange, name }) => {
  const [image, setImage] = useState('')
  const [imageRef, setImageRef] = useState('')
  const [editing, setEditing] = useState(false)
  const [crop, setCrop] = useState(initialCrop)

  const loadImage = (event) => {
    const Reader = new FileReader()
    const file = event.target.files[0]
    Reader.onloadend = () => {
      setImage(Reader.result)
      setEditing(true)
    }
    Reader.readAsDataURL(file)
  }


  const handleCrop = () => {
    const croppedImage = cropImage(crop, imageRef)
     onChange({
      croppedImage,
      crop,
      image,
      name
    })
    reset()
  }

  const reset = () => {
    setEditing(false)
    setImageRef('')
    setCrop(initialCrop)
  }


  useEffect(() => {
    if (image && !editing) {
      setEditing(true)
    }
  }, [image])


  return (
    <div className="dash-shot-selector">
      {
        editing ?
        <Modal
          onDone={handleCrop}
          onCancel={reset}
        >
          <div className='cropper-wrapper flex flex-row justify-center'>
            <Cropper
              src={image}
              crop={crop}
              onImageLoaded={(href) => setImageRef(href)}
              onChange={(crop) => setCrop(crop)}
            />
          </div>
        </Modal> :
        <div className="dash-shot-selector__input">
          <i className="icofont-plus"></i>
          <input type="file" acept="image/*" onChange={loadImage}/>
        </div>
      }
    </div>
  )
}

export default ShotSelector
