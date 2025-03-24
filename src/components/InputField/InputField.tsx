import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ value, onChange,onKeyDown, placeholder, type="text",required=false,className='',style={}}) => (
  <input
    type={type}
    className={`${styles.input}  ${className}`}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    required={required}
    suppressHydrationWarning={true}
    style={style}
  />
);