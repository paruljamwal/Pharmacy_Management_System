import clsx from 'clsx';
import EmptyState from './EmptyState';
import './Table.css';

function Table({
  columns = [],
  data = [],
  striped = false,
  hoverable = true,
  stickyHeader = false,
  emptyTitle = 'No data found',
  emptyDescription = 'There is nothing to display yet.',
  emptyAction = null,
  className = '',
  rowKey = 'id',
}) {
  const hasRows = data.length > 0;

  return (
    <div className={clsx('ui-table-wrap', className)}>
      {hasRows ? (
        <table
          className={clsx(
            'ui-table',
            striped && 'ui-table--striped',
            hoverable && 'ui-table--hover',
            stickyHeader && 'ui-table--sticky',
          )}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={column.width ? { width: column.width } : undefined}
                  className={column.align ? `is-${column.align}` : undefined}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row[rowKey] ?? index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={column.align ? `is-${column.align}` : undefined}
                  >
                    {column.render
                      ? column.render(row[column.key], row, index)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      )}
    </div>
  );
}

export default Table;
