import React from 'react'

const UserProfileModal = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="card col overflow-hidden px-0 rounded">
          <img
            alt="user background"
            className="card-img-top"
            src="https://images.unsplash.com/photo-1517848568502-d03fa74e1964?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2850&q=80"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
          <div className="d-flex flex-column card-body">
            <div className="row">
              <div className="col col-auto">
                <img 
                  alt="user avatar"
                  className="avatar-img border border-white rounded-circle"
                  data-holder-rendered="true"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
                ></img>
              </div>
              <div className="col">
                <h4 className="card-title mb-1">John Doe</h4>
                <p className="mb-2"><strong>Seattle, WA</strong></p>
                <p><strong>123</strong> Followers <strong className="ml-2">200</strong> Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal
