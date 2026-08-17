import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  title, 
  subtitle,
  headerAction,
  variant = 'default',
  noPadding = false,
  ...props 
}) {
  const variantClasses = {
    default: 'bg-dark-800 border border-dark-700',
    elevated: 'bg-dark-700 border border-dark-600',
    outlined: 'bg-transparent border border-dark-600',
    ghost: 'bg-transparent border-none',
  };

  return (
    <div
      className={`
        ${variantClasses[variant]}
        rounded-lg shadow-sneat-dark
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {/* Card Header */}
      {title && (
        <div className="flex items-start justify-between px-6 py-4 border-b border-dark-700">
          <div>
            <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
            {subtitle && <p className="text-sm text-textSecondary mt-1">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Card Content */}
      <div className={noPadding ? '' : 'px-6 py-4'}>
        {children}
      </div>
    </div>
  );
}
