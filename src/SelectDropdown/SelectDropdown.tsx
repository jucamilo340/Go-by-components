import React, { useEffect, useState } from 'react';
import { FieldProps } from '../Formik/field-props';
import './styles.scss';

interface ISelectOption {
  value: any;
  option: any;
  url?: any;
}

interface ISelectField extends FieldProps {
  label?: string;
  elements: Array<ISelectOption>;
  title: string;
  disabled: Boolean;
  images: Boolean;
  search?: Boolean;
  fnChange: Function;
  placeholder: string;
  labelKey?: string;
  valueKey?: string;
  setValue?: any;
  defaultValue?:string
}

export const SelectDropdown = ({ field, form, form: { touched, errors }, ...props }: ISelectField) => {
  const [filter, setFilter] = useState(props.elements);
  const [selectEl, setSelectEl] = useState('');
  const [selectImg, setSelectImg] = useState('');
  const [show, setShow] = useState(false);
  const handleChange = (e: any, fnChange: any) => {
    if (typeof fnChange === 'function') {
      fnChange(e, props);
    }
    field.onChange(e);
  };
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (!event.target.closest('.select__drop')) {
        setShow(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const onFilter = (value: any) => {
    const newElements = props.elements.filter((e:any) => e[props?.labelKey ? props?.labelKey : 'option'].toLowerCase().includes(value.toLowerCase()));
    setFilter(newElements)
  }

  useEffect(() => {
    if(props.defaultValue){
      let currentCode: any = props?.elements?.filter((a: any) => a && a[props?.valueKey ? props?.valueKey : 'option'] === props.defaultValue);
      console.log(currentCode);
      setSelectEl(currentCode[0][props?.labelKey ? props?.labelKey : 'option'])
    }
}, [props.elements])
  

  return (
    <div
      className={
        'select' +
        (field.value !== 0 ? ' is-selected' : '') +
        (touched[field.name] && errors[field.name] ? ' error' : '')
      }
    >
      {props.title && <div className="select__label">{props.title}</div>}
      <div className="select__control select__drop">
        <input
          {...field}
          id={field.name}
          disabled={false}
          onChange={(e) =>{ handleChange(e, props.fnChange)}}
          onClick={()=> setShow(!show)}
          value={selectEl}
          className={`dropDown__inputSelect dropDown__input ${props.images && 'dropDown__inputP'}`}
          placeholder={props.placeholder}
          name={field.name}
        />
        {props.images && <img className="dropDown__imgInput" src={selectImg === '' ? require('../assets/images/world.svg').default : require(`../assets/images/${selectImg}.svg`).default} alt="" />}
        <div className={`dropDown__container ${!show && 'global__hidden'}`}>
          <div className="dropDown__panel">
           {props.search && 
            <div>
            <input placeholder={`Buscar ${field.name}...`} type="text" className="dropDown__input dropDown__inputP" onChange={(e)=> onFilter(e.target.value)}/>
             <img className="dropDown__imgInput" src={require('../assets/images/search.svg').default} alt="" />
           </div>}
            <div className="dropDown__options">
            {filter &&
            filter.map((element :any, idx) => (
              <div onClick={()=> { setSelectEl(props.labelKey ? element[props.labelKey] : element.option); setSelectImg(element.url); form.setFieldValue(field.name, props.valueKey ? element[props.valueKey] : element.option); setShow(false); props.setValue && props.setValue(props.valueKey ? element[props.valueKey] : element.option); props.fnChange && props.fnChange()}} key={idx} className="dropDown__opcion">
                {props.images &&       <div className="dropDown__imgCont">
                  <img src={require(`../assets/images/${element.url}.svg`).default} alt="" />
                </div>}
                <span>{props.labelKey ? element[props.labelKey] : element.option}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
