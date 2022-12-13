import React, { Component } from 'react';
import style from '../styles/Courses.module.css';
import CourseCard from './CourseCard';

export default class Courses extends Component {
  render() {
    return (
      <div>
        <h1 className={style.header}>A broad selection of courses</h1>
        <div className={style.courseContainer}>
          <CourseCard />
        </div>
      </div>
    );
  }
}
