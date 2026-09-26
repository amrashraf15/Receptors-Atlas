const contributors = [
  {
    role: "Plant Bioinformatics Lead",
    focus: "Hexaploid Genome Assembly & Locus Annotation",
    department: "Functional Genomics Group",
  },
  {
    role: "Molecular Pathology Specialist",
    focus: "Receptor-Mediated Immunity & Pathogen Perception",
    department: "Crop Defense Signaling Laboratory",
  },
  {
    role: "Protein Structure & Domain Curation",
    focus: "Kinase Domain Catalysis & InterPro Mapping",
    department: "Structural Bioinformatics Unit",
  },
  {
    role: "Biological Data Engineering",
    focus: "Database Interoperability & FAIR Data Stewardship",
    department: "Research Computing Infrastructure",
  },
];

export function TeamSection() {
  return (
    <section className="border-b border-border bg-surface-subtle py-14 sm:py-18">
      <div className="container-page">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Curation & Governance
          </div>

          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Scientific Stewardship & Working Groups
          </h2>

          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Multi-disciplinary expertise guiding gene model validation, domain architecture consistency, and database alignment with international standards.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contributors.map((item) => (
            <div
              key={item.role}
              className="rounded-lg border border-border bg-card p-5 shadow-2xs"
            >
              <div className="text-xs font-mono font-medium text-primary">
                {item.department}
              </div>

              <h3 className="mt-2 text-sm sm:text-base font-semibold text-foreground">
                {item.role}
              </h3>

              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {item.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}