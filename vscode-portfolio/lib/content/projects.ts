export interface ProjectLink {
  label: string;
  href: string;
  icon: "external" | "github" | "paper";
}

export interface Project {
  slug: string;
  badge: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  links: ProjectLink[];
  pageTabId?: string;
}

export const personalProjects: Project[] = [
  {
    slug: "crisislens",
    badge: "Full Stack",
    title: "CrisisLens",
    description:
      "An attempt to document and geo-tag crisis-related incidents, conflicts, wars, humanitarian disasters, and infrastructure damage through careful collection and analysis of publicly available information, satellite imagery, and open-source intelligence to get an enhanced understanding of global politics, conflict dynamics, and civilian impact.",
    tech: ["Next.js", "React.js", "TypeScript", "Node.js"],
    image: "/images/crisislens.png",
    links: [{ label: "View Project", href: "https://crisislens.mukeshpoudel.com.np", icon: "external" }],
  },
  {
    slug: "aes-key-recovery",
    badge: "Research",
    title: "Machine Learning Based AES Key Recovery via Side-Channel Analysis",
    description:
      "A machine learning and deep learning based approach using RF, SVC, CNNs and ResNets for AES key recovery using side-channel analysis on the ASCAD dataset. This project explores the use of ML and DL models to exploit EM side-channel leakage for cryptographic key recovery.",
    tech: ["Python", "PyTorch", "Scikit-learn", "Jupyter"],
    image: "/images/mldl-sca.png",
    links: [{ label: "View On arXiv", href: "https://arxiv.org/abs/2508.11817", icon: "paper" }],
    pageTabId: "aes-key-recovery",
  },
  {
    slug: "sediment-flux-koshi",
    badge: "Research",
    title: "Integrating Sediment Dynamics into Flood Risk Modeling",
    description:
      "A Machine learning based approach to integrate sediment dynamics to model flood risk in Koshi River Basin. This project leverages advanced spectral indices and machine learning techniques for improved flood prediction accuracy.",
    tech: ["Python", "PyTorch", "GIS", "Azure"],
    image: "/images/basemap-koshi.png",
    links: [],
    pageTabId: "sediment-flux",
  },
  {
    slug: "unet-water-segmentation",
    badge: "Computer Vision",
    title: "Satellite Water Body Segmentation: U-Net with PyTorch",
    description:
      "Water body segmentation using U-Net and PyTorch on satellite imagery. This project implements state-of-the-art deep learning techniques for accurate water body detection and segmentation from satellite data.",
    tech: ["Python", "PyTorch", "Computer Vision", "Jupyter"],
    image: "/images/unet-segmentation.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/UNet-Water-Segmentation", icon: "github" }],
  },
  {
    slug: "hub-city-transit-v2",
    badge: "Full Stack",
    title: "Hub City Transit v2",
    description:
      "Redesigning the city's bus tracking platform to enhance usability and add real-time ETA calculations with traffic considerations. A complete overhaul of the public transit tracking system with modern web technologies.",
    tech: ["Python", "Flask", "Google Cloud", "Docker", "HTML5"],
    image: "/images/hubcityv2.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/hubcitytransitv2", icon: "github" }],
  },
  {
    slug: "mero-swasthya",
    badge: "Health Tech",
    title: "Mero Swasthya",
    description:
      "Developed a prototype for a digital health solution in Nepal to enhance health literacy and accessibility. This platform bridges the gap between healthcare providers and patients through innovative digital solutions.",
    tech: ["Flutter", "Firebase", "Dart", "Rest API"],
    image: "/images/meroswasthya.png",
    links: [{ label: "View on GitHub", href: "https://github.com/ThorOdinson246/Mero-Swasthya", icon: "github" }],
  },
];

export const clientProjects: Project[] = [
  {
    slug: "bionet",
    badge: "Web Development",
    title: "BIONET Project",
    description:
      "Developed and deployed a TYPO3-based website for the Bionet Project- part of the Euro-African Biomonitoring Network for assessing environmental exposure in populations. A comprehensive web solution for environmental monitoring data.",
    tech: ["TYPO3", "PHP", "MySQL", "Azure", "Apache"],
    image: "/images/bionet-project.png",
    links: [{ label: "Visit Website", href: "https://bionet-project.org", icon: "external" }],
  },
];

export const involvements: Project[] = [
  {
    slug: "nepal-health-frontiers",
    badge: "Healthcare NGO",
    title: "Nepal Health Frontiers",
    description:
      "Leading technical infrastructure management and designed the organization's digital presence at Nepal Health Frontiers (NHF) - a healthcare NGO focused on Non-Communicable Diseases (NCDs), Mental Health, and Healthy Lungs campaigns in Nepal. Responsible for publishing monthly research roundups, maintaining website services, and managing email systems.",
    tech: ["WordPress", "PHP"],
    image: "/images/nhf.png",
    links: [{ label: "Visit Organization", href: "https://nepalhealthfrontiers.org/", icon: "external" }],
  },
  {
    slug: "quantum-undergraduate-network",
    badge: "Co-founder",
    title: "Quantum Undergraduate Network",
    description:
      "Co-founded the Quantum Undergraduate Network, a global community platform serving as a launchpad for undergraduate students into quantum information science. We organize expert talks from industry leaders, facilitate networking opportunities among students and researchers, curate educational resources, and foster collaboration in the rapidly evolving field of quantum computing and quantum information. Also solo-built the entire web-platform using React.js and Next.js, hosted on Vercel, to provide a seamless experience for our community members.",
    tech: ["React.js", "Next.js", "Vercel"],
    image: "/images/qun.png",
    links: [{ label: "Visit Platform", href: "https://qunwebsite.vercel.app/", icon: "external" }],
  },
];

export const allProjects = [...personalProjects, ...clientProjects, ...involvements];
