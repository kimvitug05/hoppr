import React from 'react'

const LocationCard = ({ photo, title }) => {
  return (
  <div className="container">
    <div className="mb-3 card overflow-hidden rounded" style={{ width: "20rem", zIndex: "10", overflow: "hidden" }}>
      <img className="card-img-top" src={ photo } alt="Card image" style={{ width: "100%", zIndex: "1" }} />
      <div className="d-flex flex-row justify-content-between card-body">
        <h4 className="card-title mb-0 text-left text-truncate">{ title }</h4>
        <i className="far fa-heart fa-lg ml-2" style={{ color: "#c62828"  }}></i>
      </div>
    </div>
  </div>
  )
}

export default LocationCard
