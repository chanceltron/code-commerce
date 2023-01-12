import React, { Component } from 'react';
import style from '../styles/Shipping.module.css';

export class Shipping extends Component {
  render() {
    return (
      <div className={style.shippingContainer}>
        <div className={style.shippingDrawer}>
          <h1>Shipping</h1>
        </div>
      </div>
    );
  }
}
