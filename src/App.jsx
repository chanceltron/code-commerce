import React, { Component } from 'react';
import Courses from './components/Courses';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import LoginPage from './components/LoginModal';
import NavBar from './components/NavBar';
import style from './styles/App.module.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isInLogin: false,
      isInSignup: false,
      isIinCart: false,
      cart: [],
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className='container'>
          <Hero />
          <Courses />
        </div>
        <LoginModal />;
      </div>
    );
  }
}
