import React from 'react'
import LocationCard from './LocationCard'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const DestinationCarousel = ({ destinations, title }) => {
  const destinationComponents = destinations.map(destination =>
    <LocationCard key={ destination.name } destination={ destination } />
  )

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 3,
      slidesToSlide: 3, // optional, defaults to 1
    },
    tablet: {
      breakpoint: { max: 1300, min: 767 },
      items: 2,
      slidesToSlide: 2, // optional, defaults to 1
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, defaults to 1
    }
  }

  return (
    <div className="pb-4">
      <h3 className='m-3 card-title text-left'>{ title }</h3>
      <Carousel
        keyBoardControl={ false }
        responsive={ responsive }
      >
        { destinationComponents }
      </Carousel>
    </div>
  )
}

export default DestinationCarousel
