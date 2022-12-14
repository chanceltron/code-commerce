import React, { Component } from 'react';
import { itemList } from '../js/itemList';
import style from '../styles/LoginModal.module.css';

export default class LoginModal extends Component {
  state = {
    showPassword: false,
    passwordIcon: 'fa-regular fa-eye',
  };

  passwordType = this.state.showPassword ? 'text' : 'password';

  signupInputs = [
    { name: 'email', type: 'email' },
    { name: 'password', type: this.passwordType, icon: this.state.passwordIcon },
    { name: 'confirm password', type: this.passwordType, icon: this.state.passwordIcon },
  ];

  handlePassword = () => {
    this.setState({
      showPassword: this.state.showPassword ? false : true,
      passwordIcon: this.state.showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash',
    });
  };

  render() {
    const loginInputs = [
      { name: 'email', type: 'email' },
      { name: 'password', type: this.state.showPassword ? 'text' : 'password', icon: this.state.passwordIcon },
    ];
    return (
      <div className={style.loginModal}>
        <div className={style.modalContainer}>
          <div className={style.modalHeader}>
            <h1>Login</h1>
            <a>X</a>
          </div>
          <div className={style.modalBody}>
            <form className={style.modalForm}>
              {loginInputs.map((input) => (
                <div className={style.inputField} key={input.name}>
                  <label className={style.label} htmlFor={input.name}>
                    {input.name}
                  </label>
                  <div className={style.inputWrapper}>
                    <input className={style.input} type={input.type} id={input.name}></input>
                    <i onClick={this.handlePassword} className={input.icon}></i>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
