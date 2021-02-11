import React, { useState } from 'react'
import './UserProfile.css'
import DestinationCarousel from './DestinationCarousel'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import UserProfileModal from './UserProfileModal'

const UserProfile = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  
  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to Log Out')
    }
  }

  const topDestinations = [
    {
      id: 1,
      imageUrl: 'https://vacations.hawaiilife.com/sites/default/files/uploads/kahului_maui.jpg',
      name: 'Maui',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'San Diego',
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1540232058434-8e7394b7e847?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'Los Angeles',
    },
    {
      id: 1,
      imageUrl: 'https://vacations.hawaiilife.com/sites/default/files/uploads/kahului_maui.jpg',
      name: 'Maui',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'San Diego',
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1540232058434-8e7394b7e847?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'Los Angeles',
    }
  ]

  return (
    <div className="py-5">
        <UserProfileModal />
        {/* <div className="row">
          <div className="col">
            <div>
              <h2>Profile</h2>
              {
                error &&
                <div className="pb-2 alert alert-warning" role="alert" style={{ margin: "-1em"}}>
                  { error }
                </div>
              }
              <button className="btn btn-info" onClick={ handleLogout }>
                <i className="fas fa-sign-out-alt"></i>   
              </button>      
              <strong>Email:</strong> { currentUser.email }
              <Link className='btn btn-primary' to='update-profile'>Update Profile</Link>
            </div>
          </div>
        </div> */}
      <div className="container">
        <div className="pt-5">
          <DestinationCarousel title="Favorites" destinations={ topDestinations }/>
          <DestinationCarousel title="Recently Viewed" destinations={ topDestinations }/>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
