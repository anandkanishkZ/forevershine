'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  external = false,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all duration-300 text-center transform hover:scale-105';
  
  const variantStyles = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50',
  };
  
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;