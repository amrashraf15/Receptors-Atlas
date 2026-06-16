"use client";

import { useState } from "react";
import Link from "next/link";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Receptor } from "@/types/receptor";

const statusColor: Record<string, string> = {
  validated:
    "bg-green-500/10 text-green-600 border-green-500/30 dark:text-green-400",
  under_review:
    "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400",
  predicted:
    "bg-muted text-muted-foreground border-border",
  deprecated:
    "bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400",
};

const statusLabel: Record<string, string> = {
  validated: "Validated",
  under_review: "Under Review",
  predicted: "Predicted",
  deprecated: "Deprecated",
};

interface ReceptorTableProps {
  data: Receptor[];
}

const columns: ColumnDef<Receptor>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <Link
        href={`/receptors/${row.original.id}`}
        className="font-mono font-semibold text-foreground transition-colors hover:text-primary"
      >
        {row.original.symbol}
      </Link>
    ),
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <span className="text-sm">
        {getValue() as string}
      </span>
    ),
  },

  {
    accessorKey: "family",
    header: "Family",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },

  {
    accessorKey: "species",
    header: "Species",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {getValue() as string}
      </span>
    ),
  },

  {
    accessorKey: "expression",
    header: "Expression",
    cell: ({ getValue }) => (
      <span className="text-sm capitalize">
        {getValue() as string}
      </span>
    ),
  },

  {
    accessorKey: "publications",
    header: "Publications",
    cell: ({ getValue }) => (
      <span className="tabular-nums text-sm">
        {(getValue() as number).toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;

      return (
        <Badge
          variant="outline"
          className={
            statusColor[status] ??
            "bg-muted text-muted-foreground"
          }
        >
          {statusLabel[status] ??
            status.replace("_", " ")}
        </Badge>
      );
    },
  },
];

export function ReceptorTable({
  data,
}: ReceptorTableProps) {
  const [sorting, setSorting] =
    useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 12,
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-border bg-muted/40">
            {table.getHeaderGroups().map(
              (headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                          >
                            {flexRender(
                              header.column.columnDef
                                .header,
                              header.getContext()
                            )}

                            <ArrowUpDown className="h-3 w-3 opacity-50" />
                          </button>
                        )}
                      </th>
                    )
                  )}
                </tr>
              )
            )}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(
              (row) => (
                <tr
                  key={row.id}
                  className="border-b border-border/60 transition-colors hover:bg-muted/30 last:border-0"
                >
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 align-middle"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                </tr>
              )
            )}

            {table.getRowModel().rows.length ===
              0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-sm text-muted-foreground"
                >
                  No receptors match the
                  current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-3 text-sm">
        <span className="text-muted-foreground">
          Page{" "}
          {table.getState().pagination
            .pageIndex + 1}{" "}
          of{" "}
          {Math.max(
            1,
            table.getPageCount()
          )}{" "}
          · {data.length} results
        </span>

        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              table.previousPage()
            }
            disabled={
              !table.getCanPreviousPage()
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}