import React from 'react';
import style from '../styles/InputBase.module.css';

export default function InputBase({ icon, label, handlePassword, ...props }) {
  return (
    <div className={style.inputField}>
      <label className={style.label}>{label}</label>
      <div className={style.inputWrapper}>
        <input className={style.input} {...props}></input>
        <i onClick={handlePassword} className={icon}></i>
      </div>
    </div>
  );
}
