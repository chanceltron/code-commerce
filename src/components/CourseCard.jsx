import React, { Component } from 'react';
import style from '../styles/CourseCard.module.css';

import { courseList } from '../js/courseList';

export default function CourseCard() {
  return (
    <div className={style.cardsContainer}>
      {courseList.map((course) => (
        <div className={style.classCard} key={course.key}>
          <div className={style.imgContainer}>
            <img src={course.img} alt='' />
          </div>
          <h4 className={style.title}>{course.name}</h4>
          <p className={style.author}>{course.author}</p>
          <h3 className={style.price}>${course.price}</h3>
          <div className={style.btnContainer}>
            <button className={style.btn}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
