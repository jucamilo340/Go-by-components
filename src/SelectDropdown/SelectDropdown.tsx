import React, { useEffect, useState } from 'react';
import './styles.scss';

interface FieldProps {
    field: {
      onChange: any;
      onBlur: any;
      value: any;
      name: string;
    };
    form: any;
  }
  

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
  box?: Boolean;
}

 export const  SelectDropdown = ({ field, form, form: { touched, errors }, ...props }: ISelectField) => {
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
      setSelectEl(currentCode[0][props?.labelKey ? props?.labelKey : 'option'])
    }
}, [props.elements]);

const [selectedOptions, setSelectedOptions] = useState([]);

const changeFilter = (element: any) => {

  const isSelected = selectedOptions.some((option:any) => option === (props.valueKey ? element[props.valueKey] : element.value ));

  if (isSelected) {
    const updatedOptions = selectedOptions.filter((option:any) => option !== (props.valueKey ? element[props.valueKey] : element.value ));
    setSelectedOptions(updatedOptions);
    props.fnChange && props.fnChange(updatedOptions);
    props.setValue(updatedOptions)
  } else {
    const updatedOptions:any = [...selectedOptions, props.valueKey ? element[props.valueKey] : element.value];
    setSelectedOptions(updatedOptions);
    props.fnChange && props.fnChange(updatedOptions);
    props.setValue(updatedOptions);
  }
};

const selectElement = (element :any) => { setSelectEl(props.labelKey ? element[props.labelKey] : element.option); setSelectImg(element.url); form.setFieldValue(field.name, props.valueKey ? element[props.valueKey] : element.option); setShow(false); props.setValue && props.setValue(props.valueKey ? element[props.valueKey] : element.option); props.fnChange && props.fnChange(element,setSelectEl)}
  
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
          autoComplete="off"
        />
        {props.images && <img className="dropDown__imgInput" src={selectImg === '' ? require('../assets/images/world.svg').default : require(`../assets/images/${selectImg}.svg`).default} alt="" />}
        <div className={`dropDown__container ${!show && 'global__hidden'}`}>
          <div className="dropDown__panel">
           {props.search && 
            <div>
            <input autoComplete="off" placeholder={`Buscar ${props.title?.replace('*','')}...`} type="text" className="dropDown__input dropDown__inputP" onChange={(e)=> onFilter(e.target.value)}/>
             <img className="dropDown__imgInput" src={require('../assets/images/search.svg').default} alt="" />
           </div>}
            <div className="dropDown__options">
            {filter &&
            filter.map((element :any, idx) => (
              <div 
               onClick={()=> { !props?.box ? selectElement(element) : changeFilter(element)}}
               key={idx} className={props.box ? ` dropDown__opcion dropDown__opcionI` : `dropDown__opcion`}>
                {props.images &&       <div className="dropDown__imgCont">
                  <img src={require(`../assets/images/${element.url}.svg`).default} alt="" />
                </div>}
                <span>{props.labelKey ? element[props.labelKey] : element.option}</span>
{props.box &&                <input
                  type="checkbox"
                  className="checkElement"
                  checked={selectedOptions.some((option: any) => option === (props.valueKey ? element[props.valueKey] : element.value ))}
                />}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
