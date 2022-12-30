import React, { Component } from 'react';
import style from '../styles/ItemCard.module.css';

import { itemList } from '../data/itemList';

export default function ItemCard(props) {
  return (
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
            <button onClick={props.addToCart(item)} className={style.btn}>
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
