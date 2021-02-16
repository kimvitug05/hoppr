import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import DestinationCarousel from './components/DestinationCarousel'
import '@fortawesome/fontawesome-free/js/all.js'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import Destination from './components/Destination'
import EditProfile from './components/EditProfile'
import EditImageModal from './components/EditImageModal'
import Discover from './components/Discover'
import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import UserProfile from './components/UserProfile'
import { AuthProvider } from './contexts/AuthContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import PrivateRoute from './components/PrivateRoute'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

function App() {
  const [topBeachDestinations, setTopBeachDestinations] = useState([])
  const [topDestinations, setTopDestinations] = useState([])
  const [topOutdoorDestinations, setTopOutdoorDestinations] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}/top-beach-destinations`).then((response) => {
      setTopBeachDestinations(response.data);
    })
    axios.get(`${BASE_URL}/top-destinations`).then((response) => {
      setTopDestinations(response.data);
    })
    axios.get(`${BASE_URL}/top-outdoor-destinations`).then((response) => {
      setTopOutdoorDestinations(response.data);
    })
  }, [])

  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <div className="App">
            <Navbar />
            {/* ROUTES  */}
            <div className="main pb-5">
              <Switch>
                <Route exact path="/">
                  <Banner />
                  <div id='destinations' className="container py-5">
                    <DestinationCarousel title='Top Destinations' destinations={ topDestinations }/>
                    <DestinationCarousel title='Top Beach Destinations' destinations={ topBeachDestinations }/>
                    <DestinationCarousel title='Top Outdoor Destinations' destinations={ topOutdoorDestinations }/>
                  </div>
                </Route>
                <PrivateRoute exact path="/profile" component={ UserProfile } />
                <PrivateRoute path="/edit-profile" component={ EditProfile } />  
                <Route exact path="/login" component={ Login } /> 
                <Route exact path="/signup" component={ SignUp } />
                <Route exact path="/forgot-password" component={ ForgotPassword } />
                <Route exact path="/destinations/:slug" component={ Destination } />
                <Route exact path="/edit-avatar" component={ EditImageModal } />
                <Route exact path="/discover" component={ Discover } />
              </Switch>
            </div>

            {/* <UserProfile /> */}
            <Footer />
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
