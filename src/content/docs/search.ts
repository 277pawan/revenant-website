import { DOC_SECTIONS } from "./index";
import type { DocBlock, DocModule } from "./types";

export type DocSearchHit = {
  sectionId: string;
  sectionTitle: string;
  moduleSlug: string;
  title: string;
  summary: string;
  href: string;
  score: number;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s./:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(query: string): string[] {
  const n = normalize(query);
  if (!n) return [];
  return n.split(" ").filter((t) => t.length > 0);
}

function blocksToPlain(blocks: DocBlock[]): string {
  const parts: string[] = [];
  for (const b of blocks) {
    if (b.type === "paragraph" || b.type === "callout") parts.push(b.text);
    if (b.type === "heading") parts.push(b.text);
    if (b.type === "code") parts.push(b.code);
    if (b.type === "list") parts.push(...b.items);
  }
  return parts.join(" ");
}

function moduleHaystack(mod: DocModule): {
  title: string;
  summary: string;
  body: string;
  keywords: string;
  slug: string;
} {
  return {
    title: normalize(mod.title),
    summary: normalize(mod.summary),
    body: normalize(blocksToPlain(mod.blocks)),
    keywords: normalize((mod.keywords ?? []).join(" ")),
    slug: normalize(mod.slug.replace(/-/g, " ")),
  };
}

/** AND-match tokens; rank by title > slug > keywords > summary > body */
export function searchDocs(query: string, limit = 14): DocSearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const qFull = normalize(query);
  const hits: DocSearchHit[] = [];

  for (const section of DOC_SECTIONS) {
    const sectionN = normalize(section.title);

    for (const mod of section.modules) {
      const h = moduleHaystack(mod);
      const combined = `${h.title} ${h.summary} ${h.keywords} ${h.body} ${h.slug} ${sectionN}`;

      if (!tokens.every((t) => combined.includes(t))) continue;

      let score = 0;

      if (h.title === qFull) score += 120;
      else if (h.title.startsWith(qFull)) score += 95;
      else if (h.title.includes(qFull)) score += 75;

      if (h.slug === qFull || mod.slug === query.trim().toLowerCase()) score += 90;
      if (h.slug.includes(qFull)) score += 40;

      for (const t of tokens) {
        if (h.title === t) score += 45;
        else if (h.title.split(" ").includes(t)) score += 32;
        else if (h.title.startsWith(t)) score += 28;
        else if (h.title.includes(t)) score += 20;

        if (mod.slug === t || mod.slug.includes(t)) score += 22;
        if (h.keywords.split(" ").includes(t)) score += 18;
        if (h.keywords.includes(t)) score += 12;

        if (h.summary.includes(t)) score += 8;
        if (h.body.includes(`revenant ${t}`)) score += 25;
        if (h.body.includes(t)) score += 3;
        if (sectionN.includes(t)) score += 5;
      }

      if (tokens.length > 1 && h.title.includes(qFull)) score += 20;

      hits.push({
        sectionId: section.id,
        sectionTitle: section.title,
        moduleSlug: mod.slug,
        title: mod.title,
        summary: mod.summary,
        href: `/docs/${section.id}/${mod.slug}`,
        score,
      });
    }
  }

  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return hits.slice(0, limit);
}
