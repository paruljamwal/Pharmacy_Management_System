import clsx from 'clsx';
import './Card.css';

function Card({
  children,
  title,
  subtitle,
  header,
  footer,
  className = '',
  ...props
}) {
  const showHeader = header || title || subtitle;

  return (
    <section className={clsx('ui-card', className)} {...props}>
      {showHeader && (
        <div className="ui-card__header">
          {header || (
            <div className="ui-card__heading">
              {title && <h3 className="ui-card__title">{title}</h3>}
              {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      {children && <div className="ui-card__body">{children}</div>}
      {footer && <div className="ui-card__footer">{footer}</div>}
    </section>
  );
}

export default Card;
