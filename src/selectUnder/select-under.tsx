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
  }

export const SelectUnder = ({
    className,placeholder, elements,name,onChange
  }: InputUnderProps) => {
    const [show, setShow] = useState(false);
    const [selectEl, setSelectEl] = useState({value: 0, option: placeholder});
    const handleBackdropClick = (event:any) => {
      if (event.target === event.currentTarget) {
        setShow(false);
      }
    };
    return (
       <div onClick={handleBackdropClick} className="containerSelect">
         <div onClick={()=> setShow(!show)}>
           <input name={name} value={selectEl.option} className={`input SelectUnderLine ${className && className}`} placeholder={placeholder} type="text" />
           <img className="selectArrow" src={require('../assets/images/arrowDown.svg').default} alt="" />
         </div>
         <div className={`panelSelect ${!show && 'global__hidden'}`}>
            {elements.map((e,index)=> (
              <div key={index}  onClick={()=> {setSelectEl(e); onChange(e); setShow(false)}} className="opcion"><span>{e.option}</span></div>
            ))}
         </div>
       </div>
    )
}