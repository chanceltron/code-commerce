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

  handleQuantity = (e) => {
    this.props.handleQuantity(e.target.value);
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
                <i className={`${style.trashIcon} fa-solid fa-trash-can`}></i>
                <div className={style.imgContainer}>
                  <img className={style.image} src={item.img} alt='' />
                </div>
                <div className={style.cardInfo}>
                  <h4 className={style.title}>{item.name}</h4>
                  {/* <p className={style.author}>{item.author}</p> */}
                  <div className={style.priceQty}>
                    <h3 className={style.price}>${item.price}</h3>
                    <input
                      className={style.qtyInput}
                      type='number'
                      placeholder='Qty'
                      value={item.quantity}
                      min='0'
                      step='1'
                      // onChange={}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
