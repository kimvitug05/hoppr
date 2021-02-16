import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

import DestinationCarousel from './DestinationCarousel'
import axios from 'axios'
import './Destination.css'
const BASE_URL = `${process.env.REACT_APP_BASE_URL}/destinations`

const Destination = (props) => {
  const { currentUser } = useAuth()
  const [destination, setDestination] = useState(null)
  const [topActive, setTopActive] = useState([])
  const [topEats, setTopEats] = useState([])
  const [topEntertainment, setTopEntertainment] = useState([])
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
        setDestination(response.data)
      })
    }
    assignDestination()

    const assignTopEats = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.get(`${BASE_URL}/${slug}/top-eats`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).then((response) => {
        const mappedTopEats = response.data.map(business => ({
          imageUrl: business.image_url,
          name: business.name,
          url: business.url,
        }))
        setTopEats(mappedTopEats)
      })
    }
    assignTopEats()

    const assignTopEntertainment = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.get(`${BASE_URL}/${slug}/top-entertainment`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).then((response) => {
        const mappedTopEntertainment = response.data.map(business => ({
          imageUrl: business.image_url,
          name: business.name,
          url: business.url,
        }))
        setTopEntertainment(mappedTopEntertainment)
      })
    }
    assignTopEntertainment()

    const assignTopActive = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.get(`${BASE_URL}/${slug}/top-active`, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).then((response) => {
        const mappedTopActive = response.data.map(business => ({
          imageUrl: business.image_url,
          name: business.name,
          url: business.url,
        }))
        setTopActive(mappedTopActive)
      })
    }
    assignTopActive()
  }, [ currentUser, slug ])

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
            <div className="container card destination-description-wrapper">
              <p className="destination-description">
                <em>
                  { destination.description }
                </em>
              </p>
            </div>
          </>
      }
      <div className="container">
        {
          topEats.length &&
          <DestinationCarousel title="Top Eats" destinations={ topEats } />
        }
        {
          topEntertainment.length &&
          <DestinationCarousel title="Top Entertainment" destinations={ topEntertainment } />
        }
        {
          topActive.length &&
          <DestinationCarousel title="Top Active" destinations={ topActive } />
        }
      </div>
    </>
  )
}

export default Destination
