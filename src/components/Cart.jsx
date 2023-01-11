import React, { Component } from 'react';
import style from '../styles/Cart.module.css';

import { itemList } from '../data/itemList';

export default class Cart extends Component {
  handleClose = () => {
    const { isInCart, handleNavButton } = this.props;
    return isInCart & handleNavButton('isInCart', false);
  };

  render() {
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
      <div className={style.cartContainer}>
        <div className={style.cartDrawer}>
          <a onClick={this.handleClose} className={style.cartClose}>
            X
          </a>
          <div className={style.cartHeader}>
            <h2>Summary</h2>
          </div>
          <div className={style.cartItems}>
            {emptyCartWarning}
            {this.props.cart.map((item) => (
              <div className={style.classCard} key={item.id}>
                <div className={style.imgContainer}>
                  <img className={style.image} src={item.img} alt='' />
                </div>
                <div className={style.cardInfo}>
                  <h4 className={style.title}>{item.name}</h4>
                  <div className={style.priceQty}>
                    <h3 className={style.price}>${item.price}</h3>
                    <div className={style.quantityContainer}>
                      <select
                        name='qty'
                        id='qty'
                        className={style.qtyInput}
                        placeholder='Qty'
                        value={item.quantity}
                        readOnly
                        onChange={({ target: { value } }) => {
                          this.props.handleQuantity(item.id, value);
                        }}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                      <a
                        onClick={() => this.props.handleRemoveFromCart(item.id)}
                        className={style.deleteBtn}>
                        <i
                          className={`${style.trashIcon} fa-solid fa-trash-can`}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
    );
  }
}
