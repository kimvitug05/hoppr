import axios from 'axios'
import React, { useState } from 'react'
import Heart from 'react-animated-heart'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './LocationCard.css'
const BASE_URL = 'http://localhost:8080/destinations'

const LocationCard = ({ photo, slug, title, url }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const { currentUser } = useAuth()

  const onFavorite = async () => {
    setIsFavorite(!isFavorite)

    if (!isFavorite) {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.post(`${BASE_URL}/${slug}/favorite`, null, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).catch(() => {
        setIsFavorite(!isFavorite)
      })
    } else {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.delete(`${BASE_URL}/${slug}/unfavorite`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).catch(() => {
        setIsFavorite(!isFavorite)
      })
    }
  }

  return (
    <div className="container">
      <div className="card full-width mb-3 overflow-hidden rounded">
        {
          (url &&
          <a target="_blank" rel="noreferrer" href={ url }>
            <img className="card-img-top full-width" src={ photo } alt="destination" style={{ objectFit: 'cover' }} />
          </a>) ||
          <Link to={ `/destinations/${slug}` }>
            <img className="card-img-top full-width" src={ photo } alt="destination" style={{ objectFit: 'cover' }} />
          </Link>
        }
        <div className="d-flex flex-row justify-content-between card-body">
          {
            (url && <h4 className="card-title mb-0 text-left text-truncate">{ title }</h4>) ||
            <Link to="/destination" style={{ textDecoration: "none", color: "#343a40" }}>
              <h4 className="card-title mb-0 text-left text-truncate">{ title }</h4>
            </Link>
          }
          {
            currentUser && !url &&
            <Heart className="favorite-button" isClick={ isFavorite } onClick={ onFavorite } />
          }
        </div>
      </div>
    </div>
  )
}

export default LocationCard
