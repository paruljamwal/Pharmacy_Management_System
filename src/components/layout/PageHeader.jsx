import clsx from 'clsx';
import './PageHeader.css';

function PageHeader({
  title,
  subtitle,
  breadcrumb = null,
  actions = null,
  className = '',
}) {
  return (
    <header className={clsx('ui-page-header', className)}>
      <div className="ui-page-header__left">
        {breadcrumb && <div className="ui-page-header__breadcrumb">{breadcrumb}</div>}
        <div className="ui-page-header__titles">
          <h1 className="ui-page-header__title">{title}</h1>
          {subtitle && <p className="ui-page-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="ui-page-header__actions">{actions}</div>}
    </header>
  );
}

export default PageHeader;
