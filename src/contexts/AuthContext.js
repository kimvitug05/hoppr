import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore } from '../firebase'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

const AuthContext = React.createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userDetails, setUserDetails] = useState({})

  function signup (email, password, displayName) {
    const photoURL = 'https://i.imgur.com/fdi7cLt.png'
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      return updateProfile({
        displayName,
        photoURL,
      }, auth.currentUser)
    }).then(user => {
      user.displayName = displayName
      user.photoURL = photoURL
      setCurrentUser(user)
    })
  }

  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout () {
    return auth.signOut()
  }

  function resetPassword (email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail (email) {
    return currentUser.updateEmail(email).then(() => {
      const updatedUser = cloneDeep(currentUser)
      updatedUser.email = email
      setCurrentUser(updatedUser)
    })
  }

  function updatePassword (password) {
    return currentUser.updatePassword(password)
  }

  async function updateDisplayName (displayName) {
    await currentUser.updateProfile({ displayName }).then(() => {
      const updatedUser = cloneDeep(currentUser)
      updatedUser.displayName = displayName
      setCurrentUser(updatedUser)
    })
  }

  function updateProfileImage (profileImage) {
    return updateProfile({ photoURL: profileImage })
  }

  function updateProfile (profile, user) {
    return (user || currentUser).updateProfile(profile).then(() => {
      const updatedUser = cloneDeep(user || currentUser)
      Object.keys(profile).forEach(key => {
        updatedUser[key] = profile[key]
      })
      setCurrentUser(updatedUser)

      return updatedUser
    })
  }

  function updateBackgroundImage (backgroundImageUrl) {
    return firestore.collection('users').doc(currentUser.uid).set({
      background_image_url: backgroundImageUrl
    }, { merge: true }).then(() => {
      updateUserDetails({ background_image_url: backgroundImageUrl })
    })
  }

  async function updateLocation (location) {
    await firestore.collection('users').doc(currentUser.uid).set({ location }, { merge: true }).then(() => {
      updateUserDetails({ location })
    })
  }

  function updateUserDetails (details) {
    setUserDetails(merge(cloneDeep(userDetails || {}), details))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        await firestore.collection('users').doc(user.uid).get().then(dbUser => {
          const dbUserData = dbUser.data()
          setUserDetails({
            background_image_url: dbUserData.background_image_url,
            location: dbUserData.location,
          })
        }).catch(() => {
          setUserDetails({})
        })
      } else {
        setUserDetails({})
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup, 
    login,
    logout,
    resetPassword,
    updateProfile,
    updateEmail,
    updatePassword,
    updateDisplayName,
    updateProfileImage,
    updateBackgroundImage,
    updateLocation,
    userDetails,
  }

  return (
    <AuthContext.Provider value={ value }>
      { !loading && children }
    </AuthContext.Provider>
  )
}
