import {
  Search,
  Network,
  FlaskConical,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Advanced Search",
    body: "Query by symbol, family, species, and expression with instant results.",
  },
  {
    icon: Network,
    title: "Scientific Classification",
    body: "Standardized taxonomy across GPCRs, ion channels, nuclear receptors, and more.",
  },
  {
    icon: FlaskConical,
    title: "Data Exploration",
    body: "Switch between table and card views with sorting, filtering, and pagination.",
  },
  {
    icon: BookOpen,
    title: "Publication Tracking",
    body: "Indexed citations per receptor with cross-references to literature.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative border-t border-border/60 bg-background/40 backdrop-blur-xl">
      <div className="container-page py-24">
        {/* HEADER */}
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-wider text-accent">
            Research tools
          </div>

          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Built for scientific rigor
          </h2>

          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            A modern exploration interface designed for structured biological data,
            high-performance filtering, and research-grade accuracy.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="
                group relative overflow-hidden
                rounded-2xl border border-border/60
                bg-card/60 backdrop-blur-xl
                p-6
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                hover:border-accent/40
              "
            >
              {/* glow background */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              </div>

              {/* ICON */}
              <div
                className="
                  relative flex h-11 w-11 items-center justify-center
                  rounded-xl border border-border/60
                  bg-muted/50 text-accent
                  transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-6
                "
              >
                <feature.icon className="h-5 w-5" />
              </div>

              {/* CONTENT */}
              <h3 className="relative mt-5 font-semibold text-foreground">
                {feature.title}
              </h3>

              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.body}
              </p>

              {/* subtle bottom highlight line */}
              <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}