export type ContentType = "native" | "embed";

export interface FileEntry {
  id: string;
  name: string;
  folder: string;
  icon: string;
  language: string;
  contentType: ContentType;
  componentKey?: string;
  embedSrc?: string;
}

export interface FolderNode {
  id: string;
  name: string;
  children: (FolderNode | string)[];
}

export const files: FileEntry[] = [
  { id: "readme", name: "README.md", folder: "", icon: "markdown", language: "Markdown", contentType: "native", componentKey: "readme" },
  { id: "config", name: "portfolio.config.ts", folder: "", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "config" },
  { id: "welcome", name: "welcome.tsx", folder: "", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "welcome" },

  { id: "about", name: "about.md", folder: "about", icon: "markdown", language: "Markdown", contentType: "native", componentKey: "about" },
  { id: "skills", name: "skills.json", folder: "about", icon: "json", language: "JSON", contentType: "native", componentKey: "skills" },

  { id: "crisislens", name: "crisislens.project.ts", folder: "projects/personal", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "project:crisislens" },
  { id: "aes-key-recovery", name: "aes-key-recovery.project.tsx", folder: "projects/personal", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "project:aes-key-recovery" },
  { id: "sediment-flux-koshi", name: "sediment-flux-koshi.project.tsx", folder: "projects/personal", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "project:sediment-flux-koshi" },
  { id: "unet-water-segmentation", name: "water-segmentation-unet.project.ts", folder: "projects/personal", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "project:unet-water-segmentation" },
  { id: "hub-city-transit-v2", name: "hub-city-transit-v2.project.ts", folder: "projects/personal", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "project:hub-city-transit-v2" },
  { id: "mero-swasthya", name: "mero-swasthya.project.ts", folder: "projects/personal", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "project:mero-swasthya" },

  { id: "bionet", name: "bionet.project.ts", folder: "projects/client", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "project:bionet" },

  { id: "nepal-health-frontiers", name: "nepal-health-frontiers.md", folder: "involvements", icon: "markdown", language: "Markdown", contentType: "native", componentKey: "project:nepal-health-frontiers" },
  { id: "quantum-undergraduate-network", name: "quantum-undergraduate-network.md", folder: "involvements", icon: "markdown", language: "Markdown", contentType: "native", componentKey: "project:quantum-undergraduate-network" },

  { id: "contact", name: "contact.tsx", folder: "contact", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "contact" },
  { id: "thanks", name: "thanks.html", folder: "contact", icon: "html", language: "HTML", contentType: "native", componentKey: "thanks" },

  { id: "photo-particles", name: "photo-particles.ts", folder: "components", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "photo-particles" },
];

export const fileTree: FolderNode = {
  id: "root",
  name: "mukesh-poudel",
  children: [
    "readme",
    "config",
    "welcome",
    { id: "about", name: "about", children: ["about", "skills"] },
    {
      id: "projects",
      name: "projects",
      children: [
        {
          id: "projects/personal",
          name: "personal",
          children: [
            "crisislens",
            "aes-key-recovery",
            "sediment-flux-koshi",
            "unet-water-segmentation",
            "hub-city-transit-v2",
            "mero-swasthya",
          ],
        },
        { id: "projects/client", name: "client", children: ["bionet"] },
      ],
    },
    { id: "involvements", name: "involvements", children: ["nepal-health-frontiers", "quantum-undergraduate-network"] },
    { id: "contact", name: "contact", children: ["contact", "thanks"] },
    { id: "components", name: "components", children: ["photo-particles"] },
  ],
};

export const fileMap: Record<string, FileEntry> = Object.fromEntries(files.map((f) => [f.id, f]));

export const defaultOpenTabId = "welcome";
