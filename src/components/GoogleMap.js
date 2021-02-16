import React, { useEffect, useState } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import ReactDOM from "react-dom"
import axios from 'axios'
import './GoogleMap.css'

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/destinations`

const MapContainer = (props) => {
  const { currentUser } = useAuth()
  const history = useHistory()
  const [activeMarker, setActiveMarker] = useState()
  const [destinationMarkers, setDestinationMarkers] = useState([])
  const [selectedPlace, setSelectedPlace] = useState()
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)

  useEffect(() => {
    const assignDestinationMarkers = async () => {
      let firebaseToken = ''
      if (currentUser) {
        firebaseToken = await currentUser.getIdToken()
      }
      await axios.get(BASE_URL, {
        headers: {
          Authorization: firebaseToken ? `Bearer ${firebaseToken}` : undefined
        }
      }).then((response) => {
        setDestinationMarkers(
          response.data.map(destination => (
            <Marker
              key={ destination.name }
              destination={ destination }
              position={ { lat: destination.latitude, lng: destination.longitude } }
              onClick={ onMarkerClick }
            />
          ))
        )
      })
    }
    assignDestinationMarkers()
  }, [ currentUser ])

  const onMapClicked = props => {
    if (showingInfoWindow) {
      setActiveMarker(null)
      setShowingInfoWindow(false)
    }
  }

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker)
    setSelectedPlace({
      ...props,
      destination: marker.destination,
    })
    setShowingInfoWindow(true)
  }

  const goToSelectedDestination = () => {
    history.push(`/destinations/${selectedPlace.destination.slug}`)
  }

  const onInfoWindowOpen = () => {
    const button = (
      <div className="d-flex flex-row justify-content-between card-body">
        <button onClick={ goToSelectedDestination } type="button" className="discover-title btn btn-link" style={{ textDecoration: "none", fontSize: "1.25em", padding: "0" }}>
          <h5 className="card-title mb-0 text-left text-truncate info-window-destination-name">
            { selectedPlace.destination.name }
          </h5>
        </button>
      </div>
    );

    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("card-content")
    );
  }

  return (
    <Map
      center={ (activeMarker || { position: { lat: 39.7392, lng: -104.9903 } }).position }
      google={ props.google }
      style={{ maxHeight: 'calc(100vh - 56px - 56px)' }}
      zoom={ 4 }
      onClick={ onMapClicked }
    >
      { destinationMarkers }
      {
        selectedPlace &&
        <InfoWindow
          position={ selectedPlace.position }
          onCloseClick={() => { setSelectedPlace(null) }}
          visible={ showingInfoWindow }
          onOpen={ () => onInfoWindowOpen() }
        >
          <div className="card full-width mb-3 overflow-hidden rounded info-window-card" >
            <img className="card-img-top full-width info-image" src={ selectedPlace.destination.imageUrl } alt="destination" />
            <div id="card-content" />
          </div>
        </InfoWindow>
      }
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY),
})(MapContainer)
