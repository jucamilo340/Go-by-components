import { Button } from 'components';
import React from 'react';
import './style.scss';
import ErrorModal from '../assets/images/ErrorModal.svg'
import successModal from '../assets/images/success.svg'
import { IModal } from './i-modal';

export const Modal = (props: IModal) => {
  const success = props.success;
  const action = props.onClick;
  const onBack = props.onBack;
  const title = props.title;
  const text = props.text || '';
  const textbtn = props.textbtn;
  const show = props.show || false;

  return  (
      <div className={`${!show ? 'global__hidden' : ''} modal`}>
          <div className="modal__contImg">
              {success ? 
              <img className="modal__imgModal" src={successModal} alt="" />
               :
               <img className="modal__imgModal" src={ErrorModal} alt="" />
              }
          </div>
          <h1 className="modal__titleModal">{title}</h1>
          <p className="modal__textModal">{text}</p>
          <div className="global__center">
            {textbtn && <Button onClick={action} text={textbtn} className='global__btnGreenWP' />}
          </div>
          {onBack && <h2 onClick={onBack} className="modal__underline">Salir</h2>}
      </div>
    );
};