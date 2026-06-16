import { Search, LayoutGrid, Table as TableIcon, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


import type { ReceptorFilters } from "@/lib/receptors.repository";
import { FilterPanel } from "./receptors/FilterPanel";

type Props = {
  search: string;
  setSearch: (v: string) => void;

  view: "table" | "card";
  setView: (v: "table" | "card") => void;

  filters: ReceptorFilters;
  setFilters: (v: ReceptorFilters) => void;
};

export function ReceptorToolbar({
  search,
  setSearch,
  view,
  setView,
  filters,
  setFilters,
}: Props) {
  return (
    <div className="container-page mt-6 flex flex-wrap items-center gap-3">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          placeholder="Search receptors..."
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </SheetContent>
        </Sheet>

        <div className="flex overflow-hidden rounded-md border">
          <button onClick={() => setView("table")}>
            <TableIcon /> Table
          </button>

          <button onClick={() => setView("card")}>
            <LayoutGrid /> Cards
          </button>
        </div>
      </div>
    </div>
  );
}