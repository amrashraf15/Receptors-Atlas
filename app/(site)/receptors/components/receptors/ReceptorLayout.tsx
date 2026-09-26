"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReceptorCard } from "@/components/ReceptorCard";
import { ReceptorTable } from "@/components/ReceptorTable";
import type { Receptor } from "@/types/receptor";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  view: "table" | "card";
  data: Receptor[];
};

const PAGE_SIZE = 12;

export function ReceptorLayout({
  view,
  data,
}: Props) {
  const [page, setPage] = useState(1);
  const [prevData, setPrevData] = useState(data);

  // Reset page when data reference changes without useEffect
  if (prevData !== data) {
    setPrevData(data);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 px-4 text-center bg-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-3 text-base font-semibold text-foreground">
          No matching receptors found
        </h3>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed">
          No records match the selected query and filters. Try clearing active filters or adjusting the search term.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {view === "table" ? (
        <ReceptorTable data={data} />
      ) : (
        <>
          {/* Cards Grid */}
          <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedData.map((receptor) => (
              <ReceptorCard
                key={receptor.id}
                receptor={receptor}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
              <div>
                Showing{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {(page - 1) * PAGE_SIZE + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {Math.min(page * PAGE_SIZE, data.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {data.length}
                </span>{" "}
                records
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Go to previous page"
                  className="h-8 gap-1 px-2.5 text-xs font-medium"
                >
                  <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                  <span>Previous</span>
                </Button>

                <div className="px-2 font-mono text-xs text-foreground">
                  {page} / {totalPages}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Go to next page"
                  className="h-8 gap-1 px-2.5 text-xs font-medium"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}