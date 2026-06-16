import { receptors, getReceptorById } from "@/data/receptors";
import type { Localization, Receptor, ReceptorFamily } from "@/types/receptor";

export interface ReceptorFilters {
  search?: string;
  families?: ReceptorFamily[];
  localizations?: Localization[];
  chromosomes?: string[];
  hasUniprot?: boolean;
}

export interface ReceptorStats {
  total: number;
  families: number;
  localizations: number;
  withUniprot: number;
  averageLength: number;
}

export interface ReceptorRepository {
  list(filters?: ReceptorFilters): Receptor[];
  paginate(filters: ReceptorFilters | undefined, page: number, pageSize: number): {
    rows: Receptor[];
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
  getById(id: string): Receptor | undefined;
  featured(limit?: number): Receptor[];
  related(receptor: Receptor, limit?: number): Receptor[];
  stats(): ReceptorStats;
}

function matches(r: Receptor, filters: ReceptorFilters): boolean {
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = `${r.seqName} ${r.description} ${r.uniprot ?? ""} ${r.family}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (filters.families?.length && !filters.families.includes(r.family)) return false;
  if (filters.localizations?.length && !filters.localizations.some((l) => r.localizations.includes(l)))
    return false;
  if (filters.chromosomes?.length && (!r.chromosome || !filters.chromosomes.includes(r.chromosome)))
    return false;
  if (filters.hasUniprot && !r.uniprot) return false;
  return true;
}

export const receptorsRepository: ReceptorRepository = {
  list(filters = {}) {
    return receptors.filter((r) => matches(r, filters));
  },
  paginate(filters = {}, page = 1, pageSize = 25) {
    const rows = receptors.filter((r) => matches(r, filters));
    const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    const safePage = Math.min(Math.max(1, page), pageCount);
    const start = (safePage - 1) * pageSize;
    return {
      rows: rows.slice(start, start + pageSize),
      total: rows.length,
      page: safePage,
      pageSize,
      pageCount,
    };
  },
  getById(id) {
    return getReceptorById(id);
  },
  featured(limit = 6) {
    // Prefer well-annotated entries (UniProt + non-empty InterPro)
    return [...receptors]
      .filter((r) => r.family !== "Unannotated")
      .sort((a, b) => b.interpro.length - a.interpro.length || b.length - a.length)
      .slice(0, limit);
  },
  related(receptor, limit = 6) {
    return receptors
      .filter((r) => r.id !== receptor.id && r.family === receptor.family)
      .slice(0, limit);
  },
  stats() {
    const total = receptors.length;
    const families = new Set(receptors.map((r) => r.family)).size;
    const localizations = new Set(receptors.flatMap((r) => r.localizations)).size;
    const withUniprot = receptors.filter((r) => r.uniprot).length;
    const averageLength = Math.round(
      receptors.reduce((sum, r) => sum + r.length, 0) / Math.max(1, total),
    );
    return { total, families, localizations, withUniprot, averageLength };
  },
};
