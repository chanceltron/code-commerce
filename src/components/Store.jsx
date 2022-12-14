import React, { Component } from 'react';
import style from '../styles/Store.module.css';
import ItemCard from './ItemCard';

export default class Store extends Component {
  render() {
    return (
      <div>
        <h1 className={style.header}>A broad library of projects at your fingertips</h1>
        <div className={style.courseContainer}>
          <ItemCard />
        </div>
      </div>
    );
  }
}
