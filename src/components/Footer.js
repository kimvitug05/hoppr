import React from 'react';

const Footer = () => {
  return (
  <footer className="footer text-white text-center text-lg-start" style={{ backgroundColor: "#73c7d2" }}>
    <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
      © 2021  <span>
        <img 
          src="/hoppr-logo2.png" 
          alt="logo" 
          className="logo-footer" 
          style={{ height: "1.25em", marginBottom: "0.28em" }} />
        </span> | We love our customers!
    </div>
  </footer>
  )
}

export default Footer
