"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Dna,
} from "lucide-react";

import heroImg from "@/public/hero-network.jpg";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* Background Image */}
      <div className="absolute inset-0 -z-40">
        <Image
          src={heroImg}
          alt="Scientific receptor network"
          fill
          priority
          quality={100}
          className="object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-background/80 " />

      {/* Gradient Effects */}
      <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-0 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-2xl" />

      <div className="container-page">
        <div className="grid min-h-[85vh] items-center gap-16 py-20 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div>
            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-primary/20
                bg-primary/10
                px-4
                py-2
                text-sm
                font-medium
                text-primary
                backdrop-blur
              "
            >
              <Dna className="h-4 w-4" />
              Scientific Research Platform
            </div>

            {/* Heading */}
            <h1
              className="
                mt-8
                text-5xl
                font-bold
                tracking-tight
                text-foreground
                sm:text-6xl
                lg:text-7xl
              "
            >
              Receptor
              <span className="block bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Research Database
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                leading-8
                text-muted-foreground
                lg:text-xl
              "
            >
              Access curated receptor classifications, protein annotations,
              localization profiles, UniProt references, and molecular biology
              datasets through a modern research environment designed for
              scientists and bioinformatics teams.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/receptors"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-primary
                  px-6
                  py-3
                  font-medium
                  text-primary-foreground
                  shadow-lg
                  shadow-primary/25
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-xl
                "
              >
                Explore Database
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/about"
                className="
                  inline-flex
                  items-center
                  rounded-xl
                  border
                  border-border
                  bg-background/60
                  px-6
                  py-3
                  font-medium
                  backdrop-blur
                  transition-colors
                  hover:bg-muted
                "
              >
                About Research
              </Link>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

function CardItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border/50 bg-card/50 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}