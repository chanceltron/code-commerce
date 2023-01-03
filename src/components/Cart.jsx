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

  handleDelete = () => {
    console.log('I am deleting this!');
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
                        // onChange={}
                      >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                      <a
                        onClick={this.handleDelete}
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
        </div>
      </div>
    );
  }
}
