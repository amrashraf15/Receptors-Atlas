"use client";

import { useEffect, useMemo, useState } from "react";

import type { Receptor } from "@/types/receptor";
import { ReceptorCard } from "@/components/ReceptorCard";
import { ReceptorTable } from "@/components/ReceptorTable";
import { Button } from "@/components/ui/button";

type Props = {
  view: "table" | "card";
  data: Receptor[];
};

const PAGE_SIZE = 12;

export function ReceptorLayout({ view, data }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / PAGE_SIZE)
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  // Reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [data.length]);

  // Fix out-of-range page
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const isEmpty = data.length === 0;

  return (
    <section className="container-page py-10">
      {/* TABLE */}
      {view === "table" ? (
        <ReceptorTable data={data} />
      ) : isEmpty ? (
        <div className="py-20 text-center text-muted-foreground">
          No receptors found
        </div>
      ) : (
        <>
          {/* CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedData.map((receptor) => (
              <ReceptorCard
                key={receptor.id}
                receptor={receptor}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <div className="rounded-md border px-4 py-2 text-sm text-muted-foreground">
              Page{" "}
              <span className="text-foreground font-medium">
                {page}
              </span>{" "}
              / {totalPages}
            </div>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>

          {/* INFO */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground">
              {Math.min(
                (page - 1) * PAGE_SIZE + 1,
                data.length
              )}
            </span>
            {" - "}
            <span className="text-foreground">
              {Math.min(page * PAGE_SIZE, data.length)}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {data.length}
            </span>
          </div>
        </>
      )}
    </section>
  );
}