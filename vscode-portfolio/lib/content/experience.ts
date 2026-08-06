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

// NOTE: not strictly reverse-chronological; current roles lead, then a curated
// order. Update `current` and `period` as roles change.

export const experience: ExperienceEntry[] = [
  {
    role: "Web & AI Developer",
    org: "Center for Entrepreneurship, University of Southern Mississippi",
    location: "Hattiesburg, MS",
    period: "2025 – Present",
    current: true,
    summary:
      "Build and maintain the Center's web platforms and internal tools, and develop and manage AI-agent workflows that support its entrepreneurship programs.",
    tags: ["Next.js", "AI Agents", "TypeScript"],
  },
  {
    role: "Undergraduate Research Assistant",
    org: "Ma Research Lab, University of Southern Mississippi",
    location: "Hattiesburg, MS",
    period: "Aug 2025 – Present",
    current: true,
    summary:
      "Building ML pipelines to automatically characterize and speed up Atomic Force Microscopy imaging of block copolymers.",
    points: [
      "Trained a custom U-Net to segment nanoscale features in AFM images, a 35% improvement over conventional image analysis",
      "Benchmarked CNN, transformer, and GAN super-resolution models to cut AFM scan time by up to 3.7x (manuscript in preparation)",
    ],
    tags: ["PyTorch", "U-Net", "Super-Resolution", "HPC"],
  },
  {
    role: "Web Developer",
    org: "BIONET Project (Euro-African Biomonitoring Network)",
    period: "Nov 2024 – Jan 2025",
    summary:
      "Built and deployed a TYPO3 website for a network assessing environmental exposure in populations.",
    points: ["Developed the CMS-driven site and deployed it on Azure with Apache and MySQL"],
    tags: ["TYPO3", "PHP", "Azure"],
    href: "https://bionet-project.org",
  },
  {
    role: "Undergraduate Research Assistant",
    org: "Cyber Innovations Lab, University of Southern Mississippi",
    location: "Hattiesburg, MS",
    period: "May 2025 – Aug 2025",
    summary:
      "Built ML and deep-learning pipelines for AES-128 key recovery via electromagnetic side-channel analysis on the ASCAD dataset.",
    points: [
      "Trained and benchmarked CNN, ResNet, SVM, and feature-selected Random Forest classifiers against EM traces, reaching Rank-0 key recovery",
      "Work published at the 34th SEDE Conference (AI Track), 2025 (Springer CCIS)",
    ],
    tags: ["PyTorch", "CNN / ResNet", "Side-Channel Analysis"],
    href: "/aeskeyrecovery/",
  },
  {
    role: "Co-founder & Web Lead",
    org: "Quantum Undergraduate Network",
    period: "2025 – Present",
    summary:
      "Co-founded a global community that helps undergraduates get into quantum information science, and solo-built its web platform.",
    points: ["Designed, built, and deployed the full React and Next.js platform on Vercel for talks, resources, and networking"],
    tags: ["React.js", "Next.js", "Vercel"],
    href: "https://qunwebsite.vercel.app/",
  },
  {
    role: "Technical Infrastructure Lead",
    org: "Nepal Health Frontiers",
    period: "2024 – Present",
    summary:
      "Lead the technical infrastructure and digital presence of a healthcare NGO working on non-communicable diseases, mental health, and healthy-lungs campaigns.",
    points: ["Maintain the website and email systems and publish the monthly research roundup"],
    tags: ["WordPress", "PHP"],
    href: "https://nepalhealthfrontiers.org/",
  },
];
