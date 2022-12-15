import React, { Component } from 'react';
import { itemList } from '../js/itemList';
import style from '../styles/LoginModal.module.css';
import InputBase from './InputBase';

const INIT_SIGNUP = { email: '', password: '', confirmPassword: '', firstName: '', lastName: '', postalCode: '' };

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupInputs: INIT_SIGNUP,
      users: [],
      showPassword: false,
      passwordIcon: 'fa-regular fa-eye',
      isActive: false,
      activeID: '',
    };
  }

  handleFormSwitch = (e) => {
    this.setState({ isActive: true, activeID: e.target.name });
    if (e.target.value === 'login' && !this.props.isInLogin) {
      this.props.handleButton('login', true);
      this.props.handleButton('signup', false);
    } else {
      this.props.handleButton('signup', true);
      this.props.handleButton('login', false);
    }
  };

  handleClose = () => {
    if (this.props.isInLogin) {
      this.props.handleButton('login', false);
    } else {
      this.props.handleButton('signup', false);
    }
  };

  handlePassword = () => {
    this.setState({
      showPassword: this.state.showPassword ? false : true,
      passwordIcon: this.state.showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash',
    });
  };

  handleInputs = ({ target: { name, value } }) => {
    console.log(name);
    this.setState((prevState) => ({ signupInputs: { ...prevState.signupInputs, [name]: value } }));
  };

  handleNewUser = (e) => {
    e.preventDefault();
    const { email, firstName, lastName, password, postalCode } = this.state.signupInputs;
    const newUser = {
      id: Date.now(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      postalCode: postalCode,
    };
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
    }));
    this.props.handleButton('login', true);
    this.props.handleButton('signup', false);
  };

  handleLogin = () => {
    e.preventDefault();
    console.log('Handling Login');
  };

  componentDidMount() {
    this.props.isInLogin ? this.setState({ isActive: true, activeID: 'login' }) : this.setState({ isActive: true, activeID: 'signup' });
  }

  render() {
    const loginInputs = [
      { name: 'email', type: 'email', label: 'Email Address *' },
      { name: 'password', type: this.state.showPassword ? 'text' : 'password', icon: `${this.state.passwordIcon} ${style.passIcon}`, label: 'Password *' },
    ];

    const signupInputs = [
      { name: 'email', type: 'email', label: 'Email Address *' },
      { name: 'password', type: this.state.showPassword ? 'text' : 'password', icon: `${this.state.passwordIcon} ${style.passIcon}`, label: 'Password *' },
      { name: 'confirmPassword', type: this.state.showPassword ? 'text' : 'password', icon: `${this.state.passwordIcon} ${style.passIcon}`, label: 'Confirm Password *' },
      { name: 'firstName', type: 'text', label: 'First Name *' },
      { name: 'lastName', type: 'text', label: 'Last Name *' },
      { name: 'postalCode', type: 'text', label: 'Postal Code' },
    ];

    const switchers = [
      { name: 'signup', label: 'Create Account' },
      { name: 'login', label: 'Sign in' },
    ];

    let userForm;
    if (this.props.isInLogin) {
      userForm = (
        <form onSubmit={this.handleLogin} className={style.modalForm}>
          {loginInputs.map((input) => (
            <InputBase
              key={input.name}
              type={input.type}
              name={input.name}
              value={this.state.signupInputs[input.name]}
              onChange={this.handleInputs}
              autoComplete='off'
              icon={input.icon}
              label={input.label}
              handlePassword={this.handlePassword}
              // onBlur={}
              // error={}
            />
          ))}
          <button className={`${style.btn} btn-primary`}>Sign in</button>
          <div className='divider'>or</div>
          <button className={`${style.btn} btn-fb`}>
            <i className='fa-brands fa-facebook-f'></i>
            <p>Sign in with Facebook</p>
          </button>
        </form>
      );
    } else if (this.props.isInSignup) {
      userForm = (
        <form onSubmit={this.handleNewUser} className={style.modalForm}>
          {signupInputs.map((input) => (
            <InputBase
              key={input.name}
              type={input.type}
              name={input.name}
              value={signupInputs && this.state.signupInputs[input.name]}
              onChange={this.handleInputs}
              autoComplete='off'
              icon={input.icon}
              label={input.label}
              handlePassword={this.handlePassword}
              // onBlur={}
              // error={}
            />
          ))}
          <button className={`${style.btn} btn-primary`}>Create Account</button>
          <div className='divider'>or</div>
          <button className={`${style.btn} btn-fb`}>
            <i className='fa-brands fa-facebook-f'></i>
            <p>Sign up with Facebook</p>
          </button>
        </form>
      );
    }
    return (
      <div className={style.loginModal}>
        <div className={style.modalContainer}>
          <a onClick={this.handleClose} className={style.modalClose}>
            X
          </a>
          <div className={style.modalHeader}>
            <div className={style.switcherBtns}>
              {switchers.map((switcher) => (
                <button
                  key={switcher.name}
                  name={switcher.name}
                  className={`${style.switcher} ${this.state.isActive && this.state.activeID === switcher.name ? style.active : ''}`}
                  value={switcher.name}
                  onClick={this.handleFormSwitch}>
                  {switcher.label}
                </button>
              ))}
            </div>
          </div>
          <div className={style.modalBody}>{userForm}</div>
        </div>
      </div>
    );
  }
}
