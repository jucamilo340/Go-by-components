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

export const InputText = ({
  field,
  icon,
  disabled,
  type,
  fnKeyUp,
  fnBlur,
  fnFocus,
  form: { touched, errors },
  ...props
}: InputTextProps) => {
  const [isFocus, setIsFocus] = useState(false);
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
        'input ' +
        (props.className ? ' ' + props.className : '') +
        ((touched[field.name] && errors[field.name]) || haserror ? ' error' : '') +
        (field.value || isFocus ? ' is-animated' : '') +
        (icon ?? '')
      }
    >
      {props.title && <div className="input__label">{props.title}</div>}
      <div className="input__control">
        {props.label && <label>{props.label}</label>}
        <input
          {...field}
          {...props}
          onFocus={() => setIsFocus(true)}
          disabled={isDisabled}
          type={type ?? 'text'}
          onBlur={(e) => handleBlur(e)}
          value={field.value || ''}
          placeholder={props.placeholder || ''}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        {props.hasDelete && <div className="input__del" onClick={() => props.fnDelete()}></div>}
      </div>
    </div>
  );
};
