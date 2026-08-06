export interface ProjectLink {
  label: string;
  href: string;
  icon: "external" | "github" | "paper" | "npm";
}

export type ProjectGroup = "research" | "software";

export interface Project {
  slug: string;
  group: ProjectGroup;
  badge: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  links: ProjectLink[];
  pageTabId?: string;
}

export const projects: Project[] = [
  // ---- Research & ML ----
  {
    slug: "aes-key-recovery",
    group: "research",
    badge: "Research",
    title: "ML-Based AES Key Recovery via Side-Channel Analysis",
    description:
      "Machine-learning and deep-learning models (Random Forest, SVM, CNN, ResNet) that recover AES-128 keys from electromagnetic side-channel traces on the ASCAD dataset, reaching Rank-0 recovery. Published at the 34th SEDE Conference (AI Track), 2025.",
    tech: ["Python", "PyTorch", "Scikit-learn", "CNN / ResNet"],
    image: "/images/mldl-sca.png",
    links: [{ label: "View On arXiv", href: "https://arxiv.org/abs/2508.11817", icon: "paper" }],
    pageTabId: "aes-key-recovery",
  },
  {
    slug: "sediment-flux-koshi",
    group: "research",
    badge: "Research",
    title: "Sediment Estimation for Flood-Risk Modeling, Koshi Basin",
    description:
      "A machine-learning pipeline that estimates suspended sediment concentration from Sentinel-2 imagery to improve flood-risk models for the Koshi River Basin. Funded by an Eagle SPUR grant and presented at MidSouth ASPRS 2026.",
    tech: ["Python", "Google Earth Engine", "Sentinel-2", "Scikit-learn"],
    image: "/images/basemap-koshi.png",
    links: [],
    pageTabId: "sediment-flux",
  },
  {
    slug: "unet-water-segmentation",
    group: "research",
    badge: "Computer Vision",
    title: "Satellite Water-Body Segmentation with U-Net",
    description:
      "A U-Net model in PyTorch that segments water bodies from multispectral satellite imagery, producing accurate masks from noisy real-world scenes.",
    tech: ["Python", "PyTorch", "U-Net", "Computer Vision"],
    image: "/images/unet-segmentation.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/UNet-Water-Segmentation", icon: "github" }],
  },

  // ---- Software & Tools ----
  {
    slug: "benefitflow",
    group: "software",
    badge: "Startup · Founder",
    title: "BenefitFlow",
    description:
      "A platform that automates the federal benefits lifecycle, screening, enrollment, and renewal, so people don't lose SNAP, Medicaid, and Medicare to processing errors and missed deadlines, and states cut the error rates that trigger federal penalties. Applications are pre-filled by ML models fine-tuned on federal regulations, with a human reviewer before every submission. My startup; winner of USM's Golden Idea Pitch and Checkpoint programs.",
    tech: ["Next.js", "TypeScript", "Machine Learning", "HIPAA"],
    links: [{ label: "Visit benefitflow.us", href: "https://www.benefitflow.us", icon: "external" }],
  },
  {
    slug: "photo-particles",
    group: "software",
    badge: "Open Source · npm",
    title: "photo-particles",
    description:
      "A published JavaScript library that turns any image into an interactive, physics-driven particle cloud. Zero dependencies and plug-and-play. It powers the photo on this site's home page.",
    tech: ["JavaScript", "Canvas", "Physics", "esbuild"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/photo-particles", icon: "npm" },
      { label: "GitHub", href: "https://github.com/ThorOdinson246/photo-particles", icon: "github" },
    ],
  },
  {
    slug: "whatwasit",
    group: "software",
    badge: "Dev Tool · ML",
    title: "whatwasit",
    description:
      "Local-first semantic search for your shell history. It finds commands by what you were trying to do rather than the exact text you typed, using ONNX embeddings alongside FTS5 keyword search, an interactive TUI, and fully offline inference. Published on PyPI.",
    tech: ["Python", "ONNX", "Embeddings", "SQLite FTS5"],
    links: [{ label: "GitHub", href: "https://github.com/ThorOdinson246/whatwasit", icon: "github" }],
  },
  {
    slug: "crisislens",
    group: "software",
    badge: "Full Stack",
    title: "CrisisLens",
    description:
      "An independent platform that documents and geo-tags crisis incidents, from conflicts to infrastructure damage, using satellite imagery and open-source intelligence. Built on Next.js with a Leaflet map and a time-slider over a multi-year conflict dataset.",
    tech: ["Next.js", "React.js", "TypeScript", "Leaflet"],
    image: "/images/crisislens.png",
    links: [{ label: "View Project", href: "https://crisislens.mukeshpoudel.com.np", icon: "external" }],
  },
  {
    slug: "xtmonctl",
    group: "software",
    badge: "Systems · Rust",
    title: "xtmonctl",
    description:
      "A Linux CLI and terminal-UI tool for controlling external-monitor brightness over DDC/CI, built for people who live in the terminal. It offers a keyboard-driven TUI, JSON and plain-text output for scripting, and a small native binary.",
    tech: ["Rust", "ddcutil", "DDC/CI", "TUI"],
    links: [{ label: "GitHub", href: "https://github.com/ThorOdinson246/xtmonctl", icon: "github" }],
  },
  {
    slug: "hub-city-transit-v2",
    group: "software",
    badge: "Full Stack",
    title: "Hub City Transit v2",
    description:
      "A real-time bus-tracking platform that pairs an ArcGIS Feature Layer REST API with the Google Maps API for live, traffic-aware ETA calculations. A full rebuild of the city's transit tracker.",
    tech: ["Flask", "Google Maps API", "Docker", "Cloud Run", "ArcPy"],
    image: "/images/hubcityv2.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/hubcitytransitv2", icon: "github" }],
  },
  {
    slug: "delagent",
    group: "software",
    badge: "Hackathon · MHacks 2025",
    title: "Delagent",
    description:
      "A voice-first AI scheduling platform where autonomous agents negotiate meeting times in real time using Gemini. Built at MHacks 2025.",
    tech: ["TypeScript", "Gemini", "Voice", "Multi-agent"],
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/Delagent_MHacks25", icon: "github" }],
  },
  {
    slug: "mero-swasthya",
    group: "software",
    badge: "Health Tech",
    title: "Mero Swasthya",
    description:
      "A prototype digital-health app for Nepal that improves health literacy and access by connecting patients and providers. Built for the ICT Award 2022.",
    tech: ["Flutter", "Firebase", "Dart", "REST API"],
    image: "/images/meroswasthya.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/Mero-Swasthya", icon: "github" }],
  },
];

export const researchProjects = projects.filter((p) => p.group === "research");
export const softwareProjects = projects.filter((p) => p.group === "software");
export const allProjects = projects;
