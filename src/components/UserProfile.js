import React, { useState, useEffect } from 'react'
import './UserProfile.css'
import DestinationCarousel from './DestinationCarousel'
import { useAuth } from '../contexts/AuthContext'
import { useFavorites } from '../contexts/FavoritesContext'
import UserProfileModal from './UserProfileModal'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const UserProfile = () => {
  const { currentUser } = useAuth()
  const { favoriteDestinations } = useFavorites()
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
