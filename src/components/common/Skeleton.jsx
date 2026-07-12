import clsx from 'clsx';
import './Skeleton.css';

function SkeletonBlock({ className = '', style }) {
  return <div className={clsx('ui-skeleton__block', className)} style={style} aria-hidden="true" />;
}

function CardSkeleton() {
  return (
    <div className="ui-skeleton ui-skeleton--card">
      <SkeletonBlock className="ui-skeleton__line ui-skeleton__line--lg" />
      <SkeletonBlock className="ui-skeleton__line ui-skeleton__line--md" />
      <SkeletonBlock className="ui-skeleton__line" />
      <SkeletonBlock className="ui-skeleton__line ui-skeleton__line--sm" />
    </div>
  );
}

function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="ui-skeleton ui-skeleton--table">
      <div className="ui-skeleton__row ui-skeleton__row--head">
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonBlock key={`head-${index}`} className="ui-skeleton__cell" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="ui-skeleton__row" key={`row-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonBlock key={`cell-${rowIndex}-${colIndex}`} className="ui-skeleton__cell" />
          ))}
        </div>
      ))}
    </div>
  );
}

function FormSkeleton({ fields = 4 }) {
  return (
    <div className="ui-skeleton ui-skeleton--form">
      {Array.from({ length: fields }).map((_, index) => (
        <div className="ui-skeleton__field" key={`field-${index}`}>
          <SkeletonBlock className="ui-skeleton__label" />
          <SkeletonBlock className="ui-skeleton__input" />
        </div>
      ))}
    </div>
  );
}

function Skeleton({ variant = 'card', rows, columns, fields, className = '' }) {
  return (
    <div
      className={clsx('ui-skeleton-root', className)}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {variant === 'table' && <TableSkeleton rows={rows} columns={columns} />}
      {variant === 'form' && <FormSkeleton fields={fields} />}
      {variant === 'card' && <CardSkeleton />}
    </div>
  );
}

export default Skeleton;
