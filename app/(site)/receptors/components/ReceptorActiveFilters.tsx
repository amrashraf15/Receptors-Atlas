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
    <div className="flex flex-wrap items-center gap-2 pt-1" aria-label="Active filters">
      <span className="text-xs text-muted-foreground font-medium me-1">
        Active filters:
      </span>

      {activeBadges.map((b) => (
        <Badge
          key={`${b.key}-${b.value}`}
          variant="secondary"
          className="inline-flex items-center gap-1.5 py-1 ps-2.5 pe-1.5 text-xs font-normal"
        >
          <span>{b.value}</span>
          <button
            type="button"
            onClick={() => removeBadge(b.key, b.value)}
            className="flex h-4 w-4 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label={`Remove ${b.value} filter`}
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </Badge>
      ))}

      <Button
        variant="ghost"
        size="xs"
        onClick={() => setFilters({})}
        className="h-6 text-xs text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  );
}