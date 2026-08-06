"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/lib/store";
import { fileMap } from "@/lib/fileRegistry";
import { identity } from "@/lib/content/identity";
import { skillGroups } from "@/lib/content/skills";
import { allProjects } from "@/lib/content/projects";
import { themes, themeMap } from "@/lib/themes";

interface Line {
  command: string;
  output: ReactNode;
}

const openAliases: Record<string, string> = {
  home: "home",
  about: "about",
  skills: "skills",
  projects: "projects",
  contact: "contact",
  readme: "readme",
  config: "config",
  resume: "resume",
  "open-source": "open-source",
  opensource: "open-source",
  oss: "open-source",
  aes: "aes-key-recovery",
  "aes-key-recovery": "aes-key-recovery",
  sediment: "sediment-flux",
  "sediment-flux": "sediment-flux",
  koshi: "sediment-flux",
  afm: "afm-super-resolution",
};

function Prompt({ command }: { command: string }) {
  return (
    <div>
      <div className="flex items-center">
        <span className="text-[#6b7280]">╭─</span>
        <span className="ml-1 inline-flex items-center gap-1 rounded-sm bg-[#2f6fed] px-2 py-[1px] text-white">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h4l1.2 1.5H14V13H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          mukesh-poudel
        </span>
      </div>
      <div>
        <span className="text-[#6b7280]">╰─</span> <span className="text-[#3fb950]">❯</span>{" "}
        <span className="text-text-body">{command}</span>
      </div>
    </div>
  );
}

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-link underline">
    {children}
  </a>
);

const HELP: [string, string][] = [
  ["help", "show this list"],
  ["about", "who I am"],
  ["skills", "languages, tools, and stacks"],
  ["projects", "list my projects"],
  ["open <name>", "open a file/tab (e.g. open aes)"],
  ["ls", "list files"],
  ["email", "my email"],
  ["socials", "github, linkedin, email"],
  ["theme [name]", "list or switch color theme"],
  ["neofetch", "system info"],
  ["date", "current date and time"],
  ["clear", "clear the terminal"],
  ["exit", "close the terminal"],
];

export function Terminal() {
  const openFile = useEditorStore((s) => s.openFile);
  const setTheme = useEditorStore((s) => s.setTheme);
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);
  const themeId = useEditorStore((s) => s.themeId);

  const [lines, setLines] = useState<Line[]>([
    {
      command: "",
      output: (
        <span className="text-text-muted">
          Welcome to my shell. Type <span className="text-accent-link">help</span> to get started.
        </span>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string): ReactNode {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        return (
          <div className="space-y-0.5">
            {HELP.map(([c, d]) => (
              <div key={c}>
                <span className="text-accent-link">{c.padEnd(14)}</span>
                <span className="text-text-muted">{d}</span>
              </div>
            ))}
          </div>
        );
      case "about":
      case "whoami":
        return (
          <div className="space-y-1 text-text-muted">
            <p className="text-text-body">{identity.name} — Software · AI · Web · Geospatial</p>
            <p>{identity.intro}</p>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-1">
            {skillGroups.map((g) => (
              <div key={g.category}>
                <span className="text-accent-link">{(g.category + ":").padEnd(14)}</span>
                <span className="text-text-muted">{g.items.join(", ")}</span>
              </div>
            ))}
          </div>
        );
      case "projects":
        return (
          <div className="space-y-0.5">
            {allProjects.map((p) => (
              <div key={p.slug}>
                <span className="text-[#3fb950]">{p.slug.padEnd(28)}</span>
                <span className="text-text-muted">{p.badge}</span>
              </div>
            ))}
            <p className="pt-1 text-text-muted">
              Tip: <span className="text-accent-link">open aes</span> or <span className="text-accent-link">open sediment</span>{" "}
              for the full write-ups.
            </p>
          </div>
        );
      case "ls":
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            {Object.values(fileMap).map((f) => (
              <span key={f.id} className="text-[#3fb950]">
                {f.name}
              </span>
            ))}
          </div>
        );
      case "open": {
        const target = openAliases[arg.toLowerCase()];
        if (!target) return <span className="text-diag-error">open: no such file: {arg || "<name>"}</span>;
        openFile(target);
        return <span className="text-text-muted">Opening {fileMap[target].name}…</span>;
      }
      case "email":
        return (
          <span>
            <Link href={`mailto:${identity.email}`}>{identity.email}</Link>
          </span>
        );
      case "github":
        return <Link href={identity.github}>{identity.github}</Link>;
      case "linkedin":
        return <Link href={identity.linkedin}>{identity.linkedin}</Link>;
      case "socials":
        return (
          <div className="space-y-0.5">
            <div>GitHub:   <Link href={identity.github}>{identity.github.replace("https://", "")}</Link></div>
            <div>LinkedIn: <Link href={identity.linkedin}>{identity.linkedin.replace("https://", "")}</Link></div>
            <div>Email:    <Link href={`mailto:${identity.email}`}>{identity.email}</Link></div>
          </div>
        );
      case "resume":
        return <span className="text-text-muted">Résumé isn&apos;t posted yet — reach out at {identity.email}.</span>;
      case "theme": {
        if (!arg || arg === "list") {
          return (
            <div className="space-y-0.5">
              {themes.map((t) => (
                <div key={t.id}>
                  <span className="text-[#3fb950]">{t.id.padEnd(26)}</span>
                  <span className="text-text-muted">
                    {t.name} {t.id === themeId ? "(active)" : ""}
                  </span>
                </div>
              ))}
              <p className="pt-1 text-text-muted">
                Switch with <span className="text-accent-link">theme &lt;name&gt;</span>.
              </p>
            </div>
          );
        }
        if (themeMap[arg]) {
          setTheme(arg);
          return <span className="text-text-muted">Theme set to {themeMap[arg].name}.</span>;
        }
        return <span className="text-diag-error">theme: unknown theme: {arg}</span>;
      }
      case "neofetch":
        return <Neofetch />;
      case "date":
        return <span className="text-text-muted">{new Date().toString()}</span>;
      case "echo":
        return <span className="text-text-body">{arg}</span>;
      case "clear":
        return "__CLEAR__";
      case "exit":
        return "__EXIT__";
      case "sudo":
        return (
          <span className="text-diag-error">
            {identity.name.split(" ")[0].toLowerCase()} is not in the sudoers file. This incident will be reported.
          </span>
        );
      case "coffee":
        return <pre className="text-text-muted">{"      ( (\n       ) )\n    ........\n    |      |]   ☕ always brewing\n    \\      /\n     `----'"}</pre>;
      case "hire":
        return (
          <span className="text-text-body">
            Open to interesting problems.{" "}
            <Link href={`mailto:${identity.email}`}>{identity.email}</Link>
          </span>
        );
      default:
        return <span className="text-diag-error">zsh: command not found: {cmd}</span>;
    }
  }

  function submit() {
    const raw = input;
    const result = run(raw);
    if (result === "__CLEAR__") {
      setLines([]);
    } else if (result === "__EXIT__") {
      toggleTerminal(false);
    } else if (raw.trim()) {
      setLines((prev) => [...prev, { command: raw, output: result }]);
    }
    if (raw.trim()) setHistory((prev) => [...prev, raw]);
    setInput("");
    setHistIndex(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIndex < 0 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex < 0) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(history[next]);
      }
    }
  }

  return (
    <div className="flex h-full flex-col bg-editor-bg" onClick={() => inputRef.current?.focus()}>
      <div className="flex h-8 shrink-0 items-center justify-between border-y border-border px-3 text-[11px] uppercase tracking-wide text-text-muted">
        <div className="flex items-center gap-3">
          <span className="border-b-2 border-accent-link pb-0.5 text-text-body">Terminal</span>
          <span className="normal-case text-text-muted">zsh</span>
        </div>
        <button onClick={() => toggleTerminal(false)} title="Close panel" className="hover:text-text-body">
          <svg width="13" height="13" viewBox="0 0 16 16">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto px-3 py-2 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="mb-2">
            {line.command !== "" && <Prompt command={line.command} />}
            {line.output && <div className="mt-0.5">{line.output}</div>}
          </div>
        ))}

        <div>
          <div className="flex items-center">
            <span className="text-[#6b7280]">╭─</span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-sm bg-[#2f6fed] px-2 py-[1px] text-white">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h4l1.2 1.5H14V13H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              mukesh-poudel
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-[#6b7280]">╰─</span>
            <span className="mx-1 text-[#3fb950]">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent font-mono text-[13px] text-text-body caret-accent-link outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Neofetch() {
  const info: [string, string][] = [
    ["OS", "Ubuntu 25.10"],
    ["Host", "Portfolio (web)"],
    ["Shell", "zsh"],
    ["Editor", "VS Code"],
    ["DE", "Portfolio.app"],
    ["Languages", "Python, C++, JavaScript, Dart"],
    ["Focus", "Software · AI · Web · Geospatial"],
    ["Contact", identity.email],
  ];
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      <pre className="text-accent-link">{`   __  __ ____
  |  \\/  |  _ \\
  | |\\/| | |_) |
  | |  | |  __/
  |_|  |_|_|`}</pre>
      <div className="space-y-0.5">
        <div className="text-[#3fb950]">thorodinson@portfolio</div>
        <div className="text-text-muted">---------------------</div>
        {info.map(([k, v]) => (
          <div key={k}>
            <span className="text-accent-link">{k}: </span>
            <span className="text-text-muted">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
