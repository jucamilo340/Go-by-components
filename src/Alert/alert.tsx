import { Button } from '../index';
import React from 'react';
import './styles.scss';
import { IAlert } from './i-alert';

export const Alert = (props: IAlert) => {
  const onClose = props.onClose;
  const text = props.text;
  const show = props.show || false;

  return  (
      <div className="alert">
        <div
        className={`${show ? 'alert__panel' : 'global__hidden'}`}
        >
           <img src={require('../assets/images/warningAlert.svg').default} className="alert__alertWarImg" alt="" />
           <span className="alert__textAlert">{text}</span>
           <img onClick={onClose} src={require('../assets/images/close.svg').default} className="alert__alertWarImg" alt="" />
      </div>
      </div>
    );
};