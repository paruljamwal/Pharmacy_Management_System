import clsx from 'clsx';
import './Input.css';

function Input({
  id,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className={clsx('ui-field', className)}>
      {label && (
        <label className="ui-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          'ui-input',
          error && 'ui-input--error',
          disabled && 'ui-input--disabled',
          leftIcon && 'ui-input--left-icon',
          rightIcon && 'ui-input--right-icon',
        )}
      >
        {leftIcon && <span className="ui-input__icon ui-input__icon--left">{leftIcon}</span>}
        <input id={inputId} className="ui-input__control" {...props} disabled={disabled} />
        {rightIcon && <span className="ui-input__icon ui-input__icon--right">{rightIcon}</span>}
      </div>
      {error ? (
        <p className="ui-field__message ui-field__message--error">{error}</p>
      ) : helperText ? (
        <p className="ui-field__message">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Input;
