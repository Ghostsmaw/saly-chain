'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SalyEmptyState, SalySkeleton } from '@/components/saly/ui';

export function SalyDataTable<T>({
  data,
  columns,
  searchPlaceholder = 'Search…',
  searchColumn,
  emptyTitle = 'No results',
  emptyDescription,
  loading = false,
  onRowClick,
  getRowId,
  toolbar,
}: {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  searchPlaceholder?: string;
  searchColumn?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  getRowId?: (row: T) => string;
  toolbar?: React.ReactNode;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: searchColumn
      ? (row, _columnId, filterValue) => {
          const v = row.getValue(searchColumn);
          return String(v ?? '')
            .toLowerCase()
            .includes(String(filterValue).toLowerCase());
        }
      : undefined,
    getRowId,
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SalySkeleton key={i} className="h-11 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 w-full max-w-sm rounded-saly border border-saly-border bg-saly-bg-secondary px-3 text-sm text-saly-text-primary placeholder:text-saly-text-faint transition-all focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20"
        />
        {toolbar}
      </div>

      <div className="overflow-hidden rounded-saly-lg border border-saly-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              {headerGroups.map((hg) => (
                <tr key={hg.id} className="border-b border-saly-border bg-saly-bg-secondary/80">
                  {hg.headers.map((header) => {
                    const sorted = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className="px-4 py-2.5 text-xs font-medium text-saly-text-muted"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            className={cn(
                              'inline-flex items-center gap-1 transition-colors hover:text-saly-text-primary',
                              header.column.getCanSort() && 'cursor-pointer',
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                            disabled={!header.column.getCanSort()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() ? (
                              sorted === 'asc' ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : sorted === 'desc' ? (
                                <ArrowDown className="h-3 w-3" />
                              ) : (
                                <ArrowUpDown className="h-3 w-3 opacity-40" />
                              )
                            ) : null}
                          </button>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <SalyEmptyState title={emptyTitle} description={emptyDescription} />
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                    className={cn(
                      'border-b border-saly-border/60 transition-colors last:border-b-0',
                      onRowClick && 'cursor-pointer hover:bg-saly-bg-hover',
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-saly-text-secondary">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-saly-text-faint">
        {rows.length} of {data.length} rows
      </p>
    </div>
  );
}

export function useSalyColumns<T>() {
  return useMemo(() => ({ columns: [] as ColumnDef<T, unknown>[] }), []);
}
