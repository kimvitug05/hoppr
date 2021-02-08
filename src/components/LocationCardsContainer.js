import React from 'react'
import LocationCard from './LocationCard'

// https://github.com/lodash/lodash/blob/master/chunk.js
function chunk(array, size = 1) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}

const LocationCardsContainer = ({ destinations, title }) => {
  const carouselClass = title.replace(/\s+/g, '-').toLowerCase()

  const destinationComponents = chunk(destinations, 3).map((chunkedDestinations, index) => {
    let classes = 'carousel-item'
    if (index === 0) {
      classes += ' active'
    }

    return <div className={ classes } key={ index }>
      <div className="row">
        <div className="col-sm">{ chunkedDestinations.length && <LocationCard title={ chunkedDestinations[0].name } photo={ chunkedDestinations[0].imageUrl }/> }</div>
        <div className="col-sm">{ chunkedDestinations.length > 1 && <LocationCard title={ chunkedDestinations[1].name } photo={ chunkedDestinations[1].imageUrl }/> }</div>
        <div className="col-sm">{ chunkedDestinations.length > 2 && <LocationCard title={ chunkedDestinations[2].name } photo={ chunkedDestinations[2].imageUrl }/> }</div>
      </div>
    </div>
  })

  return (
    <div className="pb-5">
      <h3 className='m-3 card-title text-left'>{ title }</h3>
      <div className={ carouselClass + ' carousel slide' } data-ride="carousel" data-interval="false">
        <div className="carousel-inner">
          { destinationComponents }
          {/* <div className="carousel-item active">
            <div className="row">
              <div className="col-sm"><LocationCard title="Maui" photo="https://vacations.hawaiilife.com/sites/default/files/uploads/kahului_maui.jpg"/></div>
              <div className="col-sm"><LocationCard title="San Diego" photo="https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
              <div className="col-sm"><LocationCard title="Los Angeles" photo="https://images.unsplash.com/photo-1540232058434-8e7394b7e847?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-sm"><LocationCard title="Paris" photo="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
              <div className="col-sm"><LocationCard title="Amsterdam" photo="https://images.unsplash.com/photo-1523889310790-cb91a98b017b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
              <div className="col-sm"><LocationCard title="Tokyo" photo="https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1962&q=80"/></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-sm"><LocationCard title="Palm Springs" photo="https://i.imgur.com/u2vbhHX.jpg"/></div>
              <div className="col-sm"><LocationCard title="Panama City" photo="https://i.imgur.com/AdMb935.jpg"/></div>
              <div className="col-sm"><LocationCard title="Honolulu" photo="https://i.imgur.com/9NmUOUs.jpg"/></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col-sm"><LocationCard title="Memphis" photo="https://i.imgur.com/ponMPsT.jpg"/></div>
              <div className="col-sm"><LocationCard title="Pensacola" photo="https://i.imgur.com/T6wOrYP.jpg"/></div>
              <div className="col-sm"><LocationCard title="Las Vegas" photo="https://i.imgur.com/XKd050Z.jpg"/></div>
            </div>
          </div> */}
        </div>
        <a className="carousel-control-prev" href={ '.' + carouselClass } role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href={ '.' + carouselClass } role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>  
  )
}

export default LocationCardsContainer
