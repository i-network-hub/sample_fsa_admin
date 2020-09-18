import React from 'react'
import Avatar from 'components/Avatar'
import Tag from 'components/Tag'
import './Table.sass'
// const TableComponent from './TableComponent.jsx'
import { useTags } from 'hooks/TagsHook'
const TableHead = ({ children }) => {
  return (
    <div className="dash-table__head">
      { children }
    </div>
  )
}


const TableBody = ({ children }) => {
  return (
    <div className="dash-table__body">
      { children }
    </div>
  )
}

const getTags = (tags, assignedTags) => {
  console.log(tags)
  console.log(assignedTags)
  return tags.filter(tag => {
    return assignedTags.includes(tag.id)
  })
}

const Table = ({ list, onEdit }) => {
  const { tags } = useTags()
  return (
    <div className="dash-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
            <th>Username</th>
            <th>Playing Age</th>
            <th>Height</th>
            <th>Gender</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            (list && list.length > 0) ?
            list.map((item, index) => {
              return item && item.data && Object.keys(item.data).length > 0 && 
              <tr key={index}>
                <td>
                  <Avatar rounded src={item.data.avatar || 'https://i.pravatar.cc/300?img=1'} />
                </td>
                <td>
                  <div className="dash-table__user">
                    <span className="dash-table__username">{ item.data.name || '' }</span>
                    <span className="dash-table__type">{item.data.focus && item.data.focus.length > 0 && item.data.focus[0].label || '' }</span>
                  </div>
                </td>
                <td>{ item.data.username || '' }</td>
                <td>{ item.data.playingAge && `${item.data.playingAge.from || 0} - ${item.data.playingAge.to || 0}` || '-'}</td>
                <td>{ item.data.height && `${item.data.height.feet || 0} - ${item.data.height.inch || 0}` || '-'}</td>
                <td>{ item.data.gender ? item.data.gender.label : '-' }</td>
                <td>
                  <i onClick={() => onEdit(item.data.username)} className="dash-table-icon icofont-gear"/>
                </td>
                <td>
                  <a className="dash-table-icon" href={`/profile/${item.data.username}`} target="_blank" rel="noopener noreferrer">
                    <i className="icofont-external-link"/>
                  </a>
                </td>
              </tr>
            }) :
            <tr>
              <td>Loading</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table