import React, { Component } from 'react';
import Store from './components/Store';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import style from './styles/App.module.css';
import { OTHERCARDS } from './data/constants';

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isInLogin: false,
    isInSignup: false,
    isInCart: false,
    cart: [],
    users: [
      {
        id: Date.now(),
        email: 'chanceludwick@gmail.com',
        firstName: 'Chance',
        lastName: 'Ludwick',
        password: 'Bantrybay1!',
        postalCode: '76108',
      },
    ],
    hasDuplicate: false,
  };

  checkDuplicateUsers = (userInput) =>
    this.state.users.find((user) =>
      user.email === userInput.email ? true : false
    );

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

  handleButton = (value, bool) => {
    if (value === 'login') {
      this.setState({ isInLogin: bool });
    }
    if (value === 'signup') {
      this.setState({ isInSignup: bool });
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

  handleLogin = (loginUser) => {
    this.state.users.find((user) => {
      if (user.email === loginUser.email) {
        if (user.password === loginUser.password) {
          this.setState({ isLoggedIn: true });
          this.handleButton('login', false);
        } else {
          console.error('password is incorrect');
        }
      } else {
        console.error('user does not exist');
      }
    });
  };

  componentDidUpdate() {
    console.log(this.state.cart);
  }

  render() {
    const { isLoggedIn, isInLogin, isInSignup, isInCart } = this.state;

    //! Auto-open Signup Modal (for the sake of this project)
    // setTimeout(() => {
    //   this.setState({ isInSignup: true });
    // }, 2000);

    // Handle Login vs Signup Modal form
    let currentModal;
    if (isInLogin || isInSignup) {
      currentModal = (
        <LoginModal
          isInLogin={isInLogin}
          isInSignup={isInSignup}
          handleButton={this.handleButton}
          createNewUser={this.createNewUser}
          handleLogin={this.handleLogin}
        />
      );
    }

    return (
      <div>
        <NavBar
          handleButton={this.handleButton}
          cartLength={this.getCartSize()}
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
