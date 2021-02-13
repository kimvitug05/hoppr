import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import DestinationCarousel from './components/DestinationCarousel'
import '@fortawesome/fontawesome-free/js/all.js'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import Destination from './components/Destination'
import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import UserProfile from './components/UserProfile'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import axios from 'axios'

const BASE_URL = 'http://localhost:8080/top-destinations'

function App() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      setDestinations(response.data);
    })
  }, [])

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          {/* ROUTES  */}
          <div className="main pb-5">
            <Switch>
              <Route exact path="/">
                <Banner />
                <div id='destinations' className="container py-5">
                  <DestinationCarousel title='Top Destinations' destinations={ destinations }/>
                  <DestinationCarousel title='Top Beaches' destinations={ destinations }/>
                  <DestinationCarousel title='Top International' destinations={ destinations }/>
                </div>
              </Route>
              <PrivateRoute exact path="/profile" component={ UserProfile } /> 
              <Route exact path="/login" component={ Login } /> 
              <Route exact path="/signup" component={ SignUp } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/forgot-password" component={ ForgotPassword } />
              <Route exact path="/destinations/:slug" component={ Destination } />
            </Switch>
          </div>

          {/* <UserProfile /> */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
