import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div id="carouselContent" className="carousel slide carousel-fade" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselContent" data-slide-to="0" className="active"></li>
        <li data-target="#carouselContent" data-slide-to="1"></li>
        <li data-target="#carouselContent" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-caption">
            <h1>Travel The World With  <span>
                <img 
                  className="logo-fluid" 
                  src="./hoppr-logo.png" 
                  alt="logo"
                />
              </span>
            </h1>
            <p>Discover your new adventure today!</p>
            <a style={{ color: '#44a0b5', fontSize: '2em' }} href="#destinations" role="button">
              <i className="fa fa-angle-down"></i>            
            </a>
          </div>
          <img className="banner-photo d-block w-100" src="https://images.unsplash.com/photo-1531419859879-934d18f6c42d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="First slide" />
        </div>
        <div className="carousel-item">
          <div className="carousel-caption">
            <h1>Travel The World With  <span>
                <img 
                  className="logo-fluid" 
                  src="./hoppr-logo.png" 
                  alt="logo"
                />
              </span>
            </h1>
            <p>Discover your new adventure today!</p>
            <a style={{ color: '#44a0b5', fontSize: '2em' }} href="#destinations" role="button">
              <i className="fa fa-angle-down"></i>            
            </a>
          </div>
          <img className="banner-photo d-block w-100" src="https://images.unsplash.com/photo-1530250418330-cb2c35da5277?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <div className="carousel-caption">
            <h1>Travel The World With  <span>
                <img 
                  className="logo-fluid" 
                  src="./hoppr-logo.png" 
                  alt="logo"
                />
              </span>
            </h1>
            <p>Discover your new adventure today!</p>
            <a style={{ color: '#44a0b5', fontSize: '2em' }} href="#destinations" role="button">
              <i className="fa fa-angle-down"></i>            
            </a>
          </div>
          <img className="banner-photo d-block w-100" src="https://images.unsplash.com/photo-1512813195386-6cf811ad3542?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselContent" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselContent" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}

export default Banner
