import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { useUser } from 'hooks/UserHook'
import { useTags } from 'hooks/TagsHook'
import './Profile.sass'

import Profile from './Profile'
import ProfileEditor from './ProfileEditor'
import Sidereveal from 'components/Sidereveal'
import LogoImage from 'assets/icons/logo.png'

const ProfileContainer = ({ match }) => {
  const [editing, setEditing] = useState(false)

  const { user, profile, loading, addTag, removeTag } = useUser(match.params.username)
  const { tags } = useTags()

  return (user && profile) ? (
    <>
      <Profile
        profile={profile.data}
        user={user}
        tags={tags}
        onEdit={() => setEditing(true)}
      />
      <Sidereveal open={editing} onClose={() => setEditing(false)}>
        <ProfileEditor
          user={user}
          tags={tags}
          profile={profile}
          loading={loading}
          onTagAdd={addTag}
          onTagDelete={removeTag}
        />
      </Sidereveal>
    </>
  ) : (
    <div className="dash-profile__loader flex flex-col items-center justify-center">
      <span className="dash-profile__loader-title">Please wait, getting the profile.</span>
      <div className="loader">
        <img src={LogoImage} alt="" />
      </div>
    </div>
  )
}

export default withRouter(ProfileContainer)