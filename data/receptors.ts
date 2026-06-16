import rawData from "./data.json";

import type {
  Localization,
  RawReceptor,
  Receptor,
  ReceptorFamily,
} from "@/types/receptor";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const MISSING = new Set([
  "",
  ".",
  "-",
  "N/A",
  "NA",
  "null",
  "undefined",
]);

function clean(value: string | undefined | null): string | null {
  if (value == null) return null;

  const trimmed = String(value).trim();

  if (MISSING.has(trimmed)) return null;

  return trimmed;
}

function cleanNumber(value: string | undefined | null): number | null {
  const c = clean(value);

  if (!c) return null;

  const n = Number(c);

  return Number.isFinite(n) ? n : null;
}

function splitList(
  value: string | undefined | null,
  separator: string | RegExp,
): string[] {
  const c = clean(value);

  if (!c) return [];

  return c
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

/* -------------------------------------------------------------------------- */
/* Family Classification                                                       */
/* -------------------------------------------------------------------------- */

function classifyFamily(description: string): ReceptorFamily {
  const d = description.toLowerCase();

  if (d === "" || d === "translated cds") {
    return "Unannotated";
  }

  if (d.includes("lrr") || d.includes("leucine-rich repeat")) {
    return "LRR Receptor Kinase";
  }

  if (d.includes("g-type lectin") || d.includes("s-receptor")) {
    return "G-type Lectin S-Receptor Kinase";
  }

  if (d.includes("l-type lectin")) {
    return "L-type Lectin Receptor Kinase";
  }

  if (d.includes("wall-associated")) {
    return "Wall-Associated Kinase";
  }

  if (d.includes("cysteine-rich")) {
    return "Cysteine-Rich Receptor Kinase";
  }

  if (d.includes("resistance") && d.includes("kinase")) {
    return "Resistance Kinase";
  }

  if (
    d.includes("receptor-like protein") ||
    (d.includes("receptor") && !d.includes("kinase"))
  ) {
    return "Receptor-Like Protein";
  }

  if (d.includes("receptor") && d.includes("kinase")) {
    return "Receptor-Like Kinase";
  }

  if (d.includes("kinase")) {
    return "Other Kinase";
  }

  return "Receptor-Like Protein";
}

/* -------------------------------------------------------------------------- */
/* Species Detection                                                           */
/* -------------------------------------------------------------------------- */

function inferSpecies(
  seqName?: string | null,
): {
  species: string;
  chromosome: string | null;
} {
  if (!seqName) {
    return {
      species: "Unknown",
      chromosome: null,
    };
  }

  const upper = seqName.toUpperCase();

  if (upper.startsWith("TRAES")) {
    const match = upper.match(/TRAESCS(\d+[ABD])/);

    return {
      species: "Triticum aestivum",
      chromosome: match?.[1] ?? null,
    };
  }

  return {
    species: "Unknown",
    chromosome: null,
  };
}

/* -------------------------------------------------------------------------- */
/* Normalization                                                               */
/* -------------------------------------------------------------------------- */

function normalize(
  raw: RawReceptor,
  index: number,
): Receptor {
  const seqName =
    clean(raw.SeqName) ??
    `unknown-receptor-${index}`;

  const description =
    clean(raw.Description) ??
    "Unannotated";

  const { species, chromosome } =
    inferSpecies(seqName);

  const localizations =
    splitList(
      raw.Localizations,
      /\||;|,/
    ) as Localization[];

  return {
    id: seqName.toLowerCase(),

    seqName,

    length: Number(raw.Length) || 0,

    description,

    localizations:
      localizations.length > 0
        ? localizations
        : (["Cell membrane"] as Localization[]),

    molecularWeight: cleanNumber(raw.MW),

    isoelectricPoint: cleanNumber(raw.IP),

    uniprot: clean(raw.UniProt),

    prosite: clean(raw.Prosite),

    domains: splitList(
      raw.Database_Domain_Description,
      ";",
    ),

    interpro: splitList(
      raw.InterPro_Description,
      ";",
    ),

    family: classifyFamily(description),

    species,

    chromosome,
  };
}

/* -------------------------------------------------------------------------- */
/* Data                                                                         */
/* -------------------------------------------------------------------------- */

export const receptors: Receptor[] = (
  rawData as RawReceptor[]
).map(normalize);

/* -------------------------------------------------------------------------- */
/* Lookup                                                                       */
/* -------------------------------------------------------------------------- */

const byId = new Map(
  receptors.map((r) => [r.id, r] as const),
);

export function getReceptorById(
  id: string,
): Receptor | undefined {
  return byId.get(id.toLowerCase());
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                    */
/* -------------------------------------------------------------------------- */

export const RECEPTOR_FAMILIES = [
  "LRR Receptor Kinase",
  "G-type Lectin S-Receptor Kinase",
  "L-type Lectin Receptor Kinase",
  "Wall-Associated Kinase",
  "Cysteine-Rich Receptor Kinase",
  "Receptor-Like Kinase",
  "Receptor-Like Protein",
  "Resistance Kinase",
  "Other Kinase",
  "Unannotated",
] as const satisfies readonly ReceptorFamily[];

export const LOCALIZATIONS = [
  "Cell membrane",
  "Cytoplasm",
  "Nucleus",
  "Lysosome/Vacuole",
  "Endoplasmic reticulum",
  "Golgi apparatus",
  "Extracellular",
] as const satisfies readonly Localization[];

export const CHROMOSOMES = Array.from(
  new Set(
    receptors
      .map((r) => r.chromosome)
      .filter((c): c is string => Boolean(c)),
  ),
).sort();

export const SPECIES = Array.from(
  new Set(receptors.map((r) => r.species)),
).sort();