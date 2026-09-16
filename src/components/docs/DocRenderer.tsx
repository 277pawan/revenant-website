import type { DocBlock } from "../../content/docs/types";

function Callout({
  tone,
  text,
}: {
  tone: "info" | "tip" | "warning";
  text: string;
}) {
  const styles = {
    info: "border-border-strong bg-accent-muted text-foreground-muted",
    tip: "border-border-strong bg-success-muted text-foreground-muted",
    warning: "border-border-strong bg-warning-muted text-foreground-muted",
  };
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles[tone]}`}>
      {text}
    </div>
  );
}

export function DocRenderer({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-[15px] leading-relaxed text-foreground-muted">
              {block.text}
            </p>
          );
        }
        if (block.type === "heading") {
          const cls =
            block.level === 2
              ? "text-xl font-semibold text-foreground mt-8"
              : "text-lg font-semibold text-foreground mt-6";
          return (
            <h2 key={i} className={cls}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "code") {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-xl border border-terminal-border bg-terminal-bg p-4 font-mono text-[13px] leading-relaxed text-foreground-muted"
            >
              <code>{block.code}</code>
            </pre>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 text-[15px] text-foreground-muted">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "callout") {
          return <Callout key={i} tone={block.tone} text={block.text} />;
        }
        return null;
      })}
    </div>
  );
}
