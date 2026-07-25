export interface ThemeTokens {
  "editor-bg": string;
  "sidebar-bg": string;
  "activitybar-bg": string;
  "tabsbar-bg": string;
  "tab-active-bg": string;
  "tab-inactive-bg": string;
  "tab-active-border": string;
  "statusbar-bg": string;
  "statusbar-fg": string;
  "titlebar-bg": string;
  "accent-focus": string;
  "accent-hover": string;
  "accent-link": string;
  selection: string;
  "text-body": string;
  "text-muted": string;
  border: string;
  panel: string;
}

export interface Theme {
  id: string;
  name: string;
  kind: "dark" | "light";
  tokens: ThemeTokens;
}

export const themes: Theme[] = [
  {
    id: "github-dark-colorblind",
    name: "GitHub Dark Colorblind",
    kind: "dark",
    tokens: {
      "editor-bg": "#0d1117",
      "sidebar-bg": "#010409",
      "activitybar-bg": "#0d1117",
      "tabsbar-bg": "#010409",
      "tab-active-bg": "#0d1117",
      "tab-inactive-bg": "#010409",
      "tab-active-border": "#f78166",
      "statusbar-bg": "#0d1117",
      "statusbar-fg": "#8b949e",
      "titlebar-bg": "#0d1117",
      "accent-focus": "#1f6feb",
      "accent-hover": "#388bfd",
      "accent-link": "#58a6ff",
      selection: "#6e768166",
      "text-body": "#c9d1d9",
      "text-muted": "#8b949e",
      border: "#30363d",
      panel: "#161b22",
    },
  },
  {
    id: "bluloco-dark",
    name: "Bluloco Dark",
    kind: "dark",
    tokens: {
      "editor-bg": "#282c34",
      "sidebar-bg": "#22252a",
      "activitybar-bg": "#2d333d",
      "tabsbar-bg": "#22252a",
      "tab-active-bg": "#282c34",
      "tab-inactive-bg": "#25272d",
      "tab-active-border": "#3691ff",
      "statusbar-bg": "#37404b",
      "statusbar-fg": "#abb2bf",
      "titlebar-bg": "#404753",
      "accent-focus": "#3691ff",
      "accent-hover": "#5ca7ff",
      "accent-link": "#3691ff",
      selection: "#3691ff40",
      "text-body": "#abb2bf",
      "text-muted": "#808895",
      border: "#3d434f",
      panel: "#2d333d",
    },
  },
  {
    id: "github-light-colorblind",
    name: "GitHub Light Colorblind",
    kind: "light",
    tokens: {
      "editor-bg": "#ffffff",
      "sidebar-bg": "#f6f8fa",
      "activitybar-bg": "#ffffff",
      "tabsbar-bg": "#f6f8fa",
      "tab-active-bg": "#ffffff",
      "tab-inactive-bg": "#f6f8fa",
      "tab-active-border": "#fd8c73",
      "statusbar-bg": "#ffffff",
      "statusbar-fg": "#57606a",
      "titlebar-bg": "#ffffff",
      "accent-focus": "#0969da",
      "accent-hover": "#218bff",
      "accent-link": "#0969da",
      selection: "#afb8c133",
      "text-body": "#24292f",
      "text-muted": "#57606a",
      border: "#d0d7de",
      panel: "#f6f8fa",
    },
  },
];

export const defaultThemeId = "github-dark-colorblind";

export const themeMap: Record<string, Theme> = Object.fromEntries(themes.map((t) => [t.id, t]));

export function applyTheme(id: string) {
  const theme = themeMap[id];
  if (!theme || typeof document === "undefined") return;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.tokens)) {
    root.style.setProperty(`--${key}`, value);
  }
  root.setAttribute("data-theme-kind", theme.kind);
}
