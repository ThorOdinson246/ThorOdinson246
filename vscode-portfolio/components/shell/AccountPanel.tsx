import { identity } from "@/lib/content/identity";

function Row({ label, href, value }: { label: string; href?: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-text-muted/70">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-accent-link hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-[13px] text-text-body">{value}</span>
      )}
    </div>
  );
}

export function AccountPanel() {
  return (
    <div className="py-2">
      <div className="flex flex-col items-center border-b border-border px-4 pb-5 pt-3 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/me.jpg" alt={identity.name} className="h-20 w-20 rounded-full object-cover ring-2 ring-accent-focus/40" />
        <p className="mt-3 text-[14px] font-semibold text-text-body">{identity.name}</p>
        <p className="mt-1 text-[12px] text-text-muted">Software · AI · Web · Geospatial</p>
      </div>
      <Row label="GitHub" href={identity.github} value={identity.github.replace("https://", "")} />
      <Row label="LinkedIn" href={identity.linkedin} value={identity.linkedin.replace("https://", "")} />
      <Row label="Email" href={`mailto:${identity.email}`} value={identity.email} />
    </div>
  );
}
