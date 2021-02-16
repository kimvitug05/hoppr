import React, { useEffect, useRef, useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { currentUser, login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (currentUser) {
      history.push('/profile')
    }
  }, [ currentUser, history ])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to log in')
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
              <h3 className="text-center text-info">Log In</h3>
              <div className="form-group">
                <label htmlFor="email" className="text-info">Email:</label>
                <br />
                <input type="text" name="email" id="email" className="form-control" required={ true } ref={ emailRef } />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-info">Password:</label>
                <br />
                <input type="password" name="password" id="password" className="form-control" required={ true } ref={ passwordRef } />
              </div>
              <div className="form-group">
                <input className="btn btn-info btn-rounded" disabled={ loading } name="submit" type="submit" value="submit" />
              </div>
              <Link to='forgot-password'>Forgot Password?</Link>
              <div id="register-link" className="text-right">
                <Link className="register-link text-info" to="/signup">Sign Up Here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
