import './style.scss';
import React from 'react';

export interface IModalC {
  show?: boolean;
  component? : any
}

export const CustomModal = (props: IModalC) => {
  const show = props.show || false;
  const component = props.component;

  return  (
      <div className={`${!show ? 'global__hidden' : ''} modalC`}>
        <div className="modalC__panel">
          {component}
        </div>
      </div>
    );
};