import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserProfileModal from './UserProfileModal'

const Register = () => {
  return (
    <div className="container">
      <h3 className="text-left text-info">Settings</h3>
      <div className="container">
        <UserProfileModal />
      </div>
      <form id="signup-form" className="form" >
        <div className="form-group">
          <label for="displayName" className="text-info">Display Name:</label>
          <br />
          <input type="text" name="displayName" id="displayName" className="form-control" required="true" />
        </div>
        <div className="form-group">
          <label for="email" className="text-info">Email:</label>
          <br />
          <input type="text" name="email" id="email" className="form-control" required="true" />
        </div>
        <div className="form-group">
          <label for="location" className="text-info">Current Location:</label>
          <br />
          <input type="text" name="location" id="location" className="form-control" required="true" />
        </div>
        <div className="form-group">
          <input className="btn btn-info btn-rounded" name="save" type="submit" value="save" />
        </div>
      </form>
    </div>
  )
}

export default Register
