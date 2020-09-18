import React from 'react'
import { withRouter } from 'react-router'
import { useLogin } from 'hooks/LoginHook'
import { AuthContextValue } from 'context/AuthContext'

import { Card } from 'components/Card'
import Textbox from 'components/Textbox'
import Buttons from 'components/Buttons'

import './Login.sass'

const Login = ({ history }) => {
  const [authState, authDispatch] = AuthContextValue()

  const validate = (values) => {
    if(!values.email) return { emailError: 'Please Provide your email.' }
    if(!values.password) return { passwordError: 'Please Provide your password' }
    return {}
  }

  const loginSuccess = (res) => {
    authDispatch({ type: 'SIGN_IN' })
    history.push('/')
  }

  const { onSubmit, onChange, errors, values, loading } = useLogin({ 
    callback: loginSuccess,
    validate,
    initialState: { email: '', password: '' },
  })

  
  return (
    <div className="dash-login flex flex-col items-center justify-center">
      <Card className="mx-auto" bordered rounded size="medium">
        <span className="dash-login__heading">Starcast</span>
        {
          errors.authError &&
          <span className="dash-login__error">{ errors.authError }</span>
        }
          <form onSubmit={onSubmit}>
            <div className="dash-login__form flex flex-col justify-center items-center">
              {
                errors.emailError &&
                <span className="dash-login__error">{ errors.emailError }</span>
              }
              <Textbox 
                name="email"
                type="email"
                placeholder="Email"
                onChange={onChange}
                value={values.email}
                error={errors.emailError || errors.authError}
              />
              {
                errors.passwordError &&
                <span className="dash-login__error">{ errors.passwordError }</span>
              }
              <Textbox 
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChange}
                value={values.password}
                error={errors.passwordError || errors.authError}
              />
              <Buttons
                loading={loading}
                className="mt-2"
                type="submit"
                fluid
                primary
                large
              >
                Login
              </Buttons>
            </div>
          </form>
      </Card>
    </div>
  )
}

export default withRouter(Login)