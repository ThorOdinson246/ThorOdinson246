import katex from "katex";
import "katex/dist/katex.min.css";

export function InlineMath({ children }: { children: string }) {
  const html = katex.renderToString(children, { throwOnError: false, displayMode: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ children }: { children: string }) {
  const html = katex.renderToString(children, { throwOnError: false, displayMode: true });
  return <div className="my-4 overflow-x-auto text-text-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
