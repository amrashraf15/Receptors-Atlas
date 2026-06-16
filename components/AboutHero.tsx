export function AboutHero() {
  return (
    <section className="relative border-b border-border/60 bg-background/40 backdrop-blur-xl overflow-hidden">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container-page relative py-24 sm:py-28">
        {/* label */}
        <div className="font-mono text-xs uppercase tracking-wider text-accent">
          About the platform
        </div>

        {/* headline */}
        <h1 className="mt-4 max-w-3xl text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight">
          A scientific portal for receptor research, built on rigor.
        </h1>

        {/* description */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          We curate, classify, and contextualize receptor data from peer-reviewed
          sources to support pharmacology, molecular biology, and translational research.
        </p>

        {/* subtle divider accent */}
        <div className="mt-10 h-px w-24 bg-gradient-to-r from-accent/60 to-transparent" />
      </div>
    </section>
  );
}