import React from 'react';
import './styles.scss';
import { IAlert } from './i-alert';
import warning from '../assets/images/warningAlert.svg';
import close from '../assets/images/close.svg';

export const Alert = (props: IAlert) => {
  const onClose = props.onClose;
  const text = props.text;
  const show = props.show || false;

  return  (
      <div className="alert">
        <div
        className={`${show ? 'alert__panel' : 'global__hidden'}`}
        >
           <img src={warning} className="alert__alertWarImg" alt="" />
           <span className="alert__textAlert">{text}</span>
           <img onClick={onClose} src={close} className="alert__alertWarImg" alt="" />
      </div>
      </div>
    );
};