import React, { Component } from 'react';
import style from '../styles/Courses.module.css';

export default class Courses extends Component {
  render() {
    return (
      <div>
        <h1 className={style.header}>A stunning collection of components</h1>
        <div className={style.courseContainer}></div>
      </div>
    );
  }
}
