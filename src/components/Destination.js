import React, { useEffect, useState } from 'react'
import LocationCard from './LocationCard'
import DestinationCarousel from './DestinationCarousel'
import { Switch } from 'react-router-dom'
import axios from 'axios'
import './Destination.css'
const BASE_URL = 'http://localhost:8080/destinations'
const restaurants = require('../data/yelp_places.json')
const amusement = require('../data/amusement.json')
const beach = require('../data/beaches.json')

const Destination = (props) => {
  const [destination, setDestination] = useState(null)
  const slug = props.match.params.slug

  useEffect(() => {
    axios.get(`${BASE_URL}/${slug}`).then((response) => {
      setDestination(response.data);
    })
  }, [ slug ])

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
              <p>
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
