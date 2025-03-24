import React from 'react';
import styles from './CustomButton.module.css';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => (
  <button 
    className={`${styles.button} ${styles[variant]}`}
    onClick={onClick}
  >
    {children}
  </button>
);