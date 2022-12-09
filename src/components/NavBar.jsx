import React, { Component } from 'react';
import style from '../styles/NavBar.module.css';

export default class NavBar extends Component {
  render() {
    return (
      <div className={style.navbar}>
        <a className={style.typeface}>codeCommerce</a>
        <div className={style.buttonContainer}>
          <button className='btn-primary'>Sign up</button>
          <button className='btn-secondary'>Log in</button>
          <a className='btn-icon'>
            <i class='fa-solid fa-cart-shopping'></i>
          </a>
        </div>
      </div>
    );
  }
}
