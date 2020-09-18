import React, { useState } from 'react'
import './Tags.sass'
import { useTags } from 'hooks/TagsHook'

import Tag from 'components/Tag'
import Sidereveal from 'components/Sidereveal'
import { Card, CardIcon, CardHeading } from 'components/Card'

import TagEditor from './TagEditor'
import TagCreator from './TagCreator'

const Tags = () => {
  const [open, setOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')
  const [creatorOpen, setCratorOpen] = useState(false)

  const { tags, addTag, updateTag, deleteTag, loading } = useTags()

  const handleTagSelection = (tag) => {
    setSelectedTag(tag)
    setOpen(true)
  }

  const resetSelection = () => {
    setSelectedTag('')
    setOpen(false)
  }

  return (
    <div className="dash-tags flex flex-row flex-wrap justfy-center w-100">
      {
        tags && tags.length > 0 &&
        tags.map((tag, index) => {
          return (
            <Card key={index} bordered rounded medium hover onClick={() => handleTagSelection(tag.data)}>
              <div className="flex flex-col items-center">
                <Tag name={tag.data.name} color={tag.data.color} />
                <CardHeading>{ tag.data.description }</CardHeading>
              </div>
            </Card>
          )
        })
      }
      <Card bordered rounded medium hover onClick={() => setCratorOpen(true)}>
        <div className="flex flex-col items-center">
          <CardIcon name="icofont-plus" />
          <CardHeading>Create New Tag</CardHeading>
        </div>
      </Card>
      <Sidereveal open={creatorOpen} onClose={() => setCratorOpen(false)}>
        <TagCreator onCreate={addTag} loading={loading}/>
      </Sidereveal>
      <Sidereveal open={open} onClose={resetSelection}>
        <TagEditor tag={selectedTag} loading={loading} onUpdate={updateTag} onDelete={deleteTag}/>
      </Sidereveal>
    </div>
  )
}

export default Tags