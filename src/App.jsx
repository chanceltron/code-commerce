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
    cart: [], //initCart,
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
      (totalItems, item) => +totalItems + +item.quantity,
      0
    );
  };

  handleNavButton = (value, bool) => this.setState({ [value]: bool });

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

  // TODO - Figure out how to update the quantity of a specific item in the cart
  handleQuantity = (itemId, newValue) => {
    this.setState({
      cart: this.state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity: +newValue } : item
      ),
    });
  };

  handleRemoveFromCart = (itemId) => {
    console.log(this.state.cart.filter((item) => itemId !== item.id));
    const updateCart = this.state.cart.filter((item) => itemId !== item.id);
    this.setState({ cart: updateCart });
  };

  // Disable the scroll while in a modal or cart
  componentDidMount = () => (document.body.style.overflow = 'hidden');
  componentDidUpdate() {
    const { isInSignup, isInLogin, isInCart } = this.state;
    !isInSignup && !isInLogin && !isInCart
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  }

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
          cartLength={this.getCartSize()}
          handleRemoveFromCart={this.handleRemoveFromCart}
          handleQuantity={this.handleQuantity}
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
