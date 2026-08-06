export const education = {
  school: "University of Southern Mississippi",
  degree: "B.S. in Computer Science",
  period: "Aug 2023 – May 2027",
  detail: "GPA 4.0 / 4.0 · Keystone Honors Scholar · full-tuition merit scholarship",
};

export const publication = {
  citation:
    "M. Poudel and N. Rahimi, “Machine Learning-Based AES Key Recovery via Side-Channel Analysis on the ASCAD Dataset,” 34th Software and Data Engineering (SEDE) Conference, AI Track, 2025.",
  href: "https://arxiv.org/abs/2508.11817",
  hrefLabel: "arXiv:2508.11817",
};

export interface Award {
  title: string;
  org: string;
  year: string;
  note?: string;
}

export const awards: Award[] = [
  {
    title: "Golden Idea Pitch Competition — 3rd place ($1,500)",
    org: "Center for Entrepreneurship, USM",
    year: "2026",
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
  },
  {
    title: "Top-12 Finalist, Rising Star Innovation",
    org: "ICT Award Nepal",
    year: "2022",
    note: "National recognition selected among entries from across Nepal",
  },
];

export const highlightBullets: string[] = [
  "Published & presented ML research at the 34th SEDE Conference (AI Track), 2025",
  "Built Fleet of One Mind — a maritime threat-ID & decision-support system for the DS4D program, pitched at SOF Week 2026",
  "31 merged pull requests across open-source projects",
  "Author of photo-particles, an npm library with 11+ stars",
];
