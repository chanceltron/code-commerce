import React, { Component } from 'react';
import Store from './components/Store';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import style from './styles/App.module.css';

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isInLogin: false, //! Change to false once done with styling
    isInSignup: false,
    isInCart: false,
    cart: [],
  };

  handleButton = (value, bool) => {
    if (value === 'login') {
      this.setState({ isInLogin: bool });
    }
    if (value === 'signup') {
      this.setState({ isInSignup: bool });
    }
  };

  addToCart = (item) => {
    this.setState((prevState) => ({ cart: [...prevState.cart, item] }));
  };

  render() {
    let currentModal;
    if (this.state.isInLogin || this.state.isInSignup) {
      currentModal = <LoginModal isInLogin={this.state.isInLogin} isInSignup={this.state.isInSignup} handleButton={this.handleButton} />;
    }
    return (
      <div>
        <NavBar handleButton={this.handleButton} cartLength={this.state.cart.length} />
        <div className='container'>
          <Hero />
          <Store />
        </div>
        {currentModal}
      </div>
    );
  }
}
