import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'py-3 rounded-lg font-semibold transition duration-300';
  const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}