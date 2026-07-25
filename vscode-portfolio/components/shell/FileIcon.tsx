export function FileIcon({ icon, size = 16 }: { icon: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/material-icons/${icon}.svg`}
      alt=""
      width={size}
      height={size}
      className="shrink-0"
    />
  );
}
