import './style.scss';
import React from 'react';

export interface IModalC {
  show?: boolean;
  component? : any
  className? :string
}

export const CustomModal = (props: IModalC) => {
  const show = props.show || false;
  const component = props.component;
  const className = props.className;

  return  (
      <div className={`${!show ? 'global__hidden' : ''} modalC ${className}`}>
        <div className="modalC__panel">
          {component}
        </div>
      </div>
    );
};