import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  }

  return (
    <div className="my-5 container">
      { error && <div className="pb-2 alert alert-danger">{ error }</div> }
      { message && <div className="pb-2 alert alert-success">{ message }</div> }
      <h3 className="text-center text-info">Forgot Password</h3>
      <div id="signup-row" className="row justify-content-center align-items-center">
        <div id="signup-column" className="col-md-6">
          <div id="signup-box" className="col-md-12">
            <form id="signup-form" className="form" onSubmit={ handleSubmit }>
              <div className="form-group">
                <label for="email" className="text-info">Email:</label>
                <br />
                <input type="text" name="email" id="email" className="form-control" required="true" ref={ emailRef } />
              </div>
              <div className="form-group">
                <input className="btn btn-info btn-rounded" disabled={ loading } name="submit" type="submit" value="submit" />
              </div>
              <Link to="/login">Login</Link>
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