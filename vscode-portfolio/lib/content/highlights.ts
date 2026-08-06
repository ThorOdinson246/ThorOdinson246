export const education = {
  school: "University of Southern Mississippi",
  degree: "B.S. in Computer Science",
  period: "Aug 2023 – May 2027",
  detail: "GPA 4.0 / 4.0 · Keystone Honors Scholar · full-tuition merit scholarship",
};

export interface PublicationLink {
  label: string;
  href: string;
}

export interface Publication {
  status: string;
  citation: string;
  links: PublicationLink[];
}

export const publications: Publication[] = [
  {
    status: "Published",
    citation:
      "M. Poudel and N. Rahimi, “Machine Learning-Based AES Key Recovery via Side-Channel Analysis on the ASCAD Dataset,” 34th Software and Data Engineering (SEDE) Conference, AI Track, 2025. Springer CCIS, vol. 2720, pp. 334-352.",
    links: [
      { label: "Springer", href: "https://link.springer.com/chapter/10.1007/978-3-032-08649-5_21" },
      { label: "arXiv", href: "https://arxiv.org/abs/2508.11817" },
    ],
  },
  {
    status: "In preparation",
    citation:
      "Super-resolution and segmentation for accelerated Atomic Force Microscopy of block copolymers (Ma Lab, University of Southern Mississippi).",
    links: [],
  },
];

export interface Award {
  title: string;
  org: string;
  year: string;
  note?: string;
}

export const awards: Award[] = [
  {
    title: "Golden Idea Pitch Competition, 3rd place ($1,500)",
    org: "Center for Entrepreneurship, USM",
    year: "2026",
    note: "For BenefitFlow",
  },
  {
    title: "Eagle SPUR Research Grant ($1,500)",
    org: "Drapeau Center for Undergraduate Research",
    year: "2025",
    note: "Merit funding for ML-based sediment estimation from Sentinel-2 imagery",
  },
  {
    title: "Keystone Honors Scholar ($2,000)",
    org: "University of Southern Mississippi",
    year: "2025",
  },
  {
    title: "Checkpoint Pitch Program Award ($500)",
    org: "Center for Entrepreneurship, USM",
    year: "2024",
    note: "For BenefitFlow",
  },
  {
    title: "Top-12 Finalist, Rising Star Innovation",
    org: "ICT Award Nepal",
    year: "2022",
    note: "National recognition among entries from across Nepal",
  },
];

export interface SelectedWork {
  title: string;
  note: string;
}

export const selectedWork: SelectedWork[] = [];
