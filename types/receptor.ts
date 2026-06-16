/**
 * Raw record shape as it appears in `src/data/data.json`.
 * Keys match the original dataset exactly (including the trailing `__EMPTY`).
 */
export interface RawReceptor {
  "No.": number;
  SeqName: string;
  Length: number;
  Description: string;
  Localizations: string;
  MW: string;
  IP: string;
  UniProt: string;
  Prosite: string;
  Database_Domain_Description: string;
  InterPro_Description: string;
  __EMPTY?: string;
}

/**
 * Coarse family classification derived from {@link RawReceptor.Description}.
 * Used for filtering and grouping in the UI.
 */
export type ReceptorFamily =
  | "LRR Receptor Kinase"
  | "G-type Lectin S-Receptor Kinase"
  | "L-type Lectin Receptor Kinase"
  | "Wall-Associated Kinase"
  | "Cysteine-Rich Receptor Kinase"
  | "Receptor-Like Kinase"
  | "Receptor-Like Protein"
  | "Resistance Kinase"
  | "Other Kinase"
  | "Unannotated";

/**
 * Subcellular localization, derived by splitting `Localizations` on `|`.
 */
export type Localization =
  | "Cell membrane"
  | "Cytoplasm"
  | "Nucleus"
  | "Lysosome/Vacuole"
  | "Endoplasmic reticulum"
  | "Golgi apparatus"
  | "Extracellular"
  | "Mitochondrion"
  | "Chloroplast"
  | "Peroxisome";

/**
 * Normalized, UI-friendly receptor record. Built from {@link RawReceptor}
 * by `src/data/receptors.ts`.
 */
export interface Receptor {
  /** URL-safe identifier (lowercased SeqName). */
  id: string;
  /** Original sequence/gene name, e.g. `TraesCS7A03G0757400`. */
  seqName: string;
  /** Sequence length in amino acids. */
  length: number;
  /** Human-readable description from the source dataset. */
  description: string;
  /** Subcellular localizations (always at least one entry). */
  localizations: Localization[];
  /** Molecular weight (Da) or `null` if unavailable. */
  molecularWeight: number | null;
  /** Isoelectric point or `null` if unavailable. */
  isoelectricPoint: number | null;
  /** UniProt accession or `null` if not assigned. */
  uniprot: string | null;
  /** PROSITE identifier or `null` if not assigned. */
  prosite: string | null;
  /** Parsed `Database_Domain_Description` entries, e.g. `"Gene3D: …"`. */
  domains: string[];
  /** Parsed `InterPro_Description` entries. */
  interpro: string[];
  /** Coarse family derived from `description`. */
  family: ReceptorFamily;
  /** Species inferred from the SeqName prefix (best-effort). */
  species: string;
  /** Chromosome / sub-genome identifier inferred from the SeqName. */
  chromosome: string | null;
}
