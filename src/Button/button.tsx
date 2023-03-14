import React from 'react';
import { IButton } from './i-button';
import './styles.scss';

export const Button = (props: IButton) => {
  const className = props.className || '';
  const action = props.onClick;
  const href = props.href;
  const disabled = props.disabled || false;
  const type = props.type || 'button';
  const text = props.text || props.children;

  return href ? (
    <a href={href} onClick={action} className={`btn ${className}`}>
      {props.text}
    </a>
  ) : (
    <button onClick={action} className={`btn ${className}`} disabled={disabled} type={type}>
      {text}
    </button>
  );
};
