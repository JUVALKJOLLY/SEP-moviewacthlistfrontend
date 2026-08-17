import React from 'react';

// Button Component
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) {
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white active:bg-primary-800',
    secondary: 'bg-dark-800 hover:bg-dark-700 text-textPrimary border border-dark-600',
    success: 'bg-success-600 hover:bg-success-700 text-white',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white',
    warning: 'bg-warning-600 hover:bg-warning-700 text-white',
    ghost: 'text-primary-500 hover:text-primary-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Input Component
export function Input({
  label,
  error,
  hint,
  fullWidth = true,
  className = '',
  ...props
}) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-textPrimary mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 bg-dark-900 border border-dark-700 
          text-textPrimary placeholder-textTertiary
          rounded-lg transition-all duration-200
          focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
          ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-danger-500 mt-1">{error}</p>}
      {hint && <p className="text-sm text-textTertiary mt-1">{hint}</p>}
    </div>
  );
}

// Textarea Component
export function Textarea({
  label,
  error,
  hint,
  fullWidth = true,
  className = '',
  rows = 4,
  ...props
}) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-textPrimary mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`
          w-full px-4 py-2 bg-dark-900 border border-dark-700 
          text-textPrimary placeholder-textTertiary
          rounded-lg transition-all duration-200 resize-vertical
          focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
          ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-danger-500 mt-1">{error}</p>}
      {hint && <p className="text-sm text-textTertiary mt-1">{hint}</p>}
    </div>
  );
}

// Select Component
export function Select({
  label,
  error,
  hint,
  options = [],
  fullWidth = true,
  className = '',
  ...props
}) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-textPrimary mb-2">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2 bg-dark-900 border border-dark-700 
          text-textPrimary
          rounded-lg transition-all duration-200
          focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
          ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-danger-500 mt-1">{error}</p>}
      {hint && <p className="text-sm text-textTertiary mt-1">{hint}</p>}
    </div>
  );
}

// Badge Component
export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) {
  const variantClasses = {
    primary: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
    success: 'bg-success-500/20 text-success-400 border border-success-500/30',
    danger: 'bg-danger-500/20 text-danger-400 border border-danger-500/30',
    warning: 'bg-warning-500/20 text-warning-400 border border-warning-500/30',
    info: 'bg-info-500/20 text-info-400 border border-info-500/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Alert Component
export function Alert({
  children,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  className = '',
}) {
  const variantClasses = {
    success: 'bg-success-500/10 border border-success-500/30 text-success-200',
    danger: 'bg-danger-500/10 border border-danger-500/30 text-danger-200',
    warning: 'bg-warning-500/10 border border-warning-500/30 text-warning-200',
    info: 'bg-info-500/10 border border-info-500/30 text-info-200',
  };

  const [show, setShow] = React.useState(true);

  if (!show) return null;

  return (
    <div
      className={`
        rounded-lg px-4 py-3
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <p className="text-sm">{children}</p>
        </div>
        {dismissible && (
          <button
            onClick={() => {
              setShow(false);
              onDismiss?.();
            }}
            className="ml-4 text-lg hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default {
  Button,
  Input,
  Textarea,
  Select,
  Badge,
  Alert,
};
