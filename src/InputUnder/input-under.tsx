import './styles.scss'
import React from 'react'

interface InputUnderProps {
    className?: string;
    placeholder?: string;
    name?: string;
    onChange?: any;
    value?: any;
  }

export const InputUnder = ({
    className,placeholder,onChange,name,value
  }: InputUnderProps) => {
    return (
        <input name={name} value={value} className={`inputUnderLine ${className && className}`} onChange={onChange} placeholder={placeholder} type="text" />
    )
}