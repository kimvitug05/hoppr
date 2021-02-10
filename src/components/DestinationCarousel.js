import React from 'react'
import LocationCard from './LocationCard'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const DestinationCarousel = ({ destinations, title }) => {
  const carouselClass = title.replace(/\s+/g, '-').toLowerCase()

  const destinationComponents = destinations.map(destination =>
    <LocationCard title={ destination.name } photo={ destination.imageUrl } />
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
    <div className="pb-5">
      <h3 className='m-3 card-title text-left'>{ title }</h3>
      <Carousel
        keyBoardControl={ false }
        responsive={ responsive }
      >
        { destinationComponents }
      </Carousel>
    </div>
    // <div className="pb-5">
    //   <h3 className='m-3 card-title text-left'>{ title }</h3>
    //   <div className={ carouselClass + ' carousel slide' } data-ride="carousel" data-interval="false">
    //     <div className="carousel-inner">
    //       { destinationComponents }
    //       {/* <div className="carousel-item active">
    //         <div className="row">
    //           <div className="col-sm"><LocationCard title="Maui" photo="https://vacations.hawaiilife.com/sites/default/files/uploads/kahului_maui.jpg"/></div>
    //           <div className="col-sm"><LocationCard title="San Diego" photo="https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
    //           <div className="col-sm"><LocationCard title="Los Angeles" photo="https://images.unsplash.com/photo-1540232058434-8e7394b7e847?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
    //         </div>
    //       </div>
    //       <div className="carousel-item">
    //         <div className="row">
    //           <div className="col-sm"><LocationCard title="Paris" photo="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
    //           <div className="col-sm"><LocationCard title="Amsterdam" photo="https://images.unsplash.com/photo-1523889310790-cb91a98b017b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/></div>
    //           <div className="col-sm"><LocationCard title="Tokyo" photo="https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1962&q=80"/></div>
    //         </div>
    //       </div>
    //       <div className="carousel-item">
    //         <div className="row">
    //           <div className="col-sm"><LocationCard title="Palm Springs" photo="https://i.imgur.com/u2vbhHX.jpg"/></div>
    //           <div className="col-sm"><LocationCard title="Panama City" photo="https://i.imgur.com/AdMb935.jpg"/></div>
    //           <div className="col-sm"><LocationCard title="Honolulu" photo="https://i.imgur.com/9NmUOUs.jpg"/></div>
    //         </div>
    //       </div>
    //       <div className="carousel-item">
    //         <div className="row">
    //           <div className="col-sm"><LocationCard title="Memphis" photo="https://i.imgur.com/ponMPsT.jpg"/></div>
    //           <div className="col-sm"><LocationCard title="Pensacola" photo="https://i.imgur.com/T6wOrYP.jpg"/></div>
    //           <div className="col-sm"><LocationCard title="Las Vegas" photo="https://i.imgur.com/XKd050Z.jpg"/></div>
    //         </div>
    //       </div> */}
    //     </div>
    //     <a className="carousel-control-prev" href={ '.' + carouselClass } role="button" data-slide="prev">
    //       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //       <span className="sr-only">Previous</span>
    //     </a>
    //     <a className="carousel-control-next" href={ '.' + carouselClass } role="button" data-slide="next">
    //       <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //       <span className="sr-only">Next</span>
    //     </a>
    //   </div>
    // </div>  
  )
}

export default DestinationCarousel
