import React, { Component } from 'react';
import Store from './components/Store';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import style from './styles/App.module.css';

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isInLogin: false,
    isInSignup: false,
    isIinCart: false,
    cart: [],
  };

  addToCart = (item) => {
    this.setState((prevState) => ({ cart: [...prevState.cart, item] }));
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className='container'>
          <Hero />
          <Store />
        </div>
        <LoginModal />;
      </div>
    );
  }
}
