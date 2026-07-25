import type { Metadata } from "next";
import { StandalonePage } from "@/components/content/StandalonePage";
import { SedimentFlux } from "@/components/content/research/SedimentFlux";

export const metadata: Metadata = {
  title: "Integrating Sediment Dynamics into Flood Risk Modeling in Koshi River Basin — Mukesh Poudel",
  description:
    "A machine learning approach that estimates suspended sediment concentration from satellite imagery to support flood-risk modeling in Nepal's Koshi River Basin.",
  alternates: { canonical: "/sedimentflux/" },
  openGraph: {
    title: "Integrating Sediment Dynamics into Flood Risk Modeling in Koshi River Basin",
    description:
      "Estimating suspended sediment concentration from satellite imagery for flood-risk modeling in the Koshi River Basin.",
    url: "https://mukeshpoudel.com.np/sedimentflux/",
    type: "article",
  },
};

export default function Page() {
  return (
    <StandalonePage>
      <SedimentFlux />
    </StandalonePage>
  );
}
