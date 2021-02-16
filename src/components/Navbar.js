import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [useHamburger, setUseHamburger] = useState(false)

  // https://usehooks.com/useWindowSize/
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    })

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize;
  }

  const size = useWindowSize()

  useEffect(() => {
    setUseHamburger(size.width < 993)
  }, [size])

  async function handleLogout() {
    await logout().then(() => {
      history.push('/login')
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img 
          className="img-fluid" 
          src="./hoppr-logo.png" 
          alt="logo"
        />
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/discover">Discover</Link>
          </li>
        </ul>
        {
          useHamburger ?
            (
              currentUser ?
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/edit-profile">Settings</Link>
                  </li>
                  <li className="nav-item">
                    <div className="cursor-pointer nav-link" onClick={ handleLogout }>Logout</div>
                  </li>
                </ul> :
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                </ul>
            ) :
            <ul className="navbar-nav ml-auto">
              {
                currentUser ?
                  <>
                    <li className="dropdown">
                      <a className="dropdown-toggle nav-link" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img
                          alt="user avatar"
                          className="align-self-center rounded-circle"
                          data-holder-rendered="true"
                          src={ currentUser.photoURL }
                          style={{ maxHeight: "2em" }}
                        ></img>
                        <span className="ml-2">
                          { currentUser.displayName }
                        </span>
                      </a>
                      <ul className="dropdown dropdown-menu dropdown-menu-dark dropdown-menu-right" aria-labelledby="userDropdown">
                        <li><Link className="dropdown-item py-2" to="/profile">Profile</Link></li>
                        <li><Link className="dropdown-item py-2" to="/edit-profile">Settings</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><div className="cursor-pointer dropdown-item py-2" onClick={ handleLogout }>Logout</div></li>
                      </ul>
                    </li>
                  </> :
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                  </>
              }
            </ul>
        }
      </div>
    </nav>
  )
}

export default Navbar
