import React, { useState } from 'react';
import './styles.scss';
import { FieldProps } from '../Formik/field-props';

interface InputTextProps extends FieldProps {
  label: string;
  title: string;
  className: string;
  hasDelete: boolean;
  fnDelete: Function;
  icon: string;
  type: string;
  fnKeyUp: Function;
  fnBlur: Function;
  fnFocus: Function;
  disabled: boolean;
  haserror: boolean;
  placeholder?: string;
}

export const InputPassword = ({
  field,
  icon,
  disabled,
  type,
  fnKeyUp,
  fnBlur,
  fnFocus,
  className,
  form: { touched, errors },
  ...props
}: InputTextProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const isDisabled = disabled || false;
  const { haserror = false } = props;

  const handleBlur = (event: any) => {
    field.onBlur(event);
    setIsFocus(false);

    if (typeof fnBlur === 'function') {
      fnBlur(event);
    }
  };

  const handleKeyUp = (event: any) => {
    if (typeof fnKeyUp === 'function') {
      fnKeyUp(event);
    }
  };

  return (
    <div
      className={
        'input password__container'
      }
    >
      {props.title && <div className="input__label">{props.title}</div>}
      <div className="input__control">
        {props.label && <label>{props.label}</label>}
        <input
          {...field}
          {...props}
          //onFocus={() => setIsFocus(true)}
          disabled={isDisabled}
          type={visible ? 'text' : 'password'}
          value={field.value || ''}
          placeholder={props.placeholder || ''}
          onKeyUp={(e) => handleKeyUp(e)}
          className='password__input'
        />
        <img onClick={()=> setVisible(!visible)} src={visible ? require('../assets/images/eyeOpen.svg').default : require('../assets/images/eye.svg').default} className="img_eye" alt="" />
        <img src={require('../assets/images/lock.svg').default} className="img_lock" alt="" />
      </div>
    </div>
  );
};
