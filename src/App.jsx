import React, { Component } from 'react';
import Courses from './components/Courses';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import style from './styles/App.module.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className='container'>
          <Hero />
          <Courses />
        </div>
      </div>
    );
  }
}
