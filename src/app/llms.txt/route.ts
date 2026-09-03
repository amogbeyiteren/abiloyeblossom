import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export async function GET() {
  const projectLines = DATA.projects
    .map((p) => `- [${p.title}](${p.href}): ${p.description}`)
    .join("\n");

  const body = `# ${DATA.name}

> ${DATA.description}

${DATA.name} is a Full Stack Developer based in ${DATA.location}, working across React, React Native, Next.js, Python (Django), and Node.js. This is their personal portfolio site.

## Docs

- [Full site content](${DATA.url}/llms-full.txt): Complete text of this site in one file — bio, work history, education, skills, every project, certifications, and publications.
- [Homepage](${DATA.url}/index.md): Markdown version of the homepage.
- [Blog](${DATA.url}/blog): Personal blog posts.

## Projects

${projectLines}

## Contact

- Email: ${DATA.contact.email}
- [GitHub](${DATA.contact.social.GitHub.url})
- [LinkedIn](${DATA.contact.social.LinkedIn.url})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
