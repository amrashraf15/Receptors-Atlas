"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ReceptorCard } from "@/components/ReceptorCard";
import { ReceptorTable } from "@/components/ReceptorTable";

import type { Receptor } from "@/types/receptor";

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

  /**
   * Reset page when filters/search change
   */
  useEffect(() => {
    setPage(1);
  }, [data]);

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / PAGE_SIZE)
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return data.slice(
      start,
      start + PAGE_SIZE
    );
  }, [data, page]);

  return (
    <section className="container-page py-10">
      {view === "table" ? (
        <ReceptorTable data={data} />
      ) : data.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No receptors found
        </div>
      ) : (
        <>
          {/* Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedData.map((receptor) => (
              <ReceptorCard
                key={receptor.id}
                receptor={receptor}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
            >
              Previous
            </Button>

            <div className="rounded-md border px-4 py-2 text-sm">
              Page {page} of {totalPages}
            </div>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
            >
              Next
            </Button>
          </div>

          {/* Results Info */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing{" "}
            {Math.min(
              (page - 1) * PAGE_SIZE + 1,
              data.length
            )}
            –
            {Math.min(
              page * PAGE_SIZE,
              data.length
            )}{" "}
            of {data.length} receptors
          </div>
        </>
      )}
    </section>
  );
}