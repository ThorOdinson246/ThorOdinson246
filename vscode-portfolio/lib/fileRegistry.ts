export type ContentType = "native" | "embed";

export interface FileEntry {
  id: string;
  name: string;
  folder: string;
  icon: string;
  language: string;
  contentType: ContentType;
  componentKey?: string;
}

export interface FolderNode {
  id: string;
  name: string;
  children: (FolderNode | string)[];
}

export const files: FileEntry[] = [
  { id: "home", name: "home.tsx", folder: "", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "home" },
  { id: "readme", name: "README.md", folder: "", icon: "markdown", language: "Markdown", contentType: "native", componentKey: "readme" },
  { id: "config", name: "portfolio.config.ts", folder: "", icon: "typescript", language: "TypeScript", contentType: "native", componentKey: "config" },

  { id: "about", name: "about.md", folder: "about", icon: "markdown", language: "Markdown", contentType: "native", componentKey: "about" },
  { id: "skills", name: "skills.json", folder: "about", icon: "json", language: "JSON", contentType: "native", componentKey: "skills" },

  { id: "projects", name: "projects.tsx", folder: "projects", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "projects" },
  { id: "aes-key-recovery", name: "aes-key-recovery.tsx", folder: "projects/research", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "research:aes" },
  { id: "sediment-flux", name: "sediment-flux-koshi.tsx", folder: "projects/research", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "research:sediment" },
  { id: "afm-super-resolution", name: "afm-super-resolution.tsx", folder: "projects/research", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "research:afm" },

  { id: "open-source", name: "open-source.tsx", folder: "", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "open-source" },
  { id: "resume", name: "resume.md", folder: "", icon: "markdown", language: "Markdown", contentType: "native", componentKey: "resume" },

  { id: "contact", name: "contact.tsx", folder: "contact", icon: "react_ts", language: "TypeScript React", contentType: "native", componentKey: "contact" },
];

export const fileTree: FolderNode = {
  id: "root",
  name: "mukesh-poudel",
  children: [
    "home",
    "readme",
    "config",
    "resume",
    { id: "about", name: "about", children: ["about", "skills"] },
    {
      id: "projects",
      name: "projects",
      children: [
        "projects",
        {
          id: "projects/research",
          name: "research",
          children: ["aes-key-recovery", "sediment-flux", "afm-super-resolution"],
        },
      ],
    },
    "open-source",
    { id: "contact", name: "contact", children: ["contact"] },
  ],
};

export const fileMap: Record<string, FileEntry> = Object.fromEntries(files.map((f) => [f.id, f]));

export const defaultOpenTabIds = ["home", "projects", "contact"];
export const defaultActiveTabId = "home";
export const pinnedTabIds = new Set(["home", "projects", "contact"]);
