import React, { Component } from 'react';
import style from '../styles/NavBar.module.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  buttonHandler = (value) => {
    this.props.handleButton(value);
  };

  render() {
    return (
      <div className={style.navbar}>
        <a className={style.logo}>
          <img className={style.logoImg} src='/src/assets/codeCommerce.svg' />
          <span className={style.typeface}>codeCommerce</span>
        </a>
        <div className={style.buttonContainer}>
          <button className='btn-primary'>Sign up</button>
          <button className='btn-secondary'>Log in</button>
          <a className='btn-icon'>
            <i className='fa-solid fa-cart-shopping'></i>
            <i className={`fa-solid fa-circle-exclamation ${style.alert}`}></i>
          </a>
        </div>
      </div>
    );
  }
}
