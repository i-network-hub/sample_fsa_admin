import React, { useEffect } from 'react'
import './Filter.sass'
import ReactSelect from 'react-select'

import FormTextField from 'components/FormTextField' 
import FormRangeField from 'components/FormRangeField' 


const Filter = ({ onChange, currentFilters }) => {

  return (
    <div className="dash-filters">
      <div className="dash-filters__title">Filters</div>
      <FormTextField value={currentFilters.name} label="Name" name="name" onChange={onChange}/>
      <FormTextField value={currentFilters.username} label="Username" name="username" onChange={onChange}/>
      <div className="row">
        <div className="col-xs-6">
          <ReactSelect 
            isClearable
            placeholder="Gender"
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' }
            ]}
            value={currentFilters.gender}
            onChange={(e) => {
              onChange({
                target: {
                  name: 'gender',
                  value: e
                }
              })
            }}
          />
        </div>
        <div className="col-xs-6">
          <ReactSelect
            isClearable
            placeholder="Focus" 
            options={[
              { label: 'Actor', value: 'actor' },
              { label: 'Model', value: 'model' },
              { label: 'Both', value: 'both' },
              { label: 'Neither', value: 'neither' }
            ]}
            value={currentFilters.focus}
            onChange={(e) => {
              onChange({
                target: {
                  name: 'focus',
                  value: e
                }
              })
            }}
          />
        </div>
      </div>
      <FormRangeField
        title="Playing Age"
        name="playingAge"
        fields={{ A: 'from', B: 'to' }}
        label={{ A: 'From', B: 'To' }}
        values={currentFilters.playingAge}
        onChange={onChange}
      />
      <FormRangeField
        title="Height From"
        name="height.from"
        fields={{ A: 'feet', B: 'inch' }}
        label={{ A: 'Feet', B: 'inch' }}
        values={currentFilters.height.from}
        onChange={onChange}
      />
      <FormRangeField
        title="Height To"
        name="height.to"
        fields={{ A: 'feet', B: 'inch' }}
        label={{ A: 'Feet', B: 'Inch' }}
        values={currentFilters.height.to}
        onChange={onChange}
      />
      <FormTextField value={currentFilters.currentCity} label="Current City" name="currentCity" onChange={onChange} />
    </div>
  )
}


export default Filter