import clsx from 'clsx';
import './Badge.css';

function Badge({ children, variant = 'neutral', className = '', ...props }) {
  return (
    <span className={clsx('ui-badge', `ui-badge--${variant}`, className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
