export const tabToPath: Record<string, string> = {
  "aes-key-recovery": "/aeskeyrecovery/",
  "sediment-flux": "/sedimentflux/",
};

export const pathToTab: Record<string, string> = {
  "/aeskeyrecovery": "aes-key-recovery",
  "/sedimentflux": "sediment-flux",
};

export function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}
