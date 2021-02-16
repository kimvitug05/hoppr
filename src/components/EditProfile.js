import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import UserProfileModal from './UserProfileModal'
import './UserProfile.css'

export default function EditProfile() {
  const displayNameRef = useRef()
  const emailRef = useRef()
  const locationRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateDisplayName, updateEmail, updatePassword, updateLocation } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    if (displayNameRef.current.value) {
      promises.push(updateDisplayName(displayNameRef.current.value))
    }
    if (locationRef.current.value) {
      promises.push(updateLocation(locationRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/profile")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="pb-5 user-profile">
        <UserProfileModal edit={ true } />
        <div className="container">
          { error && <div className="pb-2 alert alert-warning" role="alert">{ error }</div> }
          <div id="signup-row" className="row justify-content-center align-items-center">
            <div id="edit-profile-column" className="col-12">
              <form id="signup-form" className="form" onSubmit={ handleSubmit }>
                <div className="justify-content-center row">
                  <div className="col-lg-6 col-md-9">
                    <div className="form-group mt-4">
                      <label htmlFor="firstname" className="text-info">Display Name:</label>
                      <br />
                      <input 
                        type="text" 
                        name="displayName" 
                        id="displayName" 
                        className="form-control" 
                        required={ true } 
                        ref={ displayNameRef } 
                        defaultValue={ currentUser.displayName }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="text-info">Email:</label>
                      <br />
                      <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        className="form-control" 
                        required={ true } 
                        ref={ emailRef } 
                        defaultValue={ currentUser.email }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location" className="text-info">Current Location:</label>
                      <br />
                      <input 
                        type="text" 
                        name="location" 
                        id="location" 
                        className="form-control" 
                        ref={ locationRef } 
                        defaultValue={ currentUser.location }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="text-info">Change Password:</label>
                      <br />
                      <input 
                        type="password"  
                        name="password" 
                        id="password" 
                        className="form-control" 
                        ref={ passwordRef } 
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="confirm-password" className="text-info">Confirm Change Password:</label>
                      <br />
                      <input 
                        type="password" 
                        name="confirm-password" 
                        id="confirm-password" 
                        className="form-control" 
                        ref={ passwordConfirmRef } />
                    </div>
                    <div id="register-link" className="form-group text-right">
                      <Link className="text-info" to="/profile">Cancel</Link>
                      <button disabled={ loading } className="btn btn-info ml-4" type="submit">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
