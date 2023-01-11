import React, { Component } from 'react';
import Store from './components/Store';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import Cart from './components/Cart';

import { itemList } from './data/itemList';
import style from './styles/App.module.css';

const initCart = [itemList[0], itemList[2], itemList[3], itemList[5]];

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isInLogin: false,
    isInSignup: false,
    isInCart: true,
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
    } else if (value === 'signup') {
      this.setState({ isInSignup: bool });
    } else {
      this.setState({ isInCart: bool });
    }
  };

  addToCart = (newItem) => {
    const cartHasDuplicate = this.state.cart.find(
      (item) => item.id === newItem.id
    );
    !cartHasDuplicate &&
      this.setState((prevState) => ({
        cart: [...prevState.cart, newItem],
      }));
  };

  handleLogin = () => this.setState({ isLoggedIn: true });

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

  // TODO - Figure out how to update the quantity of a specific item in the cart
  handleQuantity = (value) => {
    this.setState((prevState) => ({ cart: [...prevState.cart] }));
  };

  render() {
    const { isLoggedIn, isInLogin, isInSignup, isInCart, cart, users } =
      this.state;

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
          users={users}
        />
      );
    }

    let cartDrawer;
    if (isInCart) {
      cartDrawer = (
        <Cart
          isInCart={isInCart}
          handleNavButton={this.handleNavButton}
          cart={cart}
        />
      );
    }

    return (
      <div>
        <NavBar
          handleNavButton={this.handleNavButton}
          cartLength={this.getCartSize()}
          isLoggedIn={isLoggedIn}
        />
        <div className='container'>
          <Hero />
          <Store addToCart={this.addToCart} />
        </div>
        {currentModal}
        {cartDrawer}
      </div>
    );
  }
}
