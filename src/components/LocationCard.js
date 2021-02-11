import React, { useState } from 'react'
import Heart from 'react-animated-heart'
import { Link } from 'react-router-dom'
import './LocationCard.css'

const LocationCard = ({ photo, title }) => {
  const [isClick, setClick] = useState(false);

  return (
  <div className="container">
    <div className="card full-width mb-3 overflow-hidden rounded">
      <img className="card-img-top full-width" src={ photo } alt="Card image" style={{ objectFit: 'cover' }} />
      <div className="d-flex flex-row justify-content-between card-body">
        <h4 className="card-title mb-0 text-left text-truncate">{ title }</h4>
        <Heart className="favorite-button" isClick={isClick} onClick={() => setClick(!isClick)} />
      </div>
    </div>
  </div>
  )
}

export default LocationCard
