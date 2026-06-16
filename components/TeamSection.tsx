const team = [
  {
    name: "Dr. Elena Martínez",
    role: "Principal Investigator",
    focus: "GPCR signaling",
  },
  {
    name: "Dr. Hiroshi Tanaka",
    role: "Computational Lead",
    focus: "Bioinformatics",
  },
  {
    name: "Dr. Amara Okafor",
    role: "Curation Director",
    focus: "Nuclear receptors",
  },
  {
    name: "Dr. Lukas Berger",
    role: "Data Engineering",
    focus: "Research infrastructure",
  },
];

export function TeamSection() {
  return (
    <section className="relative border-t border-border/60 bg-background/40 backdrop-blur-xl">
      <div className="container-page py-20">
        {/* HEADER */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Team
        </h2>

        {/* GRID */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="
                group relative overflow-hidden
                rounded-2xl border border-border/60
                bg-card/60 backdrop-blur-xl
                p-5
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                hover:border-primary/40
              "
            >
              {/* ambient glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
              </div>

              {/* avatar */}
              <div
                className="
                  relative flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  bg-linear-to-br from-primary/80 to-accent/60
                  text-primary-foreground
                  font-mono text-sm font-semibold
                  shadow-md
                  transition-transform duration-300
                  group-hover:scale-110 group-hover:rotate-3
                "
              >
                {member.name
                  .split(" ")
                  .slice(-2)
                  .map((s) => s[0])
                  .join("")}
              </div>

              {/* name */}
              <h3 className="relative mt-4 font-semibold text-foreground">
                {member.name}
              </h3>

              {/* role */}
              <p className="relative text-sm text-muted-foreground">
                {member.role}
              </p>

              {/* focus */}
              <div className="relative mt-3 inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-accent">
                {member.focus}
              </div>

              {/* bottom accent line */}
              <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}