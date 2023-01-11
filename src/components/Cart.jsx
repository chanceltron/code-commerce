import React, { Component } from 'react';
import style from '../styles/Cart.module.css';

import { itemList } from '../data/itemList';

export default class Cart extends Component {
  handleClose = () => {
    const { isInCart, handleNavButton } = this.props;
    return isInCart & handleNavButton('isInCart', false);
  };

  handleQuantity = (e) => this.props.handleQuantity(e.target.value);

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
            <h4>Total Items:</h4>
            <h4>{this.props.cartLength}</h4>
          </div>
        </div>
      </div>
    );
  }
}
