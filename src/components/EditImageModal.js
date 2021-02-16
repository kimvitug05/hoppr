import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { storageRef } from '../firebase'
import firebase from 'firebase/app'
import { useAuth } from '../contexts/AuthContext'
import './EditImageModal.css'

const EditImageModal = ({ close, height, title, width }) => {
  const { currentUser, updateProfileImage } = useAuth()
  const [image, setImage] = useState()
  
  const onClose = () => {
    setImage(null)
  }
  
  const onCrop = croppedAvatar => {
    setImage(croppedAvatar)
  }
 
  const onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 71680) {
      alert('File is too big!')
      elem.target.value = ''
    }
  }

  const saveImage = () => {
    if (image) {
      const imageUpload = storageRef.child(`images/avatars/${currentUser.uid}`).putString(image, 'data_url')

      // https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      imageUpload.on('state_changed', snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: break // or 'paused'
          case firebase.storage.TaskState.RUNNING: break // or 'running'
          default: break
        }
      }, (error) => {
        // Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        imageUpload.snapshot.ref.getDownloadURL().then(async downloadURL => {
          await updateProfileImage(downloadURL)
          close()
        })
      })
    }
  }

  return (
  <>
    <div 
      className="modal fade" 
      id={ title.toLowerCase() } 
      tabIndex="-1" 
      role="dialog" 
      aria-labelledby="exampleModalLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{`Edit ${title} Picture`}</h5>
            <button onClick={ close } type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              width={ width }
              height={ height }
              onCrop={ onCrop }
              onClose={ onClose }
              onBeforeFileLoad={ onBeforeFileLoad }
              src={ image }
            />
          </div>
          <div className="modal-footer">
            <button onClick={ close } type="button" className="btn btn-secondary" data-backdrop="false" data-dismiss="modal">Close</button>
            <button disabled={ !image } type="button" className="btn btn-primary" data-backdrop="false" data-dismiss="modal" onClick={ saveImage }>Save Picture</button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default EditImageModal
