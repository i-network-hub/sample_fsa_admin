import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import './TagCreator.sass'

import Tag from 'components/Tag'
import FormTextField from 'components/FormTextField'
import Buttons from 'components/Buttons'

const TagCreator = ({ onCreate, loading }) => {
  const [name, setName] = useState('')
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [color, setColor] = useState('#0D7FE4')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleCreate = () => {

    if(!name) {
      setError({
        name: 'Please provide a name for the tag.'
      })
      return
    } else {
      setError({
        ...error,
        name: ''
      })
    }

    if(!description) {
      setError({
        description: 'Please provide a short description what does this tag represents.'
      })
      return
    } else {
      setError({
        ...error,
        description: ''
      })
    }

    onCreate({
      name,
      description,
      color
    })
  }

  return (
    <div className="dash-tag-creator" onClick={() => setColorPickerOpen(false)}>
      <div className="dash-tag-creator__heading flex flex-row justify-between items-center">
        Tag Creator
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="dash-tag-creator__title">Generated Tag</div>
        {
          name && color &&
          <Tag name={name} color={color} />
        }
      </div>
      {
        error.name &&
        <div className="dash-tag-creator__error">{ error.name }</div>
      }
      <FormTextField
        name="name"
        label="Tag Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="dash-tag-creator__color-picker">
        <span className="color-picker__titlee">Select Tag Color</span>
        <span
          onClick={(e) => {
            e.stopPropagation()
            setColorPickerOpen(true)
          }}
          className="color-picker__color-view"
          style={{ backgroundColor: color }}>
          {
            colorPickerOpen &&
            <SketchPicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />
          }
        </span>
      </div>
      {
        error.description &&
        <div className="dash-tag-creator__error">{error.description}</div>
      }
      <FormTextField
        label="Tag Description"
        name="description"
        type="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxlength={300}
      />
      <Buttons 
        medium
        primary
        fluid
        loading={loading}
        onClick={handleCreate}
      >
        Create Tag
      </Buttons>
    </div>
  )
}

export default TagCreator