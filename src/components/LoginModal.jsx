import React, { Component } from 'react';
import style from '../styles/LoginModal.module.css';

export default class LoginModal extends Component {
  render() {
    return (
      <div className={style.loginModal}>
        <div className={style.modalContainer}>
          <div className={style.modalHeader}>
            <h1>Login</h1>
            <a>X</a>
          </div>
          <div className={style.modalBody}>
            <form className={style.modalForm}>
              <label className={style.label} htmlFor='email'>
                {' '}
                Email Address
              </label>
              <input className={style.input} type='email' id='email' />
              <label className={style.label} htmlFor='password'>
                {' '}
                Password
              </label>
              <input className={style.input} type='password' name='password' id='password' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
