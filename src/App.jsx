import React, { Component } from 'react';
import Store from './components/Store';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';

import { itemList } from './data/itemList';
import style from './styles/App.module.css';

const initCart = [itemList[0], itemList[2], itemList[3], itemList[5]];

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isInLogin: false,
    isInSignup: true,
    isInCart: false,
    cart: initCart,
    users: [
      {
        id: Date.now(),
        email: 'test@codecommerce.com',
        firstName: 'Chance',
        lastName: 'Ludwick',
        password: 'SuperSecure1!',
        postalCode: '55555',
      },
    ],
    hasDuplicate: false,
  };

  createNewUser = (newUser) => {
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
    }));
  };

  getCartSize = () => {
    return this.state.cart.reduce(
      (totalItems, item) => totalItems + item.quantity,
      0
    );
  };

  handleNavButton = (value, bool) => {
    if (value === 'login') {
      this.setState({ isInLogin: bool });
    }
    if (value === 'signup') {
      this.setState({ isInSignup: bool });
    } else {
      this.setState({ value: bool });
    }
  };

  addToCart = (newItem) => {
    const duplicate = this.state.cart.find((item) => item.id === newItem.id);
    if (duplicate) {
      return;
    } else {
      this.setState((prevState) => ({ cart: [...prevState.cart, newItem] }));
    }
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentDidUpdate() {
    const { isInSignup, isInLogin, isInCart } = this.state;
    if (!isInSignup && !isInLogin && !isInCart) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  render() {
    const { isLoggedIn, isInLogin, isInSignup, isInCart } = this.state;

    // Handle Login vs Signup Modal form
    let currentModal;
    if (isInLogin || isInSignup) {
      currentModal = (
        <LoginModal
          isInLogin={isInLogin}
          isInSignup={isInSignup}
          handleNavButton={this.handleNavButton}
          createNewUser={this.createNewUser}
          handleLogin={this.handleLogin}
          users={this.state.users}
        />
      );
    }

    return (
      <div>
        <NavBar
          handleNavButton={this.handleNavButton}
          cartLength={this.getCartSize()}
          isLoggedIn={this.state.isLoggedIn}
        />
        <div className='container'>
          <Hero />
          <Store addToCart={this.addToCart} />
        </div>
        {currentModal}
      </div>
    );
  }
}
