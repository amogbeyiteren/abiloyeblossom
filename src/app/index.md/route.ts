import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export async function GET() {
  const workSection = DATA.work
    .map(
      (w) =>
        `- **${w.title}**, ${w.company} (${w.start} – ${w.end || "Present"})\n  ${w.description}`
    )
    .join("\n\n");

  const educationSection = DATA.education
    .map((e) => `- **${e.degree}**, ${e.school} (${e.start} – ${e.end})`)
    .join("\n");

  const skillsSection = DATA.skills
    .map((group) => `- **${group.category}:** ${group.items.join(", ")}`)
    .join("\n");

  const projectsSection = DATA.projects
    .map((p) => `- **[${p.title}](${p.href})** (${p.dates}) — ${p.description}`)
    .join("\n");

  const certsSection = DATA.certifications
    .map((c) => `- ${c.name}, ${c.provider} (${c.date})`)
    .join("\n");

  const pubsSection = DATA.publications
    .map((p) => `- [${p.title}](${p.link}), ${p.platform} (${p.date})`)
    .join("\n");

  const body = `# ${DATA.name}

${DATA.description}

## About

${DATA.summary}

## Work Experience

${workSection}

## Education

${educationSection}

## Skills

${skillsSection}

## Projects

${projectsSection}

## Certifications & Publications

${certsSection}
${pubsSection}

## Contact

- Email: [${DATA.contact.email}](mailto:${DATA.contact.email})
- GitHub: ${DATA.contact.social.GitHub.url}
- LinkedIn: ${DATA.contact.social.LinkedIn.url}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
