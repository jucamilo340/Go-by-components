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

export const InputNumber = ({
  field,
  icon,
  disabled,
  type,
  fnKeyUp,
  fnBlur,
  fnFocus,
  form,
  form: { touched, errors },
  ...props
}: InputTextProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const isDisabled = disabled || false;
  const { haserror = false } = props;
  const [value, setValue] = useState(field.value || '');

  const handleBlur = (event: any) => {
    field.onBlur(event);
    setIsFocus(false);

    if (typeof fnBlur === 'function') {
      fnBlur(event);
    }
  };

  const handleChange = (e:any) => {
    const inputValue = e.target.value;
    // Remueve cualquier caracter que no sea número
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setValue(numericValue);
    form.setFieldValue(field.name, numericValue);
  };

  const handleKeyPress = (e:any) => {
    // Obtiene el código de la tecla presionada
    const keyCode = e.keyCode || e.which;
    // Permite solamente los caracteres de número (0-9) y el botón de retroceso (8)
    if (keyCode < 48 || keyCode > 57) {
      e.preventDefault();
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
          placeholder={props.placeholder || ''}
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={`${icon && 'input__pdImage'}`}
        />
        {icon && <img className="input__iconR" src={require(`../assets/images/${icon}.svg`).default} alt="" />}
        {props.hasDelete && <div className="input__del" onClick={() => props.fnDelete()}></div>}
      </div>
    </div>
  );
};
