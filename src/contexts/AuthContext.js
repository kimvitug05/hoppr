import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import cloneDeep from 'lodash/cloneDeep'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, displayName) {
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      auth.currentUser.updateProfile({ displayName }).then(() => {
        const user = cloneDeep(auth.currentUser)
        user.displayName = displayName
        setCurrentUser(user)
      })
    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
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
    resetPassword
  }

  return (
    <AuthContext.Provider value={ value }>
      { !loading && children }
    </AuthContext.Provider>
  )
}
