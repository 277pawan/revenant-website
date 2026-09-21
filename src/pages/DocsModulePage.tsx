import { Link, useParams } from "react-router-dom";
import { getDocModule } from "../content/docs";
import { DocRenderer } from "../components/docs/DocRenderer";
import { PageMeta } from "../components/seo/PageMeta";
import { breadcrumbJsonLd, techArticleJsonLd } from "../lib/seo";

export function DocsModulePage() {
  const { sectionId, moduleSlug } = useParams();
  const match =
    sectionId && moduleSlug
      ? getDocModule(sectionId, moduleSlug)
      : undefined;

  if (!match) {
    return (
      <div className="ui-card p-8 text-center">
        <PageMeta
          title="Page not found"
          description="The documentation page you requested could not be found."
          path="/docs"
          robots="noindex,nofollow"
        />
        <p className="text-foreground-muted">Page not found.</p>
        <Link to="/docs" className="mt-4 inline-block text-accent-bright hover:underline">
          Back to docs
        </Link>
      </div>
    );
  }

  const { section, module } = match;
  const path = `/docs/${section.id}/${module.slug}`;
  const keywords = [
    section.title,
    "Revenant documentation",
    "PostgreSQL disaster recovery",
    ...(module.keywords ?? []),
  ];

  return (
    <article className="ui-card overflow-x-auto p-4 sm:p-8">
      <PageMeta
        title={module.title}
        description={module.summary}
        path={path}
        keywords={keywords}
        ogType="article"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Documentation", path: "/docs" },
            { name: section.title, path: `/docs#${section.id}` },
            { name: module.title, path },
          ]),
          techArticleJsonLd({
            title: module.title,
            description: module.summary,
            path,
            sectionTitle: section.title,
            keywords: module.keywords,
          }),
        ]}
      />
      <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
        {section.title}
      </p>
      <h1 className="ui-heading mt-1 text-2xl sm:text-3xl">{module.title}</h1>
      <p className="mt-2 text-foreground-subtle">{module.summary}</p>
      <div className="mt-8">
        <DocRenderer blocks={module.blocks} />
      </div>
    </article>
  );
}
