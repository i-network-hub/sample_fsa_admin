import React, { useEffect } from 'react'
import { concatList } from 'helpers'
import Tag from 'components/Tag'
import Buttons from 'components/Buttons'

const Profile = ({ profile, tags, user, onEdit }) => {

  const getTags = (tags, assignedTags) => {
    return tags.filter(tag => {
      return assignedTags.includes(tag.id)
    })
  }

  return (
    <div className="dash-profile">
      <div className="row">
        <div className="col-xs-3">

          <div className="dash-profile__avatar">
            <img src={profile.avatar} alt="avatar" />
          </div>

          <div className="dash-profile__tags">
            {
              user && user.data.tags && user.data.tags.length > 0 &&
              getTags(tags, user.data.tags).map((tag, index) => {
                return <Tag color={tag.data.color} name={tag.data.name} key={index} />
              })
            }
          </div>

          <div className="dash-profile__name">{profile.name}</div>

          <div className="dash-profile__basic flex flex-row items-center">
            {
              profile.focus && profile.focus.length > 0 &&
              <span>
                <i className="icofont-star" />
                {profile.focus[0].label}
              </span>
            }
            {
              profile.gender &&
              <span>
                <i className="icofont-user" />
                {profile.gender.label}
              </span>
            }
            {
              profile.currentCity && profile.currentCity.length > 0 &&
              <span>
                <i className="icofont-pin" />
                {concatList(profile.currentCity)}
              </span>
            }
          </div>

          <div className="dash-profile__details">

            {
              profile.playingAge &&
              <div className="dash-profile__details-field">
                <span>Playing Age</span>
                <span>{`${profile.playingAge.from}-${profile.playingAge.to} Years`}</span>
              </div>
            }
            {
              profile.height &&
              <div className="dash-profile__details-field">
                <span>Height</span>
                <span>{`${profile.height.feet}' ${profile.height.inch || profile.height.inches}"`}</span>
              </div>
            }
            {
              profile.languages && profile.languages.native && profile.languages.native.length > 0 &&
              <div className="dash-profile__details-field">
                <span>Native Language</span>
                <span>{profile.languages.native[0].label}</span>
              </div>
            }
            {
              profile.languages && profile.languages.additional && profile.languages.additional.length > 0 &&
              <div className="dash-profile__details-field">
                <span>Additional Language</span>
                <span>{concatList(profile.languages.native)}</span>
              </div>
            }
            {
              profile.skills && profile.skills.length > 0 &&
              <div className="dash-profile__details-field">
                <span>Skills</span>
                <span>{concatList(profile.skills)}</span>
              </div>
            }
            {
              profile.nationality && profile.nationality.length > 0 &&
              <div className="dash-profile__details-field">
                <span>Nationality</span>
                <span>{concatList(profile.nationality)}</span>
              </div>
            }

          </div>
        </div>
        <div className="col-xs-9">
          <div className="dash-profile-collage">
            <div className="dash-profile-collage-wrapper">
              <div className="dash-profile-collage-inner">
                <div className="dash-profile-collage-image-large">
                  {
                    profile.headshot &&
                    <img src={profile.headshot} alt="head shot"/>
                  }
                </div>
                <div className="dash-profile-collage-image-small">
                  {
                    profile.longshot &&
                    <img src={profile.longshot} alt="long shot"/>
                  }
                </div>
                <div className="dash-profile-collage-image-small">
                  {
                    profile.shouldershot &&
                    <img src={profile.shouldershot} alt="head and shoulder shot"/>
                  }
                </div>
                <div className="dash-profile-collage-image-small">
                  {
                    profile.midshot &&
                    <img src={profile.midshot} alt="mid shot"/>
                  }
                </div>
                <div className="dash-profile-collage-image-small">
                  {
                    profile.profileshot &&
                    <img src={profile.profileshot} alt="profile shot"/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dash-profile__edit-button">
        <Buttons medium primary onClick={onEdit} >
          Edit
        <i className="icofont-gear"></i>
        </Buttons>
      </div>
    </div>
  )
}

export default Profile