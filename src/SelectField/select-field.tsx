import React from 'react';
import { FieldProps } from '../Formik/field-props';
import './styles.scss';

interface ISelectOption {
  value: any;
  option: any;
}

interface ISelectField extends FieldProps {
  label?: string;
  elements: Array<ISelectOption>;
  title: string;
  disabled: Boolean;
  fnChange: Function;
}

export const SelectField = ({ field, form: { touched, errors }, ...props }: ISelectField) => {
  const handleChange = (e: any, fnChange: any) => {
    if (typeof fnChange === 'function') {
      fnChange(e, props);
    }

    field.onChange(e);
  };

  return (
    <div
      className={
        'select' +
        (field.value !== 0 ? ' is-selected' : '') +
        (touched[field.name] && errors[field.name] ? ' error' : '')
      }
    >
      {props.title && <div className="select__label">{props.title}</div>}
      <div className="select__control">
        <select
          {...field}
          id={field.name}
          disabled={props.disabled ? true : false}
          onChange={(e) => handleChange(e, props.fnChange)}
        >
          {props.elements &&
            props.elements.map((element, idx) => (
              <option value={element.value} key={idx}>
                {element.option}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
