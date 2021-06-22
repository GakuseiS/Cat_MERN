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

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          <Route path='/catalog' component={CatalogPage} />
          <Route path='/form' component={FormPage} />
          <Route path='/card' component={CardPage} />
          <Route path='/orders' component={OrdersPage} />
          <Route path='/' component={MainPage} />
          <Redirect to='/' />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
