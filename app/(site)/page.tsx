import type { Metadata } from "next";




export const metadata: Metadata = {
  title: "Receptor Research Portal",
  description:
    "Explore receptor classifications, molecular functions, expression profiles, and peer-reviewed research.",

  openGraph: {
    title: "Receptor Research Portal",
    description:
      "Comprehensive scientific database of receptor research.",
    url: "/",
    type: "website",
  },

  alternates: {
    canonical: "/",
  },
};

export default async function RecptorsPage() {
  

  return (
   <></>
  );
}