import clsx from 'clsx';
import './Button.css';

function Button({
  children,
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={clsx(
        'ui-btn',
        `ui-btn--${variant}`,
        fullWidth && 'ui-btn--full',
        loading && 'ui-btn--loading',
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="ui-btn__spinner" aria-hidden="true" />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="ui-btn__icon">{icon}</span>
      )}
      {children && <span className="ui-btn__label">{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ui-btn__icon">{icon}</span>
      )}
    </button>
  );
}

export default Button;
