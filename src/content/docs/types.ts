export type DocBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "info" | "tip" | "warning"; text: string };

export type DocModule = {
  slug: string;
  title: string;
  summary: string;
  /** Extra tokens for search — pages still render from blocks only */
  keywords?: string[];
  blocks: DocBlock[];
};

export type DocSection = {
  id: string;
  title: string;
  description: string;
  modules: DocModule[];
};
