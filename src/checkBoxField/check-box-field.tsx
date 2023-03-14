import React from 'react';
import { ICheckboxProps } from './i-check-props';
import './styles.scss';

export const CheckboxField = (props: ICheckboxProps) => (
  <div className="checkbox is-padplus">
    <label>
      <input
        type="checkbox"
        {...props.field}
        checked={props.field.value !== undefined ? props.field.value : false}
      />
      <span>
        {' '}
        {props.children}
        {props.label}
      </span>
      <div className="check"></div>
    </label>
  </div>
);
