export interface Contribution {
  name: string;
  repo: string;
  href: string;
  language: string;
  prs: number;
  description: string;
  work: string;
}

export const contributions: Contribution[] = [
  {
    name: "csconfs",
    repo: "dynaroars/csconfs",
    href: "https://github.com/dynaroars/csconfs",
    language: "TypeScript",
    prs: 3,
    description: "A tracker of deadlines and details for top computer-science conferences.",
    work: "Reworked the UI, fixed date-parsing bugs that dropped or mislabeled conferences, and surfaced hidden entries.",
  },
  {
    name: "gopdfsuit",
    repo: "chinmay-sawant/gopdfsuit",
    href: "https://github.com/chinmay-sawant/gopdfsuit",
    language: "Go",
    prs: 1,
    description: "A Go toolkit for generating, filling, and manipulating PDF documents.",
    work: "Added visual feedback to the copy buttons so users get clear confirmation on click.",
  },
];
