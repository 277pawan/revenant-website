import { useLayoutEffect } from "react";
import {
  type PageMetaInput,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  formatPageTitle,
} from "../../lib/seo";

const MANAGED = "data-revenant-seo";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"][${MANAGED}]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    el.setAttribute(MANAGED, "true");
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"][${MANAGED}]`
  );
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    el.setAttribute(MANAGED, "true");
    document.head.appendChild(el);
  }
  el.href = href;
}

function clearManagedHead(): void {
  document.head
    .querySelectorAll(`[${MANAGED}]`)
    .forEach((node) => node.remove());
}

function injectJsonLd(
  schemas: Record<string, unknown> | Record<string, unknown>[] | undefined
): void {
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`)
    .forEach((node) => node.remove());

  if (!schemas) return;

  const list = Array.isArray(schemas) ? schemas : [schemas];
  list.forEach((schema, index) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(MANAGED, "true");
    script.setAttribute("data-seo-jsonld-index", String(index));
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function PageMeta(props: PageMetaInput): null {
  const {
    title,
    description,
    path,
    keywords,
    ogType = "website",
    robots = "index,follow",
    image = DEFAULT_OG_IMAGE,
    imageAlt = "Revenant — PostgreSQL disaster recovery proof",
    jsonLd,
  } = props;

  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useLayoutEffect(() => {
    const pageTitle = formatPageTitle(title);
    const canonical = absoluteUrl(path);

    document.title = pageTitle;

    clearManagedHead();

    upsertMeta("name", "description", description);
    if (keywords?.length) {
      upsertMeta("name", "keywords", keywords.join(", "));
    }
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "author", "Revenant");
    upsertMeta("name", "application-name", "Revenant");

    upsertLink("canonical", canonical);

    upsertMeta("property", "og:site_name", "Revenant");
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", imageAlt);
    upsertMeta("property", "og:locale", "en_IN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:image:alt", imageAlt);

    injectJsonLd(jsonLd);
  }, [
    title,
    description,
    path,
    keywords?.join(","),
    ogType,
    robots,
    image,
    imageAlt,
    jsonLdKey,
  ]);

  return null;
}
