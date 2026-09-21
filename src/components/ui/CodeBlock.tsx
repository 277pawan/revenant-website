import { Highlight, themes } from "prism-react-renderer";

const ALIAS: Record<string, string> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  yaml: "yaml",
  yml: "yaml",
  json: "json",
  js: "javascript",
  javascript: "javascript",
  ts: "typescript",
  typescript: "typescript",
  text: "text",
};

type Props = {
  code: string;
  language?: string;
  className?: string;
};

export function CodeBlock({ code, language = "text", className = "" }: Props) {
  const lang = ALIAS[language.toLowerCase()] ?? "text";

  return (
    <Highlight theme={themes.nightOwl} code={code.replace(/\n$/, "")} language={lang}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`overflow-x-auto rounded-xl border border-terminal-border p-4 font-mono text-[13px] leading-relaxed ${className}`}
          style={{ ...style, background: "var(--rv-terminal-bg)", margin: 0 }}
        >
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
