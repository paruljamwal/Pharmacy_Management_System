import clsx from 'clsx';
import './Select.css';

function Select({
  id,
  label,
  options = [],
  error,
  helperText,
  disabled = false,
  placeholder = 'Select an option',
  className = '',
  ...props
}) {
  const selectId = id || props.name;

  return (
    <div className={clsx('ui-field', className)}>
      {label && (
        <label className="ui-field__label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          'ui-select',
          error && 'ui-select--error',
          disabled && 'ui-select--disabled',
        )}
      >
        <select id={selectId} className="ui-select__control" {...props} disabled={disabled}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const value = typeof option === 'object' ? option.value : option;
            const text = typeof option === 'object' ? option.label : option;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
      {error ? (
        <p className="ui-field__message ui-field__message--error">{error}</p>
      ) : helperText ? (
        <p className="ui-field__message">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Select;
