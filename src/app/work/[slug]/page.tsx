import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { CaseStudy } from "@/components/work/case-study";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);

  if (!project) return { title: "Case study not found" };

  const title = `${project.name} — ${project.tagline}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${project.slug}`,
      title,
      description: project.summary,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((candidate) => candidate.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return <CaseStudy project={project} next={next} />;
}
