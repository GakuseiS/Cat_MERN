import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import MainPage from '../pages/mainPage';
import CatalogPage from '../pages/catalogPage';
import './App.scss';
import FormPage from '../pages/formPage';
import CardPage from '../pages/cardPage';
import OrdersPage from '../pages/ordersPage';
import { AuthContext } from '../../context/AuthContext';
import ErrorContext from '../../context/ErrorContext'
import {useAuth} from '../../hooks/auth.hook'
import Loader from '../loader/loader'
import Message from '../message/message'
import {useError} from '../../hooks/error.hook'

function App() {
  const {token, userId, login, logout, ready} = useAuth()
  const isAuthenticated = !!token
  const {error, errorMessage} = useError()

  if(!ready) {
    return <Loader />
  }

  return (
    <div className='app'>
      <ErrorContext.Provider value={{error, errorMessage}}>
        <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
          <Router>
            {error && <Message>{error}</Message>}
            <Header />
            <Switch>
              <Route path='/catalog' component={CatalogPage} />
              {!isAuthenticated && <Route path='/form' component={FormPage} />}
              {isAuthenticated && <Route path='/card' component={CardPage} />}
              {isAuthenticated && <Route path='/orders' component={OrdersPage} />}
              <Route path='/' component={MainPage} />
              <Redirect to='/' />
            </Switch>
            <Footer />
          </Router>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </div>
  )
}

export default App;
