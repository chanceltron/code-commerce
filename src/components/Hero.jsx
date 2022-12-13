import React, { Component } from 'react';
import style from '../styles/Hero.module.css';

export default class Hero extends Component {
  render() {
    return (
      <div className={style.heroContainer}>
        <div className={style.heroContent}>
          <h3 className={style.contentHeader}>
            Want to take your education <br /> to the next level?
          </h3>
          <p className={style.contentText}>codeCommerce has you covered</p>
        </div>
      </div>
    );
  }
}
