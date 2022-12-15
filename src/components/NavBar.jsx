import React, { Component } from 'react';
import style from '../styles/NavBar.module.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  buttonHandler = ({ target: { value } }) => {
    this.props.handleButton(value, true);
  };

  render() {
    return (
      <div className={style.navbar}>
        <a className={style.logo}>
          <img className={style.logoImg} src='/src/assets/codeCommerce.svg' />
          <span className={style.typeface}>codeCommerce</span>
        </a>
        <div className={style.buttonContainer}>
          <button onClick={this.buttonHandler} value='signup' className='btn-primary'>
            Sign up
          </button>
          <button onClick={this.buttonHandler} value='login' className='btn-secondary'>
            Log in
          </button>
          <a className='btn-icon'>
            <i className='fa-solid fa-cart-shopping'></i>
            {this.props.cartLength > 0 && <i className={style.alert}>{this.props.cartLength}</i>}
          </a>
        </div>
      </div>
    );
  }
}
