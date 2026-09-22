import type { DocSection } from "./types";
import { gettingStartedSection } from "./sections/getting-started";
import { cliSection } from "./sections/cli";
import { cloudSection } from "./sections/cloud";
import { awsSection } from "./sections/aws";
import { evidenceSection } from "./sections/evidence";
import { integrationsSection } from "./sections/integrations";
import { recoveryReadinessSection } from "./sections/recovery-readiness";

/** Add new section files under sections/ and append here */
export const DOC_SECTIONS: DocSection[] = [
  gettingStartedSection,
  cliSection,
  evidenceSection,
  recoveryReadinessSection,
  integrationsSection,
  cloudSection,
  awsSection,
];

export function getDocSection(sectionId: string): DocSection | undefined {
  return DOC_SECTIONS.find((s) => s.id === sectionId);
}

export function getDocModule(
  sectionId: string,
  moduleSlug: string
): { section: DocSection; module: import("./types").DocModule } | undefined {
  const section = getDocSection(sectionId);
  if (!section) return undefined;
  const module = section.modules.find((m) => m.slug === moduleSlug);
  if (!module) return undefined;
  return { section, module };
}
