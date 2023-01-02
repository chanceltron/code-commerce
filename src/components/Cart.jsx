import React, { Component } from 'react';
import style from '../styles/Cart.module.css';

export default class Cart extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    const { isInCart, handleNavButton } = this.props;
    return isInCart & handleNavButton('cart', false);
  };

  render() {
    return (
      <div className={style.cartContainer}>
        <div className={style.cartDrawer}>
          <a onClick={this.handleClose} className={style.cartClose}>
            X
          </a>
          <div className={style.cartHeader}>
            <h2>Summary</h2>
          </div>
          <div className={style.cartItems}>
            {this.props.cart.map((item) => (
              <div className={style.classCard} key={item.id}>
                <div className={style.imgContainer}>
                  <img src={item.img} alt='' />
                </div>
                <h4 className={style.title}>{item.name}</h4>
                <p className={style.author}>{item.author}</p>
                <h3 className={style.price}>${item.price}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
