export interface ExperienceEntry {
  role: string;
  org: string;
  location?: string;
  period: string;
  current?: boolean;
  summary: string;
  points?: string[];
  tags?: string[];
  href?: string;
}

// NOTE: reverse-chronological. Add your new position as the first entry when
// details are ready, e.g.:
// {
//   role: "Your Title",
//   org: "Company",
//   period: "2026 – Present",
//   current: true,
//   summary: "...",
//   points: ["..."],
//   tags: ["..."],
// },

export const experience: ExperienceEntry[] = [
  {
    role: "Undergraduate Research Assistant",
    org: "Ma Research Lab, University of Southern Mississippi",
    location: "Hattiesburg, MS",
    period: "Aug 2025 – Present",
    current: true,
    summary:
      "ML pipelines for automated characterization and accelerated imaging of Block Copolymers via Atomic Force Microscopy.",
    points: [
      "Trained a custom U-Net to segment nanoscale features in AFM images — 35% improvement over conventional image analysis",
      "Benchmarked CNN, transformer, and GAN super-resolution models to speed up AFM scans by up to 3.7× (manuscript in preparation)",
    ],
    tags: ["PyTorch", "U-Net", "Super-Resolution", "HPC"],
  },
  {
    role: "Undergraduate Researcher",
    org: "Remote Sensing Research, University of Southern Mississippi",
    location: "Hattiesburg, MS",
    period: "Sep 2025 – Apr 2026",
    summary:
      "Estimating suspended sediment concentration from Sentinel-2 imagery to improve flood-risk models for the Koshi River Basin.",
    points: [
      "Built an ML pipeline (ensemble + deep learning) over Sentinel-2 spectral bands and derived indices",
      "Funded by an Eagle SPUR research grant; presented at the 2026 MidSouth ASPRS Conference (ORNL)",
    ],
    tags: ["Google Earth Engine", "Sentinel-2", "Scikit-Learn"],
    href: "/sedimentflux/",
  },
  {
    role: "Undergraduate Research Assistant",
    org: "Cyber Innovations Lab, University of Southern Mississippi",
    location: "Hattiesburg, MS",
    period: "May 2025 – Aug 2025",
    summary:
      "ML/DL pipelines for AES-128 key recovery via electromagnetic side-channel analysis on the ASCAD dataset.",
    points: [
      "Built and benchmarked CNN, ResNet, and feature-selected Random Forest classifiers against EM traces; achieved Rank-0 key recovery",
      "Published and presented at the 34th SEDE Conference (AI Track), 2025",
    ],
    tags: ["PyTorch", "CNN / ResNet", "Side-Channel Analysis"],
    href: "/aeskeyrecovery/",
  },
  {
    role: "Technical Infrastructure Lead",
    org: "Nepal Health Frontiers",
    period: "2024 – Present",
    summary:
      "Lead technical infrastructure and the digital presence of a healthcare NGO focused on NCDs, mental health, and healthy-lungs campaigns.",
    points: [
      "Maintain website services and email systems, and publish monthly research roundups",
    ],
    tags: ["WordPress", "PHP"],
    href: "https://nepalhealthfrontiers.org/",
  },
  {
    role: "Co-founder & Web Lead",
    org: "Quantum Undergraduate Network",
    period: "2024 – Present",
    summary:
      "Co-founded a global community launching undergraduates into quantum information science; solo-built the web platform.",
    points: [
      "Built and shipped the full React/Next.js platform on Vercel for talks, resources, and networking",
    ],
    tags: ["React.js", "Next.js", "Vercel"],
    href: "https://qunwebsite.vercel.app/",
  },
  {
    role: "Web Developer",
    org: "BIONET Project (Euro-African Biomonitoring Network)",
    period: "2023 – 2024",
    summary:
      "Developed and deployed a TYPO3 website for a network assessing environmental exposure in populations.",
    points: ["Built the CMS-driven site and deployment on Azure with Apache and MySQL"],
    tags: ["TYPO3", "PHP", "Azure"],
    href: "https://bionet-project.org",
  },
];
