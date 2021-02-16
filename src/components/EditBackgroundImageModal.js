import React, { useRef, useState } from 'react'
import { storageRef } from '../firebase'
import firebase from 'firebase/app'
import { useAuth } from '../contexts/AuthContext'

const EditBackgroundImageModal = ({ close }) => {
  const { currentUser, updateBackgroundImage } = useAuth()
  const inputFileRef = useRef(null);
  const [image, setImage] = useState()

  const onFileChange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const saveImage = () => {
    if (image) {
      const imageUpload = storageRef.child(`images/backgrounds/${currentUser.uid}`).putString(image, 'data_url')

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
          await updateBackgroundImage(downloadURL)
          close()
        })
      })
    }
  }

  return (
    <>
    <div 
      className="modal fade" 
      id="background" 
      tabIndex="-1" 
      role="dialog" 
      aria-labelledby="exampleModalLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Background Picture</h5>
            <button onClick={ close } type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ display: 'flex', height: '432px', justifyContent: 'center', maxHeight: '432px', minHeight: '432px' }}>
            {
              (!image &&
              <div style={{
                border: "2px dashed rgb(151, 151, 151)",
                borderRadius: "8px", 
                textAlign: "center",
                width: "400px",
                height: "400px"
              }}>
                <input ref={ inputFileRef } onChange={ onFileChange } type="file" accept="image/*" style={ { position: 'absolute', visibility: 'hidden' } } />
                <button onClick={ () => inputFileRef.current.click() } className="btn btn-link align-middle" style={{ color: "inherit", height: '100%', textDecoration: "none", fontSize: '20px', fontWeight: 'bold', width: '100%' }}>
                  Choose a file
                </button>
              </div>) ||
              <div className="px-2" style={{ maxHeight: '100%', maxWidth: '100%' }}>
                <img alt="background" src={ image } style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
              </div>
            }
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

export default EditBackgroundImageModal
