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
    slug: "afm-super-resolution",
    group: "research",
    badge: "Research",
    title: "Super-Resolution & Segmentation for AFM Microscopy",
    description:
      "ML pipelines to characterize and accelerate Atomic Force Microscopy of block copolymers: a custom U-Net segments nanoscale features (+35% over conventional analysis), while benchmarked CNN/transformer/GAN super-resolution models cut scan time by up to 3.7×.",
    tech: ["PyTorch", "U-Net", "Super-Resolution", "HPC"],
    links: [],
    pageTabId: "afm-super-resolution",
  },
  {
    slug: "aes-key-recovery",
    group: "research",
    badge: "Research",
    title: "ML-Based AES Key Recovery via Side-Channel Analysis",
    description:
      "A machine learning and deep learning approach (RF, SVC, CNN, ResNet) for AES key recovery via electromagnetic side-channel analysis on the ASCAD dataset, achieving Rank-0 key recovery. Published at SEDE 2025.",
    tech: ["Python", "PyTorch", "Scikit-learn", "CNN / ResNet"],
    image: "/images/mldl-sca.png",
    links: [{ label: "View On arXiv", href: "https://arxiv.org/abs/2508.11817", icon: "paper" }],
    pageTabId: "aes-key-recovery",
  },
  {
    slug: "sediment-flux-koshi",
    group: "research",
    badge: "Research",
    title: "Sediment Dynamics for Flood Risk Modeling — Koshi Basin",
    description:
      "A machine-learning approach estimating suspended sediment concentration from Sentinel-2 imagery to improve flood-risk models for the Koshi River Basin. Funded by an Eagle SPUR grant; presented at MidSouth ASPRS 2026.",
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
      "Water-body segmentation using U-Net and PyTorch on satellite imagery — accurate detection and segmentation of water from multispectral satellite data.",
    tech: ["Python", "PyTorch", "U-Net", "Computer Vision"],
    image: "/images/unet-segmentation.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/UNet-Water-Segmentation", icon: "github" }],
  },

  // ---- Software & Tools ----
  {
    slug: "crisislens",
    group: "software",
    badge: "Full Stack",
    title: "CrisisLens",
    description:
      "An independent platform that documents and geo-tags crisis-related incidents — conflicts, humanitarian disasters, and infrastructure damage — using satellite imagery and open-source intelligence, with a time-slider interface over a multi-year conflict dataset.",
    tech: ["Next.js", "React.js", "TypeScript", "Leaflet"],
    image: "/images/crisislens.png",
    links: [{ label: "View Project", href: "https://crisislens.mukeshpoudel.com.np", icon: "external" }],
  },
  {
    slug: "photo-particles",
    group: "software",
    badge: "Open Source · npm",
    title: "photo-particles",
    description:
      "A published JavaScript library that turns any image into an interactive, physics-driven particle cloud — the same effect powering the photo on this site's home page. Zero dependencies, plug-and-play.",
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
      "Local-first semantic search for your shell history — find commands by what you were trying to do, not the exact text you typed. Hybrid ONNX embeddings + FTS5, an interactive TUI, and fully offline. Published on PyPI.",
    tech: ["Python", "ONNX", "Embeddings", "SQLite FTS5", "TUI"],
    links: [{ label: "GitHub", href: "https://github.com/ThorOdinson246/whatwasit", icon: "github" }],
  },
  {
    slug: "xtmonctl",
    group: "software",
    badge: "Systems · Rust",
    title: "xtmonctl",
    description:
      "A Linux CLI and terminal-UI tool for controlling external-monitor brightness over DDC/CI, built for people who live in the terminal. Keyboard-driven TUI, JSON/plain output for scripting, and a small native binary.",
    tech: ["Rust", "ratatui", "ddcutil", "DDC/CI"],
    links: [{ label: "GitHub", href: "https://github.com/ThorOdinson246/xtmonctl", icon: "github" }],
  },
  {
    slug: "hub-city-transit-v2",
    group: "software",
    badge: "Full Stack",
    title: "Hub City Transit v2",
    description:
      "A real-time bus-tracking platform integrating an ArcGIS Feature Layer REST API with the Google Maps API for live, traffic-aware ETA calculations — a full overhaul of the city's transit tracker.",
    tech: ["Flask", "Google Maps API", "Docker", "Cloud Run", "ArcPy"],
    image: "/images/hubcityv2.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/hubcitytransitv2", icon: "github" }],
  },
  {
    slug: "mero-swasthya",
    group: "software",
    badge: "Health Tech",
    title: "Mero Swasthya",
    description:
      "A prototype digital-health app for Nepal aimed at improving health literacy and access, bridging patients and providers. ICT Award 2022 entry.",
    tech: ["Flutter", "Firebase", "Dart", "REST API"],
    image: "/images/meroswasthya.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/Mero-Swasthya", icon: "github" }],
  },
];

export const researchProjects = projects.filter((p) => p.group === "research");
export const softwareProjects = projects.filter((p) => p.group === "software");
export const allProjects = projects;
