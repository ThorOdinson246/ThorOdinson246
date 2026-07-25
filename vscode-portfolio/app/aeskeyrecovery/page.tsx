import type { Metadata } from "next";
import { StandalonePage } from "@/components/content/StandalonePage";
import { AesKeyRecovery } from "@/components/content/research/AesKeyRecovery";

export const metadata: Metadata = {
  title: "Machine Learning-Based AES Key Recovery via Side-Channel Analysis — Mukesh Poudel",
  description:
    "ML and deep learning models (RF, SVC, CNN, ResNet) for AES key recovery via electromagnetic side-channel analysis on the ASCAD dataset, evaluated with the Key Rank metric.",
  alternates: { canonical: "/aeskeyrecovery/" },
  openGraph: {
    title: "Machine Learning-Based AES Key Recovery via Side-Channel Analysis",
    description:
      "ML and deep learning models for AES key recovery via EM side-channel analysis on the ASCAD dataset.",
    url: "https://mukeshpoudel.com.np/aeskeyrecovery/",
    type: "article",
  },
};

export default function Page() {
  return (
    <StandalonePage>
      <AesKeyRecovery />
    </StandalonePage>
  );
}
