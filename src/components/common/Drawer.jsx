import { useEffect } from 'react';
import clsx from 'clsx';
import { HiOutlineXMark } from 'react-icons/hi2';
import './Drawer.css';

function Drawer({ open, title, onClose, children, footer = null, width = 480 }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ui-drawer-root" role="presentation">
      <div className="ui-drawer__overlay" onClick={onClose} aria-hidden="true" />
      <aside
        className={clsx('ui-drawer', open && 'is-open')}
        style={{ width: `min(100%, ${width}px)` }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="ui-drawer__header">
          <h2 className="ui-drawer__title">{title}</h2>
          <button
            type="button"
            className="ui-drawer__close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <HiOutlineXMark size={20} />
          </button>
        </header>
        <div className="ui-drawer__body">{children}</div>
        {footer && <footer className="ui-drawer__footer">{footer}</footer>}
      </aside>
    </div>
  );
}

export default Drawer;
