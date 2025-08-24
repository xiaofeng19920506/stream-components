import React from 'react';
import styles from './Table.module.css';

export type TableColumn<T extends object> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
};

export type TableProps<T extends object> = {
  columns: TableColumn<T>[];
  data: T[];
  initialSortBy?: { index: number; direction: 'asc' | 'desc' };
  pageSizeOptions?: number[];
  initialPageSize?: number;
  onRowClick?: (row: T, rowIndex: number) => void;
  showPageSizeSelector?: boolean;
};

export function Table<T extends object>({
  columns,
  data,
  initialSortBy,
  pageSizeOptions = [5, 10, 20],
  initialPageSize = 5,
  onRowClick,
  showPageSizeSelector = true,
}: TableProps<T>) {
  const [sort, setSort] = React.useState<{
    index: number;
    direction: 'asc' | 'desc';
  } | null>(initialSortBy || null);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

  const sortedData = React.useMemo(() => {
    if (!sort) return data;
    const col = columns[sort.index];
    if (!col || typeof col.accessor === 'function') return data;
    const key = col.accessor as keyof T;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[key] as unknown as string | number;
      const bv = b[key] as unknown as string | number;
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = av > bv ? 1 : -1;
      return sort.direction === 'asc' ? cmp : -1 * cmp;
    });
    return copy;
  }, [data, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const pageStart = pageIndex * pageSize;
  const pageRows = sortedData.slice(pageStart, pageStart + pageSize);

  const toggleSort = (i: number) => {
    if (!columns[i].sortable) return;
    setPageIndex(0);
    setSort((prev) => {
      if (!prev || prev.index !== i) return { index: i, direction: 'asc' };
      if (prev.direction === 'asc') return { index: i, direction: 'desc' };
      return null;
    });
  };

  const handleRowClick = (row: T, rowIndex: number) => {
    if (onRowClick) {
      onRowClick(row, rowIndex);
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                onClick={() => toggleSort(i)}
                className={c.sortable ? styles.sortable : undefined}
                style={{
                  width: c.width,
                  minWidth: c.minWidth,
                  maxWidth: c.maxWidth,
                }}
              >
                {c.header}
                {sort?.index === i && (
                  <span className={styles.sortIcon}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row, ri) => (
            <tr
              key={ri}
              onClick={() => handleRowClick(row, pageStart + ri)}
              className={onRowClick ? styles.clickableRow : undefined}
              style={onRowClick ? { cursor: 'pointer' } : undefined}
            >
              {columns.map((c, ci) => (
                <td
                  key={ci}
                  style={{
                    width: c.width,
                    minWidth: c.minWidth,
                    maxWidth: c.maxWidth,
                  }}
                >
                  {typeof c.accessor === 'function'
                    ? c.accessor(row)
                    : (row[c.accessor] as unknown as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationBar}>
        {showPageSizeSelector && (
          <div className={styles.pageSizeContainer}>
            <select
              className={styles.pageSize}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(0);
              }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / page
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={styles.pager}>
          <button
            className={styles.pageBtn}
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            « First
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
          >
            ‹ Prev
          </button>
          <span className={styles.pageInfo}>
            Page {pageIndex + 1} / {pageCount}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
            disabled={pageIndex >= pageCount - 1}
          >
            Next ›
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            Last »
          </button>
        </div>
        {showPageSizeSelector && (
          <div className={styles.pageSizeContainer}>
            <span className={styles.pageSizeInfo}>
              Showing {pageStart + 1}-{Math.min(pageStart + pageSize, sortedData.length)} of{' '}
              {sortedData.length} items
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
