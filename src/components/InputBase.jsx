import React from 'react';
import style from '../styles/InputBase.module.css';

export default function InputBase({
  icon,
  label,
  handlePassword,
  info,
  errorM,
  ...props
}) {
  return (
    <div className={style.inputField}>
      <div className={style.labelFields}>
        <label className={style.label}>{label}</label>
        <p className={style.errorMessage}>{errorM}</p>
      </div>
      <div className={style.inputWrapper}>
        <input className={style.input} {...props}></input>
        <i onClick={handlePassword} className={icon}></i>
      </div>
      <p className={style.info}>{info}</p>
    </div>
  );
}
