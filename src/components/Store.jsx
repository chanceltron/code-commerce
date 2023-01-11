import React, { Component } from 'react';
import style from '../styles/Store.module.css';
import { itemList } from '../data/itemList';

export default class Store extends Component {
  addToCart = (item) => this.props.addToCart(item);

  render() {
    return (
      <div>
        <h1 className={style.header}>
          A broad library of projects at your fingertips
        </h1>
        <div className={style.courseContainer}>
          <div className={style.cardsContainer}>
            {itemList.map((item) => (
              <div className={style.classCard} key={item.id}>
                <div className={style.imgContainer}>
                  <img src={item.img} alt='' />
                </div>
                <h4 className={style.title}>{item.name}</h4>
                <p className={style.author}>{item.author}</p>
                <h3 className={style.price}>${item.price}</h3>
                <div className={style.btnContainer}>
                  <button
                    onClick={() => this.addToCart(item)}
                    className={style.btn}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
