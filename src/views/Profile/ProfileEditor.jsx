import React, { useState } from 'react'
import './ProfileEditor.sass'

import FormTextField from 'components/FormTextField' 
import Buttons from 'components/Buttons'
import ReactSelect from 'react-select'
// import Tags from 'views/Tags/tags'

const ProfileEditor = ({profile, loading, user, tags, onTagDelete, onTagAdd}) => {

  const [selectOpen, setSelectOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')

  const resetTagSelection = () => {
    setSelectOpen(false)
    setSelectedTag('')
  }

  const renderTags = (tags, assignedTags) => {
    return tags.filter( tag => {
      if(assignedTags) {
        return assignedTags.includes(tag.id)
      } else {
        return true
      }
    }).map((tag, index) => {
      return <span 
        className="dash-profile-editor__tag"
        onClick={() => onTagDelete(tag.id)}
        key={index}
      >
        { tag.data.name }
        <i className="icofont-close"></i>
      </span>
    })
  }

  const getFilteredTags = (tags, assignedTags) => {
    return tags.filter( tag => {
      if(assignedTags) {
        return !assignedTags.includes(tag.id)
      } else {
        return true
      }
    }).map((tag, index) => {
      return {
        label: tag.data.name,
        value: tag.id
      }
    })
  }

  return (
    <div className="dash-profile-editor">
      <div className="dash-profile-editor__title">Profile Editor</div>
      <div className="dash-profile-editor__tags">
        {
          user.data.tags && user.data.tags.length > 0 &&
          <div className="dash-profile-editor__tag-list">
            { renderTags(tags, user.data.tags) }
          </div>
        }
        {
          selectOpen &&
          <>
            <ReactSelect
              options={getFilteredTags(tags, user.data.tags)}
              onChange={(e) => setSelectedTag(e.value)}
            />
            <div className="flex flex-row flex-nowrap items-center w-100">
              <Buttons 
                small
                fluid
                secondary
                onClick={resetTagSelection}
              >
                Cancel
              </Buttons>
              <Buttons 
                primary
                small
                fluid
                loading={loading}
                onClick={() => onTagAdd(selectedTag)}
              >
                Add
              </Buttons>
            </div>
          </>
        }
        {
          !selectOpen &&
          <Buttons loading={loading} fluid medium primary onClick={() => setSelectOpen(true)} >
            {
              (user.data.tags && user.data.tags.length > 0) ?
              'Add More Tags' :
              'Add Tags'
            }
          </Buttons>
        }
      </div>
      {/* <div className="dash-profile-editor__tag-list">
        {
          user.data.tags && user.data.tags.length > 0 &&
          <div className="flex flex-row flex-wrap items center mb-2">
            {
              user.data.tags.map((tag, index) => {
                return <span 
                  onClick={() => onTagDelete(tag.id)}
                  className="dash-profile-editor__tag"
                  key={index}
                >
                  { tag.name }
                  <i className="icofont-close"></i>
                </span>
              })
            }
          </div>
        }
        {
          selectOpen &&
          <ReactSelect
            options={tags.map((tag) => {
              return {
                label: tag.data.name,
                value: tag.data.id
              }
            })}
            onChange={(e) => setSelectedTag(e.value)}
          />
        }
        {
          selectOpen ?
          <Buttons fluid small loading={loading} onClick={() => onTagAdd(selectedTag)}>
            Add
          </Buttons> :
          <Buttons fluid small onClick={() => setSelectOpen(true)} >
            {
              user.data.tags && user.data.tags.length > 0 ?
                'Add More Tags' :
                'Add Tags'
            }
          </Buttons>
        }
      </div> */}
    </div>
  )
}

export default ProfileEditor