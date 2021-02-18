import axios from 'axios'
import React from 'react'
import Heart from 'react-animated-heart'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useFavorites } from '../contexts/FavoritesContext'
import './LocationCard.css'
const BASE_URL = `${process.env.REACT_APP_BASE_URL}/destinations`

const LocationCard = ({ destination: { imageUrl, name, slug, url } }) => {
  const { addFavoriteDestination, favoriteDestinations, removeFavoriteDestination } = useFavorites()
  const favoriteDestinationSlugs = favoriteDestinations.map(({ slug }) => slug)
  const { currentUser } = useAuth()

  const onFavorite = async () => {
    const isFavorite = favoriteDestinationSlugs.includes(slug)

    if (!isFavorite) {
      addFavoriteDestination({ imageUrl, name, slug, url })
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.post(`${BASE_URL}/${slug}/favorite`, null, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).catch(() => {
        removeFavoriteDestination({ slug })
      })
    } else {
      removeFavoriteDestination({ slug })
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.delete(`${BASE_URL}/${slug}/unfavorite`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).catch(() => {
        addFavoriteDestination({ imageUrl, name, slug, url })
      })
    }
  }

  return (
    <div className="container">
      <div className="card full-width mb-3 overflow-hidden rounded">
        {
          (url &&
          <a target="_blank" rel="noreferrer" href={ url }>
            <img className="card-img-top full-width" src={ imageUrl } alt="destination" style={{ objectFit: 'cover' }} />
          </a>) ||
          <Link to={ `/destinations/${slug}` }>
            <img className="card-img-top full-width" src={ imageUrl } alt="destination" style={{ objectFit: 'cover' }} />
          </Link>
        }
        <div className="d-flex flex-row justify-content-between card-body">
          {
            (url && <h4 className="card-title mb-0 text-left text-truncate">{ name }</h4>) ||
            <Link to={ `/destinations/${slug}`} style={{ textDecoration: "none", color: "#343a40" }}>
              <h4 className="card-title mb-0 text-left text-truncate">{ name }</h4>
            </Link>
          }
          {
            currentUser && !url &&
            <Heart className="favorite-button" isClick={ favoriteDestinationSlugs.includes(slug) } onClick={ onFavorite } />
          }
        </div>
      </div>
    </div>
  )
}

export default LocationCard
