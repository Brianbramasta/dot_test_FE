import React from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' ,
  style={}
}) => (
  <button 
    className={`${styles.button} ${styles[variant]}`}
    style={style}
    onClick={onClick}
  >
    {children}
  </button>
);