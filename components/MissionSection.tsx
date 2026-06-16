import {
  Target,
  Compass,
  FlaskConical,
} from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Mission",
    body:
      "Provide researchers with accurate, standardized receptor data and accelerate discovery through transparent classification.",
  },
  {
    icon: Compass,
    title: "Vision",
    body:
      "Become the reference database for receptor science, bridging molecular research and clinical pharmacology.",
  },
  {
    icon: FlaskConical,
    title: "Research Objectives",
    body:
      "Index expression profiles, capture publication trails, and support reproducible scientific workflows.",
  },
];

export function MissionSection() {
  return (
    <section className="relative border-t border-border/60 bg-background/40 backdrop-blur-xl">
      <div className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
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
              {/* ambient glow */}
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
                <card.icon className="h-5 w-5" />
              </div>

              {/* TITLE */}
              <h2 className="relative mt-5 text-lg font-semibold text-foreground">
                {card.title}
              </h2>

              {/* BODY */}
              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
                {card.body}
              </p>

              {/* subtle bottom accent line */}
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}