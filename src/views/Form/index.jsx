import React, { useEffect } from 'react'
import './Form.sass'
import { useForm } from 'hooks/FormHook'

import Buttons from 'components/Buttons'
import Textbox from 'components/Textbox'
import Range from 'components/Range'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import ShotSelector from 'components/ShotSelector'

import constants from './../../constants'



const Form = () => {
  const { onChange, values, errors, onSubmit, loadingMessage, loading } = useForm()
  
  const ProgressScreen = () => {
    return (
      <div className="dash-form__loader">
        <div className="dash-form__loader-inner mx-auto flex flex-col justify-center items-center">
          <div className="loader-header">Saving User Profile</div>
          <div className="dash-form__loader-message">{ loadingMessage }</div>
        </div>
      </div>
    )
  }
  const handleImageSelection = (event) => {
    onChange({
      target: {
        name: `crops.${event.name}`,
        value: {
          crop: event.crop,
          image: event.image,
          croppedImage: event.croppedImage
        }
      }
    })
  }
  useEffect(() => {
  }, [values])

  return (
    <>
      {
        loading ?
        <ProgressScreen /> :
        <div className="dash-form">
          <div className="row">
            <div className="col-xs-4 col-xs-offset-2">
              <section className="dash-form__section">            
                <div className="dash-form__section-heading"> Personal Details </div>

                <div className="dash-form__textbox">
                  <label>Gender</label>
                  <Radio
                    name="gender"
                    options={constants.genders}
                    onChange={onChange}
                    selection={values.gender}
                  />
                </div>

                <div className="dash-form__textbox">
                  <label>Name</label>
                  <Textbox name="name" value={values.name} onChange={onChange}/>
                </div>


                <Checkbox label="Has Professional Name" onChange={onChange} name="hasProfessionalName" checked={values.hasProfessionalName} />
                {
                  values.hasProfessionalName &&
                  <div className="dash-form__textbox">
                    <label>Professional Name</label>
                    <Textbox name="professionalName" value={values.professionalName} onChange={onChange}/>
                  </div>
                }


                <div className="dash-form__textbox">
                  {
                    errors.usernameError &&
                    <span className="dash-form__error">{ errors.usernameError }</span>
                  }
                  <label>Username</label>
                  <Textbox name="username" value={values.username} onChange={onChange}/>
                </div>


                <div className="dash-form__textbox">
                  {
                    errors.emailError &&
                    <span className="dash-form__error">{errors.emailError}</span>
                  }
                  <label>Email Id</label>
                  <Textbox name="email" value={values.email} onChange={onChange}/>
                </div>


                <div className="dash-form__textbox">
                  <label>Password</label>
                  <Textbox name="password" value={values.password} onChange={onChange}/>
                </div>
              </section>
            </div>
            <div className="col-xs-4">
              <section className="dash-form__section">
                <div className="dash-form__section-heading"> Professional Details </div>

                <div className="dash-form__textbox">
                  <label>Profile Type</label>
                  <Radio
                    name="type"
                    options={constants.types}
                    onChange={onChange}
                    selection={values.type}
                  />
                </div>


                <div className="dash-form__textbox">
                  {
                    errors.playingAgeError &&
                    <span className="dash-form__error">{errors.playingAgeError}</span>
                  }
                  <label>Playing Age</label>
                  <Range
                    name="playingAge"
                    fields={{ A: 'from', B: 'to' }}
                    label={{ A: 'From', B: 'To' }}
                    values={values.playingAge}
                    onChange={onChange}
                  />
                </div>


                <div className="dash-form__textbox">
                  <label>Height</label>
                  <Range
                    name="height"
                    fields={{ A: 'feet', B: 'inch' }}
                    label={{ A: 'Feet', B: 'Inches' }}
                    values={values.height}
                    onChange={onChange}
                  />
                </div>


                <div className="dash-form__textbox">
                  <label>Languages</label>
                  <div className="row">
                    <div className="col-xs-6">
                      <Select 
                        placeholder="Native"
                        options={constants.languages}
                        selections={values.languages.native}
                        onChange={(e) => onChange({target:{ name: 'languages.native', value: [e] }})}
                      />
                    </div>
                    <div className="col-xs-6">
                      <Select
                        isMulti
                        placeholder="Additional"
                        selections={values.languages.additonal}
                        options={constants.languages}
                        onChange={(e) => onChange({ target: { name: 'languages.additional', value: e }})}
                      />
                    </div>
                  </div>
                </div>


                <div className="dash-form__textbox">
                  <label>Location</label>
                  <div className="row">
                    <div className="col-xs-6">
                      <Select
                        placeholder="Current City"
                        options={constants.cities}
                        selections={values.currentCity}
                        onChange={(e) => onChange({ target: { name: 'currentCity', value: [e] }})}
                      />
                    </div>
                    <div className="col-xs-6">
                      <Select
                        placeholder="Nationality"
                        selections={values.nationality}
                        options={constants.countries}
                        onChange={(e) => onChange({ target: { name: 'nationality', value: [e] }})}
                      />
                    </div>
                  </div>
                </div>


                <div className="dash-form__textbox">
                  <label>Skills</label>
                  <div className="row">
                    <div className="col-xs-6">
                      <Select
                        placeholder="Primary Focus"
                        selections={values.focus}
                        options={constants.focus}
                        onChange={(e) => onChange({ target: { name: 'focus', value: [e] } })}
                      />
                    </div>
                    <div className="col-xs-6">
                      <Select
                        isMulti
                        selections={values.skills}
                        placeholder="Additional Skills"
                        options={constants.skills}
                        onChange={(e) => onChange({ target: { name: 'skills', value: e } })}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section className="dash-form__section mx-auto w-50">
            <div className="dash-form__section-heading"> Social Media Account Details </div>
            <div className="dash-form__social-account mt-4 flex flex-row flex-nowrap">
              <Textbox 
                value={values.social.facebook ? values.social.facebook.link : ''}
                placeholder="Facebook"
                onChange={onChange} name="social.facebook.link"
              />
              <Select 
                onChange={(e) => onChange({
                  target:{
                    name: 'social.facebook.followers',
                    value: e 
                  }
                })} 
                placeholder="Followers" 
                selections={values.social.facebook ? [values.social.facebook.followers] : ''}
                options={constants.followerLevels} />
            </div>
            <div className="dash-form__social-account flex flex-row flex-nowrap">
              <Textbox
                value={values.social.instagram ? values.social.instagram.link : ''}
                placeholder="Instagram"
                name="social.instagram.link"
                onChange={onChange}
              />
              <Select
                onChange={(e) => onChange({
                  target: {
                    name: 'social.instagram.followers',
                    value: e
                  }
                })}
                placeholder="Followers"
                selections={values.social.instagram ? [values.social.instagram.followers] : ''}
                options={constants.followerLevels}
              />
            </div>
            <div className="dash-form__social-account flex flex-row flex-nowrap">
              <Textbox 
                value={values.social.twitter ? values.social.twitter.link : ''}
                placeholder="Twitter"
                name="social.twitter.link"
                onChange={onChange}
              />
              <Select
                onChange={(e) => onChange({
                  target: {
                    name: 'social.twitter.followers',
                    value: e
                  }
                })}
                placeholder="Followers"
                selections={values.social.twitter ? [values.social.twitter.followers] : ''}
                options={constants.followerLevels} 
              />
            </div>
            <div className="dash-form__social-account flex flex-row flex-nowrap">
              <Textbox 
                value={values.social.youtube ? values.social.youtube.link : ''}
                placeholder="Youtube"
                name="social.youtube.link"
                onChange={onChange}
              />
              <Select
                onChange={(e) => onChange({
                  target: {
                    name: 'social.youtube.followers',
                    value: e
                  }
                })}
                placeholder="Followers"
                selections={values.social.youtube ? [values.social.youtube.followers] : ''}
                options={constants.followerLevels} 
              />
            </div>
            <div className="dash-form__social-account flex flex-row flex-nowrap">
              <Textbox
                value={values.social.imdb ? values.social.imdb.link : ''}
                placeholder="IMDB"
                name="social.imdb.link"
                onChange={onChange}
              />
            </div>
          </section>
          

          <div className="flex flex-row flex-wrap justify-center mx-aut mt-6o">
            <div className="dsah-form__shot-wrapper mt-4 flex flex-row justify-start flex-wrap">
              <div className="dash-form__shot">
                {
                  values.crops && values.crops.avatar && values.crops.avatar.croppedImage ?
                    <img src={values.crops.avatar.croppedImage} alt="" /> :
                    <ShotSelector name="avatar" onChange={handleImageSelection} />
                }
                <span className="dash-form__shot-label">Avatar</span>
              </div>
            </div>
            <div className="dsah-form__shot-wrapper mt-4 flex flex-row justify-start flex-wrap">
              <div className="dash-form__shot">
                {
                  values.crops && values.crops.headshot && values.crops.headshot.croppedImage ?
                    <img src={values.crops.headshot.croppedImage} alt="" /> :
                    <ShotSelector name="headshot" onChange={handleImageSelection} />
                }
                <span className="dash-form__shot-label">Head Shot</span>
              </div>
            </div>
            <div className="dsah-form__shot-wrapper mt-4 flex flex-row justify-start flex-wrap">
              <div className="dash-form__shot">
                {
                  values.crops && values.crops.shouldershot && values.crops.shouldershot.croppedImage ?
                    <img src={values.crops.shouldershot.croppedImage} alt="" /> :
                    <ShotSelector name="shouldershot" onChange={handleImageSelection} />
                }
                <span className="dash-form__shot-label">Shoulder Shot</span>
              </div>
            </div>
            <div className="dsah-form__shot-wrapper mt-4 flex flex-row justify-start flex-wrap">
              <div className="dash-form__shot">
                {
                  values.crops && values.crops.profileshot && values.crops.profileshot.croppedImage ?
                    <img src={values.crops.profileshot.croppedImage} alt="" /> :
                    <ShotSelector name="profileshot" onChange={handleImageSelection} />
                }
                <span className="dash-form__shot-label">Profile Shot</span>
              </div>
            </div>
            <div className="dsah-form__shot-wrapper mt-4 flex flex-row justify-start flex-wrap">
              <div className="dash-form__shot">
                {
                  values.crops && values.crops.midshot && values.crops.midshot.croppedImage ?
                    <img src={values.crops.midshot.croppedImage} alt="" /> :
                    <ShotSelector name="midshot" onChange={handleImageSelection} />
                }
                <span className="dash-form__shot-label">Mid Shot</span>
              </div>
            </div>
            <div className="dsah-form__shot-wrapper mt-4 flex flex-row justify-start flex-wrap">
              <div className="dash-form__shot">
                {
                  values.crops && values.crops.longshot && values.crops.longshot.croppedImage ?
                    <img src={values.crops.longshot.croppedImage} alt="" /> :
                    <ShotSelector name="longshot" onChange={handleImageSelection} />
                }
                <span className="dash-form__shot-label">Long Shot</span>
              </div>
            </div>

          </div>
          <div className="flex flex-row items-center justify-center mt-6">
              <Buttons loading={loading} onClick={onSubmit}>Save</Buttons>
          </div>
        </div>
      }
    </>
  )
}

export default Form