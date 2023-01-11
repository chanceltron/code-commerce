import React, { Component } from 'react';
import { INIT_SIGNUP } from '../data/constants';
import style from '../styles/LoginModal.module.css';
import InputBase from './InputBase';

import {
  onlyTextValidation,
  passwordComplexityValidation,
  passwordMatchValidation,
  emailValidation,
  postalCodeValidation,
} from '../data/validations';

export default class LoginModal extends Component {
  state = {
    signupInputs: INIT_SIGNUP,
    showPassword: false,
    passwordIcon: 'fa-regular fa-eye',
    isActive: false,
    activeID: '',
    error: {},
    signupHasError: false,
  };

  submitErrorCheck = () => {
    const { signupHasError } = this.state;
    let isError = false;
    if (signupHasError) {
      isError = true;
    }
    return isError;
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { handleLogin, handleNavButton } = this.props;
    const { email, password } = this.state.signupInputs;

    this.props.users.find((user) => {
      if (user.email === email) {
        if (user.password === password) {
          handleLogin();
          handleNavButton('login', false);
        } else {
          console.error('password is incorrect');
          this.setState((prevState) => ({
            signupInputs: { ...prevState.signupInputs, password: '' },
          }));
        }
      } else {
        console.error('user does not exist');
      }
    });
  };

  handleFormSwitch = (e) => {
    const { handleNavButton } = this.props;
    this.setState({ isActive: true, activeID: e.target.name });
    if (e.target.value === 'login' && !this.props.isInLogin) {
      handleNavButton('login', true);
      handleNavButton('signup', false);
    } else {
      handleNavButton('signup', true);
      handleNavButton('login', false);
    }
  };

  handleClose = () => {
    const { isInLogin, handleNavButton } = this.props;
    return isInLogin
      ? handleNavButton('login', false)
      : handleNavButton('signup', false);
  };

  handlePassword = () => {
    this.setState({
      showPassword: this.state.showPassword ? false : true,
      passwordIcon: this.state.showPassword
        ? 'fa-regular fa-eye'
        : 'fa-regular fa-eye-slash',
    });
  };

  handleInputs = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      signupInputs: { ...prevState.signupInputs, [name]: value },
    }));
  };

  handleNewUser = (e) => {
    e.preventDefault();

    const { handleNavButton, createNewUser } = this.props;
    const { email, firstName, lastName, password, postalCode } =
      this.state.signupInputs;
    const errorCheck = this.submitErrorCheck();
    const newUser = {
      id: Date.now(),
      email,
      firstName,
      lastName,
      password,
      postalCode,
    };
    if (!errorCheck) {
      handleNavButton('login', true);
      handleNavButton('signup', false);
      createNewUser(newUser);

      this.setState(() => ({
        signupInputs: INIT_SIGNUP,
      }));
    }
  };

  errorStateToggle = (errorText) => {
    if (errorText) {
      this.setState({ signupHasError: true });
    } else {
      this.setState({ signupHasError: false });
    }
  };

  handleValidation = (type, value) => {
    let errorText;
    switch (type) {
      case 'email':
        errorText = emailValidation(this.props.users, value);
        this.setState((prevState) => ({
          error: { ...prevState.error, emailError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'password':
        errorText = passwordComplexityValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, passwordComplexityError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'confirmPassword':
        errorText = passwordMatchValidation(
          this.state.signupInputs.password,
          value
        );
        this.setState((prevState) => ({
          error: { ...prevState.error, passwordMatchError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'firstName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, firstNameError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'lastName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, lastNameError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'postalCode':
        errorText = postalCodeValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, postalCodeError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      default:
        break;
    }
  };

  handleBlur = ({ target: { name, value } }) =>
    this.handleValidation(name, value);

  componentDidMount() {
    this.props.isInLogin
      ? this.setState({ isActive: true, activeID: 'login' })
      : this.setState({ isActive: true, activeID: 'signup' });
  }

  render() {
    const { error } = this.state;

    const loginInputs = [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address *',
      },
      {
        name: 'password',
        type: this.state.showPassword ? 'text' : 'password',
        icon: `${this.state.passwordIcon} ${style.passIcon}`,
        label: 'Password *',
      },
    ];

    const signupInputs = [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address *',
        error: 'emailError',
      },
      {
        name: 'password',
        type: this.state.showPassword ? 'text' : 'password',
        icon: `${this.state.passwordIcon} ${style.passIcon}`,
        label: 'Create Password *',
        info: 'Password must be 8-20 characters, including at least once capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
        error: 'passwordComplexityError',
      },
      {
        name: 'confirmPassword',
        type: this.state.showPassword ? 'text' : 'password',
        icon: `${this.state.passwordIcon} ${style.passIcon}`,
        label: 'Confirm Password *',
        error: 'passwordMatchError',
      },
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name *',
        error: 'firstNameError',
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last Name *',
        error: 'lastNameError',
      },
      {
        name: 'postalCode',
        type: 'text',
        label: 'Postal Code',
        error: 'postalCodeError',
      },
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
              info={input.info}
              handlePassword={this.handlePassword}
              onBlur={this.handleBlur}
              errorM={
                error && error[input.error] && error[input.error].length > 1
                  ? error[input.error]
                  : null
              }
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
                  className={`${style.switcher} ${
                    this.state.isActive && this.state.activeID === switcher.name
                      ? style.active
                      : ''
                  }`}
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
