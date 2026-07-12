import clsx from 'clsx';
import './Field.css';
import './Textarea.css';

function Textarea({
  id,
  label,
  error,
  helperText,
  disabled = false,
  className = '',
  rows = 4,
  ...props
}) {
  const fieldId = id || props.name;

  return (
    <div className={clsx('ui-field', className)}>
      {label && (
        <label className="ui-field__label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        className={clsx('ui-textarea', error && 'ui-textarea--error')}
        rows={rows}
        disabled={disabled}
        {...props}
      />
      {error ? (
        <p className="ui-field__message ui-field__message--error">{error}</p>
      ) : helperText ? (
        <p className="ui-field__message">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Textarea;
