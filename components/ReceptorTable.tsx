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

const statusColor: Record<string, string> = {
  validated:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  under_review:
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  predicted:
    "border-white/10 bg-white/5 text-muted-foreground",
  deprecated:
    "border-red-500/20 bg-red-500/10 text-red-300",
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

export function ReceptorTable({
  data,
}: ReceptorTableProps) {
  const [sorting, setSorting] =
    useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Receptor>[]>(
    () => [
      {
        accessorKey: "seqName",
        header: "Symbol",

        cell: ({ row }) => (
          <Link
            href={`/receptors/${row.original.id}`}
            className="group inline-flex flex-col"
          >
            <span
              className="
                font-mono
                font-semibold
                tracking-wide
                text-primary
                transition-colors
                group-hover:text-foreground
              "
            >
              {row.original.seqName}
            </span>

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-muted-foreground
              "
            >
              receptor
            </span>
          </Link>
        ),
      },

      {
        accessorKey: "description",
        header: "Name",

        cell: ({ getValue }) => (
          <span className="text-sm leading-relaxed">
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
          <span
            className="
              font-mono
              text-xs
              tracking-wide
              text-muted-foreground
            "
          >
            {getValue() as string}
          </span>
        ),
      },

      {
        accessorKey: "localizations",
        header: "Localization",

        cell: ({ getValue }) => {
          const value =
            getValue() as string[] | undefined;

          return (
            <span className="text-sm">
              {(value ?? []).join(", ")}
            </span>
          );
        },
      },

      {
        accessorKey: "length",
        header: "Length",

        cell: ({ getValue }) => (
          <span className="tabular-nums text-sm">
            {safeNumber(getValue())}
          </span>
        ),
      },

      {
        accessorKey: "molecularWeight",
        header: "MW",

        cell: ({ getValue }) => (
          <span className="tabular-nums text-sm">
            {safeNumber(getValue())}
          </span>
        ),
      },

      {
        accessorKey: "isoelectricPoint",
        header: "pI",

        cell: ({ getValue }) => (
          <span className="tabular-nums text-sm">
            {safeNumber(getValue())}
          </span>
        ),
      },

      {
        accessorKey: "status",
        header: "Status",

        cell: ({ getValue }) => {
          const status =
            (getValue() as string) ?? "predicted";

          return (
            <Badge
              variant="outline"
              className={`
                rounded-full
                px-3
                py-1
                text-[11px]
                tracking-wide
                backdrop-blur-md
                ${statusColor[status] ?? ""}
              `}
            >
              {statusLabel[status] ??
                status.replaceAll("_", " ")}
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
    getPaginationRowModel:
      getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 12,
      },
    },
  });

  return (
    <section className="space-y-6">
      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <p
            className="
              mb-2
              text-xs
              uppercase
              tracking-[0.35em]
              text-primary
            "
          >
            Receptor Dataset
          </p>

          <h2
            className="
              font-display
              text-4xl
              md:text-5xl
              leading-none
            "
          >
            Curated Receptors
          </h2>
        </div>

        <div
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-muted-foreground
          "
        >
          {data.length.toLocaleString()} Entries
        </div>
      </div>

      <div
        className="
          glass-panel
          relative
          overflow-hidden
          rounded-[2rem]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_bottom,transparent,rgba(142,247,208,0.015),transparent)]
          "
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead
              className="
                sticky
                top-0
                z-20
                border-b
                border-white/10
                bg-card/80 
                backdrop-blur-xl
              "
            >
              {table.getHeaderGroups().map(
                (headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header) => (
                        <th
                          key={header.id}
                          className="
                            px-6
                            py-5
                            text-left
                            text-[11px]
                            uppercase
                            tracking-[0.25em]
                            text-muted-foreground
                            font-medium
                          "
                        >
                          {header.isPlaceholder
                            ? null
                            : (
                              <button
                                onClick={header.column.getToggleSortingHandler()}
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  transition-colors
                                  hover:text-foreground
                                "
                              >
                                {flexRender(
                                  header.column
                                    .columnDef.header,
                                  header.getContext()
                                )}

                                <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />
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
              {table
                .getRowModel()
                .rows.map((row) => (
                  <tr
                    key={row.id}
                    className="
                      border-b
                      border-white/5
                      transition-all
                      duration-300
                      hover:bg-muted/50
                    "
                  >
                    {row
                      .getVisibleCells()
                      .map((cell) => (
                        <td
                          key={cell.id}
                          className="
                            px-6
                            py-5
                            align-middle
                          "
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                  </tr>
                ))}

              {table.getRowModel().rows
                .length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-24 text-center"
                  >
                    <div className="space-y-3">
                      <p className="text-lg font-medium">
                        No receptors found
                      </p>

                      <p className="text-muted-foreground">
                        Try adjusting the search
                        criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-border/60
            bg-white/2
            px-6
            py-5
          "
        >
          <span
            className="
              text-sm
              text-muted-foreground
            "
          >
            Page{" "}
            {table.getState().pagination
              .pageIndex + 1}
            {" "}of{" "}
            {table.getPageCount()}
            {" • "}
            {data.length.toLocaleString()}
            {" "}results
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                table.previousPage()
              }
              disabled={
                !table.getCanPreviousPage()
              }
              className="
                rounded-full
                border
                border-white/10
                hover:border-primary/40
                hover:bg-primary/5
              "
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                table.nextPage()
              }
              disabled={
                !table.getCanNextPage()
              }
              className="
                rounded-full
                border
                border-white/10
                hover:border-primary/40
                hover:bg-primary/5
              "
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}