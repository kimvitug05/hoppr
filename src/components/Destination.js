import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

import DestinationCarousel from './DestinationCarousel'
import axios from 'axios'
import './Destination.css'
const BASE_URL = 'http://localhost:8080/destinations'
const restaurants = require('../data/yelp_places.json')
const amusement = require('../data/amusement.json')
const beach = require('../data/beaches.json')

const Destination = (props) => {
  const { currentUser } = useAuth()
  const [destination, setDestination] = useState(null)
  const slug = props.match.params.slug

  useEffect(() => {
    const assignDestination = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.get(`${BASE_URL}/${slug}`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).then((response) => {
        setDestination(response.data);
      })
    }
    assignDestination()
  }, [ currentUser, slug ])

  const yelpDestinations = restaurants.businesses.map(place => ({
    imageUrl: place.image_url,
    name: place.name,
    url: place.url,
  }))

  const amusementParks = amusement.businesses.map(place => ({
    imageUrl: place.image_url,
    name: place.name,
    url: place.url,
  }))

  const beaches = beach.businesses.map(place => ({
    imageUrl: place.image_url,
    name: place.name,
    url: place.url,
  }))

  return (
    <>
      {
        destination &&
          <>
            <div className="banner-container">
              <img className="banner-image full-width" src={ destination.imageUrl } alt="destination" />
              <h1 className="bottom-left destination-name mb-0 px-4 py-2">
                { destination.name }
              </h1>
            </div>
            <div className="container card my-5 p-5">
              <p className="destination-description">
                <em>
                  { destination.description }
                </em>
              </p>
            </div>
          </>
      }
      <div className="container">
        <DestinationCarousel title="Top Eats" destinations={ yelpDestinations } />
        <DestinationCarousel title="Amusement Parks" destinations={ amusementParks } />
        <DestinationCarousel title="Beaches" destinations={ beaches } />
      </div>
    </>
  )
}

export default Destination
