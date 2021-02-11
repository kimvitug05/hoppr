import React, { useRef, useState } from 'react'
import './SignUp.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
  const displayNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      signup(emailRef.current.value, passwordRef.current.value)
      history.push('/register')
      // .then(() => {
      //   // TODO: REDIRECT AFTER LOGIN
      // })
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <div className="my-5 container">
      { error && <div className="pb-2 alert alert-warning" role="alert">{ error }</div> }
      <div id="signup-row" className="row justify-content-center align-items-center">
        <div id="signup-column" className="col-md-6">
          <div id="signup-box" className="col-md-12">
            <form id="signup-form" className="form" onSubmit={ handleSubmit }>
              <h3 className="text-center text-info">Sign Up</h3>
              <div className="form-group">
                <label for="firstname" className="text-info">Display Name:</label>
                <br />
                <input type="text" name="displayName" id="displayName" className="form-control" required="true" ref={ displayNameRef } />
              </div>
              <div className="form-group">
                <label for="email" className="text-info">Email:</label>
                <br />
                <input type="text" name="email" id="email" className="form-control" required="true" ref={ emailRef } />
              </div>
              <div className="form-group">
                <label for="password" className="text-info">Password:</label>
                <br />
                <input type="password" name="password" id="password" className="form-control" required="true" ref={ passwordRef } />
              </div>
              <div className="form-group">
                <label for="confirm-password" className="text-info">Confirm Password:</label>
                <br />
                <input type="password" name="confirm-password" id="confirm-password" className="form-control" required="true" ref={ confirmPasswordRef } />
              </div>
              <div className="form-group">
                <input className="btn btn-info btn-rounded" disabled={ loading } name="submit" type="submit" value="submit" />
              </div>
              <div id="register-link" className="text-right">
                <Link className="text-info" to="/login">Login Here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
