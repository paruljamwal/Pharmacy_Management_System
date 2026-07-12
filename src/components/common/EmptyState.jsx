import clsx from 'clsx';
import './EmptyState.css';

function EmptyState({
  title = 'Nothing here yet',
  description,
  action = null,
  icon = null,
  className = '',
}) {
  return (
    <div className={clsx('ui-empty', className)}>
      {icon && <div className="ui-empty__icon">{icon}</div>}
      <h3 className="ui-empty__title">{title}</h3>
      {description && <p className="ui-empty__description">{description}</p>}
      {action && <div className="ui-empty__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
