import React, { Component } from 'react';
import style from '../styles/Checkout.module.css';
import { Shipping } from './Shipping';
import { Cart } from './Cart';

import { itemList } from '../data/itemList';

export default class Checkout extends Component {
  state = {
    isInCart: true,
    isInShipping: false,
  };

  handleClose = () => {
    const { isInCart, handleNavButton } = this.props;
    return isInCart & handleNavButton('isInCart', false);
  };

  render() {
    let shippingPopout;

    const emptyCartWarning = !this.props.cartLength && (
      <div className={style.emptyCartWarningContainer}>
        <div>
          <i className='fa-sharp fa-solid fa-circle-exclamation'></i>
        </div>
        <h3>Your Cart is Empty!</h3>
      </div>
    );

    const totalPrice = this.props.cart.reduce((acc, currentItem) => {
      return (+acc + currentItem.price * currentItem.quantity).toFixed(2);
    }, 0);

    return (
      <div>
        <div className={style.checkoutContainer}>
          <div className={style.checkoutDrawer}>
            <a onClick={this.handleClose} className={style.cartClose}>
              X
            </a>
            <div className={style.cartHeader}>
              <h2>Summary</h2>
            </div>
            <Cart
              cart={this.props.cart}
              handleQuantity={this.props.handleQuantity}
              handleRemoveFromCart={this.props.handleRemoveFromCart}
              emptyCartWarning={emptyCartWarning}></Cart>
            <div className={style.cartSummary}>
              <div className={style.itemTotal}>
                <h3>Total Items:</h3>
                <h3>{this.props.cartLength}</h3>
              </div>
              <h2>${totalPrice}</h2>
            </div>
            <div className={style.checkoutBtnContainer}>
              <button
                disabled={this.props.cartLength === 0}
                className={`${style.checkoutBtn} ${
                  this.props.cartLength === 0 && `disabled`
                } btn-primary btn`}>
                Checkout
              </button>
            </div>
          </div>
        </div>
        {shippingPopout}
      </div>
    );
  }
}
