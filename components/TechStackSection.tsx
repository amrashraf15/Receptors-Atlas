import { Cpu } from "lucide-react";

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "TanStack Table",
  "Zod",
  "Framer Motion",
];

export function TechStackSection() {
  return (
    <section className="container-page py-16">
      <div className="flex items-center gap-3">
        <Cpu className="h-5 w-5 text-accent" />

        <h2 className="text-2xl font-semibold tracking-tight">
          Technology Stack
        </h2>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}