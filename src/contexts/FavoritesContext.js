import React, { useContext, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const FavoritesContext = React.createContext()

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }) {
  const { currentUser } = useAuth()
  const [favoriteDestinations, setFavoriteDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const assignFavoriteDestinations = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
        await axios.get(`${BASE_URL}/favorite-destinations`, {
          headers: {
            Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
          }
        }).then((response) => {
          setFavoriteDestinations(response.data);
        }).finally(() => {
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
    assignFavoriteDestinations()
  }, [ currentUser ])

  function addFavoriteDestination (destination) {
    setFavoriteDestinations([ ...new Set([ destination, ...favoriteDestinations ]) ])
  }

  function removeFavoriteDestination (destination) {
    setFavoriteDestinations(favoriteDestinations.filter(({ slug }) => slug !== destination.slug))
  }

  const value = {
    addFavoriteDestination,
    favoriteDestinations,
    removeFavoriteDestination,
  }

  return (
    <FavoritesContext.Provider value={ value }>
      { !loading && children }
    </FavoritesContext.Provider>
  )
}
