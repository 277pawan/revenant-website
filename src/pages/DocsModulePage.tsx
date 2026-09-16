import { Link, useParams } from "react-router-dom";
import { getDocModule } from "../content/docs";
import { DocRenderer } from "../components/docs/DocRenderer";

export function DocsModulePage() {
  const { sectionId, moduleSlug } = useParams();
  const match =
    sectionId && moduleSlug
      ? getDocModule(sectionId, moduleSlug)
      : undefined;

  if (!match) {
    return (
      <div className="ui-card p-8 text-center">
        <p className="text-foreground-muted">Page not found.</p>
        <Link to="/docs" className="mt-4 inline-block text-accent-bright hover:underline">
          Back to docs
        </Link>
      </div>
    );
  }

  const { section, module } = match;

  return (
    <article className="ui-card p-6 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
        {section.title}
      </p>
      <h1 className="ui-heading mt-1 text-3xl">{module.title}</h1>
      <p className="mt-2 text-foreground-subtle">{module.summary}</p>
      <div className="mt-8">
        <DocRenderer blocks={module.blocks} />
      </div>
    </article>
  );
}
