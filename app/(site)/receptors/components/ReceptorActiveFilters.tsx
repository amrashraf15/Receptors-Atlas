import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { ReceptorFilters } from "@/lib/receptors.repository";

type Props = {
  activeBadges: { key: keyof ReceptorFilters; value: string }[];
  removeBadge: (key: keyof ReceptorFilters, value: string) => void;
  setFilters: (v: ReceptorFilters) => void;
};

export function ReceptorActiveFilters({
  activeBadges,
  removeBadge,
  setFilters,
}: Props) {
  if (!activeBadges.length) return null;

  return (
    <div className="container-page mt-4 flex flex-wrap gap-2">
      {activeBadges.map((b) => (
        <Badge key={`${b.key}-${b.value}`} variant="secondary">
          {b.value}
          <button onClick={() => removeBadge(b.key, b.value)}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      <Button variant="ghost" size="sm" onClick={() => setFilters({})}>
        Clear all
      </Button>
    </div>
  );
}