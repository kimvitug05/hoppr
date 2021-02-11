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

const BASE_URL = 'http://localhost:8080/destinations'

// const topDestinations = [
//   {
//     id: 1,
//     imageUrl: 'https://vacations.hawaiilife.com/sites/default/files/uploads/kahului_maui.jpg',
//     name: 'Maui',
//   },
//   {
//     id: 2,
//     imageUrl: 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
//     name: 'San Diego',
//   },
//   {
//     id: 3,
//     imageUrl: 'https://images.unsplash.com/photo-1540232058434-8e7394b7e847?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
//     name: 'Los Angeles',
//   },
//   {
//     id: 6,
//     imageUrl: 'https://images.unsplash.com/photo-1540232058434-8e7394b7e847?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
//     name: 'Los Angeles',
//   },
//   {
//     id: 5,
//     imageUrl: 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
//     name: 'San Diego',
//   },
//   {
//     id: 4,
//     imageUrl: 'https://vacations.hawaiilife.com/sites/default/files/uploads/kahului_maui.jpg',
//     name: 'Maui',
//   },
// ]

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
