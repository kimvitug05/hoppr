import React, { useState } from 'react'
import { Link, useLocation} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import EditImageModal from './EditImageModal'
import EditBackgroundImageModal from './EditBackgroundImageModal'

const UserProfileModal = ({ edit }) => {
  const { currentUser } = useAuth()
  const location = useLocation()
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false)
  const [showEditBackgroundPictureModal, setShowEditBackgroundPictureModal] = useState(false)

  const closeAvatarModalHandler = () => setShowEditAvatarModal(false);
  const closeBackgroundPictureModalHandler = () => setShowEditBackgroundPictureModal(false);

  return (
    <div className="container">
      <div className="row">
        <div className="card col overflow-hidden px-0 rounded user-profile-card">
          <div className="background-wrapper">
            <img
              alt="user background"
              className="background-img card-img-top"
              data-holder-rendered="true"
              src={ currentUser.background_image_url || 'https://i.imgur.com/3byaZEB.jpg' }
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            {
              edit &&
              <div className="align-items-center img-overlay row">
                <button 
                  className="col icon btn btn-link"
                  data-target="#background" 
                  data-toggle="modal"
                  style={ { height: '100%' } }
                  title="Background" 
                  type="button" 
                  onClick={ () => setShowEditBackgroundPictureModal(true) }
                >
                  <i className="fa fa-edit fa-lg" style={{ color: "white" }}></i>
                </button>
              </div>
            }
          </div>
          {
            showEditBackgroundPictureModal &&
            <EditBackgroundImageModal close={ closeBackgroundPictureModalHandler } />
          }
          <div className="d-flex flex-column card-body">
            <div className="row">
              <div className="col col-auto user-avatar-col">
                <div className="avatar-wrapper">
                  <img 
                    alt="user avatar"
                    className="avatar-img border border-white rounded-circle"
                    data-holder-rendered="true"
                    src={ currentUser.photoURL || 'https://i.imgur.com/fdi7cLt.png' }
                  ></img>
                  {
                    edit &&
                    <div className="align-items-center border border-white img-overlay rounded-circle row">
                      <button 
                        className="col icon btn btn-link"
                        data-target="#profile" 
                        data-toggle="modal"
                        style={ { height: '100%' } }
                        title="User Profile" 
                        type="button" 
                        onClick={ () => setShowEditAvatarModal(true) }
                      >
                        <i className="fa fa-edit fa-lg" style={{ color: "white" }} ></i>
                      </button>
                    </div>
                  }
                </div>
              </div>
              {
                showEditAvatarModal &&
                <EditImageModal close={ closeAvatarModalHandler } title="Profile" height={ 400 } width={ 400 }  />
              }
              <div className="col">
                {
                  currentUser &&
                  <h4 className="card-title mb-0 user-name">{ currentUser.displayName }</h4>
                }
                {
                  currentUser && currentUser.location &&
                  <p className="mb-2 user-location">{ currentUser.location }</p>
                }
                {/* <p><strong>123</strong> Followers <strong className="ml-2">200</strong> Following</p> */}
              </div>
            </div>
          </div>
          {
            (!location || location.pathname !== '/edit-profile') &&
            <div className="container">
              <div className="justify-content-end mb-3 mr-1 row">
                <Link to="edit-profile">
                  <button className="btn btn-outline-info">Update</button>
                </Link>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal
