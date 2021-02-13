import React, { useState, useEffect } from 'react'
import './UserProfile.css'
import DestinationCarousel from './DestinationCarousel'
import { useAuth } from '../contexts/AuthContext'
import UserProfileModal from './UserProfileModal'
import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

const UserProfile = () => {
  const { currentUser } = useAuth()
  const [favoriteDestinations, setFavoriteDestinations] = useState([])
  const [recentDestinations, setRecentDestinations] = useState([])

  useEffect(() => {
    const assignRecentDestinations = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.get(`${BASE_URL}/recent-destinations`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).then((response) => {
        setRecentDestinations(response.data);
      })
    }
    assignRecentDestinations()

    const assignFavoriteDestinations = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.get(`${BASE_URL}/favorite-destinations`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).then((response) => {
        setFavoriteDestinations(response.data);
      })
    }
    assignFavoriteDestinations()
  }, [ currentUser ])

  return (
    <div className="pb-5 user-profile">
      <UserProfileModal />
      <div className="container">
        <div className="pt-4">
          {
            !!favoriteDestinations.length &&
            <DestinationCarousel title="Favorites" destinations={ favoriteDestinations }/>
          }
          {
            !!recentDestinations.length &&
            <DestinationCarousel title="Recently Viewed" destinations={ recentDestinations }/>
          }
        </div>
      </div>
    </div>
  )
}

export default UserProfile
