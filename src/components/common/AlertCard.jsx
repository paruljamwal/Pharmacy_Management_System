import clsx from 'clsx';
import './AlertCard.css';

function AlertCard({
  title,
  description,
  icon = null,
  tone = 'warning',
  active = false,
  onClick,
  className = '',
  ...props
}) {
  const isClickable = typeof onClick === 'function';

  return (
    <button
      type="button"
      className={clsx(
        'ui-alert-card',
        `ui-alert-card--${tone}`,
        active && 'is-active',
        isClickable && 'is-clickable',
        className,
      )}
      onClick={onClick}
      disabled={!isClickable}
      {...props}
    >
      {icon && <span className="ui-alert-card__icon">{icon}</span>}
      <span className="ui-alert-card__content">
        <span className="ui-alert-card__title">{title}</span>
        {description && <span className="ui-alert-card__description">{description}</span>}
      </span>
      <span className="ui-alert-card__indicator" aria-hidden="true" />
    </button>
  );
}

export default AlertCard;
