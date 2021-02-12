import React, { useState } from 'react'
import Heart from 'react-animated-heart'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './LocationCard.css'

const LocationCard = ({ photo, slug, title, url }) => {
  const [isClick, setClick] = useState(false)
  const { currentUser } = useAuth()

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
            <Heart className="favorite-button" isClick={isClick} onClick={() => setClick(!isClick)} />
          }
        </div>
      </div>
    </div>
  )
}

export default LocationCard
