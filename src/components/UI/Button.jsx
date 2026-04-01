import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = variant === 'outline' ? 'btn-outline' : '';
  const sizeClass = size === 'small' ? 'btn-small' : '';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}