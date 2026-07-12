import { useEffect } from 'react';
import clsx from 'clsx';
import { HiOutlineXMark } from 'react-icons/hi2';
import './Dialog.css';

function Dialog({
  open,
  title,
  onClose,
  children,
  footer = null,
  className = '',
}) {
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
    <div className="ui-dialog-root" role="presentation">
      <div className="ui-dialog__overlay" onClick={onClose} aria-hidden="true" />
      <div
        className={clsx('ui-dialog', className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="ui-dialog__header">
          <h2 className="ui-dialog__title">{title}</h2>
          <button
            type="button"
            className="ui-dialog__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <HiOutlineXMark size={18} />
          </button>
        </header>
        <div className="ui-dialog__body">{children}</div>
        {footer && <footer className="ui-dialog__footer">{footer}</footer>}
      </div>
    </div>
  );
}

export default Dialog;
