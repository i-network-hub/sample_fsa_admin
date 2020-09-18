import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import _ from 'lodash'
import './TagEditor.sass'

import Tag from 'components/Tag'
import FormTextField from 'components/FormTextField'
import Buttons from 'components/Buttons'

const TagEditor = ({ tag, onUpdate, loading, onDelete }) => {
  const [value, setValue] = useState(tag)
  const [saveOpen, setSaveOpen] = useState(false)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(tag.color)

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    let data = { ...value }
    data.color = selectedColor
    onUpdate(data)
  }

  useEffect(() => {
    if(!tag) {
      setValue(tag)
    }

    if(!_.isEqual(tag, value) || (tag.color !== selectedColor)) {
      setSaveOpen(true)
    } else {
      setSaveOpen(false)
    }

  }, [tag, value, selectedColor])

  return (
    <div className="dash-tag-editor" onClick={() => setColorPickerOpen(false)}>
      <div className="dash-tag-editor__heading flex flex-row justify-between items-center">
        Tag Editor
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="dash-tag-editor__title">Selected Tag</div>
        <Tag name={tag.name} color={selectedColor}/>
      </div>
      <FormTextField 
        label="Tag Name"
        name="name"
        type="text"
        value={value.name}
        onChange={handleChange}
      />
      <div className="dash-tag-editor__color-picker">
        <span className="color-picker__titlee">Tag Color</span>
        <span 
          onClick={(e) => {
            e.stopPropagation()
            setColorPickerOpen(true)
          }}
          className="color-picker__color-view"
          style={{backgroundColor: selectedColor}}>
            {
              colorPickerOpen &&
              <SketchPicker 
                color={selectedColor}
                onChangeComplete={(color) => setSelectedColor(color.hex)}
              />
            }
          </span>
      </div>
      <FormTextField 
        label="Tag Description"
        name="description"
        type="textarea"
        value={value.description}
        onChange={handleChange}
        maxlength={300}
      />
      {
        saveOpen &&
        <Buttons fluid primary medium loading={loading} onClick={handleSave}>Save Changes</Buttons>
      }
      {/* <div className="dash-tag-editor__delete" onClick={() => onDelete(tag.id)}>
        <i className="icofont-trash"></i>
      </div> */}
    </div>
  )
}

export default TagEditor