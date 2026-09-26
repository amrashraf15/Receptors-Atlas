"use client";

import { useMemo, useState } from "react";
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
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Receptor } from "@/types/receptor";

function safeNumber(value: unknown): string {
  if (value == null) return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return "—";
  return num.toLocaleString();
}

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  validated: {
    label: "Validated",
    className:
      "border-emerald-600/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500/30",
  },
  under_review: {
    label: "Under Review",
    className:
      "border-sky-600/30 bg-sky-500/10 text-sky-800 dark:text-sky-300 dark:border-sky-500/30",
  },
  predicted: {
    label: "Predicted",
    className:
      "border-border bg-muted text-muted-foreground",
  },
  deprecated: {
    label: "Deprecated",
    className:
      "border-red-600/30 bg-red-500/10 text-red-800 dark:text-red-300 dark:border-red-500/30",
  },
};

interface ReceptorTableProps {
  data: Receptor[];
}

export function ReceptorTable({ data }: ReceptorTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Receptor>[]>(
    () => [
      {
        accessorKey: "seqName",
        header: "Gene Symbol",
        cell: ({ row }) => (
          <Link
            href={`/receptors/${row.original.id}`}
            className="group inline-flex flex-col focus-visible:outline-none focus-visible:underline"
          >
            <span className="font-mono text-xs sm:text-sm font-semibold text-primary group-hover:underline">
              {row.original.seqName}
            </span>
            {row.original.chromosome && (
              <span className="text-[10px] text-muted-foreground font-mono">
                Chr {row.original.chromosome}
              </span>
            )}
          </Link>
        ),
      },
      {
        accessorKey: "description",
        header: "Functional Description",
        cell: ({ getValue }) => (
          <span className="text-xs sm:text-sm text-foreground leading-relaxed line-clamp-2 max-w-sm">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "family",
        header: "Family",
        cell: ({ getValue }) => (
          <span className="text-xs font-medium text-foreground whitespace-nowrap">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "species",
        header: "Organism",
        cell: ({ getValue }) => (
          <span className="italic text-xs text-muted-foreground whitespace-nowrap">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "localizations",
        header: "Localization",
        cell: ({ getValue }) => {
          const value = getValue() as string[] | undefined;
          return (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {(value ?? []).join(", ") || "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "length",
        header: "Length",
        cell: ({ getValue }) => (
          <span className="tabular-nums text-xs text-foreground font-mono">
            {safeNumber(getValue())} aa
          </span>
        ),
      },
      {
        accessorKey: "molecularWeight",
        header: "MW (Da)",
        cell: ({ getValue }) => (
          <span className="tabular-nums text-xs text-muted-foreground font-mono">
            {safeNumber(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "isoelectricPoint",
        header: "pI",
        cell: ({ getValue }) => (
          <span className="tabular-nums text-xs text-muted-foreground font-mono">
            {safeNumber(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = (getValue() as string) ?? "predicted";
          const config = statusConfig[status] ?? {
            label: status.replaceAll("_", " "),
            className: "border-border bg-muted text-muted-foreground",
          };

          return (
            <Badge
              variant="outline"
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide ${config.className}`}
            >
              {config.label}
            </Badge>
          );
        },
      },
    ],
    []
  );

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
        pageSize: 15,
      },
    },
  });

  return (
    <div className="rounded-lg border border-border bg-card shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-xs sm:text-sm">
          <thead className="border-b border-border bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isSorted = header.column.getIsSorted();
                  const isFirst = index === 0;

                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={
                        isSorted
                          ? isSorted === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className={`px-3.5 py-3 text-start text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap ${
                        isFirst
                          ? "sticky start-0 z-10 bg-muted/95 backdrop-blur-xs border-e border-border/80"
                          : ""
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          aria-label={`Sort by ${typeof header.column.columnDef.header === "string" ? header.column.columnDef.header : header.id}`}
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>

                          {isSorted === "asc" ? (
                            <ArrowUp className="h-3 w-3 text-primary" aria-hidden="true" />
                          ) : isSorted === "desc" ? (
                            <ArrowDown className="h-3 w-3 text-primary" aria-hidden="true" />
                          ) : (
                            <ArrowUpDown className="h-3 w-3 opacity-40" aria-hidden="true" />
                          )}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-border/60">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-muted/40"
              >
                {row.getVisibleCells().map((cell, index) => {
                  const isFirst = index === 0;
                  return (
                    <td
                      key={cell.id}
                      className={`px-3.5 py-3 align-middle ${
                        isFirst
                          ? "sticky start-0 z-1 bg-card border-e border-border/80"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-muted-foreground"
                >
                  No receptors match the current filter selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border bg-surface-subtle px-4 py-3 text-xs text-muted-foreground">
        <div>
          Page{" "}
          <span className="font-semibold text-foreground font-mono">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground font-mono">
            {table.getPageCount() || 1}
          </span>
          {" • "}
          <span className="font-semibold text-foreground tabular-nums">
            {data.length.toLocaleString()}
          </span>{" "}
          records
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
            className="h-7 gap-1 px-2 text-xs"
          >
            <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
            <span>Prev</span>
          </Button>

          <Button
            variant="outline"
            size="xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
            className="h-7 gap-1 px-2 text-xs"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}