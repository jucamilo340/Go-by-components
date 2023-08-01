import './styles.scss'
import React, {  useState } from 'react';

interface ISelectOption {
  value: any;
  option: any;
}
interface InputUnderProps {
    className?: string;
    placeholder?: string;
    elements: Array<ISelectOption>;
    name?: string;
    onChange?: any;
    labelKey?: string;
    valueKey?: string;
    defaultValue?:string;
  }

export const SelectUnder = ({
    className,placeholder, elements,name,onChange,labelKey,valueKey
  }: InputUnderProps) => {
    const [show, setShow] = useState(false);
    const [selectEl, setSelectEl] = useState('');
    const handleBackdropClick = (event:any) => {
      if (event.target === event.currentTarget) {
        setShow(false);
      }
    };
    // useEffect(() => {
    //   if(props.defaultValue){
    //     let currentCode: any = props?.elements?.filter((a: any) => a && a[props?.valueKey ? props?.valueKey : 'option'] === props.defaultValue);
    //     setSelectEl(currentCode[0][props?.labelKey ? props?.labelKey : 'option'])
    //   }
    // }, [props.elements]);
    const selectElement = (element :any) => { setSelectEl(labelKey ? element[labelKey] : element.option);}
    return (
       <div onClick={handleBackdropClick} className="containerSelect">
         <div onClick={()=> setShow(!show)}>
           <input name={name} value={selectEl} className={`input SelectUnderLine ${className && className}`} placeholder={placeholder} autoComplete="off" type="text" />
           <img className="selectArrow" src={require('../assets/images/arrowDown.svg').default} alt="" />
         </div>
         <div className={`panelSelect ${!show && 'global__hidden'}`}>
            {elements.map((element:any,index)=> (
              <div key={index}  onClick={()=> {selectElement(element); onChange(element); setShow(false)}} className="opcion">
                <span>{labelKey ? element[labelKey] : element.option}</span>
                </div>
            ))}
         </div>
       </div>
    )
}